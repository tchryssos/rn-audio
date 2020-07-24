import React, { useContext, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Slider, Icon, Text } from 'react-native-elements'
import { Player } from '@react-native-community/audio-toolkit'

import AudioContext from 'logic/contexts/audio'
import { store } from 'constants/data'

const styles = StyleSheet.create({
	player: {
		position: 'absolute',
		display: 'flex',
		bottom: 0,
		left: 0,
		width: '100%',
	},
})

const Transport = () => {
	const { currentlyPlaying } = useContext(AudioContext)
	const currTrack = store[currentlyPlaying]
	const audioPlayerRef = useRef()

	useEffect(() => {
		audioPlayerRef.current?.destroy()
		if (currTrack) {
			audioPlayerRef.current = new Player(currTrack.audio)
			audioPlayerRef.current.play()
		}
		return () => audioPlayerRef.current?.destroy()
	}, [currTrack])

	if (currTrack) {
		const { title } = currTrack
		return (
			<View style={styles.player}>
				<Text>{title}</Text>
			</View>
		)
	}
	return null
}

export default Transport
