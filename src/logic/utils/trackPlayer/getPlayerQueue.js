import TrackPlayer from 'react-native-track-player'

const getPlayerQueue = async () => {
	const q = await TrackPlayer.getQueue()
	console.log('Player queue: ', q)
	return q
}