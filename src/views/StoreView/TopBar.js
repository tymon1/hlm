import s from './css/TopBar.module.css';

import { Timer } from './Timer';
import { RampsQueue } from './Queue';



export function TopBar() {

	return (
			<div className={s.topbar}>

				<Timer />

				<RampsQueue />

			</div>
	)

}
