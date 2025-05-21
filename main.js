const form = document.getElementById('form-contato');
const contatos = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaContato();
    atualizarTabela();
    atualizarTotalContatos();
});

function adicionaContato() {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputEmailContato = document.getElementById('email-contato');
    const inputTelefoneContato = document.getElementById('telefone-contato');

    if (contatos.some(contato => contato.email === inputEmailContato.value)) {
        alert(`Já existe um contato com o e-mail ${inputEmailContato.value}`);
        return;
    }

    if (contatos.some(contato => contato.telefone === inputTelefoneContato.value)) {
    alert(`Já existe um contato com o telefone ${inputTelefoneContato.value}`);
    return;
    }

    const contato = {
        nome: inputNomeContato.value,
        email: inputEmailContato.value,
        telefone: inputTelefoneContato.value
    };

    contatos.push(contato);

    inputNomeContato.value = '';
    inputEmailContato.value = '';
    inputTelefoneContato.value = '';

    atualizarTabela();
    atualizarTotalContatos();
}

function atualizarTabela() {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = '';

    contatos.forEach(contato => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${formatarTelefone(contato.telefone)}</td>
            <td><button class="btn-acao" onclick="removerContato('${contato.email}')">Remover</button></td>
        `;
        corpoTabela.appendChild(linha);
    });
}

function atualizarTotalContatos() {
    document.getElementById('total-contatos').textContent = `Total de contatos: ${contatos.length}`;
}

function removerContato(email) {
    const contato = contatos.find(c => c.email === email);
    if (!contato) return;

    const confirmacao = confirm(`Tem certeza que deseja remover o contato "${contato.nome}" com o e-mail "${contato.email}"?`);
    if (!confirmacao) return;

    const index = contatos.findIndex(contato => contato.email === email);
    if (index !== -1) {
        contatos.splice(index, 1);
        atualizarTabela();
        atualizarTotalContatos();
    }
}

function formatarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length === 11) {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
    } else if (numeros.length === 10) {
        return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
    } else {
        return telefone;
    }
}