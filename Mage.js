import { dice } from "./Dice.js";
import Character from "./Character.js";

export default class Mage extends Character { 
    fireballs;
    mirror;
    mirror_turn;
    type;
    constructor() {
        super();
        this.hp = dice(1,6);
        this.initiative = dice(1,6);
        this.fireballs = false;
        this.mirror = false;
        this.mirror_turn = 0;
        this.type = "mage";
   }

    fireball(target, player) {
        target.fireballs = true;
        target.fireball_damage = dice(2,7);
        if (this.block === true) {
            target.fireball_damage /= 2;
        }
        if (this.dirt === true) {
            target.fireball_damage = 0;
        }
        this.dirt = false;
        this.block = false;
        document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.fireball_damage} hp`;
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
        let mirror_luck = dice(1,2);
        document.getElementById(`fireball_commentary_${player}`).innerHTML = `${this.name}'s fireball charging`;
        if (target.mirror === true && mirror_luck === 2) {
                document.getElementById(`mirrors_commentary${player}`).innerHTML = `${this.name}'s fireball mirrored`;
                this.damage = 0;
        }
    }

    magic_missile(target, player) {
        let mirror_luck = dice(1,2);
        if (target.mirror === true && mirror_luck >= 2) {
            this.damage = 0;
            this.fireball_damage = 0;
            document.getElementById(`mirrors_commentary_${player}`).innerHTML = `${this.name} mirrored`;
        } else {
            this.damage = dice(1,6);
            if (this.block === true) {
                this.damage /= 2;
                this.fireball_damage /= 2;
            }
            if (this.dirt === true) {
                this.damage = 0
            }
            target.hp -= Math.floor(this.damage);
            this.hp -= Math.floor(this.fireball_damage);
            document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.damage+this.fireball_damage} hp`;
        }
        this.dirt = false;
        this.block = false;  
        this.fireball_damage = 0;
    }

    mirrors(player) {
        this.mirror = true;
        document.getElementById(`mirrors_commentary_${player}`).innerHTML = `${this.name} mirrors activated`;
        this.hp -= this.fireball_damage;
        document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.fireball_damage} hp`;
    }

    potion(player) {
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
        document.getElementById(`potion_commentary_${player}`).innerHTML = `${this.name} healed`
        document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.fireball_damage} hp`;
    }
}
