let Combat = require('../../js/game/entity/character/combat/combat'),
    Hit = require('../../js/game/entity/character/combat/hit'),
    Modules = require('../../js/util/modules');

class Golem extends Combat {

    /**
     * This mob behaves as both as a mini-boss, and a normal entity.
     * Its status updates in accordance to whether the `.miniboss`
     * variable is set to true in its character status.
     */

    constructor(character) {
        super(character);

        let self = this;

        self.character = character;

        self.achievementId = 5; // Achievement we are finishing.

        // Start processing after we initialize the mob in this case.
        self.character.onLoad(() => {

            if (self.character.miniboss)
                self.updateData(35, 550, 23, 20);

        });

        self.character.onDeath(() => {

            self.forEachAttacker((attacker) => {
                attacker.finishAchievement(5);
            });

        });

    }

    updateData(level, hitPoints, weaponLevel, armourLevel) {
        let self = this;

        /* We only update the mob data once to prevent any issues. */

        if (self.updated)
            return;

        self.character.level = level;
        self.character.hitPoints = hitPoints;
        self.character.maxHitPoints = hitPoints;
        self.character.weaponLevel = weaponLevel;
        self.character.armourLevel = armourLevel;

        self.character.attackRate = 1200;
        self.character.alwaysAggressive = true;

        self.updated = true;
    }


}

module.exports = Golem;
