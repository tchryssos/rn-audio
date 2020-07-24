import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import AudioContext from 'logic/contexts/audio'

import AudioList from 'components/AudioList'
import Player from 'components/Player'

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
	return (
		<AudioContext.Provider value={{ currentlyPlaying, setCurrentlyPlaying }}>
			<View style={styles.app}>
				<Text h1>Audio</Text>
				<AudioList />
				<Player />
			</View>
		</AudioContext.Provider>
	)
}

export default App
