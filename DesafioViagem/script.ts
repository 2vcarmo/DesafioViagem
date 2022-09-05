//##interface ##
interface IPacote {
    MudarNome():void;
    MudarDescricao():void;
    MudarData():void;
    MudarStatus():void;
    MudarId():void;
}
interface IlistaPacotes {
    listaPacotes():Array<object>;
    addPacotes(p:object):void;
    excluirPacotes(id:number):void;
    editarPacotes(id:number):void;
}

//####classes####
class Pacote implements IPacote{
    nome:string;
    descricao:string;
    data:string;
    status:boolean;
    id:number;
    constructor(_nome:string, _descricao:string, _data:string, _status:boolean, _id:number){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }

    MudarNome(mudar_nome:string):void { 
        this.nome=mudar_nome;
    }

    MudarDescricao(mudar_descricao:string):void {
        this.descricao = mudar_descricao;
    }

    MudarData(mudar_data:string):void {
        this.data = mudar_data;
    }

    MudarStatus(mudar_status:boolean):void { 
        this.status = mudar_status;
    }

    MudarId(mudar_id:number):void {
        this.id = mudar_id;
    }
}

class listaPacotes implements IlistaPacotes {
    listaP:Array<object>=[];
    
    listarPacotes():Array<object> { 
            return this.listaP;
    }

    addPacotes(pacote:object, index:number):void{
        index--;
        this.listaP[index]=pacote;
    }

    excluirPacotes(id:number):void{
        this.listaP.splice(id -1, 1);
    }

    editarPacotes(id: number):object {
        let pacote:object=this.listaP.filter((objeto)=>objeto.id==id);
        this.listaP.splice(id, 1);
        return pacote;
    }
}

// Declaração de variáveis.
var pacotesCadastrados = new listaPacotes();

// Essa variável irá obter o valor da última id do pacote para evitar repetições.
var id_ultima = 0;

let botao_cadastrar=document.querySelector('#botao-form');
let input_nome=document.querySelector('#name-pack');
let input_status:NodeListOf<Element> = document.querySelectorAll ('input[name="status"]');
let input_data=document.querySelector('#data');
let input_descricao=document.querySelector('#descricao');
let button_excluir=document.querySelectorAll('.botao-excluir');
let button_form_editar = document.querySelector('#botao-form-editar');


// Parte do Cadastro.

// Função para conectar os pacotes lá do HTML.
const mostrarPacotes = (objeto:object):void=> {
    let titulo:string = objeto.nome;
    let descricao:string = objeto.descricao;
    let data = new Date(objeto.data);
    let dia:number = data.getDate();
    let mes:number = data.getMonth() + 1;
    let ano:number = data.getFullYear();
    let id:number = objeto.id;

// Criando o card dos pacotes do HTML. 
document.querySelector('#pacotes-cadastrados').innerHTML+=
` <div class="pacotes" id='card-${id}'>
    <section >
        <h4 class="titulo" id='t-${id}'>${titulo}</h4>
        <p class="descricao" id='dc-${id}'>${descricao}</p>
        <span class="data-viagem" id='dt-${id}' >Data da viagem: ${dia}/${mes}/${ano}</span>
        <div class="div-botao">
            <button class="botao-editar" id='b-${id}' value=${id} onclick='Editar(${id})'>Editar</button>
            <button class="botao-excluir" id='b-${id}'value=${id} onclick='Excluir(${id})'>Excluir</button>
        </div>
    </section>
</div>`;
}

// API
const pacote: string = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes';

    fetch(pacote, {
        method: 'GET',
        headers: {'Content-Type': "application/json"},
    })
    .then((response: any) => response.json())
    .then((result: any) =>{
        let listaObjetos: Object[] = result;
        id_ultima=Number(listaObjetos.length)
        listaObjetos.map((objeto, index) => {
            listaObjetos[index] = objeto;
// Mudando as informações.
let nome = objeto.nome;
let descricao = objeto.descricao;
let data = objeto.data;
let status = objeto.status;
let id:number = Number(objeto.id);
let pacote = new Pacote(nome, descrição, data, status,id);

// Inserindo os pacotes dentro da lista.
pacotesCadastrados.addPacotes(pacote, id);
mostrarPacotes(objeto);

        });
    });

