import React from 'react'
import { FlatList } from 'react-native'

import AudioListItem from 'components/AudioListItem'

import data from 'constants/data'

const AudioList = () => (
	<FlatList
		data={data}
		renderItem={AudioListItem}
		keyExtractor={(item) => item.id}
	/>
)

export default AudioList
