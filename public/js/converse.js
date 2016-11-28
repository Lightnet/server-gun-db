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
var gun = Gun(peers).get('tutorial/chat/app');
$('form').on('submit', function (event) {
  event.preventDefault();
  var message = {};
  message.who = $('form').find('input').val();
  message.what = $('form').find('textarea').val();
  message.when = new Date().getTime();
  gun.set(message);
  $('form').find('textarea').val("");
});
gun.map().val(function (message, id) {
  console.log(message);
  if (!message) {
    return;
  }
  var $li = $($('#' + id).get(0) || $('.model').find('.message').clone(true).attr('id', id).appendTo('ul'));
  $li.find('.who').text(message.who);
  $li.find('.what').text(message.what);
  $li.find('.when').text(message.when);
});