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
  this.enemies.push(new Enemy('gorilla', 'baseball bat'));
  this.enemies.push(new Enemy('dirty hippie', 'guitar'));
  this.currentEnemy = this.enemies[0];
  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log(`Please enter your character's name.`);
          return false;
        }
      }
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
${this.currentEnemy.getDescription()}
`);

  this.battle();
};

Game.prototype.battle = function() {
  const fightMessage = [
    'What would you like to do?',
    'Seal your destiny',
    'Make your move',
    'Choose wisely',
    'Would you like to fight or drink a potion?',
    'Decision time',
    'The choice is yours',
    'Time to make your move',
    "What's your play?"
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
            return this.checkEndOfBattle();
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
              this.checkEndOfBattle();
            });
        } else {
          // attack current enemy

          console.log(`
~*~ You attacked the ${this.currentEnemy.name} ~*~`
          );
          if(Math.random() * 100 < this.currentEnemy.agility) {
            console.log(`~*~ The ${this.currentEnemy.name} dodged your attack! ~*~
            `);
          } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);
          }
            console.log(`~*~ ${this.currentEnemy.getHealth()} ~*~
            `);
          this.checkEndOfBattle();
        }
      });

  } //enemy turn
  else {
    // enemy attacks
    console.log(`~*~ The ${this.currentEnemy.name} attacked! ~*~`);
    
    if(Math.random() * 100 < this.player.agility) {
      // attack dodged
      console.log(`~*~ You dodged the ${this.currentEnemy.name}'s attack! ~*~
      `);
    } else {
      // attack lands
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);
    }
    // log player health
    console.log(`~*~ ${this.player.getHealth()} ~*~
    `);

    this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function() {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } 
  else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`
~*~ Enemy ${this.currentEnemy.name} defeated! ~*~
    `);
    
    this.player.addPotion(this.currentEnemy.potion);
    
    console.log(`
~*~ ${this.player.name} found a ${this.currentEnemy.potion.name} potion ~*~
    `);

    this.roundNumber ++;

    if(this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log(
`
======================================================
      CONGRATULATIONS! YOU DEFEATED EVERY ENEMY       
======================================================

██╗░░░██╗░█████╗░██╗░░░██╗  ░██╗░░░░░░░██╗██╗███╗░░██╗
╚██╗░██╔╝██╔══██╗██║░░░██║  ░██║░░██╗░░██║██║████╗░██║
░╚████╔╝░██║░░██║██║░░░██║  ░╚██╗████╗██╔╝██║██╔██╗██║
░░╚██╔╝░░██║░░██║██║░░░██║  ░░████╔═████║░██║██║╚████║
░░░██║░░░╚█████╔╝╚██████╔╝  ░░╚██╔╝░╚██╔╝░██║██║░╚███║
░░░╚═╝░░░░╚════╝░░╚═════╝░  ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚══╝
`
      );
    }
  } else {
    console.log(`
======================================================================
                        YOU HAVE BEEN DEFEATED!
======================================================================

░██████╗░░█████╗░███╗░░░███╗███████╗  ░█████╗░██╗░░░██╗███████╗██████╗░
██╔════╝░██╔══██╗████╗░████║██╔════╝  ██╔══██╗██║░░░██║██╔════╝██╔══██╗
██║░░██╗░███████║██╔████╔██║█████╗░░  ██║░░██║╚██╗░██╔╝█████╗░░██████╔╝
██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░  ██║░░██║░╚████╔╝░██╔══╝░░██╔══██╗
╚██████╔╝██║░░██║██║░╚═╝░██║███████╗  ╚█████╔╝░░╚██╔╝░░███████╗██║░░██║
░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝  ░╚════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝

    `)
  }
};

module.exports = Game;