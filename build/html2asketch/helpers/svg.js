'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSVGString = getSVGString;
// based on https://www.w3.org/TR/SVG2/styling.html and defaults taken from Chrome
var SVG_STYLE_PROPERTIES = [
//name, default value
['cx', '0px'], ['cy', '0px'], ['height', 'auto'], ['width', 'auto'], ['x', '0px'], ['y', '0px'], ['r', '0px'], ['rx', 'auto'], ['ry', 'auto'], ['d', 'none'], ['fill', 'rgb(0, 0, 0)'], ['transform', 'none'], ['alignment-baseline', 'auto'], ['baseline-shift', '0px'], ['clip', 'auto'], ['clip-path', 'none'], ['clip-rule', 'nonzero'], ['color', 'rgb(0, 0, 0)'], ['color-interpolation', 'srgb'], ['color-interpolation-filters', 'linearrgb'], ['color-rendering', 'auto'], ['cursor', 'auto'], ['direction', 'ltr'], ['display', 'inline'], ['dominant-baseline', 'auto'], ['fill-opacity', '1'], ['fill-rule', 'nonzero'], ['filter', 'none'], ['flood-color', 'rgb(0, 0, 0)'], ['flood-opacity', '1'], ['font-family', 'Times'], ['font-size', '16px'], ['font-size-adjust', 'none'], ['font-stretch', '100%'], ['font-style', 'normal'], ['font-variant', 'normal'], ['font-weight', '400'], ['glyph-orientation-horizontal', undefined], ['glyph-orientation-vertical', undefined], ['image-rendering', 'auto'], ['letter-spacing', 'normal'], ['lighting-color', 'rgb(255, 255, 255)'], ['marker-end', 'none'], ['marker-mid', 'none'], ['marker-start', 'none'], ['mask', 'none'], ['opacity', '1'], ['overflow', 'visible'], ['pointer-events', 'auto'], ['shape-rendering', 'auto'], ['solid-color', undefined], ['solid-opacity', undefined], ['stop-color', 'rgb(0, 0, 0)'], ['stop-opacity', '1'], ['stroke', 'none'], ['stroke-dasharray', 'none'], ['stroke-dashoffset', '0px'], ['stroke-linecap', 'butt'], ['stroke-linejoin', 'miter'], ['stroke-miterlimit', '4'], ['stroke-opacity', '1'], ['stroke-width', '1px'], ['text-anchor', 'start'], ['text-decoration', 'none solid rgb(0, 0, 0)'], ['text-overflow', 'clip'], ['text-rendering', 'auto'], ['unicode-bidi', 'normal'], ['vector-effect', 'none'], ['visibility', 'visible'], ['white-space', 'normal'], ['word-spacing', '0px'], ['writing-mode', 'horizontal-tb']];

function inlineStyles(node) {
  var styles = getComputedStyle(node);

  SVG_STYLE_PROPERTIES.forEach(function (prop) {
    var propName = prop[0];
    var propDefaultValue = prop[1];
    var propCurrentValue = styles[propName];
    var propAttributeValue = node.getAttribute(propName);

    if (propCurrentValue !== propDefaultValue && propCurrentValue !== propAttributeValue) {
      node.style[propName] = propCurrentValue;
    }
  });
}

function getUseReplacement(node) {
  var href = node.href.baseVal;
  // TODO this will only work for internal references
  var refNode = null;
  var resultNode = null;

  try {
    refNode = document.querySelector(href);
  } catch (e) {
    // ignore
  }

  if (refNode) {
    if (refNode instanceof SVGSymbolElement) {
      resultNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      Array.from(refNode.attributes).forEach(function (attr) {
        return resultNode.setAttribute(attr.name, attr.value);
      });
      Array.from(refNode.cloneNode(true).children).forEach(function (child) {
        return resultNode.appendChild(child);
      });
    } else {
      resultNode = refNode.cloneNode(true);
    }
  }

  return resultNode;
}

// NOTE: this code modifies the original node by inlining all styles
// this is not ideal and probably fixable
function getSVGString(svgNode) {
  var queue = Array.from(svgNode.children);

  while (queue.length) {
    var node = queue.pop();

    if (!(node instanceof SVGElement) || node instanceof SVGDefsElement || node instanceof SVGTitleElement) {
      continue;
    }

    if (node instanceof SVGUseElement) {
      var replacement = getUseReplacement(node);

      if (replacement) {
        node.parentNode.replaceChild(replacement, node);
        queue.push(replacement);
      }
      continue;
    }

    inlineStyles(node);

    Array.from(node.children).forEach(function (child) {
      return queue.push(child);
    });
  }

  return svgNode.outerHTML;
}