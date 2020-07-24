import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

import AudioList from 'components/AudioList'

const styles = StyleSheet.create({
	app: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
})

const App = () => (
	<View style={styles.app}>
		<Text h1>Audio</Text>
		<AudioList />
	</View>
)

export default App
