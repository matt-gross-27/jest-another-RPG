const Character = require('./Character');
const Potion = require('./Potion');

class Enemy extends Character {
  constructor(name, weapon) {
    super(name);
    this.weapon = weapon;
    this.potion = new Potion();
  }

  getDescription() {
    const descriptions = []
    descriptions.push(`~*~ A ${this.name} holding a ${this.weapon} has appeared! ~*~`);
    descriptions.push(`~*~ A ${this.name} wielding a ${this.weapon} is approaching! ~*~`);
    descriptions.push(`~*~ Watch out! A ${this.name} is coming carrying a ${this.weapon} ~*~`);
    descriptions.push(`~*~ Look out. A ${this.weapon} wielding ${this.name} is coming your way! ~*~`);
    let textImg = ``;
    if (this.name === 'goblin') {
      textImg = `
========================================================
                      ,      ,
                     /(.-""-.)\\
                 |\\  \\/      \\/  /|
                 | \\ / =.  .= \\ / |
                 \\( \\   o\\/o   / )/
                  \\_, '-/  \\-' ,_/
                    /   \\__/   \\
                    \\ \\__/\\__/ /
                  ___\\ \\|--|/ /___
                /'    \\      /    '\\
               /       '----'       \\
========================================================
`   }
    return textImg + descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}

module.exports = Enemy;