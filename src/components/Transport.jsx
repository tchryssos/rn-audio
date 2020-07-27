/* eslint-disable no-unused-expressions */
import React, {
	useContext, useEffect, useRef, useState, useCallback,
} from 'react'
import { View, Pressable, StyleSheet, Image } from 'react-native'
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
	metaContent: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	controlsRow: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: -8,
		flex: 1,
	},
	textContentWrapper: {
		flex: 1,
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
	image: {
		height: 80,
		width: 80,
		marginRight: 12,
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
		title, artist, audio, image,
	} = propOr({}, currentlyPlaying, store)
	const audioPlayerRef = useRef()
	// END - STATE & REFS - END

	// START - TRANSPORT FUNCS - START
	const onStop = () => {
		audioPlayerRef.current?.destroy()
		setCurrentlyPlaying(null)
		setTrackPlaying(false)
		setTrackDuration(null)
		setTrackProgress(0)
	}

	const onPause = useCallback(() => {
		audioPlayerRef.current?.pause()
		setTrackPlaying(false)
		MusicControl.updatePlayback({
			state: MusicControl.STATE_PAUSED,
			elapsedTime,
		})
	}, [elapsedTime])

	const onPlay = useCallback(() => {
		if (currentlyPlaying) {
			audioPlayerRef.current?.play()
			setTrackPlaying(true)
			setTrackStartTime(Date.now() - (Math.round(elapsedTime * 1000)))
			MusicControl.updatePlayback({
				state: MusicControl.STATE_PLAYING,
				elapsedTime,
			})
		}
	}, [elapsedTime, currentlyPlaying])

	const onNext = useCallback(() => {
		const next = path([queuePosition + 1, 'id'], queue)
		if (next) {
			setCurrentlyPlaying(next)
			setQueuePosition(queuePosition + 1)
		} else { // if end of list
			setCurrentlyPlaying(path([0, 'id'], queue))
			setQueuePosition(0)
		}
	}, [queue, queuePosition, setCurrentlyPlaying, setQueuePosition])

	const onPrev = useCallback(() => {
		setCurrentlyPlaying(path([queuePosition - 1, 'id'], queue))
		setQueuePosition(queuePosition - 1)
	}, [queuePosition, queue, setCurrentlyPlaying, setQueuePosition])
	// END - TRANSPORT FUNCS - END

	// START - EFFECTS - START
	useEffect(() => { // Set up lockscreen audio controls
		MusicControl.enableControl('play', true)
		MusicControl.enableControl('pause', true)
		MusicControl.enableControl('nextTrack', true)
		MusicControl.enableControl('previousTrack', true)
	}, [])

	useEffect(() => { // Set up lockscreen audio control methods
		MusicControl.on('pause', onPause)
		MusicControl.on('play', onPlay)
		MusicControl.on('nextTrack', onNext)
		MusicControl.on('previousTrack', onPrev)
	}, [
		trackPlaying, currentlyPlaying, onPause, onPlay, onNext,
		onPrev,
	])

	useEffect(() => { // On changing audio file, setup player
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
			<View style={styles.metaContent}>
				<Image source={image} style={styles.image} />
				<View style={styles.textContentWrapper}>
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
			</View>
		</View>
	)
}

export default Transport
