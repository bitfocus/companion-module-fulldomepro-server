const dns = require('dns')
const net = require('net')
const OSCUDPClient = require('./osc-udp.js')

const { PlayerStatus } = require('./constants.js')

async function resolveHostname(root, hostname) {
	return new Promise((resolve, reject) => {
		dns.lookup(hostname, { family: 4 }, (err, address) => {
			if (err) {
				reject(err)
			} else {
				root.log('info', `Resolved ${hostname} to ${address}`)
				resolve(address)
			}
		})
	})
}

function isValidIPAddress(ip) {
	const result = net.isIP(ip)
	return result === 4 || result === 6 // Return true if it's either IPv4 or IPv6
}

function parseArguments(argsStr) {
	const rawArgs = (argsStr + '').replace(/“/g, '"').replace(/”/g, '"').split(' ')
	const args = []
	for (let i = 0; i < rawArgs.length; i++) {
		if (rawArgs[i] === undefined || rawArgs[i].length === 0) continue
		if (isNaN(rawArgs[i])) {
			let str = rawArgs[i]
			if (str.startsWith('"')) {
				// Ensure the string is complete
				while (i < rawArgs.length - 1 && !rawArgs[i].endsWith('"')) {
					i++
					str += ' ' + rawArgs[i]
				}
				if (!str.endsWith('"')) {
					return { error: `Unmatched quote in arguments: ${str}` }
				}
			}
			args.push(str.replace(/"/g, '').replace(/'/g, ''))
		} else if (rawArgs[i].indexOf('.') > -1) {
			args.push(parseFloat(rawArgs[i]))
		} else {
			args.push(parseInt(rawArgs[i]))
		}
	}
	return { args }
}

function evaluateComparison(receivedValue, targetValue, comparison) {
	switch (comparison) {
		case 'equal':
			return receivedValue === targetValue
		case 'greaterthan':
			return receivedValue > targetValue
		case 'lessthan':
			return receivedValue < targetValue
		case 'greaterthanequal':
			return receivedValue >= targetValue
		case 'lessthanequal':
			return receivedValue <= targetValue
		case 'notequal':
			return receivedValue !== targetValue
		default:
			return false
	}
}

function setupOSC(instance) {
	if (instance.config.protocol === 'udp') {
		instance.client = new OSCUDPClient(
			instance,
			instance.targetServer,
			instance.config.feedbackPort,
			instance.config.listen,
			instance.config.filter,
		)
		// } else if (instance.config.protocol === 'tcp') {
		// 	instance.client = new OSCTCPClient(
		// 		instance,
		// 		instance.targetServer,
		// 		instance.config.targetPort,
		// 		instance.config.listen,
		// 	)
		// } else if (instance.config.protocol === 'tcp-raw') {
		// 	instance.client = new OSCRawClient(
		// 		instance,
		// 		instance.targetServer,
		// 		instance.config.targetPort,
		// 		instance.config.listen,
		// 	)
	} else {
		instance.client = null
		instance.updateStatus('bad_config')
	}
}
function massageValue(value, min, max) {
	// if a value is out of range it is co-erced to the nearest limit
	if (value < min) return min
	if (value > max) return max
	return value
}

function wrap360(value, center) {
	// ensures a value is within 180 degrees of a center point
	// e.g. wrap360(270, 0) = -90
	//      wrap360(-10, 180) = 350
	// center would usually be 0 or 180 for most applications, but works for other values too
	return (((value % 360) - center - 540) % 360) + center + 180
}
function isPlaying(playerState) {
	if (playerState == PlayerStatus.Stop || playerState == PlayerStatus.Pause) {
		return false
	} else {
		return true
	}
}
module.exports = {
	resolveHostname,
	isValidIPAddress,
	parseArguments,
	evaluateComparison,
	setupOSC,
	massageValue,
	wrap360,
	isPlaying,
}
