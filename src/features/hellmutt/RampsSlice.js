import { createSlice } from '@reduxjs/toolkit';


export const rampsSlice = createSlice({

  name: 'ramps',

  initialState: {
		ramps: [
			{ id: 0, blocked: false, truck: false },
			{ id: 1, blocked: false, truck: false },
			{ id: 2, blocked: false, truck: false },
		]
	},

  reducers: {
    occupy: (state, rampId) => {
			state.ramp[rampId].blocked = true
		},

    free: (state, rampId) => {
			state.ramp[rampId].blocked = false
		},

    dumpr: (state) => {
			console.log( JSON.stringify(state) )
		},
	},

})

export const { occupy, free, dumpr } = rampsSlice.actions;
export default rampsSlice.reducer;
