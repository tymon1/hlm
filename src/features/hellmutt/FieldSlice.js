import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const fieldsSlice = createSlice({

  name: 'store',

  initialState: {

		// naming convention
		// pellets: unique id: p+{unique number}
		ramps: [
			{ no: 0, blocked: true, pellets: [], truck: { id: 3, type: 'm', cover: true, pellets: [{id:'p14', c:'gray'}, {id:'p15', c:'red'}] } },
			{ no: 1, blocked: false, pellets: [], truck: {} },
			{ no: 2, blocked: false, pellets: [], truck: {} },
		],

		fields: [
			{ no: 0, pellets: [{id:'p1', c:'red'}, {id:'p2', c:'orange'}, {id:'p7', c:'white'}, {id:'p6', c:'purple'}, {id:'p3', c:'brown'}] },
			{ no: 1, pellets: [] },
			{ no: 2, pellets: [{id:'p4', c:'black'}, {id:'p5', c:'green'}] },
			{ no: 3, pellets: [{id:'p8', c:'blue'}] },
			{ no: 4, pellets: [] },
			{ no: 5, pellets: [] },
			{ no: 6, pellets: [] },
			{ no: 7, pellets: [] },
		],
	},


  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    movePellet: (state, pellet) => {
			const { payload } = pellet
			let fromInd = Number( payload.fromField )
			let toInd = Number( payload.toField )
			let remIndex = state.fields[fromInd].pellets.findIndex( inx => inx.id === payload.id )
			state.fields[toInd].pellets.push( state.fields[fromInd].pellets.splice(remIndex, 1)[0] )
    },

    sdump: (state) => {
			console.log( JSON.stringify(state.fields) )
			//console.log(state)
		},

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.counter += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});


//export const selectCount = (state) => state.counter

export const { movePellet, increment, sdump } = fieldsSlice.actions;
export default fieldsSlice.reducer;
