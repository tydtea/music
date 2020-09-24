module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1600931936535, function(require, module, exports) {
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-01-20
 * @author Liang <liang@maichong.it>
 */



var numbers = '0123456789';
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var specials = '~!@#$%^*()_+-=[]{}|;:,./<>?';

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
function random(length, options) {
  length || (length = 8);
  options || (options = {});

  var chars = '';
  var result = '';

  if (options === true) {
    chars = numbers + letters + specials;
  } else if (typeof options == 'string') {
    chars = options;
  } else {
    if (options.numbers !== false) {
      chars += (typeof options.numbers == 'string') ? options.numbers : numbers;
    }

    if (options.letters !== false) {
      chars += (typeof options.letters == 'string') ? options.letters : letters;
    }

    if (options.specials) {
      chars += (typeof options.specials == 'string') ? options.specials : specials;
    }
  }

  while (length > 0) {
    length--;
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

module.exports = random.default = random;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1600931936535);
})()
//# sourceMappingURL=index.js.map