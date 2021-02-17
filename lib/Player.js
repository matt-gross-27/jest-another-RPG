const Character = require('./Character');
const Potion = require('../lib/Potion');

class Player extends Character {
  constructor(name = 'Player') {
    super(name);
    this.inventory = [new Potion(), new Potion()];
  }
  
  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }
  
  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }
  
  addPotion(potion) {
    this.inventory.push(potion)
  }
  
  usePotion(i) {
    const potion = this.getInventory().splice(i, 1)[0];
    
    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}

module.exports = Player;