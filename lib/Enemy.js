const Character = require('./Character');
const Potion = require('./Potion');

class Enemy extends Character {
  constructor(name, weapon) {
    super(name);
    this.weapon = weapon;
    this.potion = new Potion();
    this.health -= 9;
    this.strength -= 2;
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
========================
       G O B L I N
========================
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
=========================
    `}
    if (this.name === 'gorilla') {
      textImg = `
  G O R I L L A
=================
     ."\`".
 .-./ _=_ \.-.
{  (,(oYo),) }}
{{ |   "   |} }
{ { \\(---)/  }}
{{  }'-=-'{ } }
{ { }._:_.{  }}
{{  } -:- { } }
{_{ }\`===\`{  _}
((((\\)    (/))))
=================
    `}
    if(this.name === 'skeleton') {
      textImg = `
              S K E L E T O N
==============================================
.7
.'/
/ /
/ /
/ /
/ /
/ /
/ /
/ /         
/ /          
__|/
,-\\__\\
|f-"Y\\|
\\()7L/
cgD                            __ _
|\\(                          .'  Y '>,
\\ \\                        / _   _   \\
\\\\\\                       )(_) (_)(|}
\\\\\\                      {  4A   } /
\\\\\\                      \\uLuJJ/\\l
\\\\\\                     |3    p)/
\\\\\\___ __________      /nnm_n//
c7___-__,__-)\\,__)(".  \\_>-<_/D
      //V     \\_"-._.__G G_c__.-__<"/ ( \\
             <"-._>__-,G_.___)\\   \\7\\
            ("-.__.| \\"<.__.-" )   \\ \\
            |"-.__"\\  |"-.__.-".\\   \\ \\
            ("-.__"". \\"-.__.-".|    \\_\\
            \\"-.__""|!|"-.__.-".)     \\ \\
             "-.__""\\_|"-.__.-"./      \\ l
              ".__""">G>-.__.-">       .--,_
==============================================

      `}

    return `${descriptions[Math.floor(Math.random() * descriptions.length)]}
${textImg};`
  }
}

module.exports = Enemy;