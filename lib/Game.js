const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = []
  this.currentEnemy;
  this.player;
};

Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));
  this.currentEnemy = this.enemies[0];
  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);
      
      this.startNewBattle()
    });
};

Game.prototype.startNewBattle = function() {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log(`
 ===================
     Your Stats       
 ===================`);
  
  console.table(this.player.getStats());
  
  console.log(`
~*~ ${this.currentEnemy.getDescription()} ~*~
`);

  this.battle();
}

Game.prototype.battle = function() {
  const fightMessage = [
    'What would you like to do?',
    'Seal your destiny',
    'Make your move',
    'Choose wisely',
    'Would you like to fight or drink a potion?',
    'Decision time',
    'The choice is yours',
  ]
  if (this.isPlayerTurn) {
    inquirer
      .prompt({
        type: 'list',
        message: fightMessage[Math.floor(Math.random() * fightMessage.length)],
        name: 'action',
        choices: ['Attack', 'Use potion']
      })
      .then(({ action }) => {
        if (action === 'Use potion') {
          if(!this.player.getInventory()) {
            console.log(`
~*~ You don't have any potions left!
`           );
            return;
          }
          // choose a potion
          inquirer
            .prompt({
              type:'list',
              message: 'Which potion would you like to use?',
              name: 'action',
              choices: this.player.getInventory().map((potion, i) => `${i + 1}: ${potion.name}`)
            })
            .then(({ action }) => {
              const potionDetails = action.split(': ');

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`
~*~ You used a ${potionDetails[1]} potion. ~*~
`             );
            });
        } else {
          // attack current enemy
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`
~*~ You attacked the ${this.currentEnemy.name} ~*~`
          );
          console.log(`~*~ ${this.currentEnemy.getHealth()} ~*~
         `);
        }
      });

  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`~*~ The ${this.currentEnemy.name} attacked! ~*~`);
    console.log(`~*~ ${this.player.getHealth()} ~*~
    `);
  }
}

module.exports = Game;