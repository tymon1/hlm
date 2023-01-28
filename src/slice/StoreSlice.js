import { createSlice } from '@reduxjs/toolkit';




export const storeSlice = createSlice({

  name: 'store',

  initialState: {

		counter: { palletId: 1, truckId: 1 }, 

		// trucks with load waiting in line for unload
		queue: [],

		docks: [
			{ no: 0, truck: {} },
			{ no: 1, truck: {} },
			{ no: 2, truck: {} }
		],

		ramps: [
			{ no: 0, pallets: [] }, 
			{ no: 1, pallets: [] }, 
			{ no: 2, pallets: [] }
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
		],
	},


  // REDUCERS 
  reducers: {

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

    unparkTruck: (state, payload) => {
			let id = Number(payload.payload.id)
			let rReady = state.docks.findIndex( d => d.truck.id === id )
			if (rReady >= 0) { state.docks[rReady].truck = {} }
		},

    incAmountPalletId: (state, payload) => {
			let cId = state.counter.palletId
			state.counter.palletId = cId + Number( payload.payload.amount )
		},

//////////////////////////////////
		addPal: (state, payload) => {},

		addPalToZone: (state, payload) => {
			let l= payload.payload
			state.zones[l.index].pallets.push( l.pallet ) 
		},

		addPalToRamp: (state, payload) => {
			let l= payload.payload
			state.ramps[l.index].pallets.push( l.pallet ) 
		},

		addPalToTruck: (state, payload) => {
			let l= payload.payload
			state.ramps[l.index].truck.pallets.push( l.pallet ) 
		},

//////////////////////////////////
		remPal: (state, payload) => {},

    remPalFrZone: (state, payload) => {
			let rm = state.zones[payload.payload.index].pallets.findIndex( inx => inx.id === payload.payload.id )
			state.zones[payload.payload.index].pallets.splice(rm, 1)
		},

		remPalFrRamp: (state, payload) => {
			let rm= state.ramps[payload.payload.index].pallets.findIndex( inx => inx.id === payload.payload.id )
			state.ramps[payload.payload.index].pallets.splice(rm, 1)
		},

		remPalFrTruck: (state, payload) => {
			let dockIndex = state.docks.findIndex( d => d.truck.id === Number(payload.payload.index) )
			let rm= state.docks[dockIndex].truck.pallets.findIndex( inx => inx.id === payload.payload.id )
			state.docks[dockIndex].truck.pallets.splice(rm, 1)
		},
		
//////////////////////////////////
		checkTrucks: (state) => {},

		truckOnDockEmpty: (state, payload) => {
			state.docks[ payload.payload.index ].truck.empty = true
		},

//////////////////////////////////
    setMess: (state, payload) => {
			state.mess = payload.payload
		},

    setSorting: (state, payload) => {
			state.sorting = payload.payload
		},

    dump: state => {
			console.log("ALL", JSON.stringify(state, null, 2) )
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
							 truckOnDockEmpty,
							 setSorting,
							 resetZones,
							 setPalletsCounter, setTruckCounter,
							 addPal, addPalToZone, addPalToRamp, addPalToTruck,
							 remPal, remPalFrZone, remPalFrRamp, remPalFrTruck,
							 dump } = storeSlice.actions;

export default storeSlice.reducer;
