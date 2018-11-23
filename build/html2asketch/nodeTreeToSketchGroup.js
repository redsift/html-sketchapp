'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = nodeTreeToSketchGroup;

var _group = require('./model/group');

var _group2 = _interopRequireDefault(_group);

var _style = require('./model/style');

var _style2 = _interopRequireDefault(_style);

var _nodeToSketchLayers = require('./nodeToSketchLayers');

var _nodeToSketchLayers2 = _interopRequireDefault(_nodeToSketchLayers);

var _visibility = require('./helpers/visibility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function nodeTreeToSketchGroup(node, options) {
  var bcr = node.getBoundingClientRect();
  var left = bcr.left,
      top = bcr.top;

  var width = bcr.right - bcr.left;
  var height = bcr.bottom - bcr.top;

  // Collect layers for the node level itself
  var layers = (0, _nodeToSketchLayers2['default'])(node, Object.assign({}, options, { layerOpacity: false })) || [];

  if (node.nodeName !== 'svg') {
    // Recursively collect child groups for child nodes
    Array.from(node.children).filter(function (node) {
      return (0, _visibility.isNodeVisible)(node);
    }).forEach(function (childNode) {
      layers.push(nodeTreeToSketchGroup(childNode, options));

      // Traverse the shadow DOM if present
      if (childNode.shadowRoot) {
        Array.from(childNode.shadowRoot.children).filter(function (node) {
          return (0, _visibility.isNodeVisible)(node);
        }).map(nodeTreeToSketchGroup).forEach(function (layer) {
          return layers.push(layer);
        });
      }
    });
  }

  // Now build a group for all these children

  var styles = getComputedStyle(node);
  var opacity = styles.opacity;


  var group = new _group2['default']({ x: left, y: top, width: width, height: height });
  var groupStyle = new _style2['default']();

  groupStyle.addOpacity(opacity);
  group.setStyle(groupStyle);

  layers.forEach(function (layer) {
    // Layer positions are relative, and as we put the node position to the group,
    // we have to shift back the layers by that distance.
    layer._x -= left;
    layer._y -= top;

    group.addLayer(layer);
  });

  // Set the group name to the node's name, unless there is a name provider in the options

  if (options && options.getGroupName) {
    group.setName(options.getGroupName(node));
  } else {
    group.setName('(' + String(node.nodeName.toLowerCase()) + ')');
  }

  return group;
}