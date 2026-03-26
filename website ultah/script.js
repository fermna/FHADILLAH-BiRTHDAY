const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const cakeScreen = document.getElementById("cakeScreen");
const galleryScreen = document.getElementById("galleryScreen");
const candles = document.querySelectorAll(".candle");
const music = document.getElementById("bgMusic");

const overlay = document.getElementById("overlay");
const zoomImg = document.getElementById("zoomImg");

let blown = 0;

/* FIX OVERLAY AWAL */
window.onload = () => {
  overlay.classList.add("hidden");
};

/* START */
startBtn.onclick = () => {
  music.play().catch(() => {});
  startScreen.classList.add("hidden");
  cakeScreen.classList.remove("hidden");
};

/* LILIN */
candles.forEach((c) => {
  c.onclick = () => {
    if (!c.classList.contains("off")) {
      c.classList.add("off");
      blown++;
      if (blown === 5) setTimeout(showGallery, 1000);
    }
  };
});

/* MASUK GALERI */
function showGallery() {
  cakeScreen.classList.add("hidden");
  galleryScreen.classList.remove("hidden");
  createPhotos();
  createRain();
}

/* FOTO */
function createPhotos() {
  const container = document.getElementById("floatingContainer");

  for (let i = 1; i <= 25; i++) {
    let div = document.createElement("div");
    div.className = "photo";

    div.style.backgroundImage = `url(images/foto${(i % 7) + 1}.jpeg)`;

    /* 🔥 FIX: SEBAR FULL LAYAR */
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.top = Math.random() * window.innerHeight + "px";

    /* beda-beda kecepatan melayang */
    div.style.animationDuration = 5 + Math.random() * 5 + "s";

    enableDrag(div);

    let moved = false;

    div.addEventListener("pointerdown", () => (moved = false));

    div.addEventListener("pointermove", () => (moved = true));

    div.addEventListener("pointerup", () => {
      if (!moved) {
        showZoom(div.style.backgroundImage);
      }
    });
    container.appendChild(div);
  }
}

/* DRAG */
function enableDrag(el) {
  let offsetX = 0,
    offsetY = 0;
  let isDown = false;

  el.addEventListener("pointerdown", (e) => {
    isDown = true;
    el.setPointerCapture(e.pointerId);

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  });

  el.addEventListener("pointermove", (e) => {
    if (!isDown) return;

    el.style.left = e.clientX - offsetX + "px";
    el.style.top = e.clientY - offsetY + "px";
  });

  el.addEventListener("pointerup", (e) => {
    isDown = false;
    el.releasePointerCapture(e.pointerId);
  });
}

/* ZOOM */
function showZoom(bg) {
  zoomImg.src = bg.replace('url("', "").replace('")', "");
  overlay.classList.remove("hidden");
}

/* CLOSE OVERLAY */
overlay.onclick = () => {
  overlay.classList.add("hidden");
};

/* HUJAN */
function createRain() {
  const emojis = ["🎁", "❤️", "🎀", "❄️"];
  setInterval(() => {
    let el = document.createElement("span");
    el.className = "fall";
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }, 300);
}

/* BINTANG */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2,
  d: Math.random() * 1,
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  stars.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.d;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(drawStars);
}
drawStars();
