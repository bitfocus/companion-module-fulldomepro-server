const { Regex } = require('@companion-module/base')
const { massageValue, isPlaying } = require('./helpers.js')
const {
	pathOSC,
	stageLight,
	// ON_OFF_AS_INT,
	soundMuting,
	// projectorsPower,
	VideoMode,
    projectorsPower,
	// PlaneSize,
	// PlaneHeight,
	// PlaneRotation,
	// YawAngle,
	// LensAngle,
} = require('./constants.js')

function updateActions(self) {
    const sendOscMessage = async (path, args) => {
        self.log('debug', `Sending OSC [${self.config.protocol}] ${self.targetServer}:${self.config.targetPort} ${path}`)
        self.log('debug', `Sending Args ${JSON.stringify(args)}`)

        if (self.config.protocol === 'udp') {
            self.oscSend(self.targetServer, self.config.targetPort, path, args)
        } else {
            await self.client
                .sendCommand(path, args)
                .then(() => {
                    self.log(
                        'info',
                        `${self.config.protocol} Command sent successfully. Path: ${path}, Args: ${JSON.stringify(args)}`,
                    )
                })
                .catch((err) => {
                    self.log('error', `Failed to send ${self.config.protocol} command:`, err.message)
                })
        }
    }
    self.setActionDefinitions({
        // Media Player
        send_PlayPause_Tgl: {
            name: 'Playback: Play/Pause Toggle',
            description: 'Play or Pause the currently selected video.',
            options: [],
            callback: async () => {
                const state = self.getVariableValue('status')
                if (isPlaying(state)) {
                    sendOscMessage(pathOSC.Pause, [])
                } else {
                    sendOscMessage(pathOSC.Play, [])
                }
            },
        },
        send_Play: {
            name: 'Playback: Play',
            description: 'Starts playing the currently selected video.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.Play, [])
            },
        },
        send_PlayItem: {
            name: 'Playback: Play Item',
            description: 'Starts playing a video from the specified playlist.',
            options: [
                {
                    type: 'textinput',
                    label: 'Playlist',
                    id: 'playlist',
                    default: 'Playlist Name',
                    useVariables: false,
                },
                {
                    type: 'textinput',
                    label: 'Playlist Item',
                    id: 'playlistItem',
                    default: '0',
                    regex: Regex.NUMBER,
                    useVariables: false,
                },
            ],
            callback: async (event) => {
                const playlist = await self.parseVariablesInString(event.options.playlist)
                const playlistItem = await self.parseVariablesInString(event.options.playlistItem)

                sendOscMessage(pathOSC.PlayItem, [
                    {
                        type: 's',
                        value: '' + playlist,
                    },
                    {
                        type: 'i',
                        value: parseInt(playlistItem),
                    },
                ])
            },
        },
        send_Stop: {
            name: 'Playback: Stop',
            description: 'Stops playback.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.Stop, [])
            },
        },
        send_Pause: {
            name: 'Playback: Pause',
            description: 'Pauses the playback.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.Pause, [])
            },
        },
        send_Seek: {
            name: 'Playback: Seek',
            description: 'Seeks to a specific position in the video.',
            options: [
                {
                    type: 'textinput',
                    label: 'Position',
                    id: 'position',
                    default: '0.5',
                    regex: Regex.FLOAT_OR_INT,
                    useVariables: true,
                },
            ],
            callback: async (event) => {
                const position = await self.parseVariablesInString(event.options.position)

                sendOscMessage(pathOSC.Seek, [
                    {
                        type: 'f',
                        value: massageValue(parseFloat(position), 0, 0.995),
                    },
                ])
            },
        },
        send_SkipFwd: {
            name: 'Playback: Seek Forward',
            description: 'Seeks forward by 1/10 of show.',
            options: [],
            callback: async () => {
                const seekPoint = massageValue(parseFloat(self.getVariableValue('position')) + 0.1, 0, 1.0)
                sendOscMessage(pathOSC.Seek, [
                    {
                        type: 'f',
                        value: seekPoint
                    }
                ])
            },
        },
        send_SkipRew: {
            name: 'Playback: Seek Backward',
            description: 'Seeks backward by 1/10 of show.',
            options: [],
            callback: async () => {
                const seekPoint = massageValue(parseFloat(self.getVariableValue('position')) - 0.1, 0, 1.0)
                sendOscMessage(pathOSC.Seek, [
                    {
                        type: 'f',
                        value: seekPoint
                    }
                ])
            },
        },
        send_SkipNext: {
            name: 'Playback: Seek Next',
            description: 'Seeks to the next video in the playlist.',
            options: [],
            callback: async () => {
                const playlist = self.getVariableValue('playlist')
                const playlistItem = self.getVariableValue('playlistItem') + 1
                sendOscMessage(pathOSC.PlayItem, [
                    {
                        type: 's',
                        value: playlist,
                    },
                    {
                        type: 'i',
                        value: playlistItem,
                    },
                ])
            },
        },
        send_SkipPrevious: {
            name: 'Playback: Seek Previous',
            description: 'Seeks to the previous video in the playlist.',
            options: [],
            callback: async () => {
                const playlist = self.getVariableValue('playlist')
                const playlistItem = self.getVariableValue('playlistItem') - 1
                sendOscMessage(pathOSC.PlayItem, [
                    {
                        type: 's',
                        value: playlist,
                    },
                    {
                        type: 'i',
                        value: playlistItem >= 0 ? playlistItem : 0,
                    },
                ])
            },
        },
        // Stagelight
        send_StageLight_Tgl: {
            name: 'Stagelight: Toggle',
            description: 'Toggles the stagelight on/off.',
            options: [],
            callback: async () => {            
                sendOscMessage(pathOSC.SetStageLight, [
                    {
                        type: 'i',
                        value: !self.getVariableValue('stageLight')
                    },
                ])
            },
        },
        send_StageLight_On: {
            name: 'Stagelight: ON',
            description: 'Turns the stagelight on.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetStageLight, [
                    {
                        type: 'i',
                        value: stageLight.On,
                    },
                ])
            },
        },
        send_StageLight_Off: {
            name: 'Stagelight: OFF',
            description: 'Turns the stagelight off.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetStageLight, [{
                        type: 'i',
                        value: stageLight.Off,
                    },
                ])
            },
        },
        // Sound
        send_SoundMuting_Tgl: {
            name: 'Sound: Mute Toggle',
            description: 'Mutes the sound.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetSoundMuting, [
                    {
                        type: 'i',
                        value: !self.getVariableValue('soundMute'),
                    },
                ])
            },
        },
        send_SoundMuting_On: {
            name: 'Sound: Mute ON',
            description: 'Mutes the sound.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetSoundMuting, [
                    {
                        type: 'i',
                        value: soundMuting.On,
                    },
                ])
            },
        },
        send_SoundMuting_Off: {
            name: 'Sound: Mute OFF',
            description: 'Unmutes the sound.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetSoundMuting, [
                    {
                        type: 'i',
                        value: soundMuting.Off,
                    },
                ])
            },
        },
        send_SoundVolume: {
            name: 'Sound: Volume set',
            description: 'Sets the sound volume to a specific value.',
            options: [
                {
                    type: 'textinput',
                    label: 'Volume',
                    id: 'volume',
                    default: '20',
                    regex: Regex.FLOAT_OR_INT,
                    useVariables: true,
                },
            ],
            callback: async (event) => {
                const volume = await self.parseVariablesInString(event.options.volume)

                sendOscMessage(pathOSC.SetSoundVolume, [
                    {
                        type: 'f',
                        value: (massageValue(parseFloat(volume), 0, 100) / 100).toFixed(2),
                    },
                ])
            },
        },
        send_SoundVolumeUp: {
            name: 'Sound: Volume Up',
            description: 'Increases the sound volume by 1/100',
            options: [],
            callback: async () => {
                const volume = self.getVariableValue('soundVolume') + 0.01
                sendOscMessage(pathOSC.SetSoundVolume, [
                    {
                        type: 'f',
                        value: volume <= 1.0 ? volume : 1.0,
                    },
                ])
            },
        },
        send_SoundVolumeDown: {
            name: 'Sound: Volume Down',
            description: 'Decreases the sound volume by 1/100',
            options: [],
            callback: async () => {
                const volume = self.getVariableValue('soundVolume') - 0.01
                sendOscMessage(pathOSC.SetSoundVolume, [
                    {
                        type: 'f',
                        value: volume >= 0.0 ? volume : 0.0,
                    },
                ])
            }
        },
        // Test Patterns
        send_TestPatternHide: {
            name: 'Test Pattern: Hide',
            description: 'Hides the test pattern.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.HideTestPattern, [])
            },
        },
        send_TestPatternShowFromList: {
            name: 'Test Pattern: Show selected pattern',
            description: 'Shows the selected test pattern.',
            options: [{
                type: 'dropdown',
                label: 'Test Pattern',
                id: 'testPattern',
                default: 'Geometry1',
                choices: [
                    { id: 'WhiteNoBlends', label: 'White No Blends' },
                    { id: 'Illuminance', label: 'Illuminance' },
                    { id: 'Numbers', label: 'Numbers' },
                    { id: 'Geometry1', label: 'Geometry 1' },
                    { id: 'Geometry2', label: 'Geometry 2' },
                    { id: 'White', label: 'White' },
                    { id: 'Red', label: 'Red' },
                    { id: 'Green', label: 'Green' },
                    { id: 'Blue', label: 'Blue' },
                    { id: 'Grid4K.png', label: 'Grid 4K Black' },
                    { id: 'GridW4K.png', label: 'Grid 4K White' },

                ],
                useVariables: false,
            },
        ],
            callback: async (event) => {
                sendOscMessage(pathOSC.ShowTestPattern, [
                    {
                        type: 's',
                        value: event.options.testPattern,
                    },
                ])
            },
        },
        send_TestPatternShow: {
            name: 'Test Pattern: Show',
            description: 'Shows the named test pattern.',
            options: [{
                type: 'textinput',
                label: 'Test Pattern',
                id: 'testPattern',
                default: 'Numbers',
                useVariables: false,
            },
        ],
            callback: async (event) => {
                sendOscMessage(pathOSC.ShowTestPattern, [
                    {
                        type: 's',
                        value: event.options.testPattern,
                    },
                ])
            },
        },

        // External Video
        send_SetVideoMode: {
            name: 'Video Mode: Set',
            description: 'Sets the video mode to the specified value.',
            options: [
                {
                    type: 'dropdown',
                    label: 'Video Mode',
                    id: 'videoMode',
                    default: '0',
                    choices: [
                        { id: VideoMode.Off, label: 'Off' },
                        { id: VideoMode.Fisheye, label: 'Fisheye' },
                        { id: VideoMode.Planar, label: 'Planar' },
                        { id: VideoMode.Equirectangular, label: 'Equirectangular' },
                    ],
                    useVariables: false,
                },
            ],
            callback: async (event) => {
                sendOscMessage(pathOSC.SetExternalVideo, [
                    {
                        type: 'i',
                        value: event.options.videoMode,
                    },
                ])
            },
        },
        // Projectors
        send_ProjectorsPower_Tgl: {
            name: 'Projectors: Power Toggle',
            description: 'Toggles the projectors power on/off.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetProjectorsPower, [
                    {
                        type: 'i',
                        value: !self.getVariableValue('projectorsPower'),
                    },
                ])
            },
        }, 
        send_ProjectorsPower_On: {
            name: 'Projectors: Power ON',
            description: 'Turns the projectors on.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetProjectorsPower, [
                    {
                        type: 'i',
                        value: projectorsPower.On,
                    },
                ])
            },
        },
        send_ProjectorsPower_Off: {
            name: 'Projectors: Power OFF',
            description: 'Turns the projectors off.',
            options: [],
            callback: async () => {
                sendOscMessage(pathOSC.SetProjectorsPower, [
                    {
                        type: 'i',
                        value: projectorsPower.Off,
                    },
                ])
            },
        },

        // Server
        send_Shutdown: {
            name: 'Server: Shutdown ',
            description: 'Shuts down the server.',
            options: [{
                    id: 'warnShutdown',
                    type: 'static-text',
                    label: 'Warning!',
                    value: 'This will shutdown the server application. \nTo restart press the power button on the server.',
                },
            ],
            callback: async () => {
                sendOscMessage(pathOSC.Shutdown, [])
            },
        },
        send_Restart: {
            name: 'Server: Restart Application',
            description: 'Restarts the server application.',
            options: [{
                id: 'warnRestart',
                type: 'static-text',
                label: 'Warning!',
                value: 'This will interrupt playback and return server to startup state.',
            },
        ],
            callback: async () => {
                sendOscMessage(pathOSC.Restart, [])
            },
        },
    })
}
module.exports = { updateActions }