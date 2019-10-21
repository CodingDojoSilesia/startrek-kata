/**
 * The author is aware that the following code could be more elegant, especially when I use the library like 
 * `readline-sync` or `Inquirer.js`.
 * Yet, for simplicity, I've used a very clean and uncomplicated approach based on the variable `mode` and the set of 
 * constants.
 */

const readlineSync = require('readline-sync');

const COMMANDS_MODE = 0, MANOEUVRE_MODE = 1, BATTLE_MODE = 2;
const MANOEUVRE_COMMAND = 0,
      SHORT_SCAN_COMMAND = 1,
      LONG_SCAN_COMMAND = 2,
      BATTLE_COMMAND = 3,
      GALAXY_MAP_COMMAND = 4;
let mode = COMMANDS_MODE; // the current mode
while (true) {
    if (mode === COMMANDS_MODE) {
        let command = parseInt(readlineSync.question('Command: ', {
            limit: [
                MANOEUVRE_COMMAND,
                SHORT_SCAN_COMMAND,
                LONG_SCAN_COMMAND,
                BATTLE_COMMAND,
                GALAXY_MAP_COMMAND
            ],
            limitMessage: 'INCORRECT COMMAND, PLEASE USE ONE OF THESE COMMANDS: $<limit>'
        }));
        if (command === MANOEUVRE_COMMAND) {
            console.log('ENTERING INTO THE MANOEUVRE MODE');
            mode = MANOEUVRE_MODE;
        } else if (command === BATTLE_COMMAND) {
            console.log('ENTERING INTO THE BATTLE MODE');
            mode = BATTLE_MODE;
        }
    } else if (mode === MANOEUVRE_MODE) {
        let vector = readlineSync.question('VECTOR ? ', {
            limit: [/^-?\d+,-?\d+$/],
            limitMessage: 'INCORRECT VECTOR FORMAT, PLEASE USE THE FOLLOWING FORMAT: X,Y'
        }).split(',').map(x => parseInt(x));
        console.log('ENTERING INTO THE COMMANDS MODE');
        mode = COMMANDS_MODE;
    } else if (mode === BATTLE_MODE) {
        console.log('ENTERPRISE HAS ? ENERGY'); // please code the right thing here
        let amountOfEnergy = parseInt(readlineSync.question('How much energy use to attack? ', {
            limit: [/d+/],
            limitMessage: 'INCORRECT AMOUNT OF ENERGY'
        }));
        if (amountOfEnergy === 0) {
            console.log('ENTERING INTO THE COMMANDS MODE');
            mode = COMMANDS_MODE;
        }
    }
}