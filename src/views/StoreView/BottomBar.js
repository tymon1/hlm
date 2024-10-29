import s from './css/BottomBar.module.css';
import r from './css/ResultsBar.module.css';

import { useSelector, useDispatch } from 'react-redux';
// import { useRef } from 'react';

import { increaseRecover,
				 reduceFlipRisk,
				 reduceBonus,
				 buyNinja,
	     } from '../../slice/AppSlice';

import { dumpPalToRamp } from '../../slice/StoreSlice';

import { drag, source } from '../../slice/AppSlice';




export function BottomBar() {

	const dispatch = useDispatch()

	const redFlipCosts = useSelector(state => state.app.reduce_flip_costs)
	const redFlipUpg = useSelector(state => state.app.reduce_flip_upgrade)
	const redFlipCost = redFlipCosts[ redFlipUpg ]

	const recStepCosts = useSelector(state => state.app.recover_step_costs)
	const recStepUpg = useSelector(state => state.app.recover_step_upgrade)
	const recStepCost = recStepCosts[ recStepUpg ]

	const ninja = useSelector(state => state.app.ninja)
	const ninja_cost = useSelector(state => state.app.ninja_cost)
	const ninja_level = useSelector(state => state.app.ninja_level)
	const ninjaCost = ninja_cost[ ninja_level ]

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
		if ( cost <= levelPtsSum - levelUpgSum ) { return "block"; }
		else { return "none"; }
	}


	// little bit complex but effective
	// ( draggable element is 'cost === undefined' )
	let upgNinjaDisplay = cost => {

		if ( ninja && cost === undefined) {
			// if ninja is present on ramps :)
			for (let i=0; i<ramps.length; i++) {
				if (ramps[i].ninja === true) {
					// he is not present on bottombar..
					return "none";
				}
			}
			return "block";
		}
		if (!ninja && cost === undefined) {
			return "none";
		}
		// upgrade ninja button 
		// if (ninja && cost !== undefined) {
			// return "none";
		// }
		if (ninja && cost !== undefined) {
			if ( cost <= levelPtsSum - levelUpgSum ) { return "block"; }
			else { return "none"; }
		}
	}

	
	let ninjaLook = level => {
		switch (level) {
			case 0:
				return s.ninja
			case 1:
				return s.ninja_p
			case 2:
				return s.ninja_pp
			case 3:
				return s.ninja_ppp
		}
	}

	let bonusDump = () => {
		let truckFill = docks.map( d => {
			return d.truck.id > 0 
				? { "no":d.no, "len":d.truck.pallets.length, type:d.truck.type } 
			  : { "no":d.no, "len":0, type:"" };
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

				{/* to buy */}
			  <div className={ ninjaLook( ninja_level ) }
				     style={{ "display": upgNinjaDisplay( ninjaCost ) }}
				     onClick={ () => { 
							 dispatch( buyNinja({ payload: ninjaCost }) ) 
						 } } >
					<div className={ s.innerCost }> { ninjaCost } </div> 
				</div>

				{/* to drag */}
			  <div className={ ninjaLook( ninja_level-1 ) }
					   draggable={ true }
				     style={{ "display": upgNinjaDisplay() }}

						 onDragStart = { () => {
							 dispatch( drag( true ) )
							 dispatch( source({ name: "ninja" }) )
						 }}

						 onDragEnd = { () => {
							 dispatch( drag( false ) )
						 }} >
				</div>

			  <div className={ s.dump }
				     style={{ "display": (bonusTotal>=3) ? "block" : "none" }}
				     onClick={ () => { 
							 let docksDump = bonusDump() 
							 if ( docksDump.len !== 0 && 
									  bonusTotal >= 3 &&
									  docksDump.type !== 'bonus' &&  
										docksDump.type !== 'full' ) {
								 dispatch( reduceBonus({ payload: 3 }) )
								 dispatch( dumpPalToRamp({ 
									 payload:docksDump.no, 
									 pallets:docks[docksDump.no].truck.pallets,
								   rampPallets:ramps[docksDump.no].pallets }) )
							 }
						 }}>
					<div className={ s.innerBonus }> 3 </div> 
				</div>

				<div className={ r.bonuses + " " + s.bonusBot }>

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
