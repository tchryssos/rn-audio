export default async (TrackPlayer) => {
	const p = await TrackPlayer.getCurrentTrack()
	return p
}
