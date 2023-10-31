document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id >= '0' && button.id <= '9') {
                currentInput += button.id;
            } else if (button.id === 'decimal') {
                if (currentInput.indexOf('.') === -1) {
                    currentInput += '.';
                }
            } else if (button.id === 'clear') {
                currentInput = '';
                currentOperator = '';
                firstOperand = null;
            } else if (button.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
            } else if (button.id === 'calculate') {
                if (currentOperator && firstOperand) {
                    currentInput = operate(firstOperand, currentInput, currentOperator);
                    firstOperand = null;
                    currentOperator = '';
                }
            } else {
                if (currentOperator && firstOperand) {
                    currentInput = operate(firstOperand, currentInput, currentOperator);
                    firstOperand = parseFloat(currentInput);
                } else {
                    firstOperand = parseFloat(currentInput);
                }
                currentOperator = button.id;
                currentInput = '';
            }

            display.value = currentInput;
        });
    });

    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                if (b === 0) {
                    return 'Error';
                }
                return a / b;
            default:
                return b;
        }
    }
});
