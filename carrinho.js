//cria a variável carrinho
let carrinho = [];
 
//cria a função para atualizar os campos código e preço do id produto
function atualizarCampos() {
    const produtoSelect = document.getElementById('produto');
    const selectedOption = produtoSelect.options[produtoSelect.selectedIndex];
    document.getElementById('codigo').value = selectedOption.value;
    document.getElementById('preco').value = selectedOption.dataset.preco;
}
 
//função para adicionar produto no carrinho, adicionando constantes.
function adicionarAoCarrinho() {
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('produto').options[document.getElementById('produto').selectedIndex].text;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const precoUnitario = parseFloat(document.getElementById('preco').value);
    const totalItem = quantidade * precoUnitario;
 
    const itemExistente = carrinho.find(item => item.codigo === codigo);
 
    //if para somar a quantidade e o preço
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
        itemExistente.total = itemExistente.quantidade * itemExistente.precoUnitario;
    } else {
        // .push adiciona elementos ao final do array
        carrinho.push({
            codigo: codigo,
            nome: nome,
            quantidade: quantidade,
            precoUnitario: precoUnitario,
            total: totalItem
        });
    }
 
    salvarCarrinho();
    //exibe na tela o conteúdo do carrinho
    renderizarCarrinho();
}
 
//função pra salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
 
//Exibe na tela os produtos e o resultado da compra
function renderizarCarrinho() {
    const tbody = document.getElementById('lista-carrinho');
    tbody.innerHTML = '';
    let totalCarrinho = 0;
 
    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.precoUnitario.toFixed(2)}</td>
            <td>R$ ${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
        totalCarrinho += item.total;
    });
 
    document.getElementById('total-carrinho').textContent = `R$ ${totalCarrinho.toFixed(2)}`;
}
 
// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    const carregado = localStorage.getItem('carrinho');
     // Verifica se havia dados armazenados
    if (carregado) {
        carrinho = JSON.parse(carregado);
          // Atualiza a interface com os itens do carrinho recuperados
        renderizarCarrinho();
    }
    atualizarCampos();
});
 
 // Detectar movimento do mouse perto da parte superior da tela
 document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 50) {
        mostrarModal();
    }
});
 
function mostrarModal() {
    document.getElementById('modalOfertas').style.display = 'flex';
}
 
function fecharModal() {
    document.getElementById('modalOfertas').style.display = 'none';
}
 
// Fechar modal ao clicar fora
window.onclick = function(e) {
    if (e.target.classList.contains('modal-ofertas')) {
        fecharModal();
    }
}