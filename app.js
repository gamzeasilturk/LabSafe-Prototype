const screens = [...document.querySelectorAll("[data-screen]")];
const defaultScreen = "dashboard";

function showScreen(id, updateHash = true) {
  const target = screens.find((screen) => screen.dataset.screen === id) || screens[0];

  screens.forEach((screen) => {
    screen.hidden = screen !== target;
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.removeAttribute("aria-current");
    if (button.dataset.go === target.dataset.screen) {
      button.setAttribute("aria-current", "page");
    }
  });

  if (updateHash) {
    history.pushState(null, "", `#${target.dataset.screen}`);
  }

  document.title = `${target.querySelector("h1")?.textContent || "LabSafe"} | LabSafe Prototype`;
  document.querySelector("main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-go]");
  if (trigger) {
    showScreen(trigger.dataset.go);
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-submit-go]");
  if (!form) return;
  event.preventDefault();
  if (form.reportValidity()) {
    showScreen(form.dataset.submitGo);
  }
});

window.addEventListener("popstate", () => {
  showScreen(location.hash.slice(1) || defaultScreen, false);
});

showScreen(location.hash.slice(1) || defaultScreen, false);
