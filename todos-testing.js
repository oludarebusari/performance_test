// snippet from ./todos-testing.js
i

export let options = {
    scenarios: {
      example_scenario: {
        env: { EXAMPLEVAR: 'testing' },
        tags: { example_tag: 'testing' },
      },
    }
  }

group('Create a Todo', () => {
    const response = http.post('https://todo-app-barkend.herokuapp.com/todos/',
    {"task": "write k6 tests"}
    );
    todoID = response.json()._id;
    check(response, {
        "status code should be 200": res => res.status === 200,
    });
    check(response, {
        "Response should have created todo": res => res.json().completed === false,
    });
})

group('get a todo item', () => {
    const response = http.get(`https://todo-app-barkend.herokuapp.com/todos/${todoID}`
       );
    check(response, {
        "status code should be 200": res => res.status === 200,
    });
    check(response, {
        "response should have the created todo": res => res.json()[0]._id === todoID,
    });
    check(response, {
        "response should have the correct state": res => res.json()[0].completed === false,
    });
   })
