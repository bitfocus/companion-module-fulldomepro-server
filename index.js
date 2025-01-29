const { InstanceBase, Regex, runEntrypoint } = require('@companion-module/base')
const { resolveHostname, isValidIPAddress, setupOSC } = require('./helpers.js')
const UpgradeScripts = require('./upgrades.js');
const { updateActions } = require('./actions.js')
const { updateFeedbacks } = require('./feedbacks.js')
const { ProcessReceivedData } = require('./osc-process.js')
const UpdateVariableDefinitions = require('./variables.js')
const { updatePresets } = require('./presets.js')


class OSCInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	//Initialization
	async init(config) {
		this.config = config
		this.targetServer
		this.client

		this.onDataReceived = {} // Store received data for processing
		this.messages = {}	// Store the current state of the messages
		this.variablesToUpdate = {} // Store the variables to update

		this.processReceivedData
		let validate = false

		if (this.config.host) {
			if (!isValidIPAddress(this.config.host)) {
				await resolveHostname(this, this.config.host)
					.then((ip) => {
						this.targetServer = ip
						validate = true
					})
					.catch((err) => {
						this.log('error', `Unable to resolve hostname for ${this.config.host}: ${err.message}`)
						this.updateStatus('bad_config')
						validate = false
					})
			} else {
				this.targetServer = this.config.host
				validate = true
			}
		}

		if (this.config.listen) {
			if (this.targetServer && (this.config.targetPort || this.config.feedbackPort)) {
				setupOSC(this)

				if (validate) {
					this.setupListeners()
				}
			}
		} else {
			this.updateStatus('ok')
		}

		updateActions(this) // export actions
		updateFeedbacks(this) // export feedback
		this.updateVariableDefinitions() // export variable definitions
		updatePresets(this) // export presets
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		if (this.client && this.client.isConnected()) {
			await this.client
				.closeConnection()
				.then(() => {
					this.client = null
				})
				.catch((err) => {
					this.log('error', `${this.config.protocol} close error: ${err.message}`)
				})
		}

		let validate = false

		if (!isValidIPAddress(this.config.host)) {
			await resolveHostname(this, this.config.host)
				.then((ip) => {
					this.targetServer = ip
					validate = true
				})
				.catch((err) => {
					this.log('error', `Unable to resolve hostname for ${this.config.host}: ${err.message}`)
					this.updateStatus('bad_config')
					validate = false
				})
		} else {
			this.targetServer = this.config.host
			validate = true
		}

		if (!validate) {
			return
		}

		setupOSC(this)

		this.setupListeners()
	}

	async setupListeners() {
		this.log('info', `Resetting Listeners..`)

		if (this.config.listen) {
			if (this.config.protocol && this.client && !this.client.isConnected()) {
				await this.client.openConnection().catch((err) => {
					this.log('error', err.message)
				})
			}
		} else {
			this.updateStatus('ok')
		}
	}

	
	async processReceivedData() {
		ProcessReceivedData(this)
	}
	
	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
	

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target Hostname or IP',
				width: 8,
				default: '192.168.10.10',
			},
			{
				type: 'textinput',
				id: 'targetPort',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
				default: '8000',
				isVisible: () => false,
			},
			{
				type: 'dropdown',
				id: 'protocol',
				label: 'Protocol',
				choices: [
					{ id: 'udp', label: 'UDP (Default)' },
					{ id: 'tcp', label: 'TCP' },
					{ id: 'tcp-raw', label: 'TCP (Raw)' },
				],
				default: 'udp',
				width: 4,
				isVisible: () => false,
			},
			{
				type: 'checkbox',
				id: 'listen',
				label: 'Listen for Feedback',
				width: 4,
				default: false,
			},
			{
				type: 'textinput',
				id: 'feedbackPort',
				label: 'Receive Port',
				width: 4,
				regex: Regex.PORT,
				default: '8001',
				isVisible: () => false,
			},
		]
	}
	

}
runEntrypoint(OSCInstance, UpgradeScripts)
// This is the entrypoint for the module. This is where the module should be initialized                                        

