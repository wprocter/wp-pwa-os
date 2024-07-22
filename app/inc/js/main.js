if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('app/inc/js/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Show the install button or prompt the user
    showInstallButton(); // Implement this function to show a custom button or UI
});

// Function to handle the install button click
function handleInstallButtonClick() {
    // Hide the install button
    hideInstallButton(); // Implement this function to hide the button
    // Show the install prompt
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((result) => {
            if (result.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Implement functions to show and hide the install button
function showInstallButton() {
    const installButton = document.getElementById('install-button');
    if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', handleInstallButtonClick);
    }
}

function hideInstallButton() {
    const installButton = document.getElementById('install-button');
    if (installButton) {
        installButton.style.display = 'none';
    }
}

// Optionally, you can also handle the appinstalled event
window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
});
