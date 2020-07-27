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
import ternary from 'logic/utils/ternary'
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
	controlsRow: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: -8,
	},
	controlsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		height: 48,
		width: 48,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
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
		setTrackDuration(null)
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
			<Text h4>{title}</Text>
			<View style={styles.controlsRow}>
				<View>
					<Text>{artist}</Text>
					<Text>{timeString}</Text>
				</View>
				<View style={styles.controlsWrapper}>
					<Icon name="skip-previous" style={styles.icon} />
					{ternary(
						currentlyPlaying,
						<Icon name="pause" style={styles.icon} />,
						<Icon name="play-arrow" style={styles.icon} />,
					)}
					<Icon name="skip-next" style={styles.icon} />
				</View>
			</View>
			<Button
				onPress={onStop}
				title="STOP"
				disabled={!currentlyPlaying}
			/>
		</View>
	)
}

export default Transport
