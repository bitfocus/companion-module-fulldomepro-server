const { messageStructures } = require('./constants')

// Process the queued data (messages) received from the OSC server
// usually there would only be one item in the queue, but there could be more
function ProcessReceivedData(self) {
	// self.log('info', `Processing received data: Items - ${Object.keys(self.onDataReceived).length}`)
	let changes = false
	// Iterate over the queue
	for (const [path, args] of Object.entries(self.onDataReceived)) {
		// self.log('info', `${path}: ${args}`)
		if (messageStructures[path] && parseMessage(self, path, args)) {
			// message included changes so update the local storage for this path
			changes = true
			self.messages[path] = args
			// Object.defineProperty(self.messages, `'${path}'`, { value: args })
		}
		delete self.onDataReceived[path]
		// self.log('info', `Processed data: Items remaining - ${Object.keys(self.onDataReceived).length}`)
	}
	// self.log('info', `Variables to update - ${Object.keys(self.variablesToUpdate).length}`)
	// If there were changes, update the variables
	if (changes) {
		self.setVariableValues(self.variablesToUpdate)
		self.variablesToUpdate = {}
	}
	//  self.log('info', `OSC paths found - ${Object.keys(self.messages).length}`)
}
module.exports = { ProcessReceivedData }

function parseMessage(context, path, args) {
	// context.log('info', `Parsing message: ${path}`)
	let changes = false
	const argsNum = messageStructures[path].length
	// context.log('info', `Arguments to process: ${argsNum}`)
	for (let i = 0; i < argsNum; i++) {
		const variableName = messageStructures[path][i]
		const variableValue = args[i]
		if (variableName !== null) {
			// context.log('info', `Found variable to process: ${variableName} = ${variableValue}`)
			// message argument is one  we want to expose
			if (!Object.keys(context.messages).includes(path) || context.messages[path][i] !== variableValue) {
				// we haven't seen this messsage path before or variable value has changed so add it to the variables to be updated
				context.variablesToUpdate[variableName] = variableValue
				context.checkFeedbacks(variableName)
				changes = true
			}
		}
	}
	return changes
}
