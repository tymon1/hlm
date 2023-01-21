import storeReducer, {
			 parkTruck, unparkTruck, checkTrucks,
			 addQueueTruck, remQueueTruck, 
			 setTruckCounter, setPalletsCounter,
} from './StoreSlice.js';


describe('store reducer', () => {

  const initialState = {
		counter: { palletId: 1, truckId: 1 }, 
		queue: [],
		docks: [ { no: 0, truck: {} }, { no: 1, truck: {} }, ],
		ramps: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
		mess: false,
		zones: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
	};

  const initialStateWTruck = {
		counter: { palletId: 1, truckId: 1 }, 
		queue: [{
				id:4, 
				type:'xl', 
				cover:true, 
				empty:false, 
				pallets: [
						{id:4, c:"blue"},
						{id:5, c:"green"}
				], 
			}],
		docks: [ { no: 0, truck: {} }, { no: 1, truck: {} }, ],
		ramps: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
		mess: false,
		zones: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, ],
	};

  it('should handle initial state', () => {
    expect(storeReducer(undefined, { type: 'unknown' })).toEqual({
		counter: { palletId: 1, truckId: 1 }, 
		queue: [],
		docks: [ { no: 0, truck: {} }, { no: 1, truck: {} }, { no: 2, truck: {} } ],
		ramps: [ { no: 0, pallets: [] }, { no: 1, pallets: [] }, { no: 2, pallets: [] }],
		mess: false,
		zones: [ { no: 0, pallets: [] }, { no: 1, pallets: [] },{ no: 2, pallets: [] },{ no: 3, pallets: [] },{ no: 4, pallets: [] },{ no: 5, pallets: [] },{ no: 6, pallets: [] },{ no: 7, pallets: [] } ],
    });
  });


  it('should handle adding a truck to queue', () => {

		let truck = { 
			truck: {
				id:4, 
				type:'xl', 
				cover:true, 
				empty:false, 
				pallets: [
						{id:4, c:"blue"},
						{id:5, c:"green"}
				], 
			}
		}
    const actual = storeReducer(initialState, addQueueTruck( truck ));

    expect(actual.queue[0]).toEqual({
			id:4, type:'xl', cover:true, empty:false, pallets:[{id:4, c:"blue"},{id:5, c:"green"}],
		});
  });


  it('should handle increment truckId', () => {
    const actual = storeReducer(initialState, setTruckCounter());
    expect(actual.counter.truckId).toEqual(2);
  });


  it('should handle increment palletId', () => {
    const actual = storeReducer(initialState, setPalletsCounter({ newId: 8 }));
    expect(actual.counter.palletId).toEqual(8);
  });


  it('it should remove a truck from queue', () => {
    const actual = storeReducer(initialStateWTruck, remQueueTruck({id:4}));
    expect(actual).toEqual(initialState);
  });

});
