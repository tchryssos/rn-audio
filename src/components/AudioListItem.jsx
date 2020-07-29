import React, { useContext } from 'react'
import {
	StyleSheet, TouchableOpacity, Text, Image, View,
} from 'react-native'

import AudioContext from 'logic/contexts/audio'

const styles = StyleSheet.create({
	item: {
		width: '100%',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 4,
		marginBottom: 8,
		padding: 4,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		height: 60,
		width: 60,
		marginRight: 12,
	},
})

const AudioListItem = ({ item: { id, title, artist, artwork }, index }) => {
	const { setCurrentlyPlaying, setQueuePosition } = useContext(AudioContext)
	const onPress = () => {
		setCurrentlyPlaying(id)
		setQueuePosition(index)
	}
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={onPress}
		>
			<Image
				source={artwork}
				style={styles.image}
			/>
			<View>
				<Text>
					&quot;
					{title}
					&quot;
				</Text>
				<Text>
					by&nbsp;
					{artist}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default AudioListItem
