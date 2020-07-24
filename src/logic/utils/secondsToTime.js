import trimTimeString from 'logic/utils/trimTimeString'

const pad = (n) => (n < 10 ? `0${n}` : n)

export default (seconds) => {
	let remainingSeconds = seconds
	const hours = Math.floor(remainingSeconds / 3600)
	if (hours) {
		remainingSeconds -= (3600 * hours)
	}

	const minutes = Math.floor(remainingSeconds / 60)
	if (minutes) {
		remainingSeconds -= (60 * minutes)
	}

	return trimTimeString(`${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`)
}
