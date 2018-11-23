'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SVG = function (_Base) {
  _inherits(SVG, _Base);

  function SVG(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        rawSVGString = _ref.rawSVGString;

    _classCallCheck(this, SVG);

    var _this = _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).call(this));

    _this._rawSVGString = rawSVGString;
    _this._width = width;
    _this._height = height;
    _this._x = x;
    _this._y = y;
    return _this;
  }

  _createClass(SVG, [{
    key: 'toJSON',
    value: function () {
      function toJSON() {
        // NOTE: this is a non-standard extension of the .sketch format
        return {
          _class: 'svg',
          rawSVGString: this._rawSVGString,
          width: this._width,
          height: this._height,
          x: this._x,
          y: this._y,
          resizingConstraint: this._resizingConstraint,
          hasClippingMask: this._hasClippingMask
        };
      }

      return toJSON;
    }()
  }]);

  return SVG;
}(_base2['default']);

exports['default'] = SVG;