// === Setup canvas ===
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";
canvas.style.opacity = "0.35";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// === Create Elements ===
function createFish() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5 + canvas.height * 0.4,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 0.5,
    dir: Math.random() < 0.5 ? 1 : -1,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  };
}

function createLeaf() {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: Math.random() * 10 + 8,
    speedY: Math.random() + 0.5,
    speedX: Math.random() * 0.6 - 0.3,
    color: "rgba(34,139,34,0.6)"
  };
}

function createBird() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.3,
    speed: Math.random() * 1 + 0.5,
    size: Math.random() * 10 + 10
  };
}

function createCloud() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * 100,
    speed: Math.random() * 0.3 + 0.1,
    size: Math.random() * 60 + 40
  };
}

const fishArray = Array.from({ length: 15 }, createFish);
let leaves = [];
let birds = Array.from({ length: 5 }, createBird);
let clouds = Array.from({ length: 8 }, createCloud);

// === Draw Elements ===
function drawFish(f) {
  ctx.beginPath();
  ctx.ellipse(f.x, f.y, f.size, f.size / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = f.color;
  ctx.fill();
}

function drawLeaf(l) {
  ctx.beginPath();
  ctx.arc(l.x, l.y, l.size / 2, 0, Math.PI * 2);
  ctx.fillStyle = l.color;
  ctx.fill();
}

function drawBird(b) {
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x - b.size, b.y + b.size / 2);
  ctx.lineTo(b.x - b.size * 2, b.y);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawCloud(c) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.size * 0.4, 0, Math.PI * 2);
  ctx.arc(c.x + c.size * 0.3, c.y + 10, c.size * 0.3, 0, Math.PI * 2);
  ctx.arc(c.x - c.size * 0.3, c.y + 10, c.size * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(249, 244, 244, 0.93)";
  ctx.fill();
}

function drawMountains() {
  ctx.fillStyle = "#2b3e50";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.5);
  ctx.lineTo(canvas.width * 0.25, canvas.height * 0.25);
  ctx.lineTo(canvas.width * 0.5, canvas.height * 0.5);
  ctx.lineTo(canvas.width * 0.75, canvas.height * 0.2);
  ctx.lineTo(canvas.width, canvas.height * 0.5);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
}

// === Animate Everything ===
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMountains();

  clouds.forEach(cloud => {
    cloud.x += cloud.speed;
    if (cloud.x > canvas.width + 100) cloud.x = -100;
    drawCloud(cloud);
  });

  birds.forEach(bird => {
    bird.x += bird.speed;
    if (bird.x > canvas.width + 50) {
      bird.x = -50;
      bird.y = Math.random() * canvas.height * 0.3;
    }
    drawBird(bird);
  });

  fishArray.forEach(fish => {
    fish.x += fish.speed * fish.dir;
    if (fish.x > canvas.width + 50) fish.x = -50;
    if (fish.x < -50) fish.x = canvas.width + 50;
    drawFish(fish);
  });

  if (Math.random() < 0.05) leaves.push(createLeaf());
  leaves.forEach((leaf, i) => {
    leaf.x += leaf.speedX;
    leaf.y += leaf.speedY;
    drawLeaf(leaf);
    if (leaf.y > canvas.height + 20) leaves.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

// === Fake Contact Form Submission ===
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thanks! Your message has been received.");
});
document.querySelectorAll(".tilt-card").forEach(card => {
  const inner = card.querySelector(".tilt-inner");

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 15;
    const rotateY = (x - centerX) / 15;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});

