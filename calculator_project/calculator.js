const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculator() {
  rl.question('Enter first number: ', (num1) => {
    rl.question('Enter operator (+, -, *, /): ', (op) => {
      rl.question('Enter second number: ', (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let result;

        switch(op) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = a / b; break;
          default:
            console.log('Invalid operator');
            return calculator();
        }

        console.log(`Result: ${result}`);
        calculator(); // loop again
      });
    });
  });
}

calculator();
