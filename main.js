// ZINICH website interactions — no external libraries required.
const CONTACT_EMAIL = "zainduah55@gmail.com";
const CONTACT_WEBHOOK_URL = ""; // Paste your Google Apps Script deployment URL here to send automatically via Gmail.

const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, {passive:true});

menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

const getStoredTheme = () => {
  try {
    return localStorage.getItem("zinich-theme");
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("zinich-theme", theme);
  } catch {
    // Ignore storage errors in restricted/private browsing modes.
  }
};

const savedTheme = getStoredTheme();
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
themeToggle?.addEventListener("click", () => {
  const light = document.documentElement.dataset.theme === "light";
  const nextTheme = light ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  saveTheme(nextTheme);
  themeToggle.textContent = nextTheme === "light" ? "☾" : "☼";
});
if (document.documentElement.dataset.theme === "light") themeToggle.textContent = "☾";

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const updateActiveNav = () => {
  const current = sections.reduce((active, section) => {
    return window.scrollY + 140 >= section.offsetTop ? section.id : active;
  }, "home");
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
};
window.addEventListener("scroll", updateActiveNav, {passive:true});
updateActiveNav();

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const note = document.getElementById("formNote");
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const subject = String(data.get("subject") || "").trim();
  const message = String(data.get("message") || "").trim();
  const mailtoSubject = encodeURIComponent(subject || "New enquiry");
  const mailtoBody = encodeURIComponent(
    `Hello ZINICH,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
  );

  if (CONTACT_WEBHOOK_URL) {
    if (note) {
      note.textContent = "Sending your message...";
      note.style.color = "var(--muted)";
    }

    fetch(CONTACT_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message })
    })
      .then(() => {
        if (note) {
          note.textContent = "Thanks! Your message has been sent successfully.";
          note.style.color = "var(--blue)";
        }
        form.reset();
      })
      .catch(() => {
        if (note) {
          note.textContent = "Your message could not be sent automatically. Please try again or use your email app.";
          note.style.color = "var(--blue)";
        }
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
      });
    return;
  }

  if (!CONTACT_EMAIL) {
    if (note) {
      note.textContent = "Form ready. Add your Gmail address to CONTACT_EMAIL in main.js to enable email submission.";
      note.style.color = "var(--blue)";
    }
    return;
  }

  if (note) {
    note.textContent = "Opening your email app...";
    note.style.color = "var(--muted)";
  }

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
});
