import angelImg from 'static/angel.jpg'
import fZeroImg from 'static/fzero.png'
import kissImg from 'static/kiss.jpg'
import undertaleImg from 'static/undertale.jpg'
import wiiImg from 'static/wii.jpg'

import localAngel from 'static/angel.mp3'
import localFzero from 'static/fzero.mp3'
import localKiss from 'static/kiss.mp3'
import localUndertale from 'static/undertale.mp3'
import localWii from 'static/wii.mp3'

const angel = {
	id: '1',
	url: localAngel,
	title: 'Cruel Angel\'s Thesis',
	artist: 'Neon Genesis Evangelion',
	artwork: angelImg,
	duration: 247,
}

const fZero = {
	id: '2',
	url: localFzero,
	title: 'Big Blue',
	artist: 'F-Zero',
	artwork: fZeroImg,
	duration: 298,
}

const kiss = 	{
	id: '3',
	url: localKiss,
	title: 'Kiss of Death',
	artist: 'Darling in the Franxx',
	artwork: kissImg,
	duration: 240,
}

const undertale = 	{
	id: '4',
	url: localUndertale,
	title: 'Megalovania',
	artist: 'Toby Fox',
	artwork: undertaleImg,
	duration: 336,
}

const wii = {
	id: '5',
	url: localWii,
	title: 'Wii Shop Channel',
	artist: 'Iwata',
	artwork: wiiImg,
	duration: 129,
}

export const store = {
	1: angel, 2: fZero, 3: kiss, 4: undertale, 5: wii,
}

export default [
	angel, fZero, kiss, undertale, wii,
]
