const { PlayerStatus, Colors } = require('./constants.js')
const { button } = require('./buttons.js')

function updateFeedbacks(self) {
    self.setFeedbackDefinitions({
        status: {
            type: 'advanced',
            name: 'Content Playing',
            description: 'Change button color based on the current status of the media player',
            options: [],
            callback: (() => {
                // This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
                const playerState = self.getVariableValue('status')
                switch (playerState) {
                    case PlayerStatus.Play:
                    case PlayerStatus.FadeIn2Play:
                    case PlayerStatus.FadeOut2Stop:
                    case PlayerStatus.FadeToNextLoop:
                        return {
                            bgcolor: Colors.YELLOW,
                            color: Colors.BLACK,
                            png64: button.pause_k,
                        }
                    case PlayerStatus.Initial:
                    case PlayerStatus.Stop:
                    case PlayerStatus.Pause:
                    case PlayerStatus.FadeOut2Pause:
                    default:
                        return {
                            bgcolor: Colors.GREEN,
                            color: Colors.BLACK,
                            png64: button.play_k
                        }
                }
            })
        },
        stageLight: {
            type: 'advanced',
            name: 'Stagelight',
            description: 'Change button color based on the current status of the stagelight',
            options: [],
            callback: (() => {
                // This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
                if (self.getVariableValue('stageLight')) {
                    return {
                        bgcolor: Colors.YELLOW,
                        png64: button.stagelightlight,
                    }
                } else {
                    return {
                        bgcolor: Colors.BLACK,
                        png64: button.stagelightlight,
                    }
                }
            })
        },
        soundMute: {
            type: 'advanced',
            name: 'Sound Mute',
            description: 'Change button based on the current status of the sound mute',
            options: [],
            callback: (() => {
                // This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
                if (self.getVariableValue('soundMute')) {
                    return {
                        bgcolor: Colors.RED,
                        png64: button.unmute
                    }
                } else {
                    return {
                        bgcolor: Colors.BLACK,
                        png64: button.mute,
                    }
                }
            })
        },
        projectorsPower: {
            type: 'advanced',
            name: 'Projectors Power',
            description: 'Change button color and text based on the current status of the projectors power',
            options: [],
            callback: (() => {
        // This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
                if(self.getVariableValue('projectorsPower')) {
                    return {
                        bgcolor: Colors.RED,
                        color: Colors.WHITE,
                        text: 'Turn\nProjectors\nOFF',
                        size: '14',
                    }
                } else {
                    return {
                        bgcolor: Colors.WHITE,
                        color: Colors.BLACK,
                        text: 'Turn\nProjectors\nON',
                        size: '14'
                    }
                }
            })
        },
    })
}
module.exports = { updateFeedbacks }