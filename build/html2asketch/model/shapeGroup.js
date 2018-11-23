'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function () {
  function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

  return get;
}();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShapeGroup = function (_Base) {
  _inherits(ShapeGroup, _Base);

  function ShapeGroup(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, ShapeGroup);

    var _this = _possibleConstructorReturn(this, (ShapeGroup.__proto__ || Object.getPrototypeOf(ShapeGroup)).call(this));

    _this._class = 'shapeGroup';
    _this._width = width;
    _this._height = height;
    _this.setPosition({ x: x, y: y });
    return _this;
  }

  _createClass(ShapeGroup, [{
    key: 'setPosition',
    value: function () {
      function setPosition(_ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        this._x = x;
        this._y = y;
      }

      return setPosition;
    }()
  }, {
    key: 'toJSON',
    value: function () {
      function toJSON() {
        var obj = _get(ShapeGroup.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup.prototype), 'toJSON', this).call(this);

        obj.frame = {
          '_class': 'rect',
          'constrainProportions': false,
          'height': this._height,
          'width': this._width,
          'x': this._x,
          'y': this._y
        };

        obj.hasClickThrough = false;
        obj.windingRule = 1;

        return obj;
      }

      return toJSON;
    }()
  }]);

  return ShapeGroup;
}(_base2['default']);

exports['default'] = ShapeGroup;