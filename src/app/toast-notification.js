import document from 'global/document';

const toastNotif = document.getElementById('toast-notification');
const message = toastNotif.querySelector('.notif-message');
const deleteButton = toastNotif.querySelector('.delete');

document.addEventListener('sw-message', e => {
  message.textContent =  e.detail;
  display();
  setTimeout(hide, 2000);
});
deleteButton.addEventListener('click', hide);

function display() {
  toastNotif.classList.remove('is-hidden');
}

function hide() {
  toastNotif.classList.add('is-hidden');
}
