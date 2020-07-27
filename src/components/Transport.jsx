/* eslint-disable no-unused-expressions */
import React, {
	useContext, useEffect, useRef, useState,
} from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import {
	Slider, Icon, Text,
} from 'react-native-elements'
import { Player } from '@react-native-community/audio-toolkit'
import MusicControl from 'react-native-music-control'
import propOr from 'ramda/src/propOr'
import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import length from 'ramda/src/length'

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
		justifyContent: 'center',
		flexDirection: 'row',
	},
})

const TransportIcon = ({
	name, onPress, onLongPress, disabled,
}) => (
	<Pressable
		onPress={onPress}
		onLongPress={onLongPress}
		disabled={disabled}
	>
		<Icon name={name} style={styles.icon} />
	</Pressable>
)

const Transport = () => {
	// START - STATE & REFS - START
	const {
		currentlyPlaying, setCurrentlyPlaying, queue, setQueuePosition, queuePosition,
	} = useContext(AudioContext)
	const [trackProgress, setTrackProgress] = useState(0)
	const [trackStartTime, setTrackStartTime] = useState()
	const [trackPlaying, setTrackPlaying] = useState()
	const [trackDuration, setTrackDuration] = useState()
	const elapsedTime = trackDuration * trackProgress
	const {
		title, artist, audio,
	} = propOr({}, currentlyPlaying, store)
	const audioPlayerRef = useRef()
	// END - STATE & REFS - END

	// START - FUNC DEFS - START
	const onStop = () => {
		audioPlayerRef.current?.destroy()
		setCurrentlyPlaying(null)
		setTrackPlaying(false)
		setTrackDuration(null)
		setTrackProgress(0)
	}

	const onPause = () => {
		audioPlayerRef.current?.pause()
		setTrackPlaying(false)
		MusicControl.updatePlayback({
			state: MusicControl.STATE_PAUSED,
			elapsedTime,
		})
	}

	const onPlay = () => {
		if (currentlyPlaying) {
			audioPlayerRef.current?.play()
			setTrackPlaying(true)
			setTrackStartTime(Date.now() - (Math.round(elapsedTime * 1000)))
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
				elapsedTime,
			})
		}
	}

	const onNext = () => {
		const next = path([queuePosition + 1, 'id'], queue)
		if (next) {
			setCurrentlyPlaying(next)
			setQueuePosition(queuePosition + 1)
		} else { // if end of list
			setCurrentlyPlaying(path([0, 'id'], queue))
			setQueuePosition(0)
		}
	}

	const onPrev = () => {
		setCurrentlyPlaying(path([queuePosition - 1, 'id'], queue))
		setQueuePosition(queuePosition - 1)
	}
	// END - FUNC DEFS - END

	// START - EFFECTS - START
	useEffect(() => {
		MusicControl.enableControl('play', true)
		MusicControl.enableControl('pause', true)
		MusicControl.enableControl('nextTrack', true)
		MusicControl.enableControl('previousTrack', true)
	}, [])

	useEffect(() => {
		audioPlayerRef.current?.destroy()
		if (audio) {
			audioPlayerRef.current = new Player(audio, {
				continuesToPlayInBackground: true,
			})
			// const duration = Math.floor(
			// 	pathOr(0, ['current', 'duration'], audioPlayerRef) / 1000,
			// )
			// console.log(duration)
			audioPlayerRef.current.play(() => {
				setTrackPlaying(pathOr(0, ['current', 'state'], audioPlayerRef) === 4)
				setTrackDuration(Math.floor(
					pathOr(0, ['current', 'duration'], audioPlayerRef) / 1000,
				))
				setTrackStartTime(Date.now())
			})
			audioPlayerRef.current.on('ended', () => onNext())
			MusicControl.setNowPlaying({
				title,
				artist,
				duration: Math.floor(
					pathOr(0, ['current', 'duration'], audioPlayerRef) / 1000,
				),
			})
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
				elapsedTime: 0,
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
		Math.floor(trackDuration * trackProgress),
	)}/${secondsToTime(trackDuration)}` : ''

	return (
		<View style={styles.player}>
			<Slider
				value={trackProgress}
				thumbTintColor="transparent"
				minimumTrackTintColor={trackProgress ? '#3f3f3f' : 'transparent'}
				disabled
			/>
			<Text h4>{title}</Text>
			<View style={styles.controlsRow}>
				<View>
					<Text>{artist}</Text>
					<Text>{timeString}</Text>
				</View>
				<View style={styles.controlsWrapper}>
					<TransportIcon
						name="skip-previous"
						onPress={onPrev}
						disabled={!queuePosition}
					/>
					{ternary(
						trackPlaying,
						<TransportIcon
							name="pause"
							onPress={onPause}
							onLongPress={onStop}
							disabled={!currentlyPlaying}
						/>,
						<TransportIcon
							name="play-arrow"
							onPress={onPlay}
							disabled={!currentlyPlaying}
						/>,
					)}
					<TransportIcon
						name="skip-next"
						onPress={onNext}
						disabled={!currentlyPlaying || queuePosition === length(queue) - 1}
					/>
				</View>
			</View>
		</View>
	)
}

export default Transport
