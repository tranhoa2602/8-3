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
