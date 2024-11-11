import { createSlice } from '@reduxjs/toolkit';


const initialState = {

		counter: { palletId: 2, truckId: 1 }, 

		// location types: truck, ramp, zone
		highlight: 0,
		// bonus_target_pallette: { location: '', zone_no: 100, pid: 0 },

		// trucks with load waiting in line for unload
		queue: [],

		docks: [
			{ no: 0, truck: {} },
			{ no: 1, truck: {} },
			{ no: 2, truck: {} }
		],

		ramps: [
			{ no: 0, ninja:false, pallets: [] }, 
			{ no: 1, ninja:false, pallets: [] }, 
			{ no: 2, ninja:false, pallets: [] }
		],

		// mess means that palletts are mixed
		// within zones
		mess: false,
		// sorting means that player wish to
		// finish level 
		sorting: false,

		// store zones with pallets
		zones: [
			{ no: 0, pallets: [] },
			{ no: 1, pallets: [] },
			{ no: 2, pallets: [] },
			{ no: 3, pallets: [] },
			{ no: 4, pallets: [] },
			{ no: 5, pallets: [] },
			{ no: 6, pallets: [] },
			{ no: 7, pallets: [] },
			{ no: 8, pallets: [] },
		],
}



export const storeSlice = createSlice({

  name: 'store',

  initialState,

  // REDUCERS 
  reducers: {

		storeReset: () => initialState,

    addQueueTruck: (state, payload) => {
			state.queue.push( payload.payload.truck )
		},

		setTruckCounter: state => {
			state.counter.truckId++ 
		},

		resetZones: state => {
			state.zones.forEach( zone => {
				zone.pallets = []
			})
		},

		setPalletsCounter: (state, payload) => {
			state.counter.palletId = payload.payload.newId
		},

    remQueueTruck: (state, payload) => {
			let id = Number( payload.payload.id )
			let remIndex = state.queue.findIndex( inx => inx.id === id )
			state.queue.splice(remIndex, 1)
		},

    parkTruck: (state, payload) => {
			const o = payload.payload
			state.docks[o.index].truck = o.truck
		},

    setTruckCover: (state, payload) => {
			let id = Number(payload.payload.id)
			let cvr = state.docks.findIndex( d => d.truck.id === id )
			state.docks[cvr].truck.cover = payload.payload.cover
		},

    unparkTruck: (state, payload) => {
			let id = Number(payload.payload.id)
			let rReady = state.docks.findIndex( d => d.truck.id === id )
			if (rReady >= 0) { state.docks[rReady].truck = {} }
		},

    rmNinja: (state, payload) => {
			let rampNo = Number(payload.payload.rampInx)
			state.ramps[rampNo].ninja = false
		},

    addNinja: (state, payload) => {
			let rampNo = Number(payload.payload.rampNo)
			state.ramps[rampNo].ninja = true
		},

		resetNinjas: state => {
			state.ramps.forEach( ramp => {
				ramp.ninja = false
			})
		},

    incAmountPalletId: (state, payload) => {
			let cId = state.counter.palletId
			state.counter.palletId = cId + Number( payload.payload.amount )
		},

		// for idiotproof reasons you should 
		// be iterating over all zones & ramps
		// here below
		//
		clearBlink: (state, payload) => {
			let zI = payload.payload.payload.zone_index
			let palId = payload.payload.payload.pal_id
			let palIdx = state.zones[ zI ].pallets.findIndex( pal => pal.id === palId )
			state.zones[ zI ].pallets[ palIdx ].selected = false
		},

		highlightReset: (state) => {
			state.highlight = 0
		},

		highlightInc: (state) => {
			state.highlight++
		},

		highlightPal: (state, payload) => {
			let tr_zInx = state.docks[1].truck.target[payload.payload.h].zone_index
			let tr_paInx = state.docks[1].truck.target[payload.payload.h].pal_id

      let pInx = state.zones[ tr_zInx ].pallets.findIndex( inx => inx.id === tr_paInx )
			if (pInx !== -1) { state.zones[ tr_zInx ].pallets[ pInx ].selected = true }
			else { 
				let ri_pInx = state.ramps[ 1 ].pallets.findIndex( inx => inx.id === tr_paInx ) 
				state.ramps[ 1 ].pallets[ ri_pInx ].selected = true
			}
		},

		selectPallette: (state, payload) => {
      let pInx = state.zones[payload.payload.zone_index].pallets
				.findIndex( inx => inx.id === payload.payload.pal_id )
			if (pInx !== -1) {
				state.zones[payload.payload.zone_index].pallets[pInx].selected = true
			}
			// iteration over all pallettes standing on ramps :(
			else {
				for (let z=0; z<3; z++) {
					if (state.ramps[z].pallets.length > 0) {
						for (let p=0; p<state.ramps[z].pallets.length; p++) {
							if (state.ramps[z].pallets[p].id === payload.payload.pal_id) {
								state.ramps[z].pallets[p].selected = true
							}
						}
					}
				}
			}
		},

		//////////////////////////////////
    //
		// helper, used to mark moving 
		// of selected pallette
		//
		addPal: (state, payload) => {
			// if (payload.payload.pallet.selected) {
			// 	state.bonus_target_pallette.location = payload.payload.name
			// 	state.bonus_target_pallette.zone_no = payload.payload.index
			// 	state.bonus_target_pallette.pid = payload.payload.pallet.id
			// }
		},

		addPalToZone: (state, payload) => {
			let l= payload.payload
			state.zones[l.index].pallets.push( l.pallet ) 
		},

		// add multiple pallets to ramp at once
		dumpPalToRamp: (state, payload) => {
			let no = payload.payload.payload
			let pallets = payload.payload.rampPallets.concat( payload.payload.pallets )
			state.docks[no].truck.pallets = []
			state.ramps[no].pallets = pallets
		},
		
		addPalToRamp: (state, payload) => {
			let l= payload.payload
			state.ramps[l.index].pallets.push( l.pallet ) 
		},

		addPalToTruck: (state, payload) => {
			let l= payload.payload
			let dockIndex = state.docks.findIndex( d => d.truck.id === Number(payload.payload.index) )
			state.docks[dockIndex].truck.pallets.push( l.pallet ) 
		},

//////////////////////////////////
		remPal: (state, payload) => {},

    remPalFrZone: (state, payload) => {
			console.log("rem fr zone payload", payload.payload)
			let rm = state.zones[payload.payload.index].pallets.findIndex( pal => pal.id === payload.payload.pallet.id )
			console.log("rmIndex",rm, payload.payload)
			// state.zones[payload.payload.index].pallets.slice(rm, 1)
			state.zones[payload.payload.index].pallets.splice(rm, 1)
		},

		remPalFrRamp: (state, payload) => {
			let rm= state.ramps[payload.payload.index].pallets.findIndex( pal => pal.id === payload.payload.pallet.id )
			state.ramps[payload.payload.index].pallets.splice(rm, 1)
		},

		remPalFrTruck: (state, payload) => {
			let dockIndex = state.docks.findIndex( d => d.truck.id === Number(payload.payload.index) )
			let rm= state.docks[dockIndex].truck.pallets.findIndex( pal => pal.id === payload.payload.pallet.id )
			state.docks[dockIndex].truck.pallets.splice(rm, 1)
		},
		
//////////////////////////////////

		palletRecover: (state, payload) => {
			let rampInx = payload.payload.rampIndex
			let palInx= state.ramps[rampInx].pallets.findIndex( inx => inx.id === payload.payload.pallet.id )
			let currPc = state.ramps[rampInx].pallets[palInx].recovered
			let incPc = currPc + payload.payload.percent
			state.ramps[rampInx].pallets[palInx].recovered = incPc
		},

//////////////////////////////////
		checkTrucks: (state) => {},

		// former truckOnDockEmpty
		truckOnDockReady: (state, payload) => {
			state.docks[ payload.payload.index ].truck.ready = true
		},

//////////////////////////////////
    setMess: (state, payload) => {
			state.mess = payload.payload
		},

    setSorting: (state, payload) => {
			state.sorting = payload.payload
		},

    dump: state => {
			console.log("STORE", JSON.stringify(state, null, 2) )
		},

  },
	// extraReducers: (b) => {
	// 	b.addCase(appSlice.actions.runLevel, state => {
	// 		state.counter.truckId++ 
	// 	})
	// },
});


//export const selectCount = (state) => state.counter

export const { addQueueTruck, remQueueTruck, 
							 parkTruck, unparkTruck, checkTrucks, setMess,
							 truckOnDockReady,
							 setSorting,
							 resetZones,
							 dumpPalToRamp,
							 selectPallette,

							 clearBlink,
							 highlightPal,
							 highlightInc,
							 highlightReset,

							 storeReset,
							 addNinja,
							 rmNinja,
							 resetNinjas,
							 palletRecover,
							 setTruckCover,
							 setPalletsCounter, setTruckCounter,
							 addPal, addPalToZone, addPalToRamp, addPalToTruck,
							 remPal, remPalFrZone, remPalFrRamp, remPalFrTruck,
							 dump } = storeSlice.actions;

export default storeSlice.reducer;
