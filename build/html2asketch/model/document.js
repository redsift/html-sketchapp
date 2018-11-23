'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../helpers/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pageToPageReference(page) {
  return {
    '_class': 'MSJSONFileReference',
    '_ref_class': 'MSImmutablePage',
    '_ref': 'pages/' + String(page.getID())
  };
}

function textStyleToSharedStyle(textLayer, id) {
  return {
    '_class': 'sharedStyle',
    'do_objectID': id || (0, _utils.generateID)(),
    name: textLayer._name,
    'style': textLayer._style.toJSON()
  };
}

var Document = function () {
  function Document() {
    _classCallCheck(this, Document);

    this._objectID = (0, _utils.generateID)();
    this._colors = [];
    this._textStyles = [];
    this._pages = [];
  }

  _createClass(Document, [{
    key: 'setName',
    value: function () {
      function setName(name) {
        this._name = name;
      }

      return setName;
    }()
  }, {
    key: 'setId',
    value: function () {
      function setId(id) {
        this._objectID = id;
      }

      return setId;
    }()
  }, {
    key: 'addPage',
    value: function () {
      function addPage(page) {
        this._pages.push(page);
      }

      return addPage;
    }()
  }, {
    key: 'addTextStyle',
    value: function () {
      function addTextStyle(textLayer, id) {
        this._textStyles.push(textStyleToSharedStyle(textLayer, id));
      }

      return addTextStyle;
    }()
  }, {
    key: 'addColor',
    value: function () {
      function addColor(color) {
        this._colors.push((0, _utils.makeColorFromCSS)(color));
      }

      return addColor;
    }()
  }, {
    key: 'toJSON',
    value: function () {
      function toJSON() {
        return {
          '_class': 'document',
          'do_objectID': this._objectID,
          'assets': {
            '_class': 'assetCollection',
            'colors': this._colors
          },
          'currentPageIndex': 0,
          'enableLayerInteraction': true,
          'enableSliceInteraction': true,
          'foreignSymbols': [],
          'layerStyles': {
            '_class': 'sharedStyleContainer',
            'objects': []
          },
          'layerSymbols': {
            '_class': 'symbolContainer',
            'objects': []
          },
          'layerTextStyles': {
            '_class': 'sharedTextStyleContainer',
            'objects': this._textStyles
          },
          'pages': this._pages.map(pageToPageReference)
        };
      }

      return toJSON;
    }()
  }]);

  return Document;
}();

exports['default'] = Document;