// snippet from ./todos-testing.js
import http from 'k6/http';
import { group, check } from 'k6';

export let options = {
  scenarios: {
    example_scenario: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },
    },
  },
};

export default function () {
  let todoID;

  group('Create a Todo', () => {
    const response = http.post(
      'https://todo-app-barkend.herokuapp.com/todos/',
      JSON.stringify({ task: 'write k6 tests' }),
      { headers: { 'Content-Type': 'application/json' } }
    );

    todoID = response.json()._id;

    check(response, {
      'status code should be 200': res => res.status === 200,
      'Response should have created todo': res => res.json().completed === false,
    });
  });

  group('Get a Todo item', () => {
    const response = http.get(`https://todo-app-barkend.herokuapp.com/todos/${todoID}`);

    check(response, {
      'status code should be 200': res => res.status === 200,
      'response should have the created todo': res => res.json()[0]._id === todoID,
      'response should have the correct state': res => res.json()[0].completed === false,
    });
  });
}
