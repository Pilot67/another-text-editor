const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
butInstall.classList.toggle("hidden", true);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    butInstall.classList.toggle("hidden", true);
    return;
  }

  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  butInstall.classList.toggle("hidden", true);
  window.deferredPrompt = null;
});
