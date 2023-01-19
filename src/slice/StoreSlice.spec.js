import storeReducer, {
			 parkTruck, unparkTruck, checkTrucks,
			 addQueueTruck, remQueueTruck, 
} from './StoreSlice.js';


describe('store reducer', () => {

  const initialState = {
		counter: { palletId: 1, truckId: 1 }, 
		queue: [],
		docks: [ { no: 0, truck: {} }, { no: 1, truck: {} }, ],
		ramps: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
		zones: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
	};

  it('should handle initial state', () => {
    expect(storeReducer(undefined, { type: 'unknown' })).toEqual({
		counter: { palletId: 1, truckId: 1 }, 
		queue: [],
		docks: [ { no: 0, truck: {} }, { no: 1, truck: {} }, { no: 2, truck: {} } ],
		ramps: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, { no: 2, pallets: [] }],
		zones: [ { no: 0, pallets: [] }, { no: 1, pallets: [] },{ no: 2, pallets: [] },{ no: 3, pallets: [] },{ no: 4, pallets: [] },{ no: 5, pallets: [] },{ no: 6, pallets: [] },{ no: 7, pallets: [] } ],
    });
  });


  it('should handle adding a truck', () => {
    const actual = storeReducer(initialState, addQueueTruck({ id:4, type:'xl', cover:true, empty:false, pallets:[{id:4, c:"blue"},{id:5, c:"green"}], }));
    expect(actual.queue[0]).toEqual({
			id:4,
			type:'xl',
			cover:true,
			empty:false,
			pallets:[{id:4, c:"blue"},{id:5, c:"green"}],
		});
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
