import { createSlice } from '@reduxjs/toolkit';



export const dropSlice = createSlice({

  name: 'user',

  initialState: {
		pelletId: 20,
		truckId: 20,
		drag: false,
		// obj
		picked: {},
		// { name, index }
		source: {}
	},

  reducers: {
    drag: (state, payload) => {
			state.drag = payload.payload
		},

    pick: (state, payload) => {
			state.picked = payload.payload
		},

    source: (state, payload) => {
			state.source = payload.payload
		},

    incrementTruckId: state => {
			state.truckId++ 
		},

    incrementPelletId: state => {
			state.pelletId++
		},

    sdump: (state) => {
			console.log("user", JSON.stringify(state) )
		},
	}
})


export const { sdump, drag, pick, source,
							 incrementTruckId, incrementPelletId } = dropSlice.actions;

export default dropSlice.reducer;

