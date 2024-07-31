attribute lowp vec2 aVertexPosition;
attribute lowp vec2 aTexCoord;

uniform lowp float uLeft;
uniform lowp float uWidth;
uniform lowp float uTop;
uniform lowp float uHeight;

varying highp vec2 vTexCoord;

void main() {
  lowp vec4 pos;
  pos.x = (aVertexPosition.x - uLeft) * 2.0 / uWidth - 1.0;
  pos.y = (aVertexPosition.y - uTop) * 2.0 / uHeight - 1.0;
  gl_Position = pos;
  vTexCoord = aTexCoord;
}