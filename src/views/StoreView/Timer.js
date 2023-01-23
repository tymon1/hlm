import s from './css/Timer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTimer, resetTimer } from '../../slice/AppSlice.js'


export function Timer() {

	const dispatch = useDispatch()
	const stamp = useSelector(state => state.app.stamp)
	const time = useSelector(state => state.app.timer)
	const run = useSelector(state => state.app.level.run)

	useEffect(() => {
		const timer = setInterval( () => { updTimer() } ,700 )
		return () => { clearInterval(timer) }
	})

	let updTimer = () => {
		if ( stamp !== 0 && run ) {
			dispatch( setTimer( Math.round((Date.now() - stamp) / 1000) ))
		}
		// jest stamp i level zatrzymany ?
		// to resetuj tajmer
		if ( stamp !== 0 && !run ) {
			dispatch( resetTimer() )
		}
	}

	let resp = res => { 
		if (time === 0) { res = s.timerZero }
		else { res = s.timer }
		return res
	}


	return (
			<div className={s.timerOuter}>
				<span id="timer" className={ resp() }> 
					{ time }
				</span>
			</div>
	)

}
