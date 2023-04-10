import { createSlice } from '@reduxjs/toolkit';
// import { storeSlice } from './StoreSlice.js';



export const appSlice = createSlice({

  name: 'app',

  initialState: {

		msg: { text:"Rozpocznij grę", type:"start", visible:true },

		stamp: 0,
		timer: 0,
		level_times: [],
		level_bonuses: [],
		wave_times: [],

		drag: false,
		source: {},
		picked: {},

		level: { 
			preparing: false,
			run: false,
			current: 0,
			          // { index, color }
			color_zone: [],
			wave: 0 
		},

		levels: [ { waves:2, truckMax:1, color_zones: { colorize:false } }, 
						  { waves:2, truckMax:2, color_zones: { colorize:true, count:2 } },
						  { waves:1, truckMax:3, color_zones: { colorize:true, count:4 } },
						  { waves:3, truckMax:2, color_zones: { colorize:false } },
						  { waves:3, truckMax:3, color_zones: { colorize:true, count:3 } },
						  { waves:2, truckMax:4, color_zones: { colorize:true, count:1 } },
						  { waves:3, truckMax:4, color_zones: { colorize:false } },
						  { waves:3, truckMax:5, color_zones: { colorize:true, count:2 } },
						  { waves:3, truckMax:5, color_zones: { colorize:true, count:4 } },
						  { waves:4, truckMax:4, color_zones: { colorize:false } },
						  { waves:4, truckMax:5, color_zones: { colorize:true, count:5 } },
						  { waves:4, truckMax:6, color_zones: { colorize:false } },
						  { waves:5, truckMax:3, color_zones: { colorize:false } } ],

	},


  reducers: {

		colorZonesReset: state => {
			state.level.color_zone = []
		},

		setColorZone: (state, payload) => {
			state.level.color_zone = payload.payload
		},

		setBonusCounter: (state, payload) => {
			let levInx = state.level_bonuses.findIndex( inx => inx.level === payload.payload.level )
			if (levInx === -1) {
				state.level_bonuses.push( {"level":payload.payload.level, "count":1} )
			}
			else {
				state.level_bonuses[levInx].count++
			}
		},

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
			state.msg.type = payload.payload.type
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
							 setBonusCounter,
							 setColorZone, colorZonesReset,
						 } = appSlice.actions;

export default appSlice.reducer;

