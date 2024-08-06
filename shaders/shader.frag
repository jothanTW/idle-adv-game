varying highp vec2 vTexCoord;

uniform sampler2D uSampler;
uniform sampler2D uPalette;

void main(void) {
  lowp vec4 tColor = texture2D(uSampler, vTexCoord);
  lowp vec2 vPalCoord = vec2(tColor.a, 0.5);
  gl_FragColor = texture2D(uPalette, vPalCoord);
}