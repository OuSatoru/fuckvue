new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) {
                return
            }

            this.monsterAttacks()
        },
        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);
            if (this.checkWin()) {
                return
            }

            this.monsterAttacks()
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.monsterAttacks()
        },
        giveUp: function () {
            
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            });
            this.checkWin()
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! Start New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! Start New Game?')) {
                    this.startGame()
                } else {
                    this.gameIsRunning = false
                }
                return true
            }
            return false
        }
    }
});