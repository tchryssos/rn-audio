import angelImg from 'static/angel.jpg'
import fZeroImg from 'static/fzero.png'
import kissImg from 'static/kiss.jpg'
import undertaleImg from 'static/undertale.jpg'
import wiiImg from 'static/wii.jpg'

const angel = {
	id: '1',
	audio: 'angel.mp3',
	title: 'Cruel Angel\'s Thesis',
	artist: 'Neon Genesis Evangelion',
	image: angelImg,
}

const fZero = {
	id: '2',
	audio: 'fzero.mp3',
	title: 'Big Blue',
	artist: 'F-Zero',
	image: fZeroImg,
}

const kiss = 	{
	id: '3',
	audio: 'kiss.mp3',
	title: 'Kiss of Death',
	artist: 'Darling in the Franxx',
	image: kissImg,
}

const undertale = 	{
	id: '4',
	audio: 'undertale.mp3',
	title: 'Megalovania',
	artist: 'Toby Fox',
	image: undertaleImg,
}

const wii = {
	id: '5',
	audio: 'wii.mp3',
	title: 'Wii Shop Channel',
	artist: 'Iwata',
	image: wiiImg,
}

export const store = {
	1: angel, 2: fZero, 3: kiss, 4: undertale, 5: wii,
}

export default [
	angel, fZero, kiss, undertale, wii,
]
