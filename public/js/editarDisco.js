document.addEventListener('DOMContentLoaded', () => {
    const faixaLista = document.getElementById('faixa-lista');
    const addFaixaBtn = document.getElementById('add-faixa-btn');
    const faixaTituloInput = document.getElementById('faixa-titulo');
    const faixaDuracaoInput = document.getElementById('faixa-duracao');

    // Adicionar uma nova faixa
    addFaixaBtn.addEventListener('click', () => {
        const titulo = faixaTituloInput.value.trim();
        const duracao = faixaDuracaoInput.value.trim();

        if (!titulo) {
            alert('Título da faixa é obrigatório.');
            return;
        }

        // Criar novo item na lista de faixas
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${titulo} (${duracao || 'Sem duração'})</span>
            <button type="button" class="btn-excluir">Excluir</button>
            <input type="hidden" name="faixas" value='${JSON.stringify({ titulo, duracao })}'>
        `;

        faixaLista.appendChild(li);

        // Limpar os campos de entrada
        faixaTituloInput.value = '';
        faixaDuracaoInput.value = '';

        // Adicionar funcionalidade de exclusão
        li.querySelector('.btn-excluir').addEventListener('click', () => {
            faixaLista.removeChild(li);
        });
    });

    // Exclusão de faixas já existentes
    faixaLista.querySelectorAll('.btn-excluir').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const li = event.target.closest('li');
            faixaLista.removeChild(li);
        });
    });
});
