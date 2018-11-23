'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var splitShadowString = function splitShadowString(boxShadow) {
  var shadowStrings = boxShadow.split(/x, |t, /).map(function (str, i, array) {
    if (i + 1 < array.length) {
      if (str.match(/inse$/)) {
        return str + 't';
      } else if (str.match(/p$/)) {
        return str + 'x';
      }
    }
    return str;
  }).filter(function (shadow) {
    return shadow.length > 0;
  });

  return shadowStrings;
};

var shadowStringToObject = function shadowStringToObject(shadowString) {
  var matches = shadowString.match(/^([a-z0-9#., ()]+) ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ?(inset)?$/i);

  if (matches && matches.length === 7) {
    return {
      color: matches[1],
      offsetX: parseFloat(matches[2]),
      offsetY: parseFloat(matches[3]),
      blur: parseFloat(matches[4]),
      spread: parseFloat(matches[5]),
      inset: matches[6] !== undefined
    };
  }
};

exports.splitShadowString = splitShadowString;
exports.shadowStringToObject = shadowStringToObject;