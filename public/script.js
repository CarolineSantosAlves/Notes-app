const container = document.getElementById('container');
const btnNota = document.getElementById('btnNovaNota');

let Boxnote, btnEditar, btnExcluir, btnSalvar, data, content, contentSave;

btnNota.addEventListener('click', addNota);

function addNota(){
    Boxnote = document.createElement('div'); // variavel que vai conter todas as informações da nota
    Boxnote.setAttribute('class', 'BoxNote');

    btnEditar = document.createElement('button');
    btnEditar.classList.add('editar', 'contentEdit')
    btnEditar.innerHTML = '<i class="fas fa-edit"></i>';

    btnExcluir = document.createElement('button');
    btnExcluir.setAttribute('class', 'excluir');
    btnExcluir.innerText = 'X'; // o icone está pegando o evento por isso exclui só o botão

    btnSalvar = document.createElement('button');
    btnSalvar.setAttribute('class', 'salvar');
    btnSalvar.innerText = 'Salvar';

    content = document.createElement('textarea'); //onde vai a nota. Inicialmente textarea, quando salvar precisa mudar
    content.classList.add('content', 'nota')
 
    

    contentSave = document.createElement('div');
    contentSave.classList.add('nota', 'contentSave','contentEdit')


    let novaData = new Date()
    data = document.createElement('span');
    data.setAttribute('class', 'data');

    data.innerText = `Criada em ${novaData.getDay()}/${novaData.getMonth()+1}/${novaData.getFullYear()}`

    //futuramente quem sabe colocar toda a criação dos botões em um arquivo separado

    
    Boxnote.appendChild(data);
    Boxnote.appendChild(btnExcluir);
    Boxnote.appendChild(btnEditar);
    Boxnote.appendChild(btnSalvar);
    Boxnote.appendChild(content);
    Boxnote.appendChild(contentSave);
    

    container.appendChild(Boxnote);
    

    //função que exclui a nota
    btnExcluir.addEventListener('click', function(BoxNote){
        let btnApaga = BoxNote.target; // obtem o elemento que acionou o evento
        let filho = btnApaga.parentNode; // retorna o parent do nó passado
        let pai = filho.parentNode;
        pai.removeChild(filho);
    })

    // função salva nota

    btnSalvar.addEventListener('click', function(){
        let texto = document.querySelector('.content').value; //usar um seletor CSS para selecionar o elemento
        
        fetch('/',{
            method: 'post',
            headers: { 'Content-Type': 'application/json'}, // documentar melhor a necessidade por que não funcionava sem
            body: JSON.stringify({
                htmlText : texto
            })
        })
        .then(function(response){
            return response.json();
        }).then(function(dados){
           contentSave.classList.remove('contentEdit');
           btnEditar.classList.remove('contentEdit')
           document.querySelector('.contentSave').innerHTML = dados; 
           content.classList.add('contentEdit');
           btnSalvar.classList.add('contentEdit');
         
        }).catch(function(error){
            console.log(error)
        })
    })

    btnEditar.addEventListener('click', function(){
        content.innerHTML = contentSave.value; 
        contentSave.classList.add('contentEdit');
        btnEditar.classList.add('contentEdit');

        content.classList.remove('contentEdit');
        btnSalvar.classList.remove('contentEdit');

    })


}
