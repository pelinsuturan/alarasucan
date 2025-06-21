const updateClock = () => {
    const end = new Date("September 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = end - now;
  
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  
    document.getElementById("days").innerText = d.toString().padStart(2, "0");
    document.getElementById("hours").innerText = h.toString().padStart(2, "0");
  };
  
  setInterval(updateClock, 1000);
  
  function updateCountdown() {
    const targetDate = new Date("2025-09-01T00:00:00Z");
    const now = new Date();
    const diff = targetDate - now;
  
    if (diff <= 0) {
      document.getElementById("miniCountdown").innerText = "LANDED";
      return;
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
  
    document.getElementById("miniCountdown").innerText =
      `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown();
  

  // Countdown to 1st September
function updateCountdown() {
  const target = new Date("2025-09-01T00:00:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("miniCountdown").textContent = "Arrived!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("miniCountdown").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
