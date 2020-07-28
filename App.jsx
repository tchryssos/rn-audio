import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
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
			<SafeAreaView style={styles.app}>
				<Text h1>Feed</Text>
				<AudioList />
				<Transport />
			</SafeAreaView>
		</AudioContext.Provider>
	)
}

export default App
