import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {

		msg: { text: "", visible: false },

		stamp: 0,
		timer: 0,
		level_times: [],

		level: { current: 2,
						 wave: 0,
						 run: false },

		levels: [ { waves:1, truckMax:1 }, 
						  { waves:2, truckMax:2 },
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

    hideMsg: state => {
			state.msg.visible = false
		},

    showMsg: (state, payload) => {
			state.msg.text = payload.payload.text
			state.msg.visible = true
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
			state.stamp = 0
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
			console.log("===================")
			console.log("APP", JSON.stringify(state, null, 2) )
			console.log("===================")
			// console.log("msg", JSON.stringify(state.msg, null, 2) )
			// console.log("stamp", JSON.stringify(state.stamp, null, 2) )
			// console.log("timer", JSON.stringify(state.timer, null, 2) )
			// console.log("level", JSON.stringify(state.level, null, 2) )
			// console.log("level_times", JSON.stringify(state.level_times) )
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
							 showMsg, hideMsg,
						 } = appSlice.actions;

export default appSlice.reducer;

