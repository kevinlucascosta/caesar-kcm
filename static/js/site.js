const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? '×' : '☰';
});
const dialog = document.querySelector('.contact-dialog');
document.querySelectorAll('.contact-trigger').forEach(button => button.addEventListener('click', () => dialog?.showModal()));
document.querySelector('.close-dialog')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
const demo = document.querySelector('#demo-shift');
if (demo) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const visualizer = document.querySelector('#alphabet');
  const updateDemo = () => {
    const shift = Number(demo.value);
    document.querySelector('#demo-value').textContent = shift;
    document.querySelector('#example-shift').textContent = shift;
    const moved = char => String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
    document.querySelector('#example-a').textContent = moved('A');
    document.querySelector('#example-b').textContent = moved('B');
    visualizer.innerHTML = `<div class="alphabet-row"><b>Original:</b>${alphabet.map(c => `<i>${c}</i>`).join('')}</div><div class="alphabet-row cipher-row"><b>Cifrado →</b>${alphabet.map(c => `<i>${moved(c)}</i>`).join('')}</div>`;
  };
  demo.addEventListener('input', updateDemo); updateDemo();
}
