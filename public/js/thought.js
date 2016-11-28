Gun.chain.image = function (img) {
  if (!img.src) {
    return this.val(function (src) {
      img.src = src;
    });
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = canvas.toDataURL();
  return this.put(data);
};

Gun.chain.local = function (data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return this.put(data, cb, opt);
};

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments);
};

Gun.create = function () {
  return Gun.apply(this, arguments);
};

Gun.chain.live = function (cb, opt) {
  return this.on(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

var peers = ['http://localhost:8080/gun'];
var gun = Gun(peers).get('thoughts');
$('form').on('submit', function (event) {
  event.preventDefault();
  var msg = {};
  msg.txt = $('input').val();
  gun.set(msg);
  $('input').val("");
});

gun.get('thoughts').each(function (example) {
  console.log(example);
});

/*
gun.on().map(function(thought, id){
	var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
	//console.log(id);
	//console.log(thought);
	if(thought){
		$(li).text(thought['txt']);
	} else {
		//console.log(thought);
		$(li).hide();
	}
});
*/
$('body').on('dblclick', 'li', function (event) {
  gun.path(this.id).put(null);
});