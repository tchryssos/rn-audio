import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Text, } from 'react-native'

import AudioContext from 'logic/contexts/audio'

const styles = StyleSheet.create({
	item: {
		width: '100%',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 8,
		padding: 4,
	},
})

const AudioListItem = ({ item: { id, title, artist } }) => {
	const { setCurrentlyPlaying } = useContext(AudioContext)
	const onPress = () => setCurrentlyPlaying(id)
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={onPress}
		>
			<Text>
				&quot;
				{title}
				&quot;
			</Text>
			<Text>
				by&nbsp;
				{artist}
			</Text>
		</TouchableOpacity>
	)
}

export default AudioListItem
