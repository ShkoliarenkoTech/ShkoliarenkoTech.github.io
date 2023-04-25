var button = document.querySelector('#start-button');
var output = document.querySelector('#output');
var output_2 = document.querySelector('#output-2');

button.addEventListener('click', function () {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor
  const p = new Promise(function (resolve, reject) {
    setTimeout(function () { // <- Store this INSIDE the Promise you created!
      // Resolve the following URL: https://swapi.tech/api/people/1
      fetch('https://swapi.tech/api/people/1')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          output.innerText = data.result.properties.name;
          console.log(data.result.properties.name);
        })
      resolve();
    }, 3000);
  })
    .catch(error => console.log('ERROR'))

  const p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      fetch('https://httpbin.org/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          person: {
            name: 'Max',
            age: 28
          }
        })
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data);
          output_2.innerText = data.json.person.name;
          console.log(data.json.person.name);
        })
      resolve();
    }, 3000);
  })
    .catch(error => console.log('ERROR'))

  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)

  // Handle the response of the fetch() call and extract the JSON data, return that
  // and handle it in yet another then() block

  // Finally, output the "name" property of the data you got back (e.g. data.name) inside
  // the "output" element (see variables at top of the file)

  // Repeat the exercise with a PUT request you send to https://httpbin.org/put
  // Make sure to set the appropriate headers 
  // Send any data of your choice, make sure to access it correctly when outputting it
  // Example: If you send {person: {name: 'Max', age: 28}}, you access data.json.person.name
  // to output the name (assuming your parsed JSON is stored in "data")

  // To finish the assignment, add an error to URL and add handle the error both as
  // a second argument to then() as well as via the alternative taught in the module
});