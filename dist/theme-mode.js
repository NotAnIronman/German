(() => {
  "use strict";

  const storageKey = "satzwerk-theme";
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function activeTheme() {
    return savedTheme() || (darkQuery.matches ? "dark" : "light");
  }

  function updateControls(theme) {
    const darkIsActive = theme === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(darkIsActive));
      button.setAttribute("aria-label", "Dark theme");
      const icon = button.querySelector(".theme-toggle-icon");
      const label = button.querySelector(".theme-toggle-label");
      if (icon) icon.textContent = darkIsActive ? "☀" : "☾";
      if (label) label.textContent = darkIsActive ? "Light" : "Dark";
    });
  }

  function applyTheme(theme, saveChoice = false) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#171c1a" : "#f6f2ea";
    if (saveChoice) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {}
    }
    updateControls(theme);
  }

  function connectControls() {
    updateControls(activeTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    });
  }

  function followSystemTheme(event) {
    if (!savedTheme()) applyTheme(event.matches ? "dark" : "light");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectControls, { once: true });
  } else {
    connectControls();
  }

  if (typeof darkQuery.addEventListener === "function") {
    darkQuery.addEventListener("change", followSystemTheme);
  } else if (typeof darkQuery.addListener === "function") {
    darkQuery.addListener(followSystemTheme);
  }

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) applyTheme(activeTheme());
  });
})();
