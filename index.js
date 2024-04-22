const fs = require('fs');


function readNumberFromFile(file) {
    
    const data = fs.readFileSync(file, 'utf-8');
    const number = parseFloat(data);
    return number;
}


function sumofNumber(fileA, fileB) {
    const numberA = readNumberFromFile(fileA);
    const numberB = readNumberFromFile(fileB);
    const sum = numberA + numberB;
    console.log(`Сума чисел з файлів ${fileA} та ${fileB} дорівнює: ${sum}`);
}

sumofNumber('a.txt', 'b.txt');
