var frisby = require('frisby');

frisby.create('Testing API - Posts')
    .get('http://jsonplaceholder.typicode.com/posts/2')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        "userId": Number,
  		"id": Number,
  		"title": String,
  		"body": String
    }).inspectBody().toss();


frisby.create('Testing API - Existing Users - Test passing')
  .get('http://jsonplaceholder.typicode.com/users/1')
  .expectStatus(200)
    .expectJSONTypes({
      "id": Number,
      "name": String,
      "username": String,
      "email": String
    })
    .expectJSON(
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz"
    })
    .toss();

  frisby.create('Testing API - 404 status expected')
    .get('http://jsonplaceholder.typicode.com/users/500')
    .expectStatus(404)
    .toss();


//Example of test failure

frisby.create('Testing API - Existing Users - Test failure')
  .get('http://jsonplaceholder.typicode.com/users/1')
  .expectStatus(200)
    .expectJSONTypes({
      "id": Number,
      "name": String,
      "username": String,
      "email": String
    })
    .expectJSON(
    {
      "id": 1,
      "name": "Leanne Graham11",
      "username": "Bret",
      "email": "Sincere@april.biz"
    })
    .toss();