import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {
		timer: 0,
		wave_times: [],
		level_times: [],
		levels: [ {waves:1, truckMax:3}, 
						  {waves:2, truckMax:3},
						  {waves:2, truckMax:4} ],

		drag: false,
		source: {},
		picked: {},
	},

  reducers: {

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


export const { dump, drag, pick, source, updateTimer, resetTimer,
							  } = appSlice.actions;

export default appSlice.reducer;

