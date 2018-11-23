'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = convertAngleToFromAndTo;
// Keep this pure for easy testing in the future.
function convertAngleToFromAndTo(angle) {
  // default 180deg
  var from = { x: 0.5, y: 0 };
  var to = { x: 0.5, y: 1 };

  // Learn math or find someone smarter to figure this out correctly
  switch (angle) {
    case 'to top':
    case '360deg':
    case '0deg':
      from.y = 1;
      to.y = 0;
      break;
    case 'to right':
    case '90deg':
      from.x = 0;
      from.y = 0.5;
      to.x = 1;
      to.y = 0.5;
      break;
    case 'to left':
    case '270deg':
      from.x = 1;
      from.y = 0.5;
      to.x = 0;
      to.y = 0.5;
      break;
    case 'to bottom':
    case '180deg':
    default:
      break;
  }

  return {
    from: from,
    to: to
  };
}