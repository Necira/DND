import Warrior from "./Warrior.js";
import Rogue from "./Rogue.js";
import Mage from "./Mage.js";
import { Counter } from "./Counter.js";
import { History } from "./History.js";
import { hide_element, hp_stat, clear_element} from "./Element.js";


export class Game {
    round;
    roundnum;
    player_one;
    player_two;
    result_initiative;
    local_storage;
    active_player;

    constructor() {
        this.local_storage = new History();
        this.local_storage.get_history();
        this.round = 1;

        document.getElementById("name1").addEventListener("keyup", () => {
            const name = document.getElementById("name1").value;
            this.player_one.set_name(name);
            document.getElementById("ability_p1_name").innerHTML = this.player_one.name;
            document.getElementById("p1_initiative").innerHTML = this.player_one.name;
        });

        document.getElementById("name2").addEventListener("keyup", () => {
            const name = document.getElementById("name2").value;
            this.player_two.set_name(name);
            document.getElementById("ability_p2_name").innerHTML = this.player_two.name;
            document.getElementById("p2_initiative").innerHTML = this.player_two.name;
        });

        document.getElementById("round").innerHTML = this.round;

        document.getElementById("id_rogue_button1").addEventListener("click", () => {
            this.choose_class("1","rogue");
        });
        document.getElementById("id_mage_button1").addEventListener("click", () => {
            this.choose_class("1","mage");
        });
        document.getElementById("id_warrior_button1").addEventListener("click", () => {
            this.choose_class("1","warrior");
        });
        document.getElementById("id_rogue_button2").addEventListener("click", () => {
            this.choose_class("2","rogue");
        });
        document.getElementById("id_mage_button2").addEventListener("click", () => {
            this.choose_class("2","mage");
        });
        document.getElementById("id_warrior_button2").addEventListener("click", () => {
            this.choose_class("2","warrior");
        });
        document.getElementById("player_one_ini_button").addEventListener("click", () => {
            this.show_ini("player_one");
        });
        document.getElementById("player_two_ini_button").addEventListener("click", () => {
            this.show_ini("player_two");
        });

        this.round = new Counter(this.player_one,this.player_two,this.local_storage);

        const players = [
            "player_one",
            "player_two",
        ];

        const abilities = [
            "sneak_attack",
            "shield_block",
            "potion",
            "mirrors"
        ];

        const target_abilities = [
            "fireball",
            "magic_missile",
            "sword",
            "dagger"
        ];

        const test_mapping = {
            "player_one": "p1",
            "player_two": "p2",
        };

        const class_names = [
            "mage",
            "rogue",
            "warrior"
        ];

        players.forEach((player) => {
            abilities.forEach((ability) => {
                if (ability === "potion") {
                    class_names.forEach((name) => {
                        const potion_element = document.getElementById(`${test_mapping[player]}_${name}_${ability}`);
                            if (potion_element) {
                                    potion_element.addEventListener("click", () => {  
                                this[player][ability](player);
                                potion_element.style.visibility = "hidden";
                                });
                            }
                        });
                    } else {
                    const ability_element = document.getElementById(`${test_mapping[player]}_${ability}`);
                    if (ability_element) {            
                        ability_element.addEventListener("click", () => {  
                            this[player][ability](player);
                        });      
                    target_abilities.forEach((ability_target) => {
                        const ability_element_target = document.getElementById(`${test_mapping[player]}_${ability_target}`);
                        let target = player === "player_one" ? "player_two" : "player_one";
                        let target_string = `"${target}"`;
                        console.log(target,ability_target,player,target_string)
                        ability_element_target.addEventListener("click", () => {  
                            this[player][ability_target](target, target_string);
                        });
                    });
                    } else {
                        console.warn(`HTMLElement with ID ${test_mapping[player]}_${ability} not found.`);
                    }  
                }
            });
        });

        document.getElementById("p1_sword").addEventListener("click", () => {  
            this.player_one.sword(this.player_two,"player_two");
        });
        document.getElementById("p1_sword").addEventListener("click", () => {  
            this.player_two.sword(this.player_one,"player_one");
        });
        document.getElementById("p1_dagger").addEventListener("click", () => {  
            this.player_one.dagger(this.player_two, "player_two");
        });
        document.getElementById("p1_dirt").addEventListener("click", () => {
            this.player_one.dirty(this.player_two, "player_two");
        });
        document.getElementById("p1_fireball").addEventListener("click", () => {
            this.player_one.fireball(this.player_two, "player_two");  
        });
        document.getElementById("p1_magic_missile").addEventListener("click", () => {  
            this.player_one.magic_missile(this.player_two,"player_two");
        });
        document.getElementById("p2_dagger").addEventListener("click", () => {
            this.player_two.dagger(this.player_one, "player_one");
        });
        document.getElementById("p2_dirt").addEventListener("click", () => {
            this.player_two.dirty(this.player_one, "player_one");
        });
        document.getElementById("p2_fireball").addEventListener("click", () => {
            this.player_two.fireball(this.player_one, "player_one");
        });
        document.getElementById("replay").addEventListener("click", () => {
            location.reload();
            document.getElementById("highscore") = localStorage.getItem(list);
        });
        const ability_class = document.getElementsByClassName("ability");
        for (let current_element of ability_class) {
            current_element.addEventListener("click", () => {   
                this.mirror_true();
                hp_stat(this.player_one, this.player_two);
                this.round.turnbased();
                this.activate_player();
            });
        } 
    }

