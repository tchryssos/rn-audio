import TrackPlayer from 'react-native-track-player'

export default async () => {
	const p = await TrackPlayer.getCurrentTrack()
	console.log('Current track: ', p)
	return p
}
