import { dice } from "./Dice.js";
import Character from "./Character.js";

export default class Warrior extends Character {
    block;
    
    constructor() {
        super();
        this.hp = dice(1,10);
        this.initiative = dice(1,8);
        this.round = 1;
        this.block = false;
        this.dirt = false;
        this.damage = 0;
        this.fireball_damage = 0;
    }
    
    sword(player) {
        let mirror_luck = dice(1,2);
        if (player.mirror === true && mirror_luck > 2) {
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
            player.hp -= Math.floor(this.damage);
            this.hp -= this.fireball_damage;
        }
        this.dirt = false;
        this.block = false;
        document.getElementById("sneaky_commentary").innerHTML = "";
        document.getElementById("dirty_commentary").innerHTML = "";
        document.getElementById("dirty_commentary2").innerHTML = "";
        this.fireball_damage = 0;
    }
    
    shield_block() {
     this.block = true;
     this.hp -= this.fireball_damage;
     this.fireball_damage = 0;
    }
    
    potion(){
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
    }
}