'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = nodeToSketchLayers;

var _rectangle = require('./model/rectangle');

var _rectangle2 = _interopRequireDefault(_rectangle);

var _bitmap = require('./model/bitmap');

var _bitmap2 = _interopRequireDefault(_bitmap);

var _svg = require('./model/svg');

var _svg2 = _interopRequireDefault(_svg);

var _shapeGroup = require('./model/shapeGroup');

var _shapeGroup2 = _interopRequireDefault(_shapeGroup);

var _group = require('./model/group');

var _group2 = _interopRequireDefault(_group);

var _style = require('./model/style');

var _style2 = _interopRequireDefault(_style);

var _text = require('./model/text');

var _text2 = _interopRequireDefault(_text);

var _textStyle = require('./model/textStyle');

var _textStyle2 = _interopRequireDefault(_textStyle);

var _createXPathFromElement = require('./helpers/createXPathFromElement');

var _createXPathFromElement2 = _interopRequireDefault(_createXPathFromElement);

var _background = require('./helpers/background');

var _shadow = require('./helpers/shadow');

var _svg3 = require('./helpers/svg');

var _bcr = require('./helpers/bcr');

var _text3 = require('./helpers/text');

var _visibility = require('./helpers/visibility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_VALUES = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  backgroundImage: 'none',
  borderWidth: '0px',
  boxShadow: 'none'
};

function hasOnlyDefaultStyles(styles) {
  return Object.keys(DEFAULT_VALUES).every(function (key) {
    var defaultValue = DEFAULT_VALUES[key];
    var value = styles[key];

    return defaultValue === value;
  });
}

function fixBorderRadius(borderRadius, width, height) {
  var matches = borderRadius.match(/^([0-9.]+)(.+)$/);

  // Sketch uses 'px' units for border radius, so we need to convert % to px
  if (matches && matches[2] === '%') {
    var baseVal = Math.max(width, height);
    var percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);

    return Math.round(percentageApplied);
  }
  return parseInt(borderRadius, 10);
}

function isSVGDescendant(node) {
  return node instanceof SVGElement && node.matches('svg *');
}

/**
 * @param {string} fontWeight font weight as provided by the browser
 * @return {number} normalized font weight
 */
function parseFontWeight(fontWeight) {
  // Support 'bold' and 'normal' for Electron compatibility.
  if (fontWeight === 'bold') {
    return 700;
  } else if (fontWeight === 'normal') {
    return 400;
  }
  return parseInt(fontWeight, 10);
}

