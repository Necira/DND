import { dice } from "./Dice.js";
import Character from "./Character.js";

export default class Warrior extends Character {
    block;
    type;
    
    constructor() {
        super();
        this.hp = dice(1,10);
        this.initiative = dice(1,8);
        this.round = 1;
        this.block = false;
        this.dirt = false;
        this.damage = 0;
        this.type = "warrior";
    }
    
    sword(target, player) {
        let mirror_luck = dice(1,2);
        if (target.mirror === true && mirror_luck > 2) {
            document.getElementById(`mirrors_commentary_${player}`).innerHTML = `${this.name} mirrored`
            this.damage = 0;
            this.fireball_damage = 0;
        } else {
            this.damage = dice(1,7);
            if (this.block === true) {
                this.damage /= 2;
            }
            if (this.dirt === true) {
                this.damage = 0;
            }
            target.hp -= Math.floor(this.damage);
            this.hp -= this.fireball_damage;
            document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.damage+this.fireball_damage} hp`;
        }
        this.dirt = false;
        this.block = false;
        this.fireball_damage = 0;
    }
    
    shield_block(player) {
     this.block = true;
     document.getElementById(`shieldblock_commentary_${player}`).innerHTML = `${this.name}'s shield active`
     this.hp -= this.fireball_damage;
     this.fireball_damage = 0;
    }
    
    potion(player){
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
        document.getElementById(`potion_commentary_${player}`).innerHTML = `${this.name} healed`
    }
}