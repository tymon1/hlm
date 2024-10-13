import s from './css/TopBar.module.css';

import { RampsQueue } from './Queue';
import { MsgBoard } from './MsgBoard';



export function TopBar() {

	return (
			<div className={s.topbar}>

				<MsgBoard />
				<RampsQueue />

			</div>
	)

}
