import { createContext } from 'react'

const AudioContext = createContext({
	currentlyPlaying: 0,
	setCurrentlyPlaying: () => {},
	queue: [],
	setQueue: () => {},
	queuePosition: 0,
	setQueuePosition: () => {},
})

export default AudioContext
