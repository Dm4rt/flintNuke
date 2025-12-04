// Highlight active nav link by URL (basic)
document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === location.pathname.split("/").pop()) {
        link.classList.add("active");
    }
});

// Check authentication status on admin pages
function checkAuth() {
    const currentPage = location.pathname.split("/").pop();
    const isAdminPage = currentPage.startsWith("admin");
    
    if (isAdminPage && !sessionStorage.getItem("authenticated")) {
        window.location.href = "login.html";
    }
}

// Add logout functionality
function logout() {
    sessionStorage.removeItem("authenticated");
    window.location.href = "login.html";
}

// Check auth on page load
checkAuth();

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
            msg.textContent = "Login successful. Redirecting…";
            msg.className = "login-message success";
            sessionStorage.setItem("authenticated", "true");
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 800);
            return;
        }


        // Simulated SQL injection behavior (client-side only!)
        const looksLikeInjection =
            combined.includes("' or '1'='1") ||
            combined.includes('" or "1"="1') ||
            combined.includes("or 1=1");

        if (looksLikeInjection) {
            msg.textContent = "SQL injection successful (simulated). Redirecting…";
            msg.className = "login-message warning";
            sessionStorage.setItem("authenticated", "true");
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 800);
            return;
        }


        msg.textContent = "Login failed. Invalid credentials.";
        msg.className = "login-message error";
    });
}
