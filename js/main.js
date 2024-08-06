import { GraphicsEngine } from './engines/graphic-gl/graphics.engine.js';
import { CommonEngine } from './engines/common/common.engine.js';
import { Sprite } from './engines/graphic-gl/models/sprite.js';

GraphicsEngine.init('main').then(() => {
  let wGreenColors = {
    b: {r: 15, g: 56, b: 15},
    d: {r: 48, g: 98, b: 48},
    l: {r: 139, g: 172, b: 15},
    g: '#9bbc0f'
  };
  
  let gbColors = {
    b: {r: 1, g: 1, b: 5},
    d: {r: 113, g: 114, b: 134},
    l: {r: 218, g: 214, b: 215},
    g: '#9ca04c'
  };

  let transparency = {
    r: 255, g: 0, b: 255
  };

  let houseObj = new GraphicsEngine.GraphicsObject();
  houseObj.x = 2;
  houseObj.y = 2;

  Promise.all([
    GraphicsEngine.loadTexture('/img/house.png', transparency).then(idx => {
      console.log(idx)
      // load house sprites here
      let spr = new Sprite(idx, 0, 0, 32, 32);
      houseObj.setSprites(0, spr);
    }),
    GraphicsEngine.loadTexture('/img/roads.png', transparency).then(idx => {
      console.log(idx)
      // load road sprites here
    }),
    GraphicsEngine.loadPalette('/img/gb-palette.png')
  ]).then(() => {
    GraphicsEngine.setCameraFrame(0, 0, 1024, 1024);
    GraphicsEngine.draw([houseObj]);
  });
});



/** 
let usedColors = gbColors;

GraphicsEngine.setBackgroundColor(usedColors.g);
GraphicsEngine.setColorReplacement({r: 0, g: 0, b: 0}, usedColors.b);
GraphicsEngine.setColorReplacement({r: 192, g: 192, b: 192}, usedColors.l);
GraphicsEngine.setColorReplacement({r: 128, g: 128, b: 128}, usedColors.d);

imgPromises.push(GraphicsEngine.loadImage('/img/roads.png', 'roads'));
imgPromises.push(GraphicsEngine.loadImage('/img/house.png', 'house'));

Promise.all(imgPromises).then(() => {

  let r1 = new GraphicsEngine.GraphicsObject();
  let r2 = new GraphicsEngine.GraphicsObject();
  let r3 = new GraphicsEngine.GraphicsObject();
  let r4 = new GraphicsEngine.GraphicsObject();
  let h1 = new GraphicsEngine.GraphicsObject();

  imgPromises = [];
  imgPromises.push(GraphicsEngine.createSprite('roads', 0, 32, 32, 32).then(sp => { r1.setSprites(0, sp); }));
  imgPromises.push(GraphicsEngine.createSprite('roads', 0, 32, 32, 32, true, false).then(sp => { r2.setSprites(0, sp); }));
  imgPromises.push(GraphicsEngine.createSprite('roads', 0, 32, 32, 32, false, true).then(sp => { r3.setSprites(0, sp); }));
  imgPromises.push(GraphicsEngine.createSprite('roads', 0, 32, 32, 32, true, true).then(sp => { r4.setSprites(0, sp); }));
  imgPromises.push(GraphicsEngine.createSprite('house', 0, 0, 32, 32).then(sp => { h1.setSprites(0, sp); }));

  Promise.all(imgPromises).then(() => {

    GraphicsEngine.resizeCanvas(800, 600);
    GraphicsEngine.clearCanvas();
    
    GraphicsEngine.drawObject(r1, 32, 32);
    GraphicsEngine.drawObject(r2, 64, 32);
    GraphicsEngine.drawObject(r3, 32, 64);
    GraphicsEngine.drawObject(r4, 64, 64);
    GraphicsEngine.drawObject(h1, 128, 128)
  });
})

*/