"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupBCR = getGroupBCR;
// TODO: should probably also take into account children of each node
function getGroupBCR(nodes) {
  var groupBCR = nodes.reduce(function (result, node) {
    var bcr = node.getBoundingClientRect();
    var left = bcr.left,
        top = bcr.top,
        right = bcr.right,
        bottom = bcr.bottom;

    var width = bcr.right - bcr.left;
    var height = bcr.bottom - bcr.top;

    if (width === 0 && height === 0) {
      return result;
    }

    if (!result) {
      return { left: left, top: top, right: right, bottom: bottom };
    }

    if (left < result.left) {
      result.left = left;
    }

    if (top < result.top) {
      result.top = top;
    }

    if (right > result.right) {
      result.right = right;
    }

    if (bottom > result.bottom) {
      result.bottom = bottom;
    }

    return result;
  }, null);

  if (groupBCR === null) {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0
    };
  }

  return {
    left: groupBCR.left,
    top: groupBCR.top,
    right: groupBCR.right,
    bottom: groupBCR.bottom,
    width: groupBCR.right - groupBCR.left,
    height: groupBCR.bottom - groupBCR.top
  };
}