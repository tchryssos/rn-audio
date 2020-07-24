import React, { useContext, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Slider, Icon, Text } from 'react-native-elements'
import { Player } from '@react-native-community/audio-toolkit'

import AudioContext from 'logic/contexts/audio'
import { store } from 'constants/data'
import secondsToTime from 'logic/utils/secondsToTime'

const styles = StyleSheet.create({
	player: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		bottom: 0,
		left: 0,
		width: '100%',
		paddingLeft: 8,
		paddingRight: 8,
		borderColor: 'black',
		borderTopWidth: 1,
	},
})

const Transport = () => {
	const { currentlyPlaying } = useContext(AudioContext)
	const currTrack = store[currentlyPlaying]
	const audioPlayerRef = useRef()

	useEffect(() => {
		audioPlayerRef.current?.destroy()
		if (currTrack) {
			audioPlayerRef.current = new Player(currTrack.audio, {
				continuesToPlayInBackground: true,
				mixWithOthers: true,
			})
			audioPlayerRef.current.play()
		}
		return () => audioPlayerRef.current?.destroy()
	}, [currTrack])

	if (currTrack) {
		const { title, artist } = currTrack
		return (
			<View style={styles.player}>
				<Text h4>{title}</Text>
				<Text>{artist}</Text>
				{/* <Text>{secondsToTime(Math.floor(duration / 1000))}</Text> */}
			</View>
		)
	}
	return null
}

export default Transport
