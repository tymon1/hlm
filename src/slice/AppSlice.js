import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {
		timer: 0,
		level_times: [],

		level: { current: 2,
						 wave: 0,
						 run: false },

		levels: [ { waves:1, truckMax:1 }, 
						  { waves:2, truckMax:1 },
						  { waves:2, truckMax:2 } ],

		drag: false,
		source: {},
		picked: {},
	},


  reducers: {

    runLevel: (state, payload) => {
			state.level.run = payload.payload
		},

    increaseWave: state => {
			state.level.wave++
		},

		// dump
    updateTimer: state => {
			state.timer += 1
		},

    resetTimer: state => {
			state.timer = 0
		},

    drag: (state, payload) => {
			state.drag = payload.payload
		},

    pick: (state, payload) => {
			state.picked = payload.payload
		},

    source: (state, payload) => {
			state.source = payload.payload
		},

    dump: (state) => {
			console.log("APP", JSON.stringify(state, null, 2) )
		},
	},

	// extraReducers: (b) => {
	// 	b.addCase(storeSlice.actions.addQueueTruck, state => {
	// 		state.counter.truckId++ 
	// 	})
	// },

})


export const { runLevel, increaseWave, dump, drag, pick, source, updateTimer, resetTimer,
							  } = appSlice.actions;

export default appSlice.reducer;

