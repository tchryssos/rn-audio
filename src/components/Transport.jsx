/* eslint-disable no-unused-expressions */
import React, {
	useContext, useEffect, useRef, useState, useCallback,
} from 'react'
import {
	View, Pressable, StyleSheet, Image,
} from 'react-native'
import {
	Slider, Icon, Text,
} from 'react-native-elements'
import TrackPlayer, { Capability } from 'react-native-track-player'
import propOr from 'ramda/src/propOr'

import AudioContext from 'logic/contexts/audio'
import { store } from 'constants/data'

import secondsToTime from 'logic/utils/secondsToTime'
import ternary from 'logic/utils/ternary'
import getPlayerStatus from 'logic/utils/trackPlayer/getPlayerStatus'
import getPlayerQueue from 'logic/utils/trackPlayer/getPlayerQueue'
import getPlayerCurrentlyPlaying from 'logic/utils/trackPlayer/getPlayerCurrentlyPlaying'

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
	artistAndTime: {
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

// Track Player Setup
const trackPlayerSetup = () => {
	TrackPlayer.setupPlayer()
		.then(async () => {
			await TrackPlayer.updateOptions({
				capabilities: [
					Capability.Play,
					Capability.Pause,
					Capability.Stop,
					Capability.SkipToNext,
					Capability.SkipToPrevious,
				],
			})
		})
}

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
	const {
		title, artist, url, artwork, duration,
	} = propOr({}, currentlyPlaying, store)
	const elapsedTime = duration * trackProgress
	const audioPlayerRef = useRef()
	// END - STATE & REFS - END

	// START - TRANSPORT FUNCS - START
	const onStop = () => {
		audioPlayerRef.current?.destroy()
		setCurrentlyPlaying(null)
		setTrackPlaying(false)
		setTrackProgress(0)
	}

	const onPause = useCallback(() => {
		TrackPlayer.pause()
		setTrackPlaying(false)
	}, [])

	const onPlay = useCallback(() => {
		if (currentlyPlaying) {
			TrackPlayer.play()
			setTrackPlaying(true)
			setTrackStartTime(Date.now() - (Math.round(elapsedTime * 1000)))
		}
	}, [currentlyPlaying, elapsedTime])

	// const onNext = useCallback(() => {
	// 	// const next = path([queuePosition + 1, 'id'], queue)
	// 	// if (next) {
	// 	// 	setCurrentlyPlaying(next)
	// 	// 	setQueuePosition(queuePosition + 1)
	// 	// } else { // if end of list
	// 	// 	setCurrentlyPlaying(path([0, 'id'], queue))
	// 	// 	setQueuePosition(0)
	// 	// }
	// }, [queue, queuePosition, setCurrentlyPlaying, setQueuePosition])

	// const onPrev = useCallback(() => {
	// 	// setCurrentlyPlaying(path([queuePosition - 1, 'id'], queue))
	// 	// setQueuePosition(queuePosition - 1)
	// }, [queuePosition, queue, setCurrentlyPlaying, setQueuePosition])
	// END - TRANSPORT FUNCS - END

	// START - EFFECTS - START
	useEffect(() => { // Set up track player
		trackPlayerSetup()
		return () => TrackPlayer.destroy()
	}, [])

	useEffect(() => {
		TrackPlayer.add([...queue])
	}, [queue])

	useEffect(() => {
		if (currentlyPlaying || currentlyPlaying === 0) {
			TrackPlayer.skip(currentlyPlaying)
			TrackPlayer.play()
			setTrackPlaying(true)
			setTrackStartTime(Date.now())
			getPlayerStatus()
			getPlayerCurrentlyPlaying()
		}
	}, [currentlyPlaying, onPlay])

	useSetTrackProgress(
		trackProgress,
		duration,
		trackStartTime,
		setTrackProgress,
		trackPlaying,
	)
	// END - EFFECTS - END

	const timeString = duration ? `${secondsToTime(
		Math.floor(duration * trackProgress),
	)}/${secondsToTime(duration)}` : ''

	return (
		<View style={styles.player}>
			<Slider
				value={trackProgress}
				thumbTintColor="transparent"
				minimumTrackTintColor={trackProgress ? '#3f3f3f' : 'transparent'}
				disabled
			/>
			<View style={styles.metaContent}>
				<Image source={artwork} style={styles.image} />
				<View style={styles.textContentWrapper}>
					<Text h4 numberOfLines={1}>{title}</Text>
					<View style={styles.controlsRow}>
						<View style={styles.artistAndTime}>
							<Text numberOfLines={1}>{artist}</Text>
							<Text>{timeString}</Text>
						</View>
						<View style={styles.controlsWrapper}>
							{/* <TransportIcon
								name="skip-previous"
								onPress={onPrev}
								disabled={!queuePosition}
							/> */}
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
							{/* <TransportIcon
								name="skip-next"
								onPress={onNext}
								disabled={!currentlyPlaying || queuePosition === length(queue) - 1}
							/> */}
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

export default Transport
