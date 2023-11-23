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

const bar1 = d.getElementById("bar1");
const bar2 = d.getElementById("bar2");
const bar3 = d.getElementById("bar3");
const bar4 = d.getElementById("bar4");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardBtn.addEventListener('click', () => {
    if (resultEl.value) {
        navigator.clipboard.writeText(resultEl.value);
        
        message.style.visibility = "visible";
        setTimeout(() => { 
            message.style.visibility = "hidden";
        }, 3000);
    }

    
})

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) return "";

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    return generatedPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

lengthEl.oninput = () => {
    const lengthValue = lengthEl.value;

    if (!resultEl.value) modifyBars("");
    if (lengthValue < 10) modifyBars("WEAK");
    if (lengthValue >= 10 && lengthValue < 15) modifyBars("MEDIUM");
    if (lengthValue >= 15 && lengthValue < 20) modifyBars("GOOD");
    if (lengthValue >= 20) modifyBars("STRONG");
};

function modifyBars(level) {
    levelTxt.innerHTML = level;

    bar1.classList.remove("weak", "medium", "good", "strong");
    bar2.classList.remove("weak", "medium", "good", "strong");
    bar3.classList.remove("weak", "medium", "good", "strong");
    bar4.classList.remove("weak", "medium", "good", "strong");

    if (level === "WEAK") {
        bar1.classList.add("weak");
    } else if (level === "MEDIUM") {
        bar1.classList.add("medium");
        bar2.classList.add("medium");
    } else if (level === "GOOD") {
        bar1.classList.add("good");
        bar2.classList.add("good");
        bar3.classList.add("good");
    } else if (level === "STRONG") {
        bar1.classList.add("strong");
        bar2.classList.add("strong");
        bar3.classList.add("strong");
        bar4.classList.add("strong");
    }
}