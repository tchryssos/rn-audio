import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Slider, Icon, Text } from 'react-native-elements'

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

const Player = () => {
	const { currentlyPlaying } = useContext(AudioContext)
	const currTrack = store[currentlyPlaying]
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

export default Player
