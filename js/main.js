import { GraphicsEngine } from './engines/graphic/graphics.engine.js';
import { CommonEngine } from './engines/common/common.engine.js';

GraphicsEngine.init('main');

let imgPromises = [];

GraphicsEngine.setBackgroundColor('#9bbc0f')
imgPromises.push(GraphicsEngine.loadImage('/img/roads.png', 'roads'));
imgPromises.push(GraphicsEngine.loadImage('/img/house.png', 'house'));

Promise.all(imgPromises).then(() => {

  let r1 = new GraphicsEngine.GraphicsObject();
  let r2 = new GraphicsEngine.GraphicsObject();
  let r3 = new GraphicsEngine.GraphicsObject();
  let r4 = new GraphicsEngine.GraphicsObject();
  let h1 = new GraphicsEngine.GraphicsObject();
  r1.setSprites(0, GraphicsEngine.createSprite('roads', 0, 32, 32, 32));
  r2.setSprites(0, GraphicsEngine.createSprite('roads', 0, 32, 32, 32, true, false));
  r3.setSprites(0, GraphicsEngine.createSprite('roads', 0, 32, 32, 32, false, true));
  r4.setSprites(0, GraphicsEngine.createSprite('roads', 0, 32, 32, 32, true, true));
  h1.setSprites(0, GraphicsEngine.createSprite('house', 0, 0, 32, 32));

  
  GraphicsEngine.resizeCanvas(800, 600);
  GraphicsEngine.clearCanvas();
  
  GraphicsEngine.drawObject(r1, 32, 32);
  GraphicsEngine.drawObject(r2, 64, 32);
  GraphicsEngine.drawObject(r3, 32, 64);
  GraphicsEngine.drawObject(r4, 64, 64);
  GraphicsEngine.drawObject(h1, 128, 128)
})