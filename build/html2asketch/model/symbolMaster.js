'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function () {
  function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

  return get;
}();

var _utils = require('../helpers/utils');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _symbolInstance = require('./symbolInstance');

var _symbolInstance2 = _interopRequireDefault(_symbolInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SymbolMaster = function (_Base) {
  _inherits(SymbolMaster, _Base);

  function SymbolMaster(_ref) {
    var x = _ref.x,
        y = _ref.y,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? null : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? null : _ref$height;

    _classCallCheck(this, SymbolMaster);

    var _this = _possibleConstructorReturn(this, (SymbolMaster.__proto__ || Object.getPrototypeOf(SymbolMaster)).call(this));

    _this._class = 'symbolMaster';
    _this._x = x;
    _this._y = y;
    _this._width = width;
    _this._height = height;
    _this._symbolID = (0, _utils.generateID)();
    return _this;
  }

  _createClass(SymbolMaster, [{
    key: 'setId',
    value: function () {
      function setId(id) {
        _get(SymbolMaster.prototype.__proto__ || Object.getPrototypeOf(SymbolMaster.prototype), 'setId', this).call(this, id);
        this._symbolID = id;
      }

      return setId;
    }()
  }, {
    key: 'getSymbolInstance',
    value: function () {
      function getSymbolInstance(_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            _ref2$width = _ref2.width,
            width = _ref2$width === undefined ? null : _ref2$width,
            _ref2$height = _ref2.height,
            height = _ref2$height === undefined ? null : _ref2$height;

        // if no size will be requested, use the size of the master symbol
        var _getSize = this.getSize(),
            masterWidth = _getSize.width,
            masterHeight = _getSize.height;

        width = width === null ? masterWidth : width;
        height = height === null ? masterHeight : height;

        return new _symbolInstance2['default']({ x: x, y: y, width: width, height: height, symbolID: this._symbolID });
      }

      return getSymbolInstance;
    }()
  }, {
    key: 'addLayer',
    value: function () {
      function addLayer(layer) {
        //position child layers relatively to the symbol layer
        layer._x -= this._x;
        layer._y -= this._y;

        _get(SymbolMaster.prototype.__proto__ || Object.getPrototypeOf(SymbolMaster.prototype), 'addLayer', this).call(this, layer);
      }

      return addLayer;
    }()
  }, {
    key: 'getSize',
    value: function () {
      function getSize() {
        var width = this._width;
        var height = this._height;

        // if width and height were not explicitly set, fit symbol size to its contents
        if (this._width === null || this._height === null) {
          this._layers.forEach(function (layer) {
            var layerWidth = layer._x + layer._width;
            var layerHeight = layer._y + layer._height;

            if (width < layerWidth) {
              width = layerWidth;
            }
            if (height < layerHeight) {
              height = layerHeight;
            }
          });
        }

        return { width: width, height: height };
      }

      return getSize;
    }()
  }, {
    key: 'toJSON',
    value: function () {
      function toJSON() {
        var obj = _get(SymbolMaster.prototype.__proto__ || Object.getPrototypeOf(SymbolMaster.prototype), 'toJSON', this).call(this);

        var _getSize2 = this.getSize(),
            width = _getSize2.width,
            height = _getSize2.height;

        obj.frame = {
          '_class': 'rect',
          'constrainProportions': false,
          width: width,
          height: height,
          'x': this._x,
          'y': this._y
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

        obj.backgroundColor = {
          '_class': 'color',
          'alpha': 1,
          'blue': 1,
          'green': 1,
          'red': 1
        };

        obj.hasClickThrough = true;
        obj.includeInCloudUpload = true;
        obj.hasBackgroundColor = false;
        obj.includeBackgroundColorInExport = true;
        obj.resizesContent = false;
        obj.includeBackgroundColorInInstance = false;
        obj.symbolID = this._symbolID;
        obj.changeIdentifier = 0;

        return obj;
      }

      return toJSON;
    }()
  }]);

  return SymbolMaster;
}(_base2['default']);

exports['default'] = SymbolMaster;