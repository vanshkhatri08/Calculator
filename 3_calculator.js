// Get references to the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to store the current input, previous input, and selected operator
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay(value) {
    display.textContent = value || '0';
}

// Function to perform calculations
function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    let result = 0;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');

        if (!isNaN(action) || action === '.') {
            // Handle number and decimal inputs
            if (action === '.' && currentInput.includes('.')) return;
            currentInput += action;
            updateDisplay(currentInput);
        } else if (action === 'clear') {
            // Handle clear
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('');
        } else if (action === 'delete') {
            // Handle delete (backspace)
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (action === 'calculate') {
            // Handle calculate (=)
            calculate();
        } else {
            // Handle operators (+, -, *, /, %)
            if (currentInput === '' && action !== '-') return; // Allow '-' for negative numbers
            if (previousInput && currentInput) calculate(); // Perform existing calculation first
            operator = action === 'add' ? '+' :
                       action === 'subtract' ? '-' :
                       action === 'multiply' ? '*' :
                       action === 'divide' ? '/' :
                       action === 'percent' ? '%' : action;
            previousInput = currentInput || previousInput;
            currentInput = '';
        }
    });
});


// Initialize display
updateDisplay('');
