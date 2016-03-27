

const updateIndicator = e => {
  const isOnline = e.type === 'online';
  alert('You are currently online ' + isOnline);
}

window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);