// We're not connecting to any peers
// just yet...
var peers = [
'http://localhost:8080/gun'
];
var gun = Gun(peers);

// Create an interface for the `greetings`
// key, storing it in a variable.
var greetings = gun.get('greetings');

// Update the value on `greetings`.
//greetings.put({ hello: 'worlds' });
//console.log(greetings.get('greetings'));
//console.log(greetings.get('hello'));
//console.log(greetings.get('greetings').val());
//console.log(greetings.path('hello'));
console.log(greetings);

// Read the value and listen for
// any changes.
/*
greetings.on(function (data) {
	console.log('Update!', data)
});
*/