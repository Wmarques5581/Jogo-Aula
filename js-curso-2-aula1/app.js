// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo secreto Washington';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
 function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo secreto Enzo');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute() {
    // console.log('o botão foi clicado!');
    // console.log(numeroSecreto);
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar') . removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas ++;
        limparCampo();

    }
}

function gerarNumeroAleatorio() {
         let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
         let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

         if (quantidadeDeElementosNaLista == numeroLimite) {
            listaDeNumerosSorteados = [];
         }
         if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio ();
         } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
    
        }
    }   
    // console.log(chute == numeroSecreto);

    function limparCampo() {
        chute = document.querySelector('input');
        chute.value = '';
}
    
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}