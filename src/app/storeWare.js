import { addPalToZone, addPalToRamp, addPalToTruck,
				 remPalFrZone, remPalFrRamp, remPalFrTruck,
				 addQueueTruck, 
				 setMess, 
				 resetZones, 
				 storeReset, 
				 parkTruck, 
				 setSorting, 
				 setTruckCounter, setPalletsCounter,
				 selectPallette,
				 unSelectPal,
				 truckOnDockReady, } from '../slice/StoreSlice';

import { saveTimer, setStamp, 
	       increaseWave,
	       resetWave,
	       resetTimeResults,
	       increaseLevel,
	       preparingLevel,
	       popTimeSum,
	       pushPoints,
				 showMsg,
				 markLevelPalCount,
				 setBonusCounter,
				 setColorZone, colorZonesReset,
	       runLevel } from '../slice/AppSlice';

import { genTruck, 
				 unloadingDone, 
				 loadingDone, 
				 drawUnloaded, 
				 drawUnloadedArray, 
				 // makeMinutes, 
				 isFlipping, 
				 drawZones, 
				 colorStoreMess, 
				 storeMess } from '../app/helpers.js';




export const storeWare = (state) => (next) => (action) => {

	let wave_times = state.getState().app.wave_times
	let level = state.getState().app.level
	let levels = state.getState().app.levels
	let docks = state.getState().store.docks
	let ramps = state.getState().store.ramps
	let zones = state.getState().store.zones
	let stamp = state.getState().app.stamp
	let timer = state.getState().app.timer
	let flipRisk = state.getState().app.flip_risk

	let palCnt = state.getState().store.counter.palletId
	let palStartCnt = state.getState().app.level_start_pal_count
	let levelTimes = state.getState().app.level_times

	
	switch (action.type) {

		// addPal helper
		//
		case 'store/addPal':

			if (action.payload.name === "zone") { 
				state.dispatch( addPalToZone(action.payload) ) 
			}
			if (action.payload.name === "ramp") { 
				// determine if pallet is flipping
				state.dispatch( addPalToRamp( isFlipping({p:action.payload, fr:flipRisk})) ) 
			}
			if (action.payload.name === "truck") { 
				state.dispatch( addPalToTruck(action.payload) ) 
				// count bonus truck pallettes:
				if (action.payload.pallet.selected) {
					state.dispatch( setBonusCounter( { level: level.current } ) ) 
					state.dispatch( unSelectPal() )
				}
			}
			break


		// remPal helper
		//
		case 'store/remPal':

			if (action.payload.name === "zone") { 
				state.dispatch( remPalFrZone(action.payload) ) 
			}
			if (action.payload.name === "ramp") { 
				state.dispatch( remPalFrRamp(action.payload) ) 
			}
			if (action.payload.name === "truck") { 
				state.dispatch( remPalFrTruck(action.payload) ) 
			}
			break


		// check which truck is empty to unpark it
		//
		case 'store/checkTrucks':

			let current = levels[ level.current ]

			for ( let i= 0; i< docks.length; i++ ) {

				// if regular trucks unloaded - unpark it
				if ( docks[i].truck.id && 
					 (docks[i].truck.type !== 'bonus' && docks[i].truck.ready === false) &&
					 (docks[i].truck.type !== 'bonus' && docks[i].truck.pallets.length === 0) && 
					 (docks[i].truck.type !== 'full' && docks[i].truck.ready === false) &&
					 (docks[i].truck.type !== 'full' && docks[i].truck.pallets.length === 0) && 
					 ramps[i].pallets.length === 0 ) {

					state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
				}

				// if full truck loaded ..
				if ( docks[i].truck.id && 
						 docks[i].truck.type === 'full'
						 && docks[i].truck.pallets.length > 0
						 && docks[i].truck.pallets[docks[i].truck.pallets.length -1].id === 
						 docks[i].truck.target[docks[i].truck.pallets.length -1].pal_id
					 ) {
					// is it the last target?
					if (docks[i].truck.pallets.length === docks[i].truck.target.length) {
						state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
					}
					// mark next target pallette
					else {
						let nextTarget = {
							zone_index: docks[i].truck.target[docks[i].truck.pallets.length].zone_index,
							pal_id: docks[i].truck.target[docks[i].truck.pallets.length].pal_id,
						}
						if (nextTarget.pal_id === state.getState().store.bonus_target_pallette.pid) { }
						else {
							state.dispatch( selectPallette(nextTarget) )
						}
					}
				}

				// if bonus truck loaded - unpark it
				// instead of pallets[0] we need also array comparing logarithm
				if ( docks[i].truck.id && 
						 docks[i].truck.type === 'bonus' && 
						 docks[i].truck.pallets.length > 0 && 
						 docks[i].truck.pallets[0].id === docks[i].truck.target.pal_id
					 ) {
					state.dispatch( truckOnDockReady({index: i, type: docks[i].truck.type}) )
				}
			}

			// check if docks & ramps are empty 
			//
			if ( unloadingDone({ r:state.getState().store.ramps, 
													 d:state.getState().store.docks }) === true &&

					 loadingDone({ r:state.getState().store.ramps, 
												 d:state.getState().store.docks }) === true &&

					 state.getState().store.queue.length === 0 ) {

				state.dispatch( runLevel(false) )

				let level = state.getState().app.level
				let levels = state.getState().app.levels

				if  ( level.wave< levels[ level.current ].waves-1 && !level.run ) {
					// show msg
					//
					//                                            Nadjeżdża grupa kurierów
					state.dispatch( showMsg({ type:"next", text: "" }) )
					state.dispatch( increaseWave() )
				}
				else {
					// check for mess
					//
					let messStatus
						// level have color zones
					if (current.color_zones.colorize) {
						messStatus = colorStoreMess({ zones: zones, czones: level.color_zone })
					}
						// level doesnt have color zones
					else {
						messStatus = storeMess( zones )
					}
					state.dispatch( setMess( messStatus ) )
					let sorting = state.getState().store.sorting

					if (messStatus) { 

						if (!sorting) {
							state.dispatch( setSorting(true) )
							state.dispatch( showMsg({ type:"mess", text: "Żeby ukończyć poziom, posortuj palety" }) )
						}

					} else {

						// let gratz = "Gratulacje, ukończyłeś poziom " + 
												 // level.current + ", w  czasie " +
												 // makeMinutes( Number(totalTime( state.getState().app.wave_times )) ) + "s."
						let gratz 

					  // needed in gratz window for number of processed pallets  
						state.dispatch( showMsg({ type:"gratz", text: gratz }) )
						// pop time sum pop ONLY after regular level
						// not after full truck load!
						if ( !state.getState().app.level.loadTruck ) {
							state.dispatch( popTimeSum() )

						}
						state.dispatch( preparingLevel(true) )
					}
				}
			}
			break


		case 'app/hardReset':
				state.dispatch( storeReset() ) 
			break


		case 'app/hideMsg':
			// przygotowanie załadunku linii 
			if ( state.getState().app.level.preparing &&
					 state.getState().app.level.loadTruck ) {

				// dont prepare level, cause truckLd incoming!!
				state.dispatch( resetTimeResults() )
				let target = drawUnloadedArray( state.getState().store.zones )
				// for full select 1st pallette
				state.dispatch( selectPallette(target[0]) )
				let fullTruck = genTruck( state.getState().store.counter.truckId, 1, target )
				state.dispatch( parkTruck({ index: 1, truck: fullTruck }) )
			}

			// przygotowanie zwykłego levelu
			if ( state.getState().app.level.preparing &&
					 !state.getState().app.level.loadTruck ) {

				// podbijanie levelu.. 
				state.dispatch( markLevelPalCount( palCnt ) ) 
				state.dispatch( preparingLevel(false) )
				state.dispatch( setSorting(false) )
				state.dispatch( colorZonesReset() ) 
				state.dispatch( resetZones() )
				state.dispatch( resetWave() )

				let pCnt = palCnt-palStartCnt[palStartCnt.length -1]
				let lTime = levelTimes[level.current-1]
				let levelPts = ( ( pCnt *(60/lTime) ) /60 ) *pCnt
				state.dispatch( pushPoints( Math.round(levelPts *10) /10 ) )
				
				// TODO ZROBIC OGRANICZNIK LEVELI
				state.dispatch( increaseLevel() )
				state.dispatch( resetTimeResults() )
			}
			if ( level.wave === wave_times.length-1 && 
					 state.getState().store.sorting ) { }
			else {
				state.dispatch( runLevel(true) )
			}
			break


		case 'store/addQueueTruck':
			state.dispatch( setTruckCounter() )
			break


		// start Level
		//
		case 'app/runLevel':

			if ( action.payload === true && 
					 !state.getState().app.level.loadTruck) {

				let current = levels[ level.current ]
				//
				// make color zone / zones
				if ( current.color_zones.colorize && 
						 level.color_zone.length === 0 ) {
					let cZone = drawZones({ 
						count: current.color_zones.count, 
						len: state.getState().store.zones.length 
					})
					state.dispatch( setColorZone( cZone ) )
				}

				// 
				// adding a group of trucks
				
				// level trucks
				for ( let i= 1; i<= current.truckMax; i++ ) {
					setTimeout( () => { 
						// get current truck and pallets counters
						//
						let currTruckId = state.getState().store.counter.truckId
						let currPalId = state.getState().store.counter.palletId
						// generate random regular truck
						//
						let truck = genTruck( currTruckId, currPalId, null )
						state.dispatch( addQueueTruck({ truck: truck }) )
						// alter current pallet id counter
						//
						let newId = currPalId + truck.pallets.length
						state.dispatch( setPalletsCounter({ newId: newId }) )
					}, i*500 )
				}

				// bonus client truck, on second+ waves
				if (level.wave > 0) {
					// 66% chances for bonusTruck
					// if ( Math.random() < Number(0.66) ) {
					if ( true ) {
						// he came for this pallette:
						let bonusTarget = drawUnloaded( zones )
						let cTruckId = state.getState().store.counter.truckId

						let bonus_truck = genTruck( cTruckId, 0, bonusTarget )
						
						state.dispatch( selectPallette(bonusTarget) )
						state.dispatch( addQueueTruck({ truck: bonus_truck }) )
					}
				}
			}

			// stop level
			if ( action.payload === false ) {
				// in case of last wave dont saveTimer:
				//
				if ( level.wave > wave_times.length -1 && 
						 !state.getState().app.level.loadTruck ) {
					state.dispatch( saveTimer( timer ) ) 
				}
			}
			break


		// start timer when you drop first truck on the free dock
		case 'store/parkTruck':
			// dont start timer when full truck load
			if ( stamp === 0 && !state.getState().app.level.loadTruck ) {
				state.dispatch( setStamp( Date.now() ) ) 
			}
			break

		default:

	}

	// 4 hard debug purpose:
	// if (action.type === 'app/setTimer' ||
	// 		action.type === 'store/remPal' ||
	// 		action.type === 'store/addPal' ||
	// 		action.type === 'app/drag' ||
	// 		action.type === 'app/pick' ||
	// 		action.type === 'app/source' 
	// 		)  {}
	// else { console.log(action) }

	next(action)
}
