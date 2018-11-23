'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Parses the background-image. The structure is as follows:
// (Supports images and gradients)
// ---
// <background-image> = <bg-image> [ , <bg-image> ]*
// <bg-image> = <image> | none
// <image> = <url> | <image-list> | <element-reference> | <image-combination> | <gradient>
// ---
// Source: https://www.w3.org/TR/css-backgrounds-3/#the-background-image
// ---
// These functions should be pure to make it easy
// to write test cases in the future.
var parseBackgroundImage = function parseBackgroundImage(value) {
  if (value === 'none') {
    return;
  }

  var urlMatches = value.match(/^url\("(.+)"\)$/i);
  var linearGradientMatches = value.match(/^linear-gradient\((.+)\)$/i);

  if (urlMatches && urlMatches.length === 2) {
    // Image
    return {
      type: 'Image',
      value: urlMatches[1]
    };
  } else if (linearGradientMatches && linearGradientMatches.length === 2) {
    // Linear gradient
    var linearGradientConfig = parseLinearGradient(linearGradientMatches[1]);

    if (linearGradientConfig) {
      return {
        type: 'LinearGradient',
        value: linearGradientConfig
      };
    }
  }
};

// Parser for a linear gradient:
// ---
// <linear-gradient> = linear-gradient(
//   [ [ <angle> | to <side-or-corner> ] ,]?
//   <color-stop>[, <color-stop>]+
// )
//
// <side-or-corner> = [left | right] || [top | bottom]
// ---
// Source: https://www.w3.org/TR/css3-images/#linear-gradients
// ---
// Example: "to top, rgba(67, 90, 111, 0.04), white"
var parseLinearGradient = function parseLinearGradient(value) {
  var parts = [];
  var currentPart = [];
  var i = 0;
  var skipComma = false;

  // There can be commas in colors, carefully break apart the value
  while (i < value.length) {
    var char = value.substr(i, 1);

    if (char === '(') {
      skipComma = true;
    } else if (char === ')') {
      skipComma = false;
    }

    if (char === ',' && !skipComma) {
      parts.push(currentPart.join('').trim());
      currentPart = [];
    } else {
      currentPart.push(char);
    }

    if (i === value.length - 1) {
      parts.push(currentPart.join('').trim());
    }
    i++;
  }

  if (parts.length === 2) {
    // Assume 2 color stops
    return {
      angle: '180deg',
      stops: [parts[0], parts[1]]
    };
  } else if (parts.length > 2) {
    // angle + n stops
    var angle = parts[0],
        stops = parts.slice(1);


    return {
      angle: angle,
      stops: stops
    };
  }

  // Syntax is wrong
  return null;
};

/**
 * @param {string} backgroundSize value of background-size CSS property
 * @param {{width: number, height: number}} imageSize natural size of the image
 * @param {{width: number, height: number}} containerSize size of the container
 * @return {{width: number, height: number}} actual image size
 */
var getActualImageSize = function getActualImageSize(backgroundSize, imageSize, containerSize) {
  var width = void 0,
      height = void 0;

  // sanity check
  if (imageSize.width === 0 || imageSize.height === 0 || containerSize.width === 0 || containerSize.height === 0) {
    width = 0;
    height = 0;
  } else if (backgroundSize === 'cover') {
    if (imageSize.width > imageSize.height) {
      height = containerSize.height;
      width = height / imageSize.height * imageSize.width;
    } else {
      width = containerSize.width;
      height = width / imageSize.width * imageSize.height;
    }
  } else if (backgroundSize === 'contain') {
    if (imageSize.width > imageSize.height) {
      width = containerSize.width;
      height = width / imageSize.width * imageSize.height;
    } else {
      height = containerSize.height;
      width = height / imageSize.height * imageSize.width;
    }
  } else if (backgroundSize === 'auto') {
    width = imageSize.width;
    height = imageSize.height;
  } else {
    // we currently don't support multiple backgrounds
    var _backgroundSize$split = backgroundSize.split(','),
        _backgroundSize$split2 = _slicedToArray(_backgroundSize$split, 1),
        singleBackgroundSize = _backgroundSize$split2[0];

    var _singleBackgroundSize = singleBackgroundSize.trim().split(' '),
        _singleBackgroundSize2 = _slicedToArray(_singleBackgroundSize, 2),
        backgroundSizeWidth = _singleBackgroundSize2[0],
        backgroundSizeHeight = _singleBackgroundSize2[1];

    if (backgroundSizeWidth === 'auto' || backgroundSizeWidth === undefined) {
      backgroundSizeWidth = null;
    } else if (backgroundSizeWidth.endsWith('%')) {
      backgroundSizeWidth = parseFloat(backgroundSizeWidth) / 100 * containerSize.width;
    } else if (backgroundSizeWidth.endsWith('px')) {
      backgroundSizeWidth = parseFloat(backgroundSizeWidth);
    }

    if (backgroundSizeHeight === 'auto' || backgroundSizeHeight === undefined) {
      backgroundSizeHeight = null;
    } else if (backgroundSizeHeight.endsWith('%')) {
      backgroundSizeHeight = parseFloat(backgroundSizeHeight) / 100 * containerSize.height;
    } else if (backgroundSizeHeight.endsWith('px')) {
      backgroundSizeHeight = parseFloat(backgroundSizeHeight);
    }

    if (backgroundSizeWidth !== null && backgroundSizeHeight === null) {
      width = backgroundSizeWidth;
      height = width / imageSize.width * imageSize.height;
    } else if (backgroundSizeWidth === null && backgroundSizeHeight !== null) {
      height = backgroundSizeHeight;
      width = height / imageSize.height * imageSize.width;
    } else if (backgroundSizeWidth !== null && backgroundSizeHeight !== null) {
      width = backgroundSizeWidth;
      height = backgroundSizeHeight;
    }
  }

  return {
    width: width,
    height: height
  };
};

exports.parseBackgroundImage = parseBackgroundImage;
exports.getActualImageSize = getActualImageSize;