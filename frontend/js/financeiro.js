let lancamentos = [];

const form = document.getElementById("formFinanceiro");
const tabela = document.getElementById("listarFinanceiro");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const tipo = document.getElementById("tipo").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;

    const novoLancamento = { descricao, tipo, valor, data };

    lancamentos.push(novoLancamento);

    form.reset();
    atualizarTabela();
});

function atualizarTabela() {
    tabela.innerHTML = "";

    let totalEntradas = 0;
    let totalSaidas = 0;

    lancamentos.forEach(l => {

        if (l.tipo === "entrada") {
            totalEntradas += l.valor;
        } else {
            totalSaidas += l.valor;
        }

        tabela.innerHTML += `
            <tr>
                <td>${l.descricao}</td>
                <td>${l.tipo}</td>
                <td>R$ ${l.valor.toFixed(2)}</td>
                <td>${l.data}</td>
            </tr>
        `;
    });

    const saldo = totalEntradas - totalSaidas;

    document.getElementById("totalEntradas").textContent = totalEntradas.toFixed(2);
    document.getElementById("totalSaidas").textContent = totalSaidas.toFixed(2);
    document.getElementById("saldoFinal").textContent = saldo.toFixed(2);
}