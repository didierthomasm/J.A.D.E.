const butInstall = document.getElementById('buttonInstall');

if (butInstall) {
  window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;

    showInstallButton();
  });

  butInstall.addEventListener('click', handleInstallButtonClick);

  window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
  });
}

function showInstallButton() {
  butInstall.classList.remove('hidden');
}

function hideInstallButton() {
  butInstall.classList.add('hidden');
}

function handleInstallButtonClick() {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  hideInstallButton();
}
