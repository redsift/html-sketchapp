'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTextVisible = isTextVisible;
exports.isNodeVisible = isNodeVisible;
function isTextVisible(_ref) {
  var textIndent = _ref.textIndent,
      overflowX = _ref.overflowX,
      overflowY = _ref.overflowY;

  // NOTE overflow:hidden is not needed if text-indent is huge, but how to define 'huge'?
  if (parseFloat(textIndent) < 0 && overflowX === 'hidden' && overflowY === 'hidden') {
    return false;
  }

  return true;
}

function isNodeVisible(node) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.getBoundingClientRect(),
      width = _ref2.width,
      height = _ref2.height;

  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getComputedStyle(node),
      position = _ref3.position,
      overflowX = _ref3.overflowX,
      overflowY = _ref3.overflowY,
      opacity = _ref3.opacity,
      visibility = _ref3.visibility,
      display = _ref3.display,
      clip = _ref3.clip;

  // skip node when display is set to none for itself or an ancestor
  // helps us catch things such as <noscript>
  // HTMLSlotElement has a null offsetParent, but should still be visible
  if (node.tagName !== 'BODY' && node.offsetParent === null && position !== 'fixed' && node.tagName.toLowerCase() !== 'slot') {
    return false;
  }

  if ((width === 0 || height === 0) && overflowX === 'hidden' && overflowY === 'hidden') {
    return false;
  }

  if (display === 'none' || visibility === 'hidden' || visibility === 'collapse' || parseFloat(opacity) < 0.1) {
    return false;
  }

  if (clip === 'rect(0px, 0px, 0px, 0px)' && position === 'absolute') {
    return false;
  }

  // node is detached from the DOM
  if (!node.isConnected) {
    return false;
  }

  var parent = node.parentElement;

  if (parent && parent.nodeName !== 'HTML' && !isNodeVisible(parent)) {
    return false;
  }

  return true;
}