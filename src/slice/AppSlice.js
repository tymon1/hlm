import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {

		msg: { text: "Rozpocznij grę", visible: true },

		stamp: 0,
		timer: 0,
		level_times: [],
		wave_times: [],

		drag: false,
		source: {},
		picked: {},

		level: { preparing: false,
						 run: false,
						 current: 0,
						 wave: 0 },

		levels: [ { waves:5, truckMax:1, colorized:true }, 
						  { waves:2, truckMax:2, colorized:false },
						  { waves:1, truckMax:3, colorized:false },
						  { waves:3, truckMax:2, colorized:false },
						  { waves:3, truckMax:3, colorized:false },
						  { waves:2, truckMax:4, colorized:false },
						  { waves:3, truckMax:4, colorized:false },
						  { waves:3, truckMax:5, colorized:false },
						  { waves:3, truckMax:5, colorized:false },
						  { waves:4, truckMax:4, colorized:false },
						  { waves:4, truckMax:5, colorized:false },
						  { waves:4, truckMax:6, colorized:false },
						  { waves:5, truckMax:3, colorized:false } ],

	},


  reducers: {

    saveTimer: (state, payload) => {
			state.wave_times.push( payload.payload )
		},

    runLevel: (state, payload) => {
			state.level.run = payload.payload
		},

		preparingLevel: (state, payload) => {
			state.level.preparing = payload.payload
		},

		increaseLevel: state => {
			state.level.current++
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

    resetWave: state => {
			state.level.wave = 0
		},

    resetTimeResults: state => {
			state.wave_times = [] 
		},

		popTimeSum: state => {
			let sum = 0
			state.wave_times.forEach( time => {
				sum += time
			})
			let eqSum = " ="+sum
			state.wave_times.push(eqSum)
			state.level_times.push(sum)
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
		},
	},

	// extraReducers: (b) => {
	// 	b.addCase(storeSlice.actions.addQueueTruck, state => {
	// 		state.counter.truckId++ 
	// 	})
	// },

})


export const { runLevel, increaseWave, resetWave,
							 dump, drag, pick, source, 
							 setStamp, setTimer, resetTimer,
							 saveTimer, resetTimeResults,
							 increaseLevel,
							 preparingLevel,
							 showMsg, hideMsg,
							 popTimeSum,
						 } = appSlice.actions;

export default appSlice.reducer;

