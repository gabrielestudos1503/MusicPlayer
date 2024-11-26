async function carregarRecentes(endpoint, containerId) {
    try {
        const response = await fetch(endpoint); // Chama a rota de API
        const data = await response.json(); // Recebe os dados
        const container = document.getElementById(containerId);
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.nome || `${item.titulo} - ${item.data}`;
            container.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar itens recentes:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarRecentes('/discos/recentes', 'discos-recentes');
    carregarRecentes('/artistas/recentes', 'artistas-recentes');
    carregarRecentes('/generos/recentes', 'generos-recentes');
});