module.exports = function (self) {
	self.setVariableDefinitions([
	// Fullset of variable listed here for reference but only some implemented at this time
		{
			variableId: 'status',
			name: 'The status of the Media Player (0=Inital, 1=Play, 2=Stop, 3=Pause, 4=FadeIn2Play, 5=FadeOutToPause, 6=FadeOut2Stop, 7=FadeToNextLoop)',
		},
		{
			variableId: 'soundVolume',
			name: 'The current system volume (stored as float from 0.0 to 1.0)',
		},
		// {
		// 	variableId: 'volumeDefault',
		// 	name: 'The default value for system volume (0...100)',
		// },
		{
			variableId: 'soundMute',
			name: 'Whether sound is muted (1) or not (0)',
		},
		{
			variableId: 'stageLight',
			name: 'Whether stagelight is on (1) or off (0)',
		},
		{
			variableId: 'projectorsPower',
			name: 'Whether projectors are on (1) or off (0)',
		},
		{
			variableId: 'playlist',
			name: 'The name of the current playlist',
		},
		{
			variableId: 'playlistItem',
			name: 'The position of the current item in the current playlist\n (0 = first, 1, = second, etc.)',
		},
		{
			variableId: 'position',
			name: 'The playback position of the current item (0.0 = start ... 1.0 = end)',
		},
		// {
		// 	variableId: 'application',
		// 	name: 'The name of the current server application (Server, Calibrator, MediaPlayer, NDI)',
		// },
		// {
		// 	variableId: 'applicationId',
		// 	name: 'The ID of the current server application (1 = Server, 2 = Calibrator, 3 = Media Player, 4 = NDI)',
		// },
		// {
		// 	variableId: 'videoPlaneSize',
		// 	name: 'The size of the planar window in Planar capture mode (0.2 - 2.5 x dome radius)',
		// },
		// {
		// 	variableId: 'videoPlaneHeight',
		// 	name: 'The elevation planar window in Planar capture mode (0.0 - 1.0 x dome radius)',
		// },
		// {
		// 	variableId: 'videoPlaneRotation',
		// 	name: 'The tilt of the planar window in Planar capture mode (0º = vertical ... 90º = horiontal)',
		// },
		// {
		// 	variableId: 'videoEquiYaw',
		// 	name: 'The horizontal rotation of the image in Equirectangular capture mode (-180.0º...180.0º)',
		// },
		// {
		// 	variableId: 'videoEquiPitch',
		// 	name: 'The vertical rotation of the image in Equirectangular capture mode (-90.0º...90.0º)',
		// },
		// {
		// 	variableId: 'videoEquiLens',
		// 	name: 'The field of view in Equirectangular capture mode (0.0º...360.0º)',
		// },
		// {
		// 	variableId: 'externalSignalState',
		// 	name: 'The external signal state for hardware capture ("no signal" | resolution and frequency of signal)',
		// },
		{
			variableId: 'externalVideo',
			name: 'The mode for harware capture (0 = Off, 1 = Fisheye, 2 = Planar, 3 = Equirectangular)',
		},
		// {
		// 	variableId: 'ndiPlaneSize',
		// 	name: 'The size of the planar window in NDI Planar mode (0.2 - 2.5 x dome radius)',
		// },
		// {
		// 	variableId: 'ndiPlaneHeight',
		// 	name: 'The elevation of the planar window NDI Planar mode (0.0 - 1.0 x dome radius)',
		// },
		// {
		// 	variableId: 'ndiPlaneRotation',
		// 	name: 'The tilt of the planar window in NDI Planar mode (0º = vertical ... 90º = horiontal)',
		// },
		// {
		// 	variableId: 'ndiEquiYaw',
		// 	name: 'The horizontal rotation of the image in NDI Equirectangular (-180.0º...180.0º)',
		// },
		// {
		// 	variableId: 'ndiEquiPitch',
		// 	name: 'The vertical rotation of the image in NDI Equirectangular (-90.0º...90.0º)',
		// },
		// {
		// 	variableId: 'ndiEquiLens',
		// 	name: 'The field of view in  NDI Equirectangular mode (0.0º...360.0º)',
		// },
		// {
		// 	variableId: 'ndiSourceName',
		// 	name: 'The name of the currently connected source, or an empty string if no source is connected.',
		// },
		// {
		// 	variableId: 'ndiSourceUrl',
		// 	name: 'The URL of the currently connected source, or an empty string if no source is conncected',
		// },
		// {
		// 	variableId: 'ndiCaptureMode',
		// 	name: 'The mode of the external signal capture (0 = Off, 1 = Fisheye, 2 = Planar, 3 = Equirectangular)',
		// },
		// {
		// 	variableId: 'ndiStreamSetting',
		// 	name: 'The video stream settings or an empty string if video playback is turned off or not available',
		// },
		// {
		// 	variableId: 'ndiSources',
		// 	name: 'The number of available NDI sources',
		// },
		// {
		// 	variableId: 'storageTotal',
		// 	name: 'Disk space on the server in bytes',
		// },
	])
}
