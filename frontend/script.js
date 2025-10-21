const backendURL = "http://localhost:3000";

document.getElementById("startBtn").addEventListener("click", async () => {
  document.getElementById("ping").textContent = "Testing...";
  document.getElementById("download").textContent = "-";
  document.getElementById("upload").textContent = "-";

  // 🕒 Ping Test
  const pingStart = performance.now();
  await fetch(`${backendURL}/ping`);
  const pingEnd = performance.now();
  const ping = (pingEnd - pingStart).toFixed(2);
  document.getElementById("ping").textContent = ping;

  // 📥 Download Test
  const dStart = performance.now();
  const download = await fetch(`${backendURL}/download`);
  await download.arrayBuffer();
  const dEnd = performance.now();
  const durationSec = (dEnd - dStart) / 1000;
  const sizeMB = 2; // same as backend (2 MB)
  const downloadSpeed = ((sizeMB * 8) / durationSec).toFixed(2); // Mbps
  document.getElementById("download").textContent = downloadSpeed;

  // 📤 Upload Test
  const uploadData = new Uint8Array(2 * 1024 * 1024); // 2 MB
  const uStart = performance.now();
  await fetch(`${backendURL}/upload`, {
    method: "POST",
    body: uploadData
  });
  const uEnd = performance.now();
  const uDuration = (uEnd - uStart) / 1000;
  const uploadSpeed = ((2 * 8) / uDuration).toFixed(2);
  document.getElementById("upload").textContent = uploadSpeed;
});
