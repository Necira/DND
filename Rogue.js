import { dice } from "./Dice.js";
import Character from "./Character.js";

export default class Rogue extends Character {
    sneaky;
    dagger;
    dirt;
    
    constructor() {
    super();
    this.hp = dice(1,8);
    this.initiative = dice(1,10);
    this.dirt = false;
    this.sneaky = false;
    this.damage = 0;
    this.fireball_damage = 0;
    }

    sneak_attack() {
        this.sneaky = true;
        let message = "sneak attack on";
        let unlucky = "sneak attack failed, you're blind";
        document.getElementById("sneaky_commentary").innerHTML = message;
        if (this.dirt === true) {
            sneaky = false;
            document.getElementById("sneaky_commentary").innerHTML = unlucky
        }   
        this.dirt = false;
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;      
    }
       
    dagger(player) {
        let mirror_luck = dice(1,2);
        if (player.mirror === true && mirror_luck >= 2) {
            this.damage = 0;
            this.fireball_damage = 0;
        } else {
            this.damage = dice(1,6);
            if (this.sneaky === true) {
                this.damage += dice(1,3);
            }
            if (this.block === true) {
                this.damage /= 2;
            }
            if (this.dirt === true) {
                this.damage = 0;
            }
            player.hp -= Math.floor(this.damage);
            this.hp -= this.fireball_damage; 
        }
        this.fireball_damage = 0;
        document.getElementById("sneaky_commentary").innerHTML = "";
        document.getElementById("dirty_commentary").innerHTML = "";
        document.getElementById("dirty_commentary2").innerHTML = "";
        this.dirt = false;
        this.sneaky = false;
        this.block = false;
    }

    dirty(player) {
        let result = dice(1,2)
        if (player === this.player_one) {
            if (result === 2) {
                document.getElementById("dirty_commentary").innerHTML = "vision blocked";
                player.dirt = true;
            } else {
                document.getElementById("dirty_commentary").innerHTML = "dodged";
            }
        }
        else {
            if (result === 2) {
                document.getElementById("dirty_commentary2").innerHTML = "vision blocked";
                player.dirt = true;
            } else {
                document.getElementById("dirty_commentary2").innerHTML = "dodged";
            }
        }
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
    }

    potion() {
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
    }
}
