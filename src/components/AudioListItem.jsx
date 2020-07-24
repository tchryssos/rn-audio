import React from 'react'
import { View, Text } from 'react-native'

const AudioListItem = ({ item: { title, artist, audio } }) => (
	<View>
		<Text>{title}</Text>
		<Text>{artist}</Text>
	</View>
)

export default AudioListItem
