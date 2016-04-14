
Notification.requestPermission(permission => {
  if (!('permission' in Notification)) {
    Notification.permission = permission;
  }
});

const updateIndicator = e => {
  const isOnline = e.type === 'online';
  const notif = new Notification('Connection', {
    icon: 'img/icon-48.png',
    body: isOnline ? 'You\'re online :)' : 'You\'re offline :('
  });
  notif.onshow = () => {
    setTimeout(() =>notif.close(), 5000);
  };
};

window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);
