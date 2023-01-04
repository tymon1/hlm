import { createSlice } from '@reduxjs/toolkit';


export const queueSlice = createSlice({
  name: 'queue',

  initialState: {
		trucks: [
			{ id: 0, type: 's', cover: true, pellets: [{id:'p13', c:'red'}] },
			{ id: 1, type: 'm', cover: true, pellets: [{id:'p11', c:'pink'}, {id:'p12', c:'blue'}] },
			{ id: 2, type: 'xl', cover: true, pellets: [{id:'p9', c:'pink'}, {id:'p10', c:'green'}] },
		]
	},

  reducers: {
    add: (state, truck) => {
			state.queue.push( truck )
		},

    remove: (state, truck) => {
			let ind = Number( truck.id )
			let remIndex = state.queue.findIndex( inx => inx.id === truck.id )
			state.queue.splice(remIndex, 1)
		}
	}
})


export const selectCount = (state) => state.trucks

export const { add, remove } = queueSlice.actions;
export default queueSlice.reducer;
