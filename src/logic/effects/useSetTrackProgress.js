import clamp from 'ramda/src/clamp'
import { useEffect } from 'react'

export default (
	trackProgress, trackDuration, startTime,
	setPlayPercent, trackPlaying,
) => {
	useEffect(() => {
		let animation
		if (trackPlaying) {
			animation = window.requestAnimationFrame(() => {
				const trackProgressPerc = (
					((Date.now() - startTime) / 1000) * 100
				) / trackDuration
				setPlayPercent(
					clamp(
						0, 100,
						trackProgressPerc,
					) / 100,
				)
			})
		}
		if (startTime === 0) {
			animation = window.requestAnimationFrame(() => setPlayPercent(0))
		}
		return () => {
			window.cancelAnimationFrame(animation)
		}
	}, [
		trackPlaying,
		trackDuration,
		startTime,
		trackProgress,
		setPlayPercent,
	])
}
