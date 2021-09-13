'use strict';

var crypto = require('crypto');

module.exports = {

  _salt:    'def@au1t5a1t',
  _hashKey: 'hash',
  _expire:  0,
  _expKey:  'expire',

  config: function(options){

    this._salt    = options.salt    || this._salt;
    this._hashKey = options.hashKey || this._hashKey;
    this._expire  = options.expire  || this._expire;
    this._expKey  = options.expKey  || this._expKey;

  },

  resetExpiry: function(){

    this._expire = 0;

  },

  create: function(url){

    var hash;

    if (this._expire !== 0) {

      var expiry = Date.now() + this._expire;

      url += '&' + this._expKey + '=' + expiry;

    }

    hash = crypto.createHash('sha256')
                  .update(url + this._salt)
                  .digest('hex');

    return url += '&' + this._hashKey + '=' + hash;

  },

  check: function(url){

    var expired     = false;
    var hashIndex   = url.indexOf('&' + this._hashKey + '=');
    var hash        = url.slice(hashIndex + this._hashKey.length + 2);
    var testUrl     = url.slice(0, hashIndex);
    var testUrlHash = crypto.createHash('sha256')
                            .update(testUrl + this._salt)
                            .digest('hex');

    if (this._expire !== 0){

      var now      = Date.now();
      var expIndex = url.indexOf('&' + this._expKey + '=');
      var expiry   = url.slice(expIndex + 8, hashIndex);

      if (expiry < now){

        expired = true;

      }

    }

    return (hash === testUrlHash && expired === false);

  }

};
