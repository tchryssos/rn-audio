import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import AudioContext from 'logic/contexts/audio'

import AudioList from 'components/AudioList'
import Transport from 'components/Transport'

const styles = StyleSheet.create({
	app: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
	},
})

const App = () => {
	const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
	const [queue, setQueue] = useState([])
	const [queuePosition, setQueuePosition] = useState(null)
	return (
		<AudioContext.Provider
			value={{
				currentlyPlaying,
				setCurrentlyPlaying,
				queue,
				setQueue,
				queuePosition,
				setQueuePosition,
			}}
		>
			<View style={styles.app}>
				<Text h1>Audio</Text>
				<AudioList />
				<Transport />
			</View>
		</AudioContext.Provider>
	)
}

export default App
