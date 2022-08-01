let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3'); 
let votoBranco = false;
let votoNulo = false;
let votos = [];

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    votoBranco = false;
    votoNulo = false;

    for(let cont=0; cont < etapa.numeros; cont++) {
        if(cont === 0) {
        numeroHTML += '<div class="numero pisca"></div>';
        } else {
        numeroHTML += '<div class="numero"></div>';
        }
   }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;

}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
       if(item.numero === numero) {
           return true;
       } else {
           seuVotoPara.style.display = 'block';
           aviso.style.display = 'block';
           descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
           votoNulo = true;
       }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                 fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</figure></div>`;
            } else { 
                 fotosHTML += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</figure></div>`
            }
        }   
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero != null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling != null) {
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    } 
}


function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    }
}    

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        if(votoNulo) {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'nulo'
            });
        } else {
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            });
        }
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] != undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();

