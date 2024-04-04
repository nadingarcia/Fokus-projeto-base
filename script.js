const html = document.querySelector('html');
const btCurto = document.querySelector('.app__card-button--curto');
const btFoco = document.querySelector('.app__card-button--foco');
const btLongo = document.querySelector('.app__card-button--longo');
const imagemFundo = document.querySelector('.app__image');
const textoPrincipal = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const inputMusica = document.getElementById('alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
const btStart = document.getElementById('start-pause');
let intervaloId = null;
const iconPlay = document.querySelector('.app__card-primary-butto-icon');
const textoSpan = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorrido = 10;

inputMusica.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})


for(let i=0; i< botoes.length; i++) {
   botoes[i].addEventListener('click', () => {

    for (let j=0; j< botoes.length; j++) {
            if (i !== j && botoes[j].classList.contains('active')) {
                botoes[j].classList.remove('active');
            }
        }

    botoes[i].classList.add('active');

   })
}

btFoco.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterarContexto('foco');
})

btCurto.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterarContexto ('descanso-curto');
})


btLongo.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterarContexto ('descanso-longo');
})

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    imagemFundo.src = `/imagens/${contexto}.png`;
    switch (contexto) {
        case 'foco':
            textoPrincipal.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
          
        case 'descanso-curto':
            textoPrincipal.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;

        case 'descanso-longo':
            textoPrincipal.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
        default:
            break;
    }
}

const contagem = () => {
   
    if (tempoDecorrido === 0) {
       clearInterval(intervaloId);
       iconPlay.src = './imagens/play_arrow.png';
       intervaloId = null;
       const focoAtivo = html.getAttribute("data-contexto") == "foco";
       if (focoAtivo) {
            const evento = new CustomEvent("focoFinalizado");
            document.dispatchEvent(evento);
       }
       textoSpan.textContent = 'Começar';
       new Audio('./sons/beep.mp3').play();
       if (musica.play){
        musica.pause();
    }
    }

    tempoDecorrido -= 1;
    mostrarTempo();
    
}

btStart.addEventListener('click', ()=> {
    if (intervaloId === null) {

        new Audio('./sons/play.wav').play();
        iconPlay.src = './imagens/pause.png';
        intervaloId = setInterval (contagem, 1000);
        textoSpan.textContent = 'Pausar';

    } else {

        clearInterval(intervaloId);
        intervaloId = null;
        iconPlay.src = './imagens/play_arrow.png';
        new Audio('./sons/pause.mp3').play();
        textoSpan.textContent = 'Começar';
        return;

    }
});

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
