// import { Howl, Howler } from 'howler';
import { Howl } from 'howler';

// Howler.volume(0.8);
// Howler.autoUnlock(true);

export const beep = new Howl({
	src: ['s/beep.mp3'],
	volume: 0.05,
})

export const error = new Howl({
	src: ['s/error.mp3'],
	volume: 0.4,
})

export const reverse_l = new Howl({
	src: ['s/truck_l_reverse.mp3'],
	volume: 0.9,
})

export const reverse_xxl = new Howl({
	src: ['s/truck_xxl_reverse.mp3'],
	volume: 0.7,
})

export const reverse_s = new Howl({
	src: ['s/truck_s_reverse.mp3'],
	volume: 0.9,
})

export const newQ = new Howl({
	src: ['s/newQ.mp3'],
	volume: 0.2,
})

export const stomp = new Howl({
	src: ['s/thump.mp3'],
	volume: 0.9,
})

export const rush_m = new Howl({
	src: ['s/rush_m.mp3'],
	volume: 0.6,
})

export const rush_xxl = new Howl({
	src: ['s/rush_xxl.mp3'],
	volume: 0.9,
})

export const rush_largo = new Howl({
	src: ['s/rush-s.mp3'],
	volume: 0.9,
})

export const wave = new Howl({
	src: ['s/notify_hammond.mp3'],
	volume: 0.2,
})

export const complete = new Howl({
	src: ['s/notify_hammond_2.mp3'],
	volume: 0.2,
})

