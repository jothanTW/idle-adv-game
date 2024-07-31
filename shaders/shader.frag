

varying highp vec2 vTexCoord;

uniform sampler2D uSampler;
uniform lowp vec4 uFromColor1;
uniform lowp vec4 uFromColor2;
uniform lowp vec4 uFromColor3;
uniform lowp vec4 uToColor1;
uniform lowp vec4 uToColor2;
uniform lowp vec4 uToColor3;

void main(void) {
  lowp vec4 tColor = texture2D(uSampler, vTexCoord);
  if (tColor == uFromColor1) {
    gl_FragColor = uToColor1;
  } else if (tColor == uFromColor2) {
    gl_FragColor = uToColor2;
  } else if (tColor == uFromColor3) {
    gl_FragColor = uToColor3;
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}