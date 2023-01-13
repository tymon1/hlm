import s from './css/Timer.module.css';
import { useSelector } from 'react-redux';


export function Timer() {

	const timer = useSelector(state => state.app.timer)

	return (
			<div id="timer" className={s.timer}>
				{ timer }
		  </div>
	)

}
