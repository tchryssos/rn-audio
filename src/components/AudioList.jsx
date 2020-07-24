import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import AudioListItem from 'components/AudioListItem'
import data from 'constants/data'

const styles = StyleSheet.create({
	list: {
		padding: 8,
		paddingBottom: 0,
		width: '100%',
	},
})

const AudioList = () => (
	<FlatList
		style={styles.list}
		data={data}
		ListItemComponent={AudioListItem}
		keyExtractor={(item) => item.id}
	/>
)

export default AudioList