function nodeToSketchLayers(node, options) {
  var layers = [];
  var bcr = node.getBoundingClientRect();
  var left = bcr.left,
      top = bcr.top;

  var width = bcr.right - bcr.left;
  var height = bcr.bottom - bcr.top;

  var styles = getComputedStyle(node);
  var backgroundColor = styles.backgroundColor,
      backgroundImage = styles.backgroundImage,
      backgroundPositionX = styles.backgroundPositionX,
      backgroundPositionY = styles.backgroundPositionY,
      backgroundSize = styles.backgroundSize,
      borderColor = styles.borderColor,
      borderWidth = styles.borderWidth,
      borderTopWidth = styles.borderTopWidth,
      borderRightWidth = styles.borderRightWidth,
      borderBottomWidth = styles.borderBottomWidth,
      borderLeftWidth = styles.borderLeftWidth,
      borderTopColor = styles.borderTopColor,
      borderRightColor = styles.borderRightColor,
      borderBottomColor = styles.borderBottomColor,
      borderLeftColor = styles.borderLeftColor,
      borderTopLeftRadius = styles.borderTopLeftRadius,
      borderTopRightRadius = styles.borderTopRightRadius,
      borderBottomLeftRadius = styles.borderBottomLeftRadius,
      borderBottomRightRadius = styles.borderBottomRightRadius,
      fontFamily = styles.fontFamily,
      fontWeight = styles.fontWeight,
      fontSize = styles.fontSize,
      lineHeight = styles.lineHeight,
      letterSpacing = styles.letterSpacing,
      color = styles.color,
      textTransform = styles.textTransform,
      textDecorationLine = styles.textDecorationLine,
      textAlign = styles.textAlign,
      justifyContent = styles.justifyContent,
      display = styles.display,
      boxShadow = styles.boxShadow,
      opacity = styles.opacity,
      whiteSpace = styles.whiteSpace;

  // skip SVG child nodes as they are already covered by `new SVG(…)`

  if (isSVGDescendant(node)) {
    return layers;
  }

  if (!(0, _visibility.isNodeVisible)(node, bcr, styles)) {
    return layers;
  }

  var shapeGroup = new _shapeGroup2['default']({ x: left, y: top, width: width, height: height });

  if (options && options.getRectangleName) {
    shapeGroup.setName(options.getRectangleName(node));
  } else {
    shapeGroup.setName((0, _createXPathFromElement2['default'])(node));
  }

  var isImage = node.nodeName === 'IMG' && node.currentSrc;
  var isSVG = node.nodeName === 'svg';

  // if layer has no background/shadow/border/etc. skip it
  if (isImage || !hasOnlyDefaultStyles(styles)) {
    var style = new _style2['default']();

    if (backgroundColor) {
      style.addColorFill(backgroundColor);
    }

    if (isImage) {
      var absoluteUrl = new URL(node.currentSrc, location.href);

      style.addImageFill(absoluteUrl.href);
      shapeGroup.setFixedWidthAndHeight();
    }

    if (boxShadow !== DEFAULT_VALUES.boxShadow) {
      var shadowStrings = (0, _shadow.splitShadowString)(boxShadow);

      shadowStrings.forEach(function (shadowString) {
        var shadowObject = (0, _shadow.shadowStringToObject)(shadowString);

        if (shadowObject.inset) {
          if (borderWidth.indexOf(' ') === -1) {
            shadowObject.spread += parseFloat(borderWidth);
          }
          style.addInnerShadow(shadowObject);
        } else {
          style.addShadow(shadowObject);
        }
      });
    }

    // support for one-side borders (using inner shadow because Sketch doesn't support that)
    if (borderWidth.indexOf(' ') === -1) {
      style.addBorder({ color: borderColor, thickness: parseFloat(borderWidth) });
    } else {
      var borderTopWidthFloat = parseFloat(borderTopWidth);
      var borderRightWidthFloat = parseFloat(borderRightWidth);
      var borderBottomWidthFloat = parseFloat(borderBottomWidth);
      var borderLeftWidthFloat = parseFloat(borderLeftWidth);

      if (borderTopWidthFloat !== 0) {
        style.addInnerShadow({ color: borderTopColor, offsetY: borderTopWidthFloat });
      }
      if (borderRightWidthFloat !== 0) {
        style.addInnerShadow({ color: borderRightColor, offsetX: -borderRightWidthFloat });
      }
      if (borderBottomWidthFloat !== 0) {
        style.addInnerShadow({ color: borderBottomColor, offsetY: -borderBottomWidthFloat });
      }
      if (borderLeftWidthFloat !== 0) {
        style.addInnerShadow({ color: borderLeftColor, offsetX: borderLeftWidthFloat });
      }
    }

    if (!options || options.layerOpacity !== false) {
      style.addOpacity(opacity);
    }

    shapeGroup.setStyle(style);

    //TODO borderRadius can be expressed in different formats and use various units - for simplicity we assume "X%"
    var cornerRadius = {
      topLeft: fixBorderRadius(borderTopLeftRadius, width, height),
      topRight: fixBorderRadius(borderTopRightRadius, width, height),
      bottomLeft: fixBorderRadius(borderBottomLeftRadius, width, height),
      bottomRight: fixBorderRadius(borderBottomRightRadius, width, height)
    };

    var rectangle = new _rectangle2['default']({ width: width, height: height, cornerRadius: cornerRadius });

    shapeGroup.addLayer(rectangle);

    // This should return a array once multiple background-images are supported
    var backgroundImageResult = (0, _background.parseBackgroundImage)(backgroundImage);

    var layer = shapeGroup;

    if (backgroundImageResult) {

      switch (backgroundImageResult.type) {
        case 'Image':
          {
            var img = new Image();

            img.src = backgroundImageResult.value;

            // TODO add support for % values
            var bitmapX = parseFloat(backgroundPositionX);
            var bitmapY = parseFloat(backgroundPositionY);

            var actualImgSize = (0, _background.getActualImageSize)(backgroundSize, { width: img.width, height: img.height }, { width: width, height: height });

            if (bitmapX === 0 && bitmapY === 0 && actualImgSize.width === img.width && actualImgSize.height === img.height) {
              // background image fits entirely inside the node, so we can represent it with a (cheaper) image fill
              style.addImageFill(backgroundImageResult.value);
            } else {
              // use a Group(Shape + Bitmap) to correctly represent clipping of the background image
              var bm = new _bitmap2['default']({
                url: backgroundImageResult.value,
                x: bitmapX,
                y: bitmapY,
                width: actualImgSize.width,
                height: actualImgSize.height
              });

              bm.setName('background-image');
              shapeGroup.setHasClippingMask(true);

              var group = new _group2['default']({ x: left, y: top, width: width, height: height });

              // position is relative to the group
              shapeGroup.setPosition({ x: 0, y: 0 });
              group.addLayer(shapeGroup);
              group.addLayer(bm);

              layer = group;
            }

            break;
          }
        case 'LinearGradient':
          style.addGradientFill(backgroundImageResult.value);
          break;
        default:
          // Unsupported types:
          // - radial gradient
          // - multiple background-image
          break;
      }
    }

    layers.push(layer);
  }

  if (isSVG) {
    // sketch ignores padding and centerging as defined by viewBox and preserveAspectRatio when
    // importing SVG, so instead of using BCR of the SVG, we are using BCR of its children
    var childrenBCR = (0, _bcr.getGroupBCR)(Array.from(node.children));
    var svgLayer = new _svg2['default']({
      x: childrenBCR.left,
      y: childrenBCR.top,
      width: childrenBCR.width,
      height: childrenBCR.height,
      rawSVGString: (0, _svg3.getSVGString)(node)
    });

    layers.push(svgLayer);

    return layers;
  }

  if (!(0, _visibility.isTextVisible)(styles)) {
    return layers;
  }

  var textStyle = new _textStyle2['default']({
    fontFamily: fontFamily,
    fontSize: parseInt(fontSize, 10),
    lineHeight: lineHeight !== 'normal' ? parseInt(lineHeight, 10) : undefined,
    letterSpacing: letterSpacing !== 'normal' ? parseFloat(letterSpacing) : undefined,
    fontWeight: parseFontWeight(fontWeight),
    color: color,
    textTransform: textTransform,
    textDecoration: textDecorationLine,
    textAlign: display === 'flex' || display === 'inline-flex' ? justifyContent : textAlign,
    skipSystemFonts: options && options.skipSystemFonts
  });

  var rangeHelper = document.createRange();

  // Text
  Array.from(node.childNodes).filter(function (child) {
    return child.nodeType === 3 && child.nodeValue.trim().length > 0;
  }).forEach(function (textNode) {
    rangeHelper.selectNodeContents(textNode);
    var textRanges = Array.from(rangeHelper.getClientRects());
    var numberOfLines = textRanges.length;
    var textBCR = rangeHelper.getBoundingClientRect();
    var lineHeightInt = parseInt(lineHeight, 10);
    var textBCRHeight = textBCR.bottom - textBCR.top;
    var fixY = 0;

    // center text inside a box
    // TODO it's possible now in sketch - fix it!
    if (lineHeightInt && textBCRHeight !== lineHeightInt * numberOfLines) {
      fixY = (textBCRHeight - lineHeightInt * numberOfLines) / 2;
    }

    var textValue = (0, _text3.fixWhiteSpace)(textNode.nodeValue, whiteSpace);

    var id = void 0;

    if (textNode.parentNode && textNode.parentNode.dataset) {
      var _textNode$parentNode$ = textNode.parentNode.dataset,
          sketchId = _textNode$parentNode$.sketchId,
          sketchText = _textNode$parentNode$.sketchText;


      if (sketchId || sketchText) {
        id = 'text:' + String(sketchId || sketchText);
      }
    }

    var text = new _text2['default']({
      id: id,
      x: textBCR.left,
      y: textBCR.top + fixY,
      width: textBCR.right - textBCR.left,
      height: textBCRHeight,
      text: textValue,
      style: textStyle,
      multiline: numberOfLines > 1
    });

    layers.push(text);
  });

  return layers;
}