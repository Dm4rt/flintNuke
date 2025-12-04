// Highlight active nav link by URL (basic)
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === location.pathname.split("/").pop()) {
    link.classList.add("active");
  }
});

// Simulated login logic
const form = document.getElementById("login-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const msg = document.getElementById("login-message");

    const combined = (username + " " + password).toLowerCase();

    // Normal "correct" credentials for training
    const realUser = username === "researcher";
    const realPass = password === "bedrock2025!";

    if (realUser && realPass) {
      msg.textContent =
        "Login successful. Welcome, Researcher. (Normal authentication path.)";
      msg.className = "login-message success";
      return;
    }

    // Simulated SQL injection behavior (client-side only!)
    const looksLikeInjection =
      combined.includes("' or '1'='1") ||
      combined.includes('" or "1"="1') ||
      combined.includes("or 1=1");

    if (looksLikeInjection) {
      msg.textContent =
        "Simulated SQL injection detected: access granted for training purposes ONLY.";
      msg.className = "login-message warning";
      return;
    }

    msg.textContent = "Login failed. Invalid credentials.";
    msg.className = "login-message error";
  });
}
