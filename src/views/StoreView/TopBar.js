import s from './css/TopBar.module.css';
import { useSelector } from 'react-redux';

import { Timer } from './Timer';
import { RampsQueue } from './Queue';



export function TopBar() {

	const queue = useSelector(state => state.store.queue)

	return (
			<div className={s.topbar}>

				<Timer />

				<RampsQueue />

			</div>
	)

}
