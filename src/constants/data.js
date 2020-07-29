import angelImg from 'static/angel.jpg'
import fZeroImg from 'static/fzero.png'
import kissImg from 'static/kiss.jpg'
import undertaleImg from 'static/undertale.jpg'
import wiiImg from 'static/wii.jpg'

const angel = {
	id: '1',
	url: 'angel.mp3',
	title: 'Cruel Angel\'s Thesis',
	artist: 'Neon Genesis Evangelion',
	artwork: angelImg,
}

const fZero = {
	id: '2',
	url: 'fzero.mp3',
	title: 'Big Blue',
	artist: 'F-Zero',
	artwork: fZeroImg,
}

const kiss = 	{
	id: '3',
	url: 'kiss.mp3',
	title: 'Kiss of Death',
	artist: 'Darling in the Franxx',
	artwork: kissImg,
}

const undertale = 	{
	id: '4',
	url: 'undertale.mp3',
	title: 'Megalovania',
	artist: 'Toby Fox',
	artwork: undertaleImg,
}

const wii = {
	id: '5',
	url: 'wii.mp3',
	title: 'Wii Shop Channel',
	artist: 'Iwata',
	artwork: wiiImg,
}

export const store = {
	1: angel, 2: fZero, 3: kiss, 4: undertale, 5: wii,
}

export default [
	angel, fZero, kiss, undertale, wii,
]
