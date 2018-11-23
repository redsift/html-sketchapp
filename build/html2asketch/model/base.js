'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../helpers/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_USER_INFO_SCOPE = 'html-sketchapp';

var Base = function () {
  function Base() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        id = _ref.id;

    _classCallCheck(this, Base);

    this._class = null;
    this._layers = [];
    this._style = null;
    this._objectID = id || (0, _utils.generateID)();
    this._name = '';
    this._userInfo = null;
    this.setResizingConstraint(_utils.RESIZING_CONSTRAINTS.NONE);
    this.setHasClippingMask(false);
  }

  _createClass(Base, [{
    key: 'setFixedWidthAndHeight',
    value: function () {
      function setFixedWidthAndHeight() {
        this.setResizingConstraint(_utils.RESIZING_CONSTRAINTS.WIDTH, _utils.RESIZING_CONSTRAINTS.HEIGHT);
      }

      return setFixedWidthAndHeight;
    }()
  }, {
    key: 'setResizingConstraint',
    value: function () {
      function setResizingConstraint() {
        this._resizingConstraint = _utils.calculateResizingConstraintValue.apply(undefined, arguments);
      }

      return setResizingConstraint;
    }()
  }, {
    key: 'getID',
    value: function () {
      function getID() {
        return this._objectID;
      }

      return getID;
    }()
  }, {
    key: 'setId',
    value: function () {
      function setId(id) {
        this._objectID = id;
      }

      return setId;
    }()

    // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
    // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
    // by default however we use "html-sketchapp" here which won't work directly with any plugin
    // but can still be accessed via native API: layer.userInfo()['html-sketchapp']

  }, {
    key: 'setUserInfo',
    value: function () {
      function setUserInfo(key, value) {
        var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_USER_INFO_SCOPE;

        this._userInfo = this._userInfo || {};
        this._userInfo[scope] = this._userInfo[scope] || {};
        this._userInfo[scope][key] = value;
      }

      return setUserInfo;
    }()
  }, {
    key: 'getUserInfo',
    value: function () {
      function getUserInfo(key) {
        var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_USER_INFO_SCOPE;

        return this._userInfo && this._userInfo[scope] && this._userInfo[scope][key];
      }

      return getUserInfo;
    }()
  }, {
    key: 'setName',
    value: function () {
      function setName(name) {
        this._name = name;
      }

      return setName;
    }()
  }, {
    key: 'addLayer',
    value: function () {
      function addLayer(layer) {
        this._layers.push(layer);
      }

      return addLayer;
    }()
  }, {
    key: 'setStyle',
    value: function () {
      function setStyle(style) {
        this._style = style;
      }

      return setStyle;
    }()
  }, {
    key: 'setHasClippingMask',
    value: function () {
      function setHasClippingMask(hasClippingMask) {
        this._hasClippingMask = hasClippingMask;
      }

      return setHasClippingMask;
    }()
  }, {
    key: 'toJSON',
    value: function () {
      function toJSON() {
        if (!this._class) {
          throw new Error('Class not set.');
        }

        var result = {
          '_class': this._class,
          'do_objectID': this._objectID,
          'exportOptions': {
            '_class': 'exportOptions',
            'exportFormats': [],
            'includedLayerIds': [],
            'layerOptions': 0,
            'shouldTrim': false
          },
          'isFlippedHorizontal': false,
          'isFlippedVertical': false,
          'isLocked': false,
          'isVisible': true,
          'layerListExpandedType': 0,
          'name': this._name || this._class,
          'nameIsFixed': false,
          'resizingConstraint': this._resizingConstraint,
          'resizingType': 0,
          'rotation': 0,
          'shouldBreakMaskChain': false,
          'layers': this._layers.map(function (layer) {
            return layer.toJSON();
          }),
          'clippingMaskMode': 0,
          'hasClippingMask': this._hasClippingMask
        };

        if (this._userInfo) {
          result.userInfo = this._userInfo;
        }

        if (this._style) {
          result.style = this._style.toJSON();
        }

        return result;
      }

      return toJSON;
    }()
  }]);

  return Base;
}();

exports['default'] = Base;