    mirror_true() {
        this.player_one
        this['player_one']
        if (this.player_one.mirror === true) {
            this.player_one.mirror_turn += 1;  
            if (this.player_one.mirror_turn >= 4) {
                this.player_one.mirror = false;
                this.player_one.mirror_turn = 0;
            }
        }
        if (this.player_two.mirror == true) {
            this.player_two.mirror_turn += 1;      
            if (this.player_two.mirror_turn >= 4) {
                this.player_two.mirror = false; 
            }
        }
    }

    choose_class(player,player_class) {
        let first_div_class = `p${player}_classpick`;
        let second_div_class = `ability_p${player}`;
        let ability_class = `ability_p${player}_${player_class}`;
        let visible_class = `id_${player_class}_button${player}`;
        let player_name = `name${player}`;
        const class_divs = document.getElementsByClassName(first_div_class);
        for (let current_element of class_divs) {
            current_element.style.visibility = "hidden";
        } 
        const ability_divs = document.getElementsByClassName(second_div_class);
        for (let current_element of ability_divs) {
            current_element.style.visibility = "hidden";
        } 
   
        document.getElementById(player_name).style.visibility = "visible";
        document.getElementById(visible_class).style.visibility = "visible";
        document.getElementById(ability_class).style.visibility = "visible";
        if (player === "1") {
            if (player_class === "rogue") {
                this.player_one = new Rogue();
            } else if (player_class === "mage") {
                this.player_one = new Mage();
            }
            else if (player_class === "warrior") {
                this.player_one = new Warrior();
            }
            this.round.player_one = this.player_one;
            let show_player_one_hp = this.player_one.hp;
            document.getElementById("show_player_one_hp").innerHTML = show_player_one_hp;
        }

        if (player === "2") {
            if (player_class === "rogue") {
                this.player_two = new Rogue();
            }
            else if (player_class === "mage") {
                this.player_two = new Mage();
            }
            else if (player_class === "warrior") {
                this.player_two = new Warrior();
            }
            this.round.player_two = this.player_two;
            let show_player_two_hp = this.player_two.hp;
            document.getElementById("show_player_two_hp").innerHTML = show_player_two_hp;
            const initiative_div = document.getElementsByClassName("initiative");
            for (let current_element of initiative_div) {
                current_element.style.visibility = "visible";
            } 
            const round_div = document.getElementsByClassName("round");
            for (let current_element of round_div) {
                current_element.style.visibility = "visible";
            } 
            const stat_div = document.getElementsByClassName("stats");
            for (let current_element of stat_div) {
                current_element.style.visibility = "visible";
            } 
        }
    }

    show_ini(player) {
        if (player === "player_one") {
            document.getElementById("player_one_ini_result").innerHTML = this.player_one.initiative;
        }
        else if (player === "player_two") {
            if (this.player_two.initiative === this.player_one.initiative) {
                this.player_two.initiative -=1 }
            document.getElementById("player_two_ini_result").innerHTML = this.player_two.initiative;
            this.first_strike();
            if (this.player_two.initiative < this.player_one.initiative) {
                hide_element("p2_sneak_attack");
                this.active_player = this.player_one;
                this.activate_player();
            }
            if (this.player_two.initiative > this.player_one.initiative) {
                hide_element("p1_sneak_attack");
                this.active_player = this.player_two;
                this.activate_player();
            } 
        }
    }

    activate_player() {
        let ability_one_player = `ability_p1_${this.player_one.type}`;
        let ability_two_player = `ability_p2_${this.player_two.type}`;
        if (this.active_player === this.player_one) {
            hide_element(ability_two_player);
            document.getElementById(ability_one_player).style.visibility = "visible";
            this.active_player = this.player_two;
        } else {
            document.getElementById(ability_two_player).style.visibility = "visible";
            hide_element(ability_one_player);
            this.active_player = this.player_one;
        }
    }
    
    first_strike() {
        let starting_player = "";
        if (this.player_one.initiative>this.player_two.initiative) {
            starting_player = "player_one";
            this.target = this.player_one;
        } else {starting_player = "player_two";
            this.target = this.player_two;
        }
        this.result_initiative = starting_player;
        let message = this.result_initiative + " will start";
        document.getElementById("show_starting_player").innerHTML = message;
        return starting_player;
    }  
}


