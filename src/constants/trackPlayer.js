import { State } from 'react-native-track-player'

export const statusLegend = {
	[State.Playing]: 'playing',
	[State.Stopped]: 'stopped',
	[State.Paused]: 'paused',
	[State.Ready]: 'ready',
	[State.None]: 'none',
	[State.Connecting]: 'connecting',
	[State.Buffering]: 'buffering',
}
