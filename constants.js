const { combineRgb } = require('@companion-module/base')

// Fulldome.pro constants
const ON_OFF_AS_INT = '/^(0|1)$/i'
exports.ON_OFF_AS_INT = ON_OFF_AS_INT
const VIDEOMODES = '/^(0|1|2|3)$/i'
exports.VIDEOMODES = VIDEOMODES
const pathOSC = {
	// OUTGOING MESSAGE PATHS

	GetResponderID: '/@/1',

	// // 1 - Server
	Exit: '/@1/3',
	Restart: '/@1/4',
	Shutdown: '/@1/9',
	SetStageLight: '/@1/7',
	SetProjectorsPower: '/@1/31',
	SetSoundVolume: '/@1/41',
	SetSoundMuting: '/@1/42',
	SetExternalVideo: '/@1/51',
	SetVideoPlaneSize: '/@1/60',
	SetVideoPlaneHeight: '/@1/61',
	SetVideoPlaneRotation: '/@1/62',
	SetVideoEquiYaw: '/@1/63',
	SetVideoEquiPitch: '/@1/64',
	SetVideoEquiLens: '/@1/65',

	// 2 - Calibrator
	ShowTestPattern: '/@2/330',
	HideTestPattern: '/@2/340',

	// 3 - MediaPlayer
	// Playback Control
	Play: '/@3/10',
	PlayItem: '/@3/20',
	Stop: '/@3/30',
	Pause: '/@3/40',
	Seek: '/@3/50',

	// 4 - NDI Protocol
	SetNdiState: '/@4/20',

	// INCOMING MESSAGE PATHS

	AlivePacket: '/@',
	ResponderID: '/@/1',

	// 1 - Server
	ServerStatus: '/@1/100',
	ServerStatusNew: '/@1/101',
	UserList: '/@1/102',
	Time: '/@1/103',
	Exiting: '/@1/110',

	// 2 - Calibrator
	CalibratorStatus: '/@2/20',
	CalibrationNames: '/@2/120',
	ServerImageUpdated: '/@2/220',
	TestPatternNames: '/@2/320',
	ErrorMsg: '/@2/410',
	WarningMsg: '/@2/420',
	Parameters: '/@2/520',
	CalibrationBackupNames: '/@2/620',
	SetCustomMaskResult: '/@2/720',
	DropCustomMaskResult: '/@2/740',
	Cameras: '/@2/820',

	// 3 - Media Player
	MediaPlayerStatus: '/@3/1000',
	MediaUuidList: '/@3/1010',
	MediaData: '/@3/1020',
	LicenseUuidList: '/@3/1030',
	LicenseData: '/@3/1040',
	PlaylistNameList: '/@3/1050',
	Playlist: '/@3/1060',

	// 4 - NDI Protocol
	NdiStatus: '/@4/1000',
}
exports.pathOSC = pathOSC
const stageLight = {
	Off: 0,
	On: 1,
}
exports.stageLight = stageLight
const projectorsPower = {
	Off: 0,
	On: 1,
}
exports.projectorsPower = projectorsPower
const soundMuting = {
	Off: 0,
	On: 1,
}
exports.soundMuting = soundMuting
const VideoMode = {
	Off: 0,
	Fisheye: 1,
	Planar: 2,
	Equirectangular: 3,
}
exports.VideoMode = VideoMode
const YawAngle = {
	Min: -180,
	Max: 180,
	Step: 0.1,
}
exports.YawAngle = YawAngle
const PitchAngle = {
	Min: -90,
	Max: 90,
	Step: 0.1,
}
exports.PitchAngle = PitchAngle
const LensAngle = {
	Min: 0,
	Max: 360,
	Step: 0.1,
}
exports.LensAngle = LensAngle
const PlaneSize = {
	Min: 0.2,
	Max: 2.5,
	Step: 0.01,
}
exports.PlaneSize = PlaneSize
const PlaneHeight = {
	Min: 0,
	Max: 1,
	Step: 0.01,
}
exports.PlaneHeight = PlaneHeight
const PlaneRotation = {
	Min: 0,
	Max: 90,
	Step: 0.5,
}
exports.PlaneRotation = PlaneRotation
const PlayerStatus = {
	Initial: 0,
	Play: 1,
	Stop: 2,
	Pause: 3,
	FadeIn2Play: 4,
	FadeOut2Pause: 5,
	FadeOut2Stop: 6,
	FadeToNextLoop: 7,
}
exports.PlayerStatus = PlayerStatus
const Colors = {
	RED: combineRgb(255, 0, 0),
	GREEN: combineRgb(0, 204, 0),
	BLUE: combineRgb(0, 51, 204),
	YELLOW: combineRgb(255, 255, 0),
	PURPLE: combineRgb(255, 0, 255),
	BLACK: combineRgb(0, 0, 0),
	WHITE: combineRgb(255, 255, 255),
}
exports.Colors = Colors
// /@1/100 ServerStatus message structure
const messageStructures = {
	'/@1/100': [
		null, // 'userUUID',
		null, //'application',
		null, //'applicationId',
		'projectorsPower',
		'stageLight',
		'soundVolume',
		'soundMute',
		'externalVideo',
		null, // 'videoPlaneSize',
		null, //'videoPlaneHeight',
		null, // 'videoPlaneRotation',
		null, //'externalSignalState',
	],
	'/@1/101': [
		null, // 'userUUID',
		null, //'application',
		null, //'applicationId',
		'projectorsPower',
		'stageLight',
		'soundVolume',
		'soundMute',
		'externalVideo',
		null, // 'videoPlaneSize',
		null, //'videoPlaneHeight',
		null, // 'videoPlaneRotation',
		null, //'videoEquiYaw',
		null, //'videoEquiPitch',
		null, //'videoEquiLens',
		null, //'externalSignalState',
	],
	'/@3/1000': [
		'status',
		'playlist',
		'playlistItem',
		'position',
		// ignore these for now
		null, // 'storageTotal',
		null, // 'storageFree',
		null, // 'licenseExpirationTimestamp' ,
		null, // 'oldestSessionTimeStamp',
	],
}
exports.messageStructures = messageStructures
