import s from './css/BottomBar.module.css';

import { useSelector } from 'react-redux';


// import { RampsQueue } from './Queue';
// import { MsgBoard } from './MsgBoard';



export function BottomBar() {

	const levelPoints = useSelector(state => state.app.level_points)
	const levelPtsSum = levelPoints.reduce( (a,b) => { return a +b }, 0 )


	return (
			<div className={s.bottombar}>
			  <div className={s.totalPts}>
					<span className={s.innerPts}>{  
						Math.round( (levelPtsSum) *10) /10 } </span>
				</div>

			</div>
	)

}
