import { createSlice } from '@reduxjs/toolkit';



export const appSlice = createSlice({

  name: 'app',

  initialState: {
		counter: { palletId: 20, truckId: 20 }, 
		drag: false,
		// { name, index }
		source: {},
		picked: {},
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
			state.counter.truckId++ 
		},

    incrementPelletId: state => {
			state.counter.pelletId++
		},

    dump: (state) => {
			console.log("APP", JSON.stringify(state, null, 2) )
		},
	}
})


export const { dump, drag, pick, source,
							 incrementTruckId, incrementPelletId } = appSlice.actions;

export default appSlice.reducer;

