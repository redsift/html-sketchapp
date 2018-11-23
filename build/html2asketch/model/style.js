'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../helpers/utils');

var _convertAngleToFromAndTo = require('../helpers/convertAngleToFromAndTo');

var _convertAngleToFromAndTo2 = _interopRequireDefault(_convertAngleToFromAndTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
  function Style() {
    _classCallCheck(this, Style);

    this._fills = [];
    this._borders = [];
    this._shadows = [];
    this._innerShadows = [];
    this._opacity = '1';
  }

  _createClass(Style, [{
    key: 'addColorFill',
    value: function () {
      function addColorFill(color, opacity) {
        this._fills.push((0, _utils.makeColorFill)(color, opacity));
      }

      return addColorFill;
    }()
  }, {
    key: 'addGradientFill',
    value: function () {
      function addGradientFill(_ref) {
        var angle = _ref.angle,
            stops = _ref.stops;

        var _convertAngleToFromAn = (0, _convertAngleToFromAndTo2['default'])(angle),
            from = _convertAngleToFromAn.from,
            to = _convertAngleToFromAn.to;

        this._fills.push({
          _class: 'fill',
          isEnabled: true,
          // Not sure why there is a color here
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0.847,
            green: 0.847,
            red: 0.847
          },
          fillType: 1,
          gradient: {
            _class: 'gradient',
            elipseLength: 0,
            from: '{' + String(from.x) + ', ' + String(from.y),
            gradientType: 0,
            shouldSmoothenOpacity: false,
            stops: stops.map(function (stopColor, index) {
              return {
                _class: 'gradientStop',
                color: (0, _utils.makeColorFromCSS)(stopColor),
                position: index
              };
            }),
            to: '{' + String(to.x) + ', ' + String(to.y) + '}'
          },
          noiseIndex: 0,
          noiseIntensity: 0,
          patternFillType: 1,
          patternTileScale: 1
        });
      }

      return addGradientFill;
    }()
  }, {
    key: 'addImageFill',
    value: function () {
      function addImageFill(image) {
        var fill = (0, _utils.makeImageFill)(image);

        this._fills.push(fill);
      }

      return addImageFill;
    }()
  }, {
    key: 'addBorder',
    value: function () {
      function addBorder(_ref2) {
        var color = _ref2.color,
            thickness = _ref2.thickness;

        this._borders.push({
          _class: 'border',
          isEnabled: true,
          color: (0, _utils.makeColorFromCSS)(color),
          fillType: 0,
          position: 1,
          thickness: thickness
        });
      }

      return addBorder;
    }()
  }, {
    key: 'addShadow',
    value: function () {
      function addShadow(_ref3) {
        var _ref3$color = _ref3.color,
            color = _ref3$color === undefined ? '#000' : _ref3$color,
            _ref3$blur = _ref3.blur,
            blur = _ref3$blur === undefined ? 1 : _ref3$blur,
            _ref3$offsetX = _ref3.offsetX,
            offsetX = _ref3$offsetX === undefined ? 0 : _ref3$offsetX,
            _ref3$offsetY = _ref3.offsetY,
            offsetY = _ref3$offsetY === undefined ? 0 : _ref3$offsetY,
            _ref3$spread = _ref3.spread,
            spread = _ref3$spread === undefined ? 0 : _ref3$spread;

        this._shadows.push({
          _class: 'shadow',
          isEnabled: true,
          blurRadius: blur,
          color: (0, _utils.makeColorFromCSS)(color),
          contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: 1
          },
          offsetX: offsetX,
          offsetY: offsetY,
          spread: spread
        });
      }

      return addShadow;
    }()
  }, {
    key: 'addInnerShadow',
    value: function () {
      function addInnerShadow(_ref4) {
        var _ref4$color = _ref4.color,
            color = _ref4$color === undefined ? '#000' : _ref4$color,
            _ref4$blur = _ref4.blur,
            blur = _ref4$blur === undefined ? 0 : _ref4$blur,
            _ref4$offsetX = _ref4.offsetX,
            offsetX = _ref4$offsetX === undefined ? 0 : _ref4$offsetX,
            _ref4$offsetY = _ref4.offsetY,
            offsetY = _ref4$offsetY === undefined ? 0 : _ref4$offsetY,
            _ref4$spread = _ref4.spread,
            spread = _ref4$spread === undefined ? 0 : _ref4$spread;

        this._innerShadows.push({
          _class: 'innerShadow',
          isEnabled: true,
          blurRadius: blur,
          color: (0, _utils.makeColorFromCSS)(color),
          contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: 1
          },
          offsetX: offsetX,
          offsetY: offsetY,
          spread: spread
        });
      }

      return addInnerShadow;
    }()
  }, {
    key: 'addOpacity',
    value: function () {
      function addOpacity(opacity) {
        this._opacity = opacity;
      }

      return addOpacity;
    }()
  }, {
    key: 'toJSON',
    value: function () {
      function toJSON() {
        return {
          _class: 'style',
          fills: this._fills,
          borders: this._borders,
          shadows: this._shadows,
          innerShadows: this._innerShadows,
          endDecorationType: 0,
          miterLimit: 10,
          startDecorationType: 0,
          contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: this._opacity
          }
        };
      }

      return toJSON;
    }()
  }]);

  return Style;
}();

exports['default'] = Style;