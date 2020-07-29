import TrackPlayer from 'react-native-track-player'
import { statusLegend } from 'constants/trackPlayer'

export default async () => {
	const s = await TrackPlayer.getState()
	console.log('Player status: ', statusLegend[s])
	return s
}