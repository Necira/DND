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
        this.fireball_damage = 0;
        this.mirror = false;
        this.mirror_turn = 0;
        this.type = "mage";
   }

    fireball(player) {
        player.fireballs = true;
        player.fireball_damage = dice(2,7);
        if (this.block === true) {
            player.fireball_damage /= 2;
        }
        if (this.dirt === true) {
            player.fireball_damage = 0;
        }
        this.dirt = false;
        this.block = false;
        document.getElementById("sneaky_commentary").innerHTML = "";
        document.getElementById("dirty_commentary").innerHTML = "";
        document.getElementById("dirty_commentary2").innerHTML = "";
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
        let mirror_luck = dice(1,2);
        if (player.mirror === true && mirror_luck === 2) {
               this.damage = 0;
        }
    }

    magic_missile(player) {
        let mirror_luck = dice(1,2);
        if (player.mirror === true && mirror_luck >= 2) {
            this.damage = 0;
            this.fireball_damage = 0;
        } else {
            this.damage = dice(1,6);
            if (this.block === true) {
                this.damage /= 2;
                this.fireball_damage /= 2;
            }
            if (this.dirt === true) {
                this.damage = 0
            }
            player.hp -= Math.floor(this.damage);
            this.hp -= Math.floor(this.fireball_damage);
        }
        this.dirt = false;
        this.block = false;
        document.getElementById("sneaky_commentary").innerHTML = "";
        document.getElementById("dirty_commentary").innerHTML = "";
        document.getElementById("dirty_commentary2").innerHTML = "";      
    }

    mirrors() {
        this.mirror = true;
        this.hp -= this.fireball_damage;
    }

    potion() {
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
    }
}
