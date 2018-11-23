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

var Page = function (_Base) {
  _inherits(Page, _Base);

  function Page(_ref) {
    var width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

    _this._class = 'page';
    _this._width = width;
    _this._height = height;
    return _this;
  }

  _createClass(Page, [{
    key: 'toJSON',
    value: function () {
      function toJSON() {
        var obj = _get(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'toJSON', this).call(this);

        obj.frame = {
          '_class': 'rect',
          'constrainProportions': false,
          'height': this._height,
          'width': this._width,
          'x': 0,
          'y': 0
        };

        obj.style = {
          '_class': 'style',
          'endDecorationType': 0,
          'miterLimit': 10,
          'startDecorationType': 0
        };

        obj.horizontalRulerData = {
          '_class': 'rulerData',
          'base': 0,
          'guides': []
        };
        obj.verticalRulerData = {
          '_class': 'rulerData',
          'base': 0,
          'guides': []
        };

        obj.hasClickThrough = true;
        obj.includeInCloudUpload = true;

        return obj;
      }

      return toJSON;
    }()
  }]);

  return Page;
}(_base2['default']);

exports['default'] = Page;