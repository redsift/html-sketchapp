'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESIZING_CONSTRAINTS = exports.calculateResizingConstraintValue = exports.makeImageFill = exports.makeColorFill = exports.makeColorFromCSS = undefined;
exports.generateID = generateID;

var _normalizeCssColor = require('normalize-css-color');

var _normalizeCssColor2 = _interopRequireDefault(_normalizeCssColor);

var _sketchConstants = require('sketch-constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var lut = [];

for (var i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}

// http://stackoverflow.com/a/21963136
function e7() {
  var d0 = Math.random() * 0xffffffff | 0;
  var d1 = Math.random() * 0xffffffff | 0;
  var d2 = Math.random() * 0xffffffff | 0;
  var d3 = Math.random() * 0xffffffff | 0;

  return String(lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff]) + '-' + String(lut[d1 & 0xff]) + String(lut[d1 >> 8 & 0xff]) + '-' + String(lut[d1 >> 16 & 0x0f | 0x40]) + String(lut[d1 >> 24 & 0xff]) + '-' + String(lut[d2 & 0x3f | 0x80]) + String(lut[d2 >> 8 & 0xff]) + '-' + String(lut[d2 >> 16 & 0xff]) + String(lut[d2 >> 24 & 0xff]) + String(lut[d3 & 0xff]) + String(lut[d3 >> 8 & 0xff]) + String(lut[d3 >> 16 & 0xff]) + String(lut[d3 >> 24 & 0xff]);
}

function generateID() {
  return e7();
}

var safeToLower = function safeToLower(input) {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
var makeColorFromCSS = exports.makeColorFromCSS = function makeColorFromCSS(input) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var nullableColor = (0, _normalizeCssColor2['default'])(safeToLower(input));
  var colorInt = nullableColor === null ? 0x00000000 : nullableColor;

  var _normalizeColor$rgba = _normalizeCssColor2['default'].rgba(colorInt),
      r = _normalizeColor$rgba.r,
      g = _normalizeColor$rgba.g,
      b = _normalizeColor$rgba.b,
      a = _normalizeColor$rgba.a;

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha
  };
};

// Solid color fill
var makeColorFill = exports.makeColorFill = function makeColorFill(cssColor, alpha) {
  return {
    _class: 'fill',
    isEnabled: true,
    color: makeColorFromCSS(cssColor, alpha),
    fillType: 0,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: 1,
    patternTileScale: 1
  };
};

var ensureBase64DataURL = function ensureBase64DataURL(url) {
  var imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

  if (imageData && imageData[3] !== 'base64') {
    // Solve for an NSURL bug that can't handle plaintext data: URLs
    var type = imageData[1];
    var data = decodeURIComponent(imageData[4]);
    var encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
    var buffer = void 0;

    if (encodingMatch) {
      buffer = Buffer.from(data, encodingMatch[1]);
    } else {
      buffer = Buffer.from(data);
    }

    return 'data:' + String(type) + ';base64,' + String(buffer.toString('base64'));
  }

  return url;
};

// patternFillType - 0 1 2 3
var makeImageFill = exports.makeImageFill = function makeImageFill(url) {
  var patternFillType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return {
    _class: 'fill',
    isEnabled: true,
    fillType: _sketchConstants.FillType.Pattern,
    image: {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: 'images/' + String(generateID()),
      url: url.indexOf('data:') === 0 ? ensureBase64DataURL(url) : url
    },
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: patternFillType,
    patternTileScale: 1
  };
};

var containsAllItems = function containsAllItems(needles, haystack) {
  return needles.every(function (needle) {
    return haystack.includes(needle);
  });
};

var calculateResizingConstraintValue = exports.calculateResizingConstraintValue = function calculateResizingConstraintValue() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var noHeight = [RESIZING_CONSTRAINTS.TOP, RESIZING_CONSTRAINTS.BOTTOM, RESIZING_CONSTRAINTS.HEIGHT];
  var noWidth = [RESIZING_CONSTRAINTS.LEFT, RESIZING_CONSTRAINTS.RIGHT, RESIZING_CONSTRAINTS.WIDTH];
  var validValues = Object.values(RESIZING_CONSTRAINTS);

  if (!args.every(function (arg) {
    return validValues.includes(arg);
  })) {
    throw new Error('Unknown resizing constraint');
  } else if (containsAllItems(noHeight, args)) {
    throw new Error('Can\'t fix height when top & bottom are fixed');
  } else if (containsAllItems(noWidth, args)) {
    throw new Error('Can\'t fix width when left & right are fixed');
  }

  return args.length > 0 ? args.reduce(function (acc, item) {
    return acc & item;
  }, args[0]) : RESIZING_CONSTRAINTS.NONE;
};

var RESIZING_CONSTRAINTS = exports.RESIZING_CONSTRAINTS = {
  TOP: 31,
  RIGHT: 62,
  BOTTOM: 55,
  LEFT: 59,
  WIDTH: 61,
  HEIGHT: 47,
  NONE: 63
};