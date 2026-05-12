    // ================= GLOBAL STATE =================
    let time = 25 * 60;
    let timer = null;
    let isRunning = false;
    let isBreak = false;
    let breakTime = 5 * 60;
    let goalShown = false;
    const { remote } = require("electron");
    // ================= ELEMENTS =================
    const timerDisplay = document.querySelector(".timer");
    const statusText = document.querySelector(".status");

    const startBtn = document.querySelector(".start");
    const pauseBtn = document.querySelector(".pause");
    const resetBtn = document.querySelector(".reset");

    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const setTimeBtn = document.getElementById("setTime");

    const breakCard = document.getElementById("breakCard");
    const breakPopup = document.getElementById("breakPopup");
    const saveBreakBtn = document.getElementById("saveBreak");

    const breakMinInput = document.getElementById("breakMin");
    const breakSecInput = document.getElementById("breakSec");
    const breakDisplay = document.getElementById("breakDisplay");

    const muteBtn = document.getElementById("muteBtn");
    const quoteElement = document.getElementById("quoteText");
    const dateDisplay = document.getElementById("dateDisplay");

    
    const saveBtn = document.getElementById("saveBtn");
    const editBtn = document.getElementById("editBtn");

    const formSection = document.getElementById("formSection");
    const profileSection = document.getElementById("profileSection");



    // INPUTS
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender");
    const goalInput = document.getElementById("goal");

    // DISPLAY
    const pName = document.getElementById("pName");
    const pAge = document.getElementById("pAge");
    const pGender = document.getElementById("pGender");
    const pGoal = document.getElementById("pGoal");

    const ovenClick = document.getElementById("ovenClick");
    const bakePopup = document.getElementById("bakePopup");
    const ovenImage = document.getElementById("ovenImage");
    const musicBtn = document.getElementById("musicBtn");

const musicList = [
    "assets/song1.mp3",
    "assets/song2.mp3",
    "assets/song3.mp3",
    "assets/song4.mp3"
];

let bgMusic = new Audio();
bgMusic.loop = true;
bgMusic.volume = 0.4;

let isMusicPlaying = false;
let currentTrack = 0;

if (musicBtn) {
    musicBtn.addEventListener("click", () => {

        if (!isMusicPlaying) {
            currentTrack = Math.floor(Math.random() * musicList.length);

            bgMusic.src = musicList[currentTrack];
            bgMusic.load();
            bgMusic.play();

            isMusicPlaying = true;
            musicBtn.textContent = "🎶";

        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            musicBtn.textContent = "🎵";
        }

    });
}
function restoreApp() {
    const win = remote.getCurrentWindow();

    win.setSize(900, 700);
    win.center();
    win.setAlwaysOnTop(false);
    win.setResizable(true);
    win.setSkipTaskbar(false);
}
    // OPEN POPUP
    if (ovenClick) {
        ovenClick.addEventListener("click", () => {
            bakePopup.style.display = "flex";
        });
    }

    // SELECT ITEM
    function chooseBake(type) {
        localStorage.setItem("bakeMode", type);

        updateOvenImage(type);

        bakePopup.style.display = "none";
    }

    // CLOSE ON OUTSIDE CLICK
    if (bakePopup) {
        bakePopup.addEventListener("click", (e) => {
            if (e.target === bakePopup) {
                bakePopup.style.display = "none";
            }
        });
    }

    // UPDATE IMAGE
    function updateOvenImage(mode) {
        if (!ovenImage) return;

        if (mode === "cupcake") {
            ovenImage.src = "assets/image-removebg-preview (1).png";
            ovenImage.style.width = "420px";
            ovenImage.style.height = "auto";
        }
        else if (mode === "cake") {
            ovenImage.src = "assets/image-removebg-preview (3).png";
            ovenImage.style.width = "350px";
            ovenImage.style.height = "auto";
        }
        else if (mode === "cookie") {
            ovenImage.src = "assets/image-removebg-preview (2).png";
            ovenImage.style.width = "320px";
            ovenImage.style.height = "auto";
        }
    }

    // LOAD SAVED MODE
    function loadBakeModeImage() {
        const mode = localStorage.getItem("bakeMode") || "cupcake";
        updateOvenImage(mode);
    }

    loadBakeModeImage();
    // LOAD DATA
    function loadProfile() {
        const name = localStorage.getItem("name");

        if (!name) return;

        if (formSection) formSection.style.display = "none";
        if (profileSection) profileSection.style.display = "flex";

        if (pName) pName.textContent = name;
        if (pAge) pAge.textContent = "Age: " + localStorage.getItem("age");
        if (pGender) pGender.textContent = "Gender: " + localStorage.getItem("gender");
        if (pGoal) pGoal.textContent = "Goal: " + localStorage.getItem("goal");

        // 💖 AVATAR LOGIC
        const pfp = document.getElementById("pfp");
        const gender = localStorage.getItem("gender");

        if (pfp) {
            if (gender === "Female") {
                pfp.src = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";
            } 
            else if (gender === "Male") {
                pfp.src = "https://cdn-icons-png.flaticon.com/512/4140/4140061.png ";
            } 
            else {
                pfp.src = "https://cdn-icons-png.flaticon.com/512/4140/4140051.png";
            }
        }
    }

    loadProfile();

    // SAVE
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            localStorage.setItem("name", nameInput.value);
            localStorage.setItem("age", ageInput.value);
            localStorage.setItem("gender", genderInput.value);
            localStorage.setItem("goal", goalInput.value);

            loadProfile();
        });
    }

    // EDIT
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            formSection.style.display = "flex";
            profileSection.style.display = "none";
        });
    }
    // 🔊 SOUND
    const alarmSound = new Audio("assets/done.mp3");
    alarmSound.volume = 1;

    // ================= NAVIGATION =================
