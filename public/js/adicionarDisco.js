
const faixaLista = document.getElementById('faixa-lista');
const faixaTituloInput = document.getElementById('faixa-titulo');
const faixaDuracaoInput = document.getElementById('faixa-duracao');
const addFaixaBtn = document.getElementById('add-faixa-btn');

addFaixaBtn.addEventListener('click', () => {
    const titulo = faixaTituloInput.value.trim();
    const duracao = faixaDuracaoInput.value.trim();

    if (!titulo || !duracao) {
        alert('Por favor, preencha o título e a duração da faixa.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span><strong>${titulo}</strong> (${duracao})</span>
        <button type="button" class="remove-faixa-btn">Remover</button>
        <input type="hidden" name="faixas[]" value='{"titulo": "${titulo}", "duracao": "${duracao}"}'>
    `;

    li.querySelector('.remove-faixa-btn').addEventListener('click', () => {
        faixaLista.removeChild(li);
    });

    faixaLista.appendChild(li);

    faixaTituloInput.value = '';
    faixaDuracaoInput.value = '';
});