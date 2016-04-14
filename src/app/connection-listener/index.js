

const updateIndicator = e => {
  const isOnline = e.type === 'online';
  new Notification('Connection', {
    icon: 'img/icon-48.png',
    body: isOnline ? 'You\'re online' : 'You\'re offline'
  });
  // .show();
};

window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
