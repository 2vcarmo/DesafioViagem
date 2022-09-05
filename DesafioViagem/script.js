var Pacote = /** @class  */ (function () {
function Pacote(_nome, _descricao, _data, _status, _id) {
    this.nome = _nome;
    this.descricao = _descricao;
    this.data = _data;
    this.status = _status;
    this.id = _id;
}

Pacote.prototype.MudarNome = function (mudar_nome) {
this.nome = mudar_nome;
};

Pacote.prototype.MudarDiscricao = function (mudar_descricao) {
    this.nome = mudar_descricao;
};

Pacote.prototype.MudarData = function (mudar_data){
    this.nome = mudar_data;
};

Pacote.prototype.MudarStatus = function  (mudar_status){
    this.nome = mudar_status;
};

Pacote.prototype.MudarId = function  (mudar_id){
    this.nome = mudar_id;
};

return Pacote;

}());

var listaPacotes = /** @class */ (function () {
    function listaPacotes() {
        this.listaP = [];
    }

    listaPacotes.prototype.listarPacotes = function () {
        return this.listaP;
    };

    listaPacotes.prototype.addPacotes = function (pacote, index) {
        index--;
        this.listaP[index] = pacote;
    };

    listaPacotes.prototype.excluirPacotes = function (id) {
        this.listaP.splice (id - 1, 1);
    };

    listaPacotes.prototype.editarPacotes = function (id) {
        var pacote = this.listaP.filter(function (objeto) { return objeto.id == id; 
        });
        this.listaP.splice(id, 1);
        return pacote;
    };
    return listaPacotes;
}());

// Declarando as variáveis 

var pacotesCadastrados = new listaPacotes();


// Essa variável irá obter o valor da última id do pacote para evitar repetições.

var id_ultima = 0;

// Conectando as variáveis com as ID do HTML.
var input_nome = document.querySelector('#name-pack');
var button_cadastrar = document.querySelector('#botao-form');
var input_status = document.querySelectorAll('input[name="status"]');
var input_data = document.querySelector('#data');
var input_descricao = document.querySelector('#descricao');
var button_excluir = document.querySelectorAll('.botao-excluir');
var button_form_editar = document.querySelector('#botao-form-editar');

// Parte do cadastro.

// Função para conectar os pacotes lá do HTML.
 var mostrarPacotes = function (objeto) {
    var titulo = objeto.nome;
    var descricao = objeto.descricao;
    var data = new Date(objeto.data);
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var id = objeto.id;

 // Criando o card dos pacotes do HTML. 
 document.querySelector('#pacotes-cadastrados').innerHTML += 
 " <div class=\"pacotes\" id='card-".concat(id, "'>\n    <section >\n        <h4 class=\"titulo\" id='t-").concat(id, "'>").concat(titulo, "</h4>\n        <p class=\"descricao\" id='dc-").concat(id, "'>").concat(descricao, "</p>\n        <span class=\"data-viagem\" id='dt-").concat(id, "' >Data da viagem: ").concat(dia, "/").concat(mes, "/").concat(ano, "</span>\n        <div class=\"div-botao\">\n            <button class=\"botao-editar\" id='b-").concat(id, "' value=").concat(id, " onclick='Editar(").concat(id, ")'>Editar</button>\n            <button class=\"botao-excluir\" id='b-").concat(id, "'value=").concat(id, " onclick='Excluir(").concat(id, ")'>Excluir</button>\n        </div>\n    </section>\n</div>");
};

// API

var pacote = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes';
fetch(pacote, {
    method: 'GET',
    headers: { 'Content-Type': "application/json"}
})

    .then(function (response) { return response.json(); 
    })
    .then(function (result) { 
        var listaObjetos = result;
        id_ultima = Number(listaObjetos.length);
        listaObjetos.map(function (objeto, index) {
            listaObjetos[index] = objeto;

// Mudando as informações.

var nome = objeto.nome;
var descricao = objeto.descricao;
var data = objeto.data;
var status = objeto.status;
var id = Number(objeto.id);
var pacote = new Pacote(nome, descricao, data, status, id);

// Inserindo os pacotes dentro da lista.

pacotesCadastrados.addPacotes(pacote, id);
mostrarPacotes(objeto);
        });
    });