function cadastro():void{
    let stat:boolean=Boolean(input_status[0].value);
    let data: string=input_data.value.toString();
    data+='T18:58:24.397Z';
// Verificando a data inserida.
let data_comp = new Date(data).getTime();
let  data_atual = new Date().getTime();
if (data_comp < data_atual){
    return alert("A data inserida não pode ser anterior a data atual.");
}

// Inserindo o id do ultimo pacote no id do objeto + 1 para evitar divergências.
let id: number=id_ultima+1; 
id_ultima=id;

let pacote = new Pacote(input_nome.value, input_descricao.value, data, stat, id);

// Cadastrando pacotes na lista.
pacotesCadastrados.addPacotes(pacote, id);
mostrarPacotes(pacote);

// Limpando os formulários. 
input_nome.value = '';
input_status[0].checked = false;
input_data.value = '';
input_descricao.value = '';

return document.querySelector(`#card-${id}`)?.scrollIntoView(); 

}

// Execuções para quando o cadastrar for apertado. 
botao_cadastrar?.addEventListener('click', () => {
    cadastro();
})

// Parte do Excluir. 

function excluir(id:number):void{

// Excluindo pacote da lista.
pacotesCadastrados.excluirPacotes(id);

// Excluindo a div que pertence ao pacote.
document.querySelector(`#card-${id}`).remove();
}   

// Parte do editar.

// Função para que os pacotes possam ser modificados dentro da lista.
function modificarPacotes(pacote:object, nome:string, descricao:string):object{
    let stat:boolean=Boolean(input_status[0].value);
    let data: string=input_data.value.toString() ;
    data+='T18:58:24.397Z';
    console.log('nome',nome)
    console.log('nome',descricao)

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
function modificarCard(modificar:object, id:number):void{
    let card_nome= document.querySelector(`#t-${id}`);
    let card_descricao= document.querySelector(`#dc-${id}`);
    let card_data= document.querySelector(`#dt-${id}`);
    let titulo:string = modificar.nome;
    let descricao:string = modificar.descricao;
    let data = new Date(modificar.data);
    let dia:number=data.getDate();
    let mes:number= data.getMonth()+1;
    let ano:number= data.getFullYear();

    card_nome?.innerHTML=`${titulo}`;
    card_descricao?.innerHTML=`${descricao}`;
    card_data?.innerHTML=`Data da viagem: ${dia}/${mes}/${ano}`;

}

// Função do botão editar dos cards.
function editar(id:number):void{
// Setando para conseguir modificar os botões.
botao_cadastrar.style.display = "none";
botao_editar.style.display = "block";

document.querySelector('header')?.scrollIntoView();

//  Buscando o pacote escolhido. 
let pacote:object= pacotesCadastrados.listarPacotes();
pacote=pacote[id-1];

// Conectando os inputs com as informações.
input_descricao.value=pacote.descricao;
    input_nome.value=pacote.nome;
    if (pacote.status==true) {
        input_status[0].checked=true;
    }
    else{
        input_status[1].checked=true;
    }
    input_data.value=pacote.data.split('T')[0];
    input_descricao.value=pacote.descricao;

// Execuções para quando o editar for apertado. 
botao_editar.addEventListener('click', () => {
    let pacote_novo:object=modificarPacotes(pacote, input_nome.value, input_descricao.value);
    modificarCard(pacote_novo, id);
    botao_cadastrar.style.display = "block";
    botao_editar.style.display = "none";
    document.querySelector(`#card-${id}`).scrollIntoView()


});

}



