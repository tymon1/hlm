import s from './css/BottomBar.module.css';
import r from './css/ResultsBar.module.css';

import { useSelector, useDispatch } from 'react-redux';

import { increaseRecover,
				 reduceFlipRisk,
				 reduceBonus,
	     } from '../../slice/AppSlice';

import { dumpPalToRamp } from '../../slice/StoreSlice';





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

	const levelBonuses = useSelector(state => state.app.level_bonuses)
	const bonusEarned = levelBonuses.reduce( (a,s) => { return a + s.count }, 0 )
	const bonusesUsed = useSelector(state => state.app.bonus_used)
	const bonusUsed = bonusesUsed.reduce( (a,b) => { return a +b }, 0 )

	const docks = useSelector(state => state.store.docks)
	const ramps = useSelector(state => state.store.ramps)


	const bonusTotal = bonusEarned - bonusUsed

	let upgDisplay = cost => {
		if ( cost <= levelPtsSum - levelUpgSum ) {
			return "block";
		}
		else { 
			return "none"; 
		}
	}

	let bonusDump = () => {
		let truckFill = docks.map( d => {
			return d.truck.id > 0 
				? { "no":d.no,"len":d.truck.pallets.length, type:d.truck.type } 
			  : {"no":d.no,"len":0, type:""};
		})
		//  dock  with  max  pallets { no, lenMax }
		let truckMax = truckFill.reduce( (dPrev, dCurr) => { 
			return dCurr.len > dPrev.len ? dCurr : dPrev
		})
		return truckMax
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

				<div className={ r.bonuses + " " + s.bonusClickable }
				     style={{ "opacity": (bonusTotal>=3) ? 1 : 0.4 }}
				     onClick={ () => { 
							 let docksDump = bonusDump() 
							 if ( docksDump.len !== 0 && 
									  bonusTotal >= 3 &&
									  docksDump.type !== ('bonus' || 'full') ) {
								 dispatch( reduceBonus({ payload: 3 }) )
								 dispatch( dumpPalToRamp({ 
									 payload:docksDump.no, 
									 pallets:docks[docksDump.no].truck.pallets,
								   rampPallets:ramps[docksDump.no].pallets }) )
							 }
						 }}>

					<span className={ r.bonusInner }>
						{ bonusTotal }
					</span>

				</div> 

			  <div className={ s.totalPts }>
					<div className={ s.innerPts }>{  
						Math.round( (levelPtsSum - levelUpgSum) *10) /10 } </div>
				</div>

			</div>
	)

}
