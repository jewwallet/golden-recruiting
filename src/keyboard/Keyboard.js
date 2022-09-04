const {Markup} = require('telegraf');

class Keyboard {
    constructor() {
        this.buttons = [];
    }
    addBtn(...btns) {
        const btnRow = [];
        btns.forEach(btn => btnRow.push(btn));
        this.buttons.push(btnRow);
        return this;
    }

    get keyboard() {
        return Markup.keyboard(this.buttons).oneTime().resize();
    }
}

module.exports = Keyboard;