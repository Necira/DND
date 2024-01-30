
export default class Character {
    hp;
    initiative;
    damage;
    fireball_damage;
    dirt;
    name;

    constructor() {
        this.name = "";
        this.dirt = false;
        this.fireball_damage = 0;
        // while (dirt === true) {
        //     document.getElementById("sneaky_commentary1").innerHTML = `${this.name} is blind`;
        // }
    }

    set_name(name) {
            this.name = name;
        }
        
    get_hp() {
        return this.hp;
    } 
}
