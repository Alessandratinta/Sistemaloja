let itensVenda = [];
let total = 0;
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function carregarProdutos() {
    const select = document.getElementById("produto");
    produtos.forEach(p => {
        let opt = document.createElement("option");
        opt.value = p.nome;
        opt.textContent = p.nome;
        select.appendChild(opt);
    });
}

function preencherValor() {
    const nomeProd = document.getElementById("produto").value;
    const prod = produtos.find(p => p.nome === nomeProd);
    
    if (prod) {
        document.getElementById("valor").value = parseFloat(prod.preco).toFixed(2);
        document.getElementById("quantidade").focus();
    }
}

function adicionarItem() {
    const cliente = document.getElementById("cliente").value || "Consumidor";
    const produto = document.getElementById("produto").value;
    const qtd = parseFloat(document.getElementById("quantidade").value);
    const vlr = parseFloat(document.getElementById("valor").value);

    if (!produto || isNaN(qtd) || isNaN(vlr)) {
        alert("Selecione um produto primeiro!");
        return;
    }

    const subtotal = qtd * vlr;
    itensVenda.push({ produto, qtd, vlr, subtotal });
    total += subtotal;

    renderizarTabela();
    atualizarTotal();

    // Limpa apenas o produto para o próximo item, mantém o cliente
    document.getElementById("produto").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("quantidade").value = 1;
    document.getElementById("produto").focus();
}

function renderizarTabela() {
    const tbody = document.getElementById("tabelaItens");
    tbody.innerHTML = "";
    itensVenda.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.produto}</td>
                <td>${item.qtd}</td>
                <td>R$ ${item.vlr.toFixed(2)}</td>
                <td>R$ ${item.subtotal.toFixed(2)}</td>
            </tr>`;
    });
}

function atualizarTotal() {
    document.getElementById("totalVenda").textContent = `R$ ${total.toFixed(2)}`;
}

function finalizarVenda() {
    const pgto = document.getElementById("formaPagamento").value;
    if (itensVenda.length === 0) return alert("Adicione itens!");
    if (!pgto) return alert("Selecione a forma de pagamento!");

    alert(`Venda de R$ ${total.toFixed(2)} no ${pgto} finalizada!`);
    
    // Reseta tudo para a próxima venda
    itensVenda = [];
    total = 0;
    document.getElementById("cliente").value = "";
    document.getElementById("formaPagamento").value = "";
    renderizarTabela();
    atualizarTotal();
}

// Atalhos
document.addEventListener('keydown', e => { if(e.key === "F10") finalizarVenda(); });
document.getElementById("quantidade").addEventListener('keypress', e => { if(e.key === 'Enter') adicionarItem(); });

carregarProdutos();