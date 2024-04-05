const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector('.app__section-task-list');
const tarefaAtual = document.querySelector(".app__section-active-task-description");

const btLimparConcluidas = document.getElementById("btn-remover-concluidas");
const btLimparTodas = document.getElementById("btn-remover-todas");

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function criarElementoTarefa(tarefa) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement("p");
    paragrafo.classList.add("app__section-task-list-item-description");
    paragrafo.textContent = (tarefa.descricao);

    const botao = document.createElement("button");
    botao.classList.add("app_button-edit");
    const imagemBotao = document.createElement("img");
    imagemBotao.src = "/imagens/edit.png";
    botao.append(imagemBotao);

    botao.onclick = () => {
        
        const novoNome = prompt ("Qual é o novo nome da tarefa?");
        if (novoNome) {
            
            paragrafo.textContent = (novoNome);
            tarefa.descricao = novoNome;
            atualizarTarefas();
        }

    }

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
} else {
   li.addEventListener("click", ()=> {

       if (tarefaSelecionada === tarefa){

            tarefaAtual.textContent = "";
            li.classList.remove("app__section-task-list-item-active"); 
            tarefaSelecionada = null;
            liTarefaSelecionada = null;

       } else {

        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;
        
        // Remover a classe "active" de todos os elementos "li"
        document.querySelectorAll(".app__section-task-list-item").forEach(item => {
            item.classList.remove("app__section-task-list-item-active");
        });

        tarefaAtual.textContent = tarefa.descricao;
        li.classList.add("app__section-task-list-item-active"); 

    }   
}); 
}

    return li;

}

btnAdicionarTarefa.addEventListener("click", () => {
    formularioTarefa.classList.toggle("hidden");
})

formularioTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa);
    atualizarTarefas();
    const elementoTarefa = criarElementoTarefa(tarefa);
    textarea.value = "";
    formularioTarefa.classList.add("hidden");
    ulTarefas.append(elementoTarefa); 

})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener("focoFinalizado", ()=> {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", "true");
        tarefaAtual.textContent = "";
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
})

btLimparConcluidas.addEventListener("click", () => {
    document.querySelectorAll(".app__section-task-list-item-complete").forEach (elemento => {
        elemento.remove();
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    atualizarTarefas();
})

btLimparTodas.addEventListener("click", () => {
    document.querySelectorAll(".app__section-task-list-item").forEach (elemento => {
        elemento.remove();
    })

    tarefas = [];
    atualizarTarefas();
})