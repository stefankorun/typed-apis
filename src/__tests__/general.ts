import {GoogleMaps} from "../providers/GoogleMaps";
import {Google} from "../providers/Google";

describe('General usability', () => {

  describe('All scripts load', () => {

    test('GoogleMaps loading', async () => {
      expect(await GoogleMaps.load({
        apiKey: 'api_key'
      })).toBeDefined()
    })
  })

});
