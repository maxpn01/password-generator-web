const d = document;
const resultEl = d.getElementById('result');
const lengthEl = d.getElementById('length');
const uppercaseEl = d.getElementById('uppercase');
const lowercaseEl = d.getElementById('lowercase');
const numbersEl = d.getElementById('numbers');
const symbolsEl = d.getElementById('symbols');
const levelTxt = d.getElementById("lvl-text");
const generateBtn = d.getElementById('generate-btn');
const clipboardBtn = d.getElementById('clipboard-btn');
const message = d.getElementById('message');

const bars = Array.from({ length: 4 }, (_, i) => d.getElementById(`bar${i + 1}`));

const types = { lower: lowercaseEl, upper: uppercaseEl, 
    number: numbersEl, symbol: symbolsEl };

const randomFunc = { lower: () => getRandomChar(97, 26), upper: () => getRandomChar(65, 26), 
    number: () => getRandomChar(48, 10), symbol: getRandomSymbol };

clipboardBtn.addEventListener('click', () => {
    if (resultEl.value) {
        navigator.clipboard.writeText(resultEl.value);
        showMessage();
    }
})

function showMessage() {
    message.style.visibility = 'visible';
    setTimeout(() => { message.style.visibility = 'hidden'; }, 3000);
}

generateBtn.addEventListener('click', generatePassword);
lengthEl.oninput = updatePasswordStrength;

function generatePassword() {
    const length = +lengthEl.value;
    const selectedTypes = Object.entries(types).filter(([key, checkbox]) => checkbox.checked);

    if (selectedTypes.length === 0) {
        resultEl.value = '';
        return;
    }

    resultEl.value = Array.from({ length }, () => {
        const [type,] = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        return randomFunc[type]();
    }).join('');

    updatePasswordStrength(); 
}

function updatePasswordStrength() {
    const lengthValue = lengthEl.value;

    if (!resultEl.value) return modifyBars("");
    
    const level = lengthValue < 10 ? "WEAK" : 
                 lengthValue < 15 ? "MEDIUM" : 
                 lengthValue < 20 ? "GOOD" : "STRONG";
                 
    modifyBars(level);
}

function modifyBars(level) {
    const levels = { "WEAK": 1, "MEDIUM": 2, "GOOD": 3, "STRONG": 4 };
    levelTxt.innerHTML = level;

    bars.forEach((bar, index) => {
        bar.classList.remove('weak', 'medium', 'good', 'strong');
        if (index < levels[level]) bar.classList.add(level.toLowerCase());
    });
}

function getRandomChar(start, range) {
    return String.fromCharCode(Math.floor(Math.random() * range) + start);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}