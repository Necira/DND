import { dice } from "./Dice.js";
import Character from "./Character.js";

export default class Rogue extends Character {
    sneaky;
    type; 
    
    constructor() {
    super();
    this.hp = dice(1,8);
    this.initiative = dice(1,10);
    this.sneaky = false;
    this.damage = 0;
    this.type = "rogue";
    }

    sneak_attack(player) {
        this.sneaky = true;
        document.getElementById(`sneaky_commentary_${player}`).innerHTML = `${this.name} sneak attack on`;
        if (this.dirt === true) {
            this.sneaky = false;
            document.getElementById(`sneaky_commentary_${player}`).innerHTML = `${this.name} sneak attack failed, you're blind`;
        }   
        this.dirt = false;
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;      
    }
       
    dagger(player, player_num) {
        let mirror_luck = dice(1,2);
        if (player.mirror === true && mirror_luck >= 2) {
            this.damage = 0;
            this.fireball_damage = 0;
            document.getElementById(`feedback_${player_num}`).innerHTML = `mirrored ${this.name}'s attack`;
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
            document.getElementById(`feedback_${player_num}`).innerHTML = `${this.name} lost ${this.damage+this.fireball_damage} hp`;
        }
        this.fireball_damage = 0;
        this.dirt = false;
        this.sneaky = false;
        this.block = false;
    }

    dirty(player, player_num) {
        let result = dice(1,2)
        if (player === this.player_one) {
            document.getElementById(`dirty_commentary_${player_num}`).style.visibility = "";
            if (result === 2) {
                document.getElementById(`dirty_commentary_${player_num}`).innerHTML = `${player.name}'s vision blocked`;
                player.dirt = true;
            } else {
                document.getElementById(`feedback_${player_num}`).innerHTML = `${player.name} dodged`;
            }
        }
        else {
            document.getElementById(`dirty_commentary_${player_num}`).style.visibility = "";
            if (result === 2) {
                document.getElementById(`dirty_commentary_${player_num}`).innerHTML = `${player.name}'s vision blocked`;
                player.dirt = true;
            } else {
                document.getElementById(`dirty_commentary_${player_num}`).innerHTML = `${player.name} dodged`;
            }
        }
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
        document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.damage+this.fireball_damage} hp`;
    }

    potion(player) {
        this.hp += dice(1,4);
        this.hp -= this.fireball_damage;
        this.fireball_damage = 0;
        document.getElementById(`potion_commentary_${player}`).innerHTML = `${this.name} healed`
        document.getElementById(`feedback_${player}`).innerHTML = `${this.name} lost ${this.damage+this.fireball_damage} hp`;
    }
}
