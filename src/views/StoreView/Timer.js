import s from './css/Timer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTimer } from '../../slice/AppSlice.js'


export function Timer() {

	const dispatch = useDispatch()
	const stamp = useSelector(state => state.app.stamp)
	const time = useSelector(state => state.app.timer)
	const run = useSelector(state => state.app.level.run)

	let updTimer = () => {
		if ( stamp !== 0 && run ) {
			dispatch( setTimer( Math.round((Date.now() - stamp) / 1000) ))
		}
	}

	useEffect(() => {
		const timer = setInterval( () => { updTimer() } ,700 )
		return () => { clearInterval(timer) }
	})


	return (
			<div id="timer" className={s.timer}> 
				{ time }
			</div>
	)

}
