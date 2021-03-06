//===============================================

//https://github.com/amark/gun/wiki/snippets-(v0.3.x)#savinggetting-images-in-gun

Gun.chain.image = function (img) {
  if (!img.src) {
    return this.val(function (src) {
      img.src = src
    });
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = canvas.toDataURL();
  return this.put(data);
}

Gun.chain.local = function (data, cb, opt) {
  opt = opt || { };
  opt.peers = { };
  return this.put(data, cb, opt)
}

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments)
}

Gun.create = function () {
  return Gun.apply(this, arguments);
};

Gun.chain.live = function(cb, opt){
  return this.on(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.value = function(cb, opt){
  return this.val(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

// connecting to any peers array
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
//console.log(greetings);

gun.get('greetings').each(function (example) {
  console.log(example)
})

// Read the value and listen for
// any changes.
/*
greetings.on(function (data) {
	console.log('Update!', data)
});
*/

// Print the value!
greetings.live(function (update) {
    //console.log('Update:', update)
})
