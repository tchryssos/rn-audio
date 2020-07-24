import { createContext } from 'react'

const AudioContext = createContext({
	currentlyPlaying: null,
	setCurrentlyPlaying: () => {},
})

export default AudioContext
