import React, {
	useContext, useEffect, useRef, useState,
} from 'react'
import { View, StyleSheet } from 'react-native'
import {
	Slider, Icon, Text, Button,
} from 'react-native-elements'
import { Player } from '@react-native-community/audio-toolkit'
import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'

import AudioContext from 'logic/contexts/audio'
import { store } from 'constants/data'
import secondsToTime from 'logic/utils/secondsToTime'
import useSetTrackProgress from 'logic/effects/useSetTrackProgress'

const styles = StyleSheet.create({
	player: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		bottom: 0,
		left: 0,
		width: '100%',
		padding: 8,
		paddingTop: 0,
		borderColor: 'black',
		borderTopWidth: 1,
	},
})

const Transport = () => {
	// START - STATE & REFS - START
	const { currentlyPlaying, setCurrentlyPlaying } = useContext(AudioContext)
	const [trackProgress, setTrackProgress] = useState(0)
	const [trackStartTime, setTrackStartTime] = useState()
	const [trackPlaying, setTrackPlaying] = useState()
	const [trackDuration, setTrackDuration] = useState()
	const {
		title, artist, id, audio,
	} = propOr({}, currentlyPlaying, store)
	const audioPlayerRef = useRef()
	// END - STATE & REFS - END

	// START - FUNC DEFS - START
	const onStop = () => {
		setCurrentlyPlaying(null)
		setTrackPlaying(false)
		// END - FUNC DEFS - END
	}

	// START - EFFECTS - START
	useEffect(() => {
		audioPlayerRef.current?.destroy()
		if (audio) {
			audioPlayerRef.current = new Player(audio, {
				continuesToPlayInBackground: true,
			})
			audioPlayerRef.current.play(() => {
				setTrackPlaying(pathOr(0, ['current', 'state'], audioPlayerRef) === 4)
				setTrackDuration(Math.floor(
					pathOr(0, ['current', 'duration'], audioPlayerRef) / 1000,
				))
				setTrackStartTime(Date.now())
			})
		}
		return () => audioPlayerRef.current?.destroy()
	}, [audio])

	useSetTrackProgress(
		trackProgress,
		trackDuration,
		trackStartTime,
		setTrackProgress,
		trackPlaying,
	)
	// END - EFFECTS - END

	const timeString = trackDuration ? `${secondsToTime(
		Math.floor(trackDuration * (trackProgress / 100)),
	)}/${secondsToTime(trackDuration)}` : ''

	return (
		<View style={styles.player}>
			<Text h4>{artist}</Text>
			<Text>{title}</Text>
			<Text>{timeString}</Text>
			<Button
				onPress={onStop}
				title="STOP"
				disabled={!currentlyPlaying}
			/>
		</View>
	)
}

export default Transport
