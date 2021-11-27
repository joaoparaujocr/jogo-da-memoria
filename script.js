let arrayOrder = []; //Array gerada a cada jogada
let arrayUser = []; //Array gerada atráves do click do usuário
let score = 0; //Nível de sequencias
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const buttonPlay = document.querySelector('.btn');
const containerAlert = document.querySelector('.container-alert')
const alertPlay = document.querySelector('.alert-play')

// Capturando eventos de click nos botões
buttonPlay.addEventListener('click', e => {
    const btnTarget = e.target;
    containerAlert.style.display = 'none';
    alertPlay.style.display = 'none';

    btnTarget.getAttribute('id') === 'next-level' ? scrambleOrder() : playGame();
});

// Caixa de alerta para o usurário
const playerAlert = (msg, textButton) => {
    alertPlay.childNodes[1].textContent = msg;
    buttonPlay.textContent = textButton;
    containerAlert.style.display = 'flex';
    alertPlay.style.display = 'flex';
}

// Número aleatorio para as cores
const scrambleOrder = () => {
    let numberColor = Math.floor(Math.random() * 4);
    arrayUser = [];

    arrayOrder.push(numberColor);
    for (let i in arrayOrder) {
        colorOrder(arrayOrder[i], Number(i) + 1);
    }
}

// Capturando o click nas cores
const clickOnColor = (number) => {
    arrayUser.push(number);
    checkingTheOrder();
}

green.addEventListener('click', () => clickOnColor(0));
red.addEventListener('click', () => clickOnColor(1));
yellow.addEventListener('click', () => clickOnColor(2));
blue.addEventListener('click', () => clickOnColor(3));

// Checando a ordem gerada com a ordem do usuário
const checkingTheOrder = () => {
    for (let i in arrayUser) {
        if (arrayUser[i] != arrayOrder[i]) {
            gameOver();
            break;
        }
    }
    if (arrayUser.length == arrayOrder.length) {
        score++;
        nextLevel();
    }
}

// Formatação do alerta para o proximo nível
const nextLevel = () => {
    buttonPlay.removeAttribute('id');
    buttonPlay.setAttribute('id', 'next-level');
    playerAlert(`Nível ${score}: Concluído`, 'Próximo nível')
}

// Formatação quando o uuário perde
const gameOver = () => {
    playerAlert(`Você Perdeu\n || Nível final: ${score}`, 'Tente novamente');
    arrayOrder = [];
    score = 0;
}

// Tempo para que as cores sejam mudadas
const colorOrder = (colorNumber, time) => {
    time *= 1000;
    setTimeout(() => {
        divColor(colorNumber).classList.add('selected');
    }, time + 500);
    setTimeout(() => {
        divColor(colorNumber).classList.remove('selected');
    }, time + 1000)
}

// Cor que deve ser mudada
const divColor = (colorNumber) => {
    switch (colorNumber) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            break;
    }
}

// Iniciando o jogo
function playGame() {
    scrambleOrder();
}