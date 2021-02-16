const Potion = require('./Potion');

function Enemy(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  this.potion = new Potion();
  this.health = Math.floor(Math.random() * 10 + 85);
  this.strength = Math.floor(Math.random() * 5 + 5);
  this.agility = Math.floor(Math.random() * 5 + 5);

};

Enemy.prototype.getHealth = function() {
  return `The ${this.name}'s health is now ${this.health}!`;
};

Enemy.prototype.isAlive = function() {
  if (this.health === 0) {
    return false;
  }
  return true;
};

Enemy.prototype.reduceHealth = function(health) {
  this.health -= health;
  
  if (this.health < 0) {
    this.health = 0
  }
};

Enemy.prototype.getAttackValue = function() {
  const min = this.strength - 5;
  const max = this.strength + 5;
  
  return Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.getDescription = function () {
  const descriptions = []
  descriptions.push(`A ${this.name} holding a ${this.weapon} has appeared!`);
  descriptions.push(`A ${this.name} wielding a ${this.weapon} is approaching!`);
  descriptions.push(`Watch out! A ${this.name} is coming carrying a ${this.weapon}`);
  descriptions.push(`Look out. A ${this.weapon} wielding ${this.name} is coming your way!`);
  return descriptions[Math.floor(Math.random() * descriptions.length)]
};

module.exports = Enemy;