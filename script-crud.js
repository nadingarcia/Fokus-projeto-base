const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const tarefas = [];

btnAdicionarTarefa.addEventListener("click", () => {
    formularioTarefa.classList.toggle("hidden");
})

formularioTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value 
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
})
