document.addEventListener('DOMContentLoaded', () => {
    const faixaLista = document.getElementById('faixa-lista');
    const addFaixaBtn = document.getElementById('add-faixa-btn');
    const faixaTituloInput = document.getElementById('faixa-titulo');
    const faixaDuracaoInput = document.getElementById('faixa-duracao');

    addFaixaBtn.addEventListener('click', () => {
        const titulo = faixaTituloInput.value.trim();
        const duracao = faixaDuracaoInput.value.trim();

        if (!titulo) {
            alert('Título da faixa é obrigatório.');
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${titulo} (${duracao || 'Sem duração'})</span>
            <button type="button" class="btn-excluir">Excluir</button>
            <input type="hidden" name="faixas" value='${JSON.stringify({ titulo, duracao })}'>
        `;

        faixaLista.appendChild(li);

        faixaTituloInput.value = '';
        faixaDuracaoInput.value = '';

        li.querySelector('.btn-excluir').addEventListener('click', () => {
            faixaLista.removeChild(li);
        });
    });

    faixaLista.querySelectorAll('.btn-excluir').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const li = event.target.closest('li');
            faixaLista.removeChild(li);
        });
    });
});

document.getElementById('back-button').addEventListener('click', function () {
    window.history.back();
});