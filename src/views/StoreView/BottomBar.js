import s from './css/BottomBar.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { increaseRecover,
				 reduceFlipRisk,
	     } from '../../slice/AppSlice';

// import { RampsQueue } from './Queue';
// import { MsgBoard } from './MsgBoard';




export function BottomBar() {

	const dispatch = useDispatch()

	const redFlipCosts = useSelector(state => state.app.reduce_flip_costs)
	const redFlipUpg = useSelector(state => state.app.reduce_flip_upgrade)
	const redFlipCost = redFlipCosts[ redFlipUpg ]

	const recStepCosts = useSelector(state => state.app.recover_step_costs)
	const recStepUpg = useSelector(state => state.app.recover_step_upgrade)
	const recStepCost = recStepCosts[ recStepUpg ]

	const levelPoints = useSelector(state => state.app.level_points)
	const levelPtsSum = levelPoints.reduce( (a,b) => { return a +b }, 0 )

	const levelUpgrades = useSelector(state => state.app.level_upgrades)
	const levelUpgSum = levelUpgrades.reduce( (a,b) => { return a +b }, 0 )


	let upgDisplay = cost => {
		if ( cost <= levelPtsSum - levelUpgSum ) {
			return "block";
		}
		else { 
			return "none"; 
		}
	}


	return (
			<div className={ s.bottombar }>

			  <div className={ s.brain }
				     style={{ "display": upgDisplay( redFlipCost ) }}
				     onClick={ () => { 
							 dispatch( reduceFlipRisk({ payload:redFlipCost }) ) 
						 } } >
					<div className={ s.innerCost }> { redFlipCost } </div> 
				</div>

			  <div className={ s.muscle }
				     style={{ "display": upgDisplay( recStepCost ) }}
				     onClick={ () => { 
							 dispatch( increaseRecover({ payload:recStepCost }) ) 
						 } } >
					<div className={ s.innerCost }> { recStepCost } </div> 
				</div>

			  <div className={ s.totalPts }>
					<div className={ s.innerPts }>{  
						Math.round( (levelPtsSum - levelUpgSum) *10) /10 } </div>
				</div>

			</div>
	)

}
