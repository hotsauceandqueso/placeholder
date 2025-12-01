// -------- BATTERY --------
async function updateBattery() {
    if (!navigator.getBattery) {
        document.getElementById("battery").textContent = "Battery: N/A";
        return;
    }
    
    const battery = await navigator.getBattery();
    function refreshBattery() {
        document.getElementById("battery").textContent =
            `Battery: ${Math.round(battery.level * 100)}%`;
    }

    battery.addEventListener("levelchange", refreshBattery);
    refreshBattery();
}
updateBattery();

// -------- TIME --------
function updateTime() {
    const time = new Date();
    const formatted = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById("time").textContent = `Time: ${formatted}`;
}
setInterval(updateTime, 1000);
updateTime();
