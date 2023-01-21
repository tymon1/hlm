import s from './css/ResultsBar.module.css';
import { useSelector } from 'react-redux';
import { Timer } from './Timer';



export function ResultsBar() {

	const results = useSelector(state => state.app.level_times)

	// todo results follows same drop as queue trucks
	// useEffect(() => { 
	// 	setTimeout( () => { (approachQueue()) }, 500 )
	// })

	// let approachRes = () => {
	// 	let truckEl = document.getElementById("queueTruck-"+truck.id)
	// 	truckEl.style.marginLeft = 10 + "px"
	// 	truckEl.style.opacity = 1
	// }

	return (
		<div className={s.resbar}>
			<Timer />
			{
				results.map( (sec, index) => {
					return <span key={index} className={s.res}>{sec} s.</span>
				} )
			}
		</div>
	)

}
