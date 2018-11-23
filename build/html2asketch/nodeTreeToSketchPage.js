'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = nodeTreeToSketchPage;

var _artboard = require('./model/artboard');

var _artboard2 = _interopRequireDefault(_artboard);

var _page = require('./model/page');

var _page2 = _interopRequireDefault(_page);

var _nodeTreeToSketchGroup = require('./nodeTreeToSketchGroup');

var _nodeTreeToSketchGroup2 = _interopRequireDefault(_nodeTreeToSketchGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function nodeTreeToSketchPage(node, options) {
  var rootGroup = (0, _nodeTreeToSketchGroup2['default'])(node, options);

  var bcr = node.getBoundingClientRect();
  var page = new _page2['default']({
    width: bcr.right - bcr.left,
    height: bcr.bottom - bcr.top
  });

  if (options && options.addArtboard) {
    var artboard = new _artboard2['default']({
      x: 0,
      y: 0,
      width: rootGroup._width,
      height: rootGroup._height
    });

    artboard.addLayer(rootGroup);

    if (options.artboardName) {
      artboard.setName(options.artboardName);
    }

    page.addLayer(artboard);
  } else {
    page.addLayer(rootGroup);
  }

  if (options && options.pageName) {
    page.setName(options.pageName);
  }

  return page;
}