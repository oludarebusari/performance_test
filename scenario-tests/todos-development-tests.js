// snippet from scenario-tests/todos-development-tests.js
import { developmentConfig } from '../environmentConfig.js';
import http from 'k6/http';
import { group, check } from 'k6'; 

export const options = {
   scenarios: {
     example_scenario: {
       env: developmentConfig(),
       executor: 'shared-iterations',
       vus: 1
     }
   }
 };

export default function () {
   group('API uptime check - development', () => {
       const response = http.get(`${__ENV.BASE_URL}`);
       check(response, {
           "status code should be 200": res => res.status === 200,
       });
   });
}