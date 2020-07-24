import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import AudioListItem from 'components/AudioListItem'
import data from 'constants/data'

const styles = StyleSheet.create({
	list: {
		padding: 8,
		paddingBottom: 0,
	},
})

const AudioList = () => (
	<FlatList
		style={styles.list}
		data={data}
		renderItem={AudioListItem}
		keyExtractor={(item) => item.id}
	/>
)

export default AudioList
