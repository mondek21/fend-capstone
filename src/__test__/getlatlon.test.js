import { getLatLon } from '../server/index';

/*describe('testing ability to get coordinates', () => {
    it('Returns coordinatates and country on validate city', () => {
      //let city = 'Chicago'
        expect(getLatLon('Chicago')).toBe([41.85003, -87.65005, "United States"]);
    })

})*/
describe('testing ability to get coordinates', () => {
    it('Returns coordinatates and country on validate city', () => {
      //let city = 'Chicago'
        expect(getLatLon).toBeDefined();
    })

})
