const correctPassword = "0302";
let input = "";

function press(num) {
  if (input.length >= 4) return;
  input += num;
  updateDots();

  if (input.length === 4) {
    if (input === correctPassword) {
      unlock();
    } else {
      setTimeout(() => {
        alert("Sai mật khẩu 😝");
        input = "";
        updateDots();
      }, 200);
    }
  }
}

function clearPass() {
  input = "";
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i < input.length);
  });
}

function unlock() {
  document.getElementById("lockBox").classList.add("hide");
  setTimeout(() => {
    document.getElementById("menu").classList.add("show");
  }, 600);
}

/* DAYS */
function openDays() {
  document.getElementById("daysPopup").classList.add("show");
  calculateDays();
}

function closeDays() {
  document.getElementById("daysPopup").classList.remove("show");
}

function calculateDays() {
  let startDate = new Date("2024-02-14"); // 👉 đổi ngày yêu tại đây
  let today = new Date();
  let diff = today - startDate;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("daysCount").innerText = days;
}

let heartInterval;

function startHearts() {
  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "❤";

    // vị trí random ngang màn hình
    heart.style.left = Math.random() * 100 + "vw";

    // size random
    let size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";

    // tốc độ random
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    // tự xoá sau khi bay xong
    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 400);
}

function stopHearts() {
  clearInterval(heartInterval);
}

function unlock() {
  document.getElementById("lockBox").classList.add("hide");

  setTimeout(() => {
    document.getElementById("menu").classList.add("show");
    startHearts(); // 👈 thêm dòng này
  }, 600);
}

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");

let isPlaying = false;

playBtn.onclick = () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
};

/* Update duration */
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

/* Update progress */
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

/* Seek */
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* Volume */
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
