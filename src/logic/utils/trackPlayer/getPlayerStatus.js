import { statusLegend } from 'constants/trackPlayer'

export default async (TrackPlayer) => {
	const s = await TrackPlayer.getState()
	// console.log('Player status: ', statusLegend[s])
	return statusLegend[s]
}