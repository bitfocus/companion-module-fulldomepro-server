const { button } = require('./buttons.js')
const { VideoMode, Colors } = require('./constants.js')

function updatePresets(self) {
	self.setPresetDefinitions({
		// Media Player
		playPause_tgl: {
			type: 'button',
			category: 'Media Player',
			name: 'Play/Pause',
			style: {
				png64: button.play_pause_tgl,
				color: Colors.BLACK,
				bgcolor: Colors.GREEN,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_PlayPause_Tgl',
							headline: 'Play or Pause the currently selected content',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'status',
				},
			],
		},
		play: {
			type: 'button',
			category: 'Media Player',
			name: 'Play',
			style: {
				png64: button.play_k,
				color: Colors.BLACK,
				bgcolor: Colors.GREEN,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_Play',
							headline: 'Play the currently selected content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		pause: {
			type: 'button',
			category: 'Media Player',
			name: 'Pause',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.YELLOW,
				png64: button.pause_k,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_Pause',
							headline: 'Pause the currently playing content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		stop: {
			type: 'button',
			category: 'Media Player',
			name: 'Stop',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.RED,
				png64: button.stop_k,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_Stop',
							headline: 'Stop the currently playing content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		next: {
			type: 'button',
			category: 'Media Player',
			name: 'Next',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.BLUE,
				png64: button.next_k,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SkipNext',
							headline: 'Play the next content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		prev: {
			type: 'button',
			category: 'Media Player',
			name: 'Previous',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.BLUE,
				png64: button.prev_k,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SkipPrevious',
							headline: 'Play the previous content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		rew: {
			type: 'button',
			category: 'Media Player',
			name: 'Rewind',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.PURPLE,
				png64: button.frew_k,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SkipRew',
							headline: 'Rewind the content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		fwd: {
			type: 'button',
			category: 'Media Player',
			name: 'Fast Forward',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.PURPLE,
				png64: button.ffwd_k,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SkipFwd',
							headline: 'Fast forward the content',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Projectors
		projectorsPower_tgl: {
			type: 'button',
			category: 'Projectors',
			name: 'Projectors Power Toggle',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
				text: 'Projectors\nPower\nON/OFF',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_ProjectorsPower_Tgl',
							headline: 'Toggle the projectors power',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'projectorsPower',
				},
			],
		},
		//Stagelight
		stageLight_tgl: {
			type: 'button',
			category: 'Stagelight',
			name: 'Stagelight Toggle',
			style: {
				color: Colors.BLACK,
				png64: button.stagelight_tgl,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_StageLight_Tgl',
							headline: 'Toggle the stagelight',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'stageLight',
				},
			],
		},
		stageLightOn: {
			type: 'button',
			category: 'Stagelight',
			name: 'Stage Light On',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.YELLOW,
				png64: button.stagelight,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_StageLight_On',
							headline: 'Turn the stage light on',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		stageLightOff: {
			type: 'button',
			category: 'Stagelight',
			name: 'Stage Light Off',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.BLACK,
				png64: button.stagelight,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_StageLight_Off',
							headline: 'Turn the stage light off',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Sound
		volumeRotary: {
			type: 'button',
			category: 'Sound',
			name: 'Volume Rotary',
			options: {
				rotaryActions: true,
			},
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.vol_rotary,
			},
			steps: [
				{
					rotate_left: [
						{
							headline: 'Decrease',
							actionId: 'send_SoundVolumeDown',
						},
					],
					rotate_right: [
						{
							headline: 'Increase',
							actionId: 'send_SoundVolumeUp',
						},
					],
				},
			],
			feedbacks: [],
		},

		volumeUp: {
			type: 'button',
			category: 'Sound',
			name: 'Volume Up',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.volup,
				text: '+',
				size: '30',
				alignment: 'right:top',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SoundVolumeUp',
							headline: 'Increase the volume',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		volumeDown: {
			type: 'button',
			category: 'Sound',
			name: 'Volume Down',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.voldown,
				text: '-',
				size: '30',
				alignment: 'right:top',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SoundVolumeDown',
							headline: 'Decrease the volume',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		mute_tgl: {
			type: 'button',
			category: 'Sound',
			name: 'Mute toggle',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.mute_tgl,
				text: 'round($(fdp:soundVolume) * 100)',
				textExpression: true,
				alignment: 'right:top',
				size: '18',
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_SoundMuting_Tgl',
							headline: 'Mute/Unmute the sound',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'soundMute',
				},
			],
		},
		mute: {
			type: 'button',
			category: 'Sound',
			name: 'Mute',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.mute,
				text: 'round($(fdp:soundVolume) * 100)',
				textExpression: true,
				alignment: 'right:top',
				size: '18',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SoundMuting_On',
							headline: 'Mute the sound',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		unmute: {
			type: 'button',
			category: 'Sound',
			name: 'Unmute',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.unmute,
				text: 'round($(fdp:soundVolume) * 100)',
				textExpression: true,
				alignment: 'right:top',
				size: '18',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SoundMuting_Off',
							headline: 'Unmute the sound',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Test Patterns
		testPatternHide: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Hide Test Pattern',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				text: 'Hide Test\nPattern',
				size: 'auto',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowWhiteNoBlends: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show White No Blends test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_wnb,
				text: 'White No\nBlends',
				size: '12',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the White No Blends test pattern',
							options: {
								testPattern: 'WhiteNoBlends',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowNumbers: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Numbers test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_num,
				text: 'Numbers',
				size: '12',
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Numbers test pattern',
							options: {
								testPattern: 'Numbers',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowIlluminance: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Illuminance test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_illum,
				text: 'Illuminance',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Illuminance test pattern',
							options: {
								testPattern: 'Illuminance',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowGeometry1: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Geometry 1 test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_geo1,
				text: 'Geometry\n1',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Geometry 1 test pattern',
							options: {
								testPattern: 'Geometry 1',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowGeometry2: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Geometry 2 test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_geo2,
				text: 'Geometry\n2',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Geometry 2 test pattern',
							options: {
								testPattern: 'Geometry2',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowGrid4KBlack: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Grid 4K Black test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_grid_k,
				text: 'Grid 4K\nBlack',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Grid 4K Black test pattern',
							options: {
								testPattern: 'Grid4K.png',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowGrid4KWhite: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Grid 4K White test pattern',
			style: {
				color: Colors.RED,
				bgcolor: Colors.BLACK,
				png64: button.test_grid_w,
				text: 'Grid 4K\nWhite',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Grid 4K White test pattern',
							options: {
								testPattern: 'GridW4K.png',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowWhite: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show White test pattern',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.WHITE,
				png64: button.test_w,
				text: 'White',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the White test pattern',
							options: {
								testPattern: 'White',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowRed: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Red test pattern',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.RED,
				png64: button.test_r,
				text: 'Red',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Red test pattern',
							options: {
								testPattern: 'Red',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowGreen: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Green test pattern',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.GREEN,
				png64: button.test_g,
				text: 'Green',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Green test pattern',
							options: {
								testPattern: 'Green',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		testPatternShowBlue: {
			type: 'button',
			category: 'Test Patterns',
			name: 'Show Blue test pattern',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLUE,
				png64: button.test_b,
				text: 'Blue',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternShow',
							headline: 'Display the Blue test pattern',
							options: {
								testPattern: 'Blue',
							},
						},
					],
					up: [],
				},
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_TestPatternHide',
							headline: 'Display the test pattern',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Video Capture
		videoCaptureModeOff: {
			type: 'button',
			category: 'Video Capture',
			name: 'Video Capture Mode OFF',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.videoOff,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SetVideoMode',
							headline: 'Turn video capture off',
							options: {
								videoMode: VideoMode.Off,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		videoCaptureModePlanar: {
			type: 'button',
			category: 'Video Capture',
			name: 'Video Capture Mode Planar',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.videoPlanar,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SetVideoMode',
							headline: 'Turn on Planar video capture',
							options: {
								videoMode: VideoMode.Planar,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		videoCaptureModeFisheye: {
			type: 'button',
			category: 'Video Capture',
			name: 'Video Capture Mode Fisheye',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.videoFisheye,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SetVideoMode',
							headline: 'Turn on Fisheye video capture',
							options: {
								videoMode: VideoMode.Fisheye,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		videoCaptureModeEquirectangular: {
			type: 'button',
			category: 'Video Capture',
			name: 'Video Capture Mode Equirectangular',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.BLACK,
				png64: button.videoEquirect,
			},
			steps: [
				{
					down: [
						{
							// add an action on down press
							actionId: 'send_SetVideoMode',
							headline: 'Turn on Equirectangular video capture',
							options: {
								videoMode: VideoMode.Equirectangular,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Server
		shutdown: {
			type: 'button',
			category: 'Server',
			name: 'Shutdown Server',
			style: {
				color: Colors.BLACK,
				bgcolor: Colors.RED,
				png64: button.pwroff_k,
				text: 'Shutdown',
				size: 12,
				alignment: 'center:bottom',
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_Shutdown',
							headline: 'Shutdown the server',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		restart: {
			type: 'button',
			category: 'Server',
			name: 'Restart Server Application',
			style: {
				color: Colors.WHITE,
				bgcolor: Colors.RED,
				png64: button.restart_k,
				text: 'Restart\nServer\nApp',
				size: 12,
			},
			steps: [
				{
					down: [
						{
							actionId: 'send_Restart',
							headline: 'Shutdown the server application',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	})
}
module.exports = { updatePresets }
