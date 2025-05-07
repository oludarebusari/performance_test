// snippet from ./environmentConfig.js
export function developmentConfig(filename) {
    let envConfig = {
      BASE_URL: "http://todo-app-barkend.herokuapp.com/todos/",
      // BASE_URL: "http://www.saucedemo.com/",
      ENV: "DEVELOPMENT",
    };
    return Object.assign({}, envConfig, filename);
  }
   export function stagingConfig(filename) {
    let envConfig = {
      BASE_URL: "https://todo-app-barkend.herokuapp.com/todos/",
      // BASE_URL: "https://www.saucedemo.com/",
      ENV: "STAGING",
    };
    return Object.assign({}, envConfig, filename);
  }