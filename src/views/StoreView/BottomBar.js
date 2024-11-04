import s from './css/BottomBar.module.css';
import r from './css/ResultsBar.module.css';

import { useSelector, useDispatch } from 'react-redux';
// import { useRef } from 'react';

import { countEmptyDocks,
	     } from '../../app/helpers.js';

import { increaseRecover,
				 reduceFlipRisk,
				 reduceBonus,
				 buyNinja,
				 bonusPay,
				 thunder,
				 fist,
	     } from '../../slice/AppSlice';

import { remQueueTruck,
	       setTruckCover,
	       palletRecover,
				 addPal,
				 remPal,
         parkTruck } from '../../slice/StoreSlice';

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
	const queue = useSelector(state => state.store.queue)

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
		if (cost !== undefined) {
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
			case 4:
				return s.ninja_pppp
			default:
				return ""
		}
	}


	let maxDump = () => {
		let truckFill = docks.map( d => {
			return d.truck.id > 0 
				? { no: d.no, len: d.truck.pallets.length, type: d.truck.type, tid: d.truck.id } 
			  : { no: d.no, len: 0, type: "", tid:0 };
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
							 let docksMaxDump = maxDump() 
							 // no len type //turcktype
							 if ( docksMaxDump.len !== 0 && 
									  bonusTotal >= 3 &&
									  docksMaxDump.type !== 'bonus' &&  
										docksMaxDump.type !== 'full' ) {
								 dispatch( reduceBonus({ payload: 3 }) )

								 docks[ docksMaxDump.no ].truck.pallets.forEach( pal => {
									 dispatch( addPal({ index: docksMaxDump.no, pallet: pal, name: "ramp", }) ) 
									 dispatch( remPal({ index: docksMaxDump.tid, pallet: pal, name: "truck", }) ) 
									 }) 

								 // dispatch( dumpPalToRamp({ 
									 // payload: docksMaxDump.no, 
									 // pallets: docks[ docksMaxDump.no ].truck.pallets,
								   // rampPallets: ramps[ docksMaxDump.no ].pallets }) )
							 }
						 }}>
					<div className={ s.innerBonus }> 3 </div> 
				</div>

				{/* shout - red ninja action */}
			  <div className={ s.shout }
				     style={{ "display": (ninja_level>=2) ? "block" : "none" }}
				     onClick={ () => { 
							 let emptyDocksC = countEmptyDocks( docks )
							 if ( emptyDocksC.length >= 1 && queue.length >= 1 ) {
								 for (let j=0; j< queue.length; j++) {
									 if (j >= emptyDocksC.length)
										 break;
										 dispatch( parkTruck({ truck:queue[j],
											                     index: emptyDocksC[j] }) )
										 dispatch( remQueueTruck({ id: queue[j].id }) )
										 dispatch( setTruckCover({ id: queue[j].id, cover:false }) )
								 }
							 }
						 }} >
				</div>

				{/* stomp / fist - knight action */}
			  <div className={ s.stomp }
				     style={{ "display": (ninja_level>=3) ? "block" : "none" }}
				     onClick={ () => { 
							 // visual & sfx 
							 dispatch( fist() )
							 let store = document.querySelector('#store')
							 store.classList.add(s.shake)
							 setTimeout( () => { store.classList.remove(s.shake) } ,600)
							 // js action
							 for (let j=0; j< ramps.length; j++) {
								 if (ramps[j].pallets) 
									 ramps[j].pallets.forEach( pal => {
										 let recPcent = 100
										 if (pal.recovered < 100) {
											 dispatch( palletRecover( {
												 pallet: pal,
												 rampIndex: j,
												 percent: recPcent
											 }) )
										 }
									 } )
							 }
						 }} >
				</div>

				{/* thunder - raiden action */}
			  <div className={ s.thunder }
				     style={{ "display": (bonusTotal>=2 && ninja_level>=4) ? "block" : "none" }}
				     onClick={ () => { 
							 // visual & sfx
							 dispatch( thunder() )
							 let storeId = document.querySelector('#store')
							 let docksId = document.querySelector('#docks')
							 storeId.classList.add(s.lightning)
							 docksId.classList.add(s.lightning)
							 setTimeout( () => { storeId.classList.remove(s.lightning) } ,100)
							 setTimeout( () => { docksId.classList.remove(s.lightning) } ,130)
							 // model action
							 dispatch( bonusPay({ amount: 2 }) )
							 docks.map( dock => {
								 if (dock.truck.id > 0 && dock.truck.type !== "bonus") {
									 dock.truck.pallets.forEach( pal => {
										 dispatch( addPal({ index: dock.no, pallet: pal, name: "ramp", }) ) 
										 dispatch( remPal({ index: dock.truck.id, pallet: pal, name: "truck", }) ) 
									 }) 
								 }
								 return true
							 })

						 }} >
					<div className={ s.innerBonus }> 2 </div> 
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
