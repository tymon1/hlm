import { createSlice } from '@reduxjs/toolkit';


export const queueSlice = createSlice({
  name: 'queue',

	// naming convention for trucks: 
	// unique id: {unique number >0}
  initialState: {
		trucks: [

			{ id: 1, type: 's', cover: true, 
				pellets: [{id:'p13', c:'red'}] },

			{ id: 2, type: 'm', cover: true, 
				pellets: [{id:'p11', c:'pink'}, {id:'p12', c:'blue'}] },

			{ id: 3, type: 'xl', cover: true, 
				pellets: [{id:'p9', c:'pink'}, {id:'p10', c:'green'}] },
		]
	},

  reducers: {
    add: (state, payload) => {
			state.trucks.push( payload.payload )
		},

    remove: (state, payload) => {
			let id = Number( payload.payload.id )
			let remIndex = state.trucks.findIndex( inx => inx.id === id )
			state.trucks.splice(remIndex, 1)
		},

    sdump: (state) => {
			console.log("queue", JSON.stringify(state.trucks, null, 2) )
		},

	}
})


export const selectCount = (state) => state.trucks

export const { add, remove, sdump } = queueSlice.actions;
export default queueSlice.reducer;