function cadastro() { 
    var status_inp = Boolean(input_status[0].value);
    var data = input_data.value.toString();
    data += 'T18:58:24.397Z';
// Verificando a data inserida.
var data_comp = new Date(data).getTime();
var data_atual = new Date().getTime();
if (data_comp < data_atual){
    return alert("A data inserida não pode ser anterior a data atual.");
}
// Inserindo o id do ultimo pacote no id do objeto + 1 para evitar divergências.
var id = id_ultima + 1;
id_ultima = id;

var pacote = new Pacote(input_nome.value, input_descricao.value, data, status_inp, id);

// Cadastrando pacotes na lista.
pacotesCadastrados.addPacotes(pacote, id);
mostrarPacotes(pacote);

// Limpando os formulários. 
input_nome.value = '';
input_status[0].checked = false;
input_data.value = '';
input_descricao.value = '';
return document.querySelector("#card-".concat(id)).remove();    
}

// Parte do Editar.

// Função para que os pacotes possam ser modificados dentro da lista.
function modificarPacotes (pacote, nome, descricao) {
    var stat_inp = Boolean(input_status[0].value);
    var data = input_data.value.toString();
    data += 'T18:58:24.397Z';
    console.log('nome', nome);
    console.log('nome', descricao);

// Modificando o objeto dentro da lista.
pacote.MudarNome(nome);
pacote.MudarDescricao(descricao);
pacote.MudarData(data);
pacote.MudarStatus(status_inp);
console.log(pacote);

// Limpando os formulários. 
input_nome.value = '';
input_status[0].checked = false;
input_data.value = '';
input_descricao.value = '';
return pacote;
}

// Essa função servirá para modificar os conteúdos lá do HTML. 
function modificarCard (modificar, id){
var card_nome = document.querySelector("#t-".concat(id));
var card_descricao = document.querySelector ("#dc-".concat(id));
var card_data = document.querySelector ("#dt-".concat(id));
var titulo = modficar.nome;
var descricao = modificar.descricao;
var data = new Date (modificar.data);
var dia = data.getDate();
var mes = data.getMonth() + 1;
var ano = data.getFullYear();
card_nome === null || card_nome === void 0 ? void 0 : card_nome.innerHTML = "".concat(titulo);
    card_descricao === null || card_descricao === void 0 ? void 0 : card_descricao.innerHTML = "".concat(descricao);
    card_data === null || card_data === void 0 ? void 0 : card_data.innerHTML = "Data da viagem: ".concat(dia, "/").concat(mes, "/").concat(ano);
}

// Função do botão editar dos cards.
function editar(id){
// Setando para conseguir modificar os botões.
botao_cadastrar.style.display = "none";
botao_editar.style.display = "block";

document.querySelector('header').scrollIntoView();

//  Buscando o pacote escolhido. 
var pacote = pacotesCadastrados.listarPacotes();
pacote = pacote[id - 1];

// Conectando os inputs com as informações.
input_descricao.value = pacote.descricao;
input_nome.value = pacote.nome;
if (pacote.status == true) {
    input_status[0].checked = true;
}
else {
    input_status[1].checked = true;
}
input_data.value = pacote.data.split('T')[0];
input_descricao.value = pacote.descricao;

// Execuções para quando o editar for apertado. 
botao_editar.addEventListener('click', function () {
    var pacote_novo = modificarPacotes(pacote, input_nome.value, input_descricao.value);
    modificarCard(pacote_novo, id);
    botao_cadastrar.style.display = "block";
    botao_editar.style.display = "none";
    document.querySelector("#card-".concat(id)).scrollIntoView();
});
}
 

