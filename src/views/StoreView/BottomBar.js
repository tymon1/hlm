import s from './css/BottomBar.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { increaseRecover,
				 reduceFlipRisk,
	     } from '../../slice/AppSlice';

// import { RampsQueue } from './Queue';
// import { MsgBoard } from './MsgBoard';



export function BottomBar() {

	const dispatch = useDispatch()

	const levelPoints = useSelector(state => state.app.level_points)
	const levelPtsSum = levelPoints.reduce( (a,b) => { return a +b }, 0 )


	return (
			<div className={s.bottombar}>

			  <div className={s.brain}
				     onClick={ dispatch( reduceFlipRisk() ) } >
					<div className={s.innerCost}> 15 </div> 
				</div>

			  <div className={s.muscle}
				     onClick={ dispatch( increaseRecover() ) } >
					<div className={s.innerCost}> 5 </div> 
				</div>

			  <div className={s.totalPts}>
					<div className={s.innerPts}>{  
						Math.round( (levelPtsSum) *10) /10 } </div>
				</div>

			</div>
	)

}
