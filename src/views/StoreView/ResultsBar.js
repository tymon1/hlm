import s from './css/ResultsBar.module.css';
import { useSelector } from 'react-redux';

import { makeMinutes } from '../../app/helpers';
import { Timer } from './Timer';



export function ResultsBar() {

	const results = useSelector(state => state.app.wave_times)
	const level = useSelector(state => state.app.level)
	const levels = useSelector(state => state.app.levels)
	const prep = useSelector(state => state.app.level.preparing)
	const sorting = useSelector(state => state.store.sorting)

	let wavesLeft = levels[level.current].waves - level.wave
  let voids = []

	if (!prep && !sorting) {
		for (let i=0; i<wavesLeft; ++i) {
			if (i === levels[level.current].waves) { } 
			else {
				voids.push(
					<span key={i} className={s.empty}>
						{(level.wave + i) +1}
					</span> 
				)
			}
		}
	}

	return (
		<div className={s.resbar}>
			
			<Timer />

			{
				results.map( (sec, index) => {
					return <span key={index} className={s.res}>{ makeMinutes(sec) }</span>
				} )
			}

			{ voids }

			<div className={s.calendar}>
				<span className={s.calendarInner}>
					{ level.current }
				</span>
			</div>

		</div>
	)

}
