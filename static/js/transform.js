const transformer = document.querySelector('.transform-grid');
if (transformer) {
  const source = document.querySelector('#source-text'); const shift = document.querySelector('#shift-key');
  const result = document.querySelector('#result'); const keyValue = document.querySelector('#key-value');
  const tipKey = document.querySelector('#tip-key'); const copy = document.querySelector('#copy-button');
  const csrf = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1] || '';
  let requestId = 0;
  const update = async () => {
    keyValue.textContent = shift.value; if (tipKey) tipKey.textContent = shift.value;
    if (!source.value) { result.textContent = ''; copy.disabled = true; return; }
    const current = ++requestId;
    try {
      const response = await fetch('/api/cifra-cesar/', {method: 'POST', headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrf}, body: JSON.stringify({text: source.value, shift: shift.value, mode: transformer.dataset.mode})});
      const data = await response.json(); if (current === requestId && response.ok) { result.textContent = data.result; copy.disabled = false; }
    } catch { result.textContent = 'Não foi possível processar a mensagem.'; }
  };
  source.addEventListener('input', update); shift.addEventListener('input', update); update();
  document.querySelector('#clear-button').addEventListener('click', () => { source.value = ''; update(); source.focus(); });
  copy.addEventListener('click', async () => { await navigator.clipboard.writeText(result.textContent); copy.textContent = '✓ Resultado copiado'; setTimeout(() => copy.textContent = '▣ Copiar Resultado', 1800); });
}
