import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {

		stamp: 0,
		timer: 0,
		level_times: [],

		level: { current: 1,
						 wave: 0,
						 run: false },

		levels: [ { waves:1, truckMax:1 }, 
						  { waves:1, truckMax:3 },
						  { waves:2, truckMax:2 } ],

		drag: false,
		source: {},
		picked: {},
	},


  reducers: {

    saveTimer: state => {
			state.level_times.push( state.timer )
		},

    runLevel: (state, payload) => {
			state.level.run = payload.payload
		},

    increaseWave: state => {
			state.level.wave++
		},

    setTimer: (state, payload) => {
			state.timer = payload.payload 
		},

    setStamp: (state, payload) => {
			state.stamp = payload.payload 
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


export const { runLevel, increaseWave, 
							 dump, drag, pick, source, 
							 setStamp, setTimer, resetTimer,
							 saveTimer,
						 } = appSlice.actions;

export default appSlice.reducer;

