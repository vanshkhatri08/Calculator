const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');

        if (action === 'clear') {
            clearDisplay();
        } else if (action === 'delete') {
            deleteLast();
        } else if (action === 'calculate') {
            calculate();
        } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            setOperator(action);
        } else {
            addToDisplay(action);
        }
    });
});

function addToDisplay(value) {
    if (currentInput.length >= 10) return;
    if (value === 'decimal') {
        if (currentInput.includes('.')) return;
        currentInput += '.';
    } else {
        currentInput += value;
    }
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    display.innerText = '0';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0';
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;

    let result;
    const current = parseFloat(currentInput);
    const previous = parseFloat(previousInput);

    switch (operator) {
        case 'add':
            result = previous + current;
            break;
        case 'subtract':
            result = previous - current;
            break;
        case 'multiply':
            result = previous * current;
            break;
        case 'divide':
            result = previous / current;
            break;
    }

    display.innerText = result.toString().slice(0, 10);
    currentInput = result;
    operator = null;
    previousInput = '';
}
