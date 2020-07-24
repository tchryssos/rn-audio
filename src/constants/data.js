// import AngelMp3 from 'static/angel.mp3'
// import FZeroMp3 from 'static/fzero.mp3'
// import KissMp3 from 'static/kiss.mp3'
// import UndertaleMp3 from 'static/undertale.mp3'
// import WiiMp3 from 'static/wii.mp3'

const angel = {
	id: '1',
	// audio: AngelMp3,
	title: 'Cruel Angel\'s Thesis',
	artist: 'Neon Genesis Evangelion',
}

const fZero = {
	id: '2',
	// audio: FZeroMp3,
	title: 'Big Blue',
	artist: 'F-Zero',
}

const kiss = 	{
	id: '3',
	// audio: KissMp3,
	title: 'Kiss of Death',
	artist: 'Darling in the Franxx',
}

const undertale = 	{
	id: '4',
	// audio: UndertaleMp3,
	title: 'Megalovania',
	artist: 'Toby Fox',
}

const wii = {
	id: '5',
	// audio: WiiMp3,
	title: 'Wii Shop Channel',
	artist: 'Iwata',
}

export const store = {
	1: angel, 2: fZero, 3: kiss, 4: undertale, 5: wii,
}

export default [
	angel, fZero, kiss, undertale, wii,
]