function goTo(page) {
    window.location.href = page;
}
    // ================= QUOTES =================
    const quotes = [
        "Small progress every day leads to big results.",
        "You don’t have to be perfect, just consistent.",
        "Focus now, relax later 💖",
        "Dreams don’t work unless you do.",
        "One step at a time is enough.",
        "Stay soft, stay strong 🌸",
        "Discipline > Motivation",
        "You got this 😤",
        "Make today count ✨",
        "Little steps still move you forward."
    ];
    function getDailyQuote() {
        const today = new Date().toDateString();

        let savedDate = localStorage.getItem("quoteDate");
        let savedQuote = localStorage.getItem("quoteText");

        if (savedDate === today && savedQuote) return savedQuote;

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        localStorage.setItem("quoteDate", today);
        localStorage.setItem("quoteText", randomQuote);

        return randomQuote;
    }

    if (quoteElement) {
        quoteElement.textContent = getDailyQuote();
    }

    // ================= TIMER =================
    function formatTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    let formatted =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    // ✅ Main timer
    if (timerDisplay) {
        timerDisplay.textContent = formatted;
    }

    // ✅ Status text (VERY IMPORTANT)
    const status = document.querySelector(".status");
    if (status) {
        status.textContent = isBreak ? "Break time ☕" : "Time to focus 💖";
    }

    // ✅ Break panel (right side)
    const breakDisplay = document.getElementById("breakDisplay");
    if (breakDisplay) {
    breakDisplay.textContent = isBreak ? formatted : formatTime(breakTime);
}
}

    function stopSound() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("lastStudyDate");

    let streak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastDate === today) {
        // already counted today → do nothing
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === yesterday.toDateString()) {
        streak++; // continue streak
    } else {
        streak = 1; // reset streak
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastStudyDate", today);

    updateStreakUI();
}

function updateStreakUI() {
    const streakEl = document.querySelector(".big");
    const fire = document.getElementById("streakFire");

    if (!streakEl || !fire) return;

    let streak = parseInt(localStorage.getItem("streak")) || 0;
    streakEl.textContent = streak;

    // 💥 reset classes
    fire.classList.remove("fire-low", "fire-mid", "fire-high");

    // 🔥 apply based on streak
    if (streak >= 7) {
        fire.classList.add("fire-high");
    } else if (streak >= 3) {
        fire.classList.add("fire-mid");
    } else {
        fire.classList.add("fire-low");
    }
}

