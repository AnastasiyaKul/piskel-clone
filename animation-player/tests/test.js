import Canvas from "../canvas";
import App from "../app";
import Tools from "../tools";

jest.mock('../canvas');
jest.mock('../app');
jest.mock('../tools');

beforeEach(() => {
  Canvas.mockClear();
  App.mockClear();
  Tools.mockClear();
});

it('Check if the consumer called the class constructor', () => {
  const canvas = new Canvas();
  expect(Canvas).toHaveBeenCalledTimes(1);
});

it('Check calling method bindFrame', () => {
  const frames = [['frame'],['frame']];
  const canvas = new Canvas();
  canvas.bindFrame(frames[0]);
  expect(canvas.bindFrame).toHaveBeenCalledTimes(1);
  expect(canvas.bindFrame).toBeCalledWith(expect.any(Array));
});

it('Check calling method showCanvas', () => {
  const canvas = new Canvas();
  canvas.showCanvas();
  expect(canvas.showCanvas).toHaveBeenCalledTimes(1);
});

it('Check calling method setColors', () => {
  const canvas = new Canvas();
  canvas.setColors(['red']);
  expect(canvas.setColors).toHaveBeenCalledTimes(1);
});

it('Check calling method rotateCanvas', () => {
  const canvas = new Canvas();
  canvas.rotateCanvas('rotation');
  expect(canvas.rotateCanvas).toHaveBeenCalledTimes(1);
});

it('Check if the consumer called the class constructor', () => {
  const app = new App();
  expect(App).toHaveBeenCalledTimes(1);
});

it('Check if the consumer called the class constructor', () => {
  const app = new App();
  app.start();
  expect(app.start).toHaveBeenCalledTimes(1);
});

"use strict";
