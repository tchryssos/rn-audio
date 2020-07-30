export default async (TrackPlayer) => {
	const q = await TrackPlayer.getQueue()
	return q
}