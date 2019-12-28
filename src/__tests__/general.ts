import {Facebook} from "../providers/Facebook";
import {Microsoft} from "../providers/Microsoft";
import {GoogleMaps} from "../providers/GoogleMaps";
import {Google} from "../providers/Google";

describe('General usability', () => {

  describe('All scripts load', () => {

    test('Facebook loading', async () => {
      expect(await Facebook.load({
        apiKey: 'api_key',
        appId: 'n/a'
      })).toBeDefined()
    });
    test('Microsoft loading', async () => {
      expect(await Microsoft.load({
        apiKey: 'api_key',
        appId: 'n/a'
      })).toBeDefined()
    });
    test('GoogleMaps loading', async () => {
      expect(await GoogleMaps.load({
        apiKey: 'api_key',
        language: 'en'
      })).toBeDefined()
    });
    test('Google loading', async () => {
      expect(await Google.load({
        apiKey: 'api_key',
      })).toBeDefined()
    });
  })
});
