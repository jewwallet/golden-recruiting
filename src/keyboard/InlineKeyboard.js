const {Markup} = require('telegraf');

class InlineKeyboard {
      constructor() {
          this.buttons = [];
      }
      addCallbackBtn(...btns) {
          const btnRow = [];
          for (const btn of btns) {
              btnRow.push(Markup.button.callback(btn[0], btn[1]));
          }
          this.buttons.push(btnRow);
      }
      get keyboard() {
          return Markup.inlineKeyboard(this.buttons);
      }
}

module.exports = InlineKeyboard;
