const canvas = document.getElementById("hero-wave");
const gl =
  canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  }) ||
  canvas.getContext("experimental-webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });

if (gl) {
  const vertexShaderSource = `
    attribute vec3 position;

    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 resolution;
    uniform float time;
    uniform float xScale;
    uniform float yScale;
    uniform float distortion;

    void main() {
      vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
      p.y += 0.22;

      float d = length(p) * distortion;

      float rx = p.x * (1.0 + d);
      float gx = p.x;
      float bx = p.x * (1.0 - d);

      float r = 0.052 / max(abs(p.y + sin((rx + time) * xScale) * yScale), 0.012);
      float g = 0.052 / max(abs(p.y + sin((gx + time) * xScale) * yScale), 0.012);
      float b = 0.052 / max(abs(p.y + sin((bx + time) * xScale) * yScale), 0.012);

      vec3 color = clamp(vec3(r, g, b), 0.0, 1.0);
      float intensity = clamp(max(max(r, g), b), 0.0, 1.0);

      gl_FragColor = vec4(color, intensity * 0.9);
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  const vertices = new Float32Array([
    -1, -1, 0,
    3, -1, 0,
    -1, 3, 0,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

  const uniforms = {
    resolution: gl.getUniformLocation(program, "resolution"),
    time: gl.getUniformLocation(program, "time"),
    xScale: gl.getUniformLocation(program, "xScale"),
    yScale: gl.getUniformLocation(program, "yScale"),
    distortion: gl.getUniformLocation(program, "distortion"),
  };

  let time = 0;
  let cssWidth = 1;
  let cssHeight = 1;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    cssWidth = Math.max(1, rect.width);
    cssHeight = Math.max(1, rect.height);
    const width = Math.max(1, Math.floor(cssWidth * dpr));
    const height = Math.max(1, Math.floor(cssHeight * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    gl.viewport(0, 0, width, height);
  }

  function render() {
    resize();
    time += 0.008;

    gl.useProgram(program);
    gl.clearColor(1, 1, 1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.uniform2f(uniforms.resolution, cssWidth, cssHeight);
    gl.uniform1f(uniforms.time, time);
    gl.uniform1f(uniforms.xScale, 1.0);
    gl.uniform1f(uniforms.yScale, 0.5);
    gl.uniform1f(uniforms.distortion, 0.05);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize);
  render();
} else {
  canvas.style.display = "none";
}
