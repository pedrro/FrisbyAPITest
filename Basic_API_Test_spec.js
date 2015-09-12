
var frisby = require('frisby');
var flightId = 1;

var baseURL = 'http://localhost:3000/api/flights/';

frisby.create("Create a new flight")
  .post(baseURL,{
    "data_partida": "2015-10-10",
    "data_chegada": "2015-10-10",
    "numero": "1",
    "origem": "porto alegre",
    "destino": "rio de janeiro",
    "duracao": 0,
    "lugares": 0,
    "companhia": "TAM",
    "id": flightId
  })
  .expectStatus(200)
  .inspectBody()
  .toss();

frisby.create("Verify if fligth exists")
  .get(baseURL+flightId+'/exists')
  .expectStatus(200)
  .expectJSON({
    "exists":true
  })
  .toss();

frisby.create("Verify if doesn't fligth exists")
  .get(baseURL+2+'/exists')
  .expectStatus(200)
  .expectJSON({
    "exists":false
  })
  .toss();

frisby.create("Updating attributes for a exists")
  .put(baseURL+flightId,{
    "data_partida": "2015-10-10",
    "data_chegada": "2015-10-10",
    "numero": "1",
    "origem": "porto alegre",
    "destino": "rio de janeiro",
    "duracao": 0,
    "lugares": 0,
    "companhia": "TAM1",
    "id": flightId
  }, {json:true})
  .expectHeaderContains('Content-Type','json')
  .expectJSON({
    "data_partida": "2015-10-10T00:00:00.000Z",
    "data_chegada": "2015-10-10T00:00:00.000Z",
    "numero": "1",
    "origem": "porto alegre",
    "destino": "rio de janeiro",
    "duracao": 0,
    "lugares": 0,
    "companhia": "TAM1",
    "id": flightId
    })
  .inspectBody()
  .toss();

frisby.create("Delete existing flight")
  .delete(baseURL + flightId)
  .expectStatus(204)
  .toss();
