"use strict";

var _canvas = _interopRequireDefault(require("../canvas"));

var _app = _interopRequireDefault(require("../app"));

var _tools = _interopRequireDefault(require("../tools"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock('../canvas');
jest.mock('../app');
jest.mock('../tools');
beforeEach(function () {
  _canvas["default"].mockClear();

  _app["default"].mockClear();

  _tools["default"].mockClear();
});
it('Check if the consumer called the class constructor', function () {
  var canvas = new _canvas["default"]();
  expect(_canvas["default"]).toHaveBeenCalledTimes(1);
});
it('Check calling method bindFrame', function () {
  var frames = [['frame'], ['frame']];
  var canvas = new _canvas["default"]();
  canvas.bindFrame(frames[0]);
  expect(canvas.bindFrame).toHaveBeenCalledTimes(1);
  expect(canvas.bindFrame).toBeCalledWith(expect.any(Array));
});
it('Check calling method showCanvas', function () {
  var canvas = new _canvas["default"]();
  canvas.showCanvas();
  expect(canvas.showCanvas).toHaveBeenCalledTimes(1);
});
it('Check calling method setColors', function () {
  var canvas = new _canvas["default"]();
  canvas.setColors(['red']);
  expect(canvas.setColors).toHaveBeenCalledTimes(1);
});
it('Check calling method rotateCanvas', function () {
  var canvas = new _canvas["default"]();
  canvas.rotateCanvas('rotation');
  expect(canvas.rotateCanvas).toHaveBeenCalledTimes(1);
});
it('Check if the consumer called the class constructor', function () {
  var app = new _app["default"]();
  expect(_app["default"]).toHaveBeenCalledTimes(1);
});
it('Check if the consumer called the class constructor', function () {
  var app = new _app["default"]();
  app.start();
  expect(app.start).toHaveBeenCalledTimes(1);
});
"use strict";