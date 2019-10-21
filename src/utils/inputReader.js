const readlineSync = require('readline-sync');

module.exports = {
    MANOEUVRE_COMMAND: 0,
    SHORT_SCAN_COMMAND: 1,
    LONG_SCAN_COMMAND: 2,
    BATTLE_COMMAND: 3,
    GALAXY_MAP_COMMAND: 4,
    readCommand()
    {
        return parseInt(readlineSync.question('Command: ', {
            limit: [
                this.MANOEUVRE_COMMAND,
                this.SHORT_SCAN_COMMAND,
                this.LONG_SCAN_COMMAND,
                this.BATTLE_COMMAND,
                this.GALAXY_MAP_COMMAND
            ],
            limitMessage: 'INCORRECT COMMAND, PLEASE USE ONE OF THESE COMMANDS: $<limit>'
        }));
    },
    readVector()
    {
        return readlineSync.question('VECTOR ? ', {
            limit: [/^-?\d+,-?\d+$/],
            limitMessage: 'INCORRECT VECTOR FORMAT, PLEASE USE THE FOLLOWING FORMAT: X,Y'
        }).split(',').map(x => parseInt(x));
    },
    readAmountOfEnergy()
    {
        return parseInt(readlineSync.question('How much energy use to attack? ', {
            limit: [/d+/],
            limitMessage: 'INCORRECT AMOUNT OF ENERGY'
        }));
    }
};