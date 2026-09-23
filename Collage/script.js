const original = document.querySelector('img[alt="thirdcatimg"]');
if (original) {
  original.addEventListener("mouseenter", () => {
    const copy = original.cloneNode();
    copy.classList.add("floating-copy");
    document.body.appendChild(copy);
  });
}

function createCatElement(index) {
  const cell = document.createElement("div");
  cell.className = "cat-cell";
  cell.textContent = "cat";
  cell.style.transform = `rotate(${(index % 4) * 90}deg)`;
  cell.style.color = "#f5f5f5";
  return cell;
}

const grid = document.getElementById("grid");
if (grid) {
  const COUNT = 900;
  for (let i = 0; i < COUNT; i++) {
    grid.appendChild(createCatElement(i));
  }
}

const CATS = [
  "assets/cat1.png",
  "assets/cat2.png",
  "assets/cat3.png",
  "assets/cat4.png",
  "assets/cat5.png",
  "assets/cat6.png",
];
const SPAWN_EVERY = 800;
const MAX_CATS = 25;
const SIZE_MIN = 50;
const SIZE_MAX = 120;
const ROTATE_MAX = 25;
const SPEED_MIN = 0.5;
const SPEED_MAX = 2.5;

const cats = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnCat() {
  if (cats.length >= MAX_CATS) return;

  const el = document.createElement("img");
  el.src = CATS[Math.floor(Math.random() * CATS.length)];
  el.className = "roaming-cat";

  const size = rand(SIZE_MIN, SIZE_MAX);
  const x = rand(0, window.innerWidth - size);
  const y = rand(0, window.innerHeight - size);
  const rot = rand(-ROTATE_MAX, ROTATE_MAX);

  const angle = rand(0, Math.PI * 2);
  const speed = rand(SPEED_MIN, SPEED_MAX);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  el.style.width = size + "px";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.setProperty("--rot", rot + "deg");

  document.body.appendChild(el);
  cats.push({ el, x, y, vx, vy, size });
}

function animate() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  for (const cat of cats) {
    cat.x += cat.vx;
    cat.y += cat.vy;

    if (cat.x <= 0 || cat.x >= w - cat.size) {
      cat.vx *= -1;
      cat.x = Math.max(0, Math.min(cat.x, w - cat.size));
    }
    if (cat.y <= 0 || cat.y >= h - cat.size) {
      cat.vy *= -1;
      cat.y = Math.max(0, Math.min(cat.y, h - cat.size));
    }

    cat.el.style.left = cat.x + "px";
    cat.el.style.top = cat.y + "px";
  }

  requestAnimationFrame(animate);
}

if (document.body.classList.contains("has-cats")) {
  const timer = setInterval(() => {
    if (cats.length >= MAX_CATS) clearInterval(timer);
    else spawnCat();
  }, SPAWN_EVERY);

  requestAnimationFrame(animate);
}

const BLACK_CAT = "assets/cat3.png";
const PROMPT_DELAY = 4000;

function spawnCat() {
  if (cats.length >= MAX_CATS) return;

  const src = CATS[Math.floor(Math.random() * CATS.length)];
  const el = document.createElement("img");
  el.src = src;
  el.className = "roaming-cat";

  const size = rand(SIZE_MIN, SIZE_MAX);
  const x = rand(0, window.innerWidth - size);
  const y = rand(0, window.innerHeight - size);
  const rot = rand(-ROTATE_MAX, ROTATE_MAX);

  const angle = rand(0, Math.PI * 2);
  const speed = rand(SPEED_MIN, SPEED_MAX);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  el.style.width = size + "px";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.setProperty("--rot", rot + "deg");

  // only black cats are clickable and lead to page 3
  if (src === BLACK_CAT) {
    el.classList.add("clickable-cat");
    el.addEventListener("click", () => {
      window.location.href = "page3.html";
    });
  }

  document.body.appendChild(el);
  cats.push({ el, x, y, vx, vy, size });
}

if (document.body.classList.contains("has-cats")) {
  const timer = setInterval(() => {
    if (cats.length >= MAX_CATS) clearInterval(timer);
    else spawnCat();
  }, SPAWN_EVERY);

  requestAnimationFrame(animate);

  setTimeout(() => {
    const prompt = document.getElementById("catPrompt");
    if (prompt) prompt.classList.add("visible");
  }, PROMPT_DELAY);
}

window.addEventListener("load", () => {
  console.log("stars script running");
  const stars = document.querySelectorAll(".stars img");
  console.log("found", stars.length, "stars");
  stars.forEach((star, i) => {
    star.style.animationDelay = `${i * 0.12}s`;
    star.classList.add("pop");
  });
});
