// ================= SELECTED ITEM =================
let selectedItem = "cupcake";

function selectItem(item) {
    selectedItem = item;
}

// ================= ADD TO SHELF =================
function addToShelf() {
    let items = JSON.parse(localStorage.getItem("bakeryItems")) || [];

    items.push(selectedItem);

    localStorage.setItem("bakeryItems", JSON.stringify(items));

    loadShelf();
}

// ================= RENDER EACH ROW =================
function renderShelfRow(container, items, type) {
    container.innerHTML = "";

    const filtered = items.filter(i => i === type);

    const displayCount = Math.min(filtered.length, 4);

    for (let i = 0; i < displayCount; i++) {
        const img = document.createElement("img");
        img.className = "shelf-item";

        if (type === "cupcake") img.src = "assets/cake (1).png";
        if (type === "cookie") img.src = "assets/cake (3).png";
        if (type === "cake") img.src = "assets/cake (2).png";

        container.appendChild(img);
    }

    // 💥 SHOW +X IF MORE THAN 4
    if (filtered.length > 4) {
        const extra = document.createElement("div");
        extra.className = "extra-count";
        extra.textContent = "+" + (filtered.length - 3);

        container.lastChild.replaceWith(extra);
    }
}
function updateWeeklyData() {
    const today = new Date().getDay(); // 0 = Sunday

    let weekData = JSON.parse(localStorage.getItem("weekData")) || [0,0,0,0,0,0,0];

    weekData[today]++;

    localStorage.setItem("weekData", JSON.stringify(weekData));
}

function renderWeeklyChart() {
    const chart = document.getElementById("weeklyChart");
    if (!chart) return;

    chart.innerHTML = "";

    const days = ["S","M","T","W","T","F","S"];
    let data = JSON.parse(localStorage.getItem("weekData")) || [0,0,0,0,0,0,0];

    const max = Math.max(...data, 1);

    data.forEach((val, i) => {
        const bar = document.createElement("div");
        bar.className = "bar";

        bar.style.height = (val / max * 150) + "px";

        bar.innerHTML = `<span>${days[i]}</span>`;

        chart.appendChild(bar);
    });
}
// ================= LOAD SHELF =================
function loadShelf() {
    const items = JSON.parse(localStorage.getItem("bakeryItems")) || [];

    renderShelfRow(document.getElementById("topShelf"), items, "cookie");
    renderShelfRow(document.getElementById("middleShelf"), items, "cupcake");
    renderShelfRow(document.getElementById("bottomShelf"), items, "cake");

    updateWeekly();
}

// ================= WEEKLY COUNT =================
function updateWeekly() {
    const el = document.getElementById("weeklyCount");
    if (!el) return;

    const items = JSON.parse(localStorage.getItem("bakeryItems")) || [];
    el.textContent = items.length + " items baked 💖";
}

// ================= CLEAR BUTTON =================
function clearShelf() {
    localStorage.removeItem("bakeryItems");
    loadShelf();
}

// ================= WEEK RESET =================
function checkWeekReset() {
    const now = new Date();
    const week = now.getFullYear() + "-" + getWeek(now);

    const saved = localStorage.getItem("week");

    if (saved !== week) {
        localStorage.setItem("week", week);
        localStorage.removeItem("bakeryItems");
    }
}

function getWeek(d) {
    const start = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - start) / 86400000) + start.getDay() + 1) / 7);
}

// ================= INIT =================
checkWeekReset();
loadShelf();
renderWeeklyChart();