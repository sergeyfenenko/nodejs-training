const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    if(input === 'exit') {
        rl.close;
        process.exit();
    }
    console.log(reverseString(input));
})

function reverseString(str){
    return str.split('').reverse().join('');
}
