'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Some websites or component libraries use font-family lists starting with OS-specific fonts.
// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
// Sketch is capable of.

var SYSTEM_FONTS = [
// Apple
'-apple-system', 'BlinkMacSystemFont',

// Microsoft
'Segoe UI',

// Android
'Roboto'];

// INPUT: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
// OUTPUT: Helvetica Neue
function getFirstFont(fonts, skipSystemFonts) {
  var regularFont = undefined;
  var systemFont = undefined;

  fonts.split(',').forEach(function (font) {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}

var TextStyle = function () {
  function TextStyle(_ref) {
    var color = _ref.color,
        fontSize = _ref.fontSize,
        fontFamily = _ref.fontFamily,
        fontWeight = _ref.fontWeight,
        lineHeight = _ref.lineHeight,
        letterSpacing = _ref.letterSpacing,
        textTransform = _ref.textTransform,
        textDecoration = _ref.textDecoration,
        textAlign = _ref.textAlign,
        skipSystemFonts = _ref.skipSystemFonts;

    _classCallCheck(this, TextStyle);

    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this._lineHeight = lineHeight;
    this._letterSpacing = letterSpacing;
    this._fontWeight = fontWeight;
    this._textTransform = textTransform;
    this._textDecoration = textDecoration;
    this._textAlign = textAlign;
  }

  _createClass(TextStyle, [{
    key: 'toJSON',
    value: function () {
      function toJSON() {
        var result = {
          'color': this._color,
          'fontSize': this._fontSize,
          'fontFamily': this._fontFamily,
          'fontWeight': this._fontWeight,
          'lineHeight': this._lineHeight,
          'textDecoration': this._textDecoration,
          'textAlign': this._textAlign
        };

        if (this._letterSpacing !== undefined) {
          result.letterSpacing = this._letterSpacing;
        }

        if (this._textTransform !== undefined) {
          result.textTransform = this._textTransform;
        }

        return result;
      }

      return toJSON;
    }()
  }]);

  return TextStyle;
}();

exports['default'] = TextStyle;