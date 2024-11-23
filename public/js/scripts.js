// Exemplo de confirmação de exclusão
function confirmDelete(entity, id) {
    if (confirm(`Tem certeza de que deseja excluir este ${entity}?`)) {
        document.getElementById(`delete-form-${id}`).submit();
    }
}