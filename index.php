<!DOCTYPE html>
<html lang="en">
  <link rel="manifest" href="manifest.json">
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('app/inc/js/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
</script>
<head>
    <?php include 'app/parts/header.php'; ?>
    <title>Document</title>
</head>
<body>
    <main class="container">
        <h1>Welcome to Your App</h1>
        <p>This is the main content of your page.</p>
    </main>
    <button id="install-button" style="display:none;" class="btn btn-primary">Install App</button>

    <?php include 'app/parts/footer.php'; ?>
</body>
</html>


