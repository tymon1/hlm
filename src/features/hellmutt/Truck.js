import s from './Truck.module.css';


export function Truck({ truck }) {

	return (
		<div id={"truck-" + truck.id} className={s.truck}></div>
	)

}
