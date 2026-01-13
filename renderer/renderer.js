document.addEventListener('DOMContentLoaded', async () => {
  const urlInput = document.getElementById('url-input');
  const goBtn = document.getElementById('go-btn');
  const backBtn = document.getElementById('back-btn');
  const forwardBtn = document.getElementById('forward-btn');
  const refreshBtn = document.getElementById('refresh-btn');
  const homeBtn = document.getElementById('home-btn');
  const statusText = document.getElementById('status-text');
  const flashIndicator = document.getElementById('flash-indicator');

  // Check Flash status
  try {
    const flashStatus = await window.electronAPI.getFlashStatus();
    if (flashStatus.found) {
      flashIndicator.classList.add('active');
      flashIndicator.title = 'Flash plugin loaded: ' + flashStatus.path;
    } else {
      flashIndicator.title = 'Flash plugin not found';
    }
  } catch (e) {
    console.error('Error checking Flash status:', e);
  }

  // Navigate to URL
  async function navigate(url) {
    if (!url) return;

    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('file://')) {
      url = 'https://' + url;
    }

    statusText.textContent = 'Loading...';
    await window.electronAPI.navigate(url);
    urlInput.value = url;
    statusText.textContent = 'Done';
    updateNavButtons();
  }

  // URL input handlers
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      navigate(urlInput.value);
    }
  });

  goBtn.addEventListener('click', () => {
    navigate(urlInput.value);
  });

  // Navigation buttons
  backBtn.addEventListener('click', async () => {
    await window.electronAPI.goBack();
    updateNavButtons();
  });

  forwardBtn.addEventListener('click', async () => {
    await window.electronAPI.goForward();
    updateNavButtons();
  });

  refreshBtn.addEventListener('click', async () => {
    statusText.textContent = 'Refreshing...';
    await window.electronAPI.refresh();
    statusText.textContent = 'Done';
  });

  homeBtn.addEventListener('click', async () => {
    await window.electronAPI.navigate('about:blank');
    urlInput.value = '';
    statusText.textContent = 'Ready';
    updateNavButtons();
  });

  // Update navigation button states
  async function updateNavButtons() {
    try {
      backBtn.disabled = !(await window.electronAPI.canGoBack());
      forwardBtn.disabled = !(await window.electronAPI.canGoForward());
    } catch (e) {
      backBtn.disabled = true;
      forwardBtn.disabled = true;
    }
  }

  // Initial state
  updateNavButtons();
});
