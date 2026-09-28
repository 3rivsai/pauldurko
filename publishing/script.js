const canvas = document.getElementById("hero-wave");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let time = 0;
let dpr = 1;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  width = Math.max(1, rect.width);
  height = Math.max(1, rect.height);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawWave(color, phase, offset, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(14, width * 0.018);
  ctx.lineCap = "round";
  ctx.shadowColor = color;
  ctx.shadowBlur = 30;
  ctx.beginPath();

  const baseline = height * 0.74;
  const amplitude = Math.max(90, height * 0.19);
  const frequency = 1.55;

  for (let x = -60; x <= width + 60; x += 10) {
    const progress = x / width;
    const y =
      baseline +
      Math.sin(progress * Math.PI * frequency + time + phase) * amplitude +
      offset;
    if (x === -60) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();
}

function drawGlow() {
  const glow = ctx.createRadialGradient(
    width * 0.17,
    height * 0.75,
    20,
    width * 0.17,
    height * 0.75,
    width * 0.32
  );
  glow.addColorStop(0, "rgba(255,255,255,0.95)");
  glow.addColorStop(0.28, "rgba(255,255,255,0.68)");
  glow.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function animate() {
  time += 0.01;
  ctx.clearRect(0, 0, width, height);

  drawWave("rgba(255,54,34,0.9)", 0.18, 26, 0.88);
  drawWave("rgba(31,255,53,0.86)", 0.02, 0, 0.86);
  drawWave("rgba(34,79,255,0.86)", -0.14, -28, 0.86);
  drawGlow();

  requestAnimationFrame(animate);
}

resize();
animate();
window.addEventListener("resize", resize);