function updateDate() {
    const el = document.getElementById("dateText");
    if (!el) return;

    const now = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "short"
    };

    el.textContent = now.toLocaleDateString("en-IN", options);
}
function startTimer() {
    if (isRunning || timer !== null) return;

    // 💥 fix stuck at 0
    if (time <= 0) {
        isBreak = !isBreak;
        time = isBreak ? breakTime : 25 * 60;
        updateDisplay();
    }

    isRunning = true;

    timer = setInterval(() => {

        if (time <= 0) {
            clearInterval(timer);
            timer = null;
            isRunning = false;

            alarmSound.currentTime = 0;
            alarmSound.play().catch(() => {});

            // ✅ COUNT ONLY FOCUS
            if (!isBreak) {
                addToShelf();

                let key = getTodayKey();
                let count = parseInt(localStorage.getItem(key)) || 0;

                count++;
                localStorage.setItem(key, count);

                updateGoalUI();
                updateStreak();
                if (typeof updateWeeklyData === "function") {
    updateWeeklyData();
}
            }

            // 🔁 SWITCH MODE
            isBreak = !isBreak;
            time = isBreak ? breakTime : 25 * 60;

            updateDisplay();
            return;
        }

        time--;
        updateDisplay();

    }, 1000);
}
    function pauseTimer() {
        clearInterval(timer);
        timer = null;   // 💥 ADD THIS
        isRunning = false;
    }
    function updateGoalUI() {
    const goalText = document.getElementById("goalText");
    if (!goalText) return;

    const key = getTodayKey();
    const count = parseInt(localStorage.getItem(key)) || 0;
    const goal = parseInt(localStorage.getItem("goal")) || 2;

    goalText.textContent = `${count} / ${goal} sessions`;

    renderDots(goal, count); // 💥 dynamic dots

    // 🎉 celebration
    if (count >= goal && !goalShown) {
        goalShown = true;
        document.getElementById("goalPopup").style.display = "flex";
        launchConfetti();
    }

    if (count < goal) {
        goalShown = false;
    }
}

    function updateDots(count, goal) {
        const dots = document.querySelectorAll(".dots span");
        dots.forEach((dot, index) => {
            if (index < count) {
                dot.style.background = "#ff8fab"; // filled
            } else {
                dot.style.background = "#ffd6dc"; // empty
            }
        });
    }
    function getTodayKey() {
        const today = new Date().toDateString();
        return "sessions_" + today;
    }
    function addToShelf() {
        let mode = localStorage.getItem("bakeMode") || "cupcake";

        let items = JSON.parse(localStorage.getItem("bakeryItems")) || [];

        items.push(mode);

        localStorage.setItem("bakeryItems", JSON.stringify(items));

    }

    
    function renderDots(goal, count) {
    const container = document.getElementById("goalDots");
    if (!container) return;

    container.innerHTML = ""; // clear old dots

    for (let i = 0; i < goal; i++) {
        const dot = document.createElement("span");

        if (i < count) {
            dot.style.background = "#ff8fab"; // filled
        } else {
            dot.style.background = "#ffd6dc"; // empty
        }

        container.appendChild(dot);
    }
}
    function closeGoalPopup() {
    const popup = document.getElementById("goalPopup");
    if (popup) popup.style.display = "none";
}
    function launchConfetti() {
        for (let i = 0; i < 30; i++) {
            const conf = document.createElement("div");
            conf.className = "confetti";
            document.body.appendChild(conf);

            conf.style.left = Math.random() * 100 + "vw";
            conf.style.background = ["#ffcad4", "#ffd6dc", "#ffc8dd"][Math.floor(Math.random()*3)];

            conf.style.animationDuration = (2 + Math.random() * 2) + "s";

            setTimeout(() => conf.remove(), 3000);
        }
    }
    function resetTimer() {
        clearInterval(timer);
        timer = null;   // 💥 ADD THIS
        isRunning = false;

        isBreak = false;
        time = 25 * 60;

        stopSound();

        if (statusText) statusText.textContent = "Time to focus 💖";
        updateDisplay();
    }
    function resetAll() {
    localStorage.clear();
    location.reload();
}
    // ================= CUSTOM TIME =================
    function setCustomTime() {
        let mins = parseInt(minutesInput?.value) || 0;
        let secs = parseInt(secondsInput?.value) || 0;

        let total = mins * 60 + secs;

        if (total <= 0) {
            alert("Enter valid time 😭");
            return;
        }

        clearInterval(timer);
        isRunning = false;
        timer = null;
        time = total;
        isBreak = false;

        if (statusText) statusText.textContent = "Custom session 💖";
        updateDisplay();
       
        if (minutesInput) minutesInput.value = "";
        if (secondsInput) secondsInput.value = "";
    }

    // ================= BREAK =================
    if (breakCard) {
        breakCard.addEventListener("click", () => {
            if (isRunning) return;
            breakPopup.style.display = "flex";
        });
    }

    if (saveBreakBtn) {
        saveBreakBtn.addEventListener("click", () => {
            let mins = parseInt(breakMinInput?.value) || 0;
            let secs = parseInt(breakSecInput?.value) || 0;

            let total = mins * 60 + secs;

            if (total <= 0) {
                alert("Enter valid break time 😭");
                return;
            }

            breakTime = total;
            if (breakDisplay) breakDisplay.textContent = formatTime(breakTime);

            breakPopup.style.display = "none";
        });
    }

    if (breakPopup) {
        breakPopup.addEventListener("click", (e) => {
            if (e.target === breakPopup) breakPopup.style.display = "none";
        });
    }

    // ================= BUTTONS =================
    if (startBtn) startBtn.addEventListener("click", () => { stopSound(); startTimer(); });
    if (pauseBtn) pauseBtn.addEventListener("click", () => { stopSound(); pauseTimer(); });
    if (resetBtn) resetBtn.addEventListener("click", () => { stopSound(); resetTimer(); });
    if (setTimeBtn) setTimeBtn.addEventListener("click", setCustomTime);

    // ================= MUTE =================
    if (muteBtn) {
        muteBtn.addEventListener("click", () => {
            alarmSound.muted = !alarmSound.muted;
            muteBtn.textContent = alarmSound.muted ? "🔇" : "🎵";
        });
    }

    bgMusic.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % musicList.length;
bgMusic.src = musicList[currentTrack];
bgMusic.load();    
bgMusic.play();
});

window.addEventListener("load", () => {

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (menuBtn && sidebar && overlay) {
        menuBtn.onclick = () => {
            sidebar.classList.toggle("active");
            overlay.classList.toggle("active");
        };

        overlay.onclick = () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        };
    }

});


    // ================= INIT =================
    updateDisplay();
    updateGoalUI();
    updateStreakUI();
    updateDate();