const boardGame = {
    currentLevel: 3,
    totalScore: 0,
    isGameStarted: false,
    intervalRef: '',
    duration: 10,

    init: function () {
        let _self = this;
        _self.gameStart();
        document.querySelector('.hideOnLoad').classList.add('show');
        document.querySelector('#start-btn').classList.add('hideOnLoad');
    },

    gameStop: function () {
        let _self = this;
        _self.isGameStarted = false;
        document.querySelector('#start-btn').classList.remove('hideOnLoad');
        alert('Game Over!!');
        _self.totalScore = 0;
        setTimeout(() => {
            _self.gameStart();
        }, 500);
    },
    startInterval: function (type) {
        let _self = this,
            counter = 0,
            durationRef = '';
        timeOutRef = '';
        document.querySelector('#final-score').style.display = 'none';
        timeOutRef = setTimeout(() => {
            clearInterval(durationRef);
            _self.gameStop();
        }, (_self.duration + 2) * 1000);
        durationRef = setInterval(() => {
            document.querySelector('#duration').innerHTML = _self.duration - counter;
            if ((_self.duration - counter) < -1) {
                _self.gameStop();
                clearInterval(durationRef);
                clearTimeout(timeOutRef);
                document.querySelector('#final-score').style.display = 'block';
            }
            counter++;
        }, 1000);
    },
    gameStart: function () {
        let _self = this,
            level = document.querySelector('#diffLevel').value,
            boxWidth = 100 / level;
        _self.currentLevel = level;
        _self.startInterval();
        _self.isGameStarted = true;
        document.getElementById('container').innerHTML = '';
        document.getElementById('score').innerHTML = _self.totalScore;
        for (let i = 1; i <= level * level; i++) {
            let div = document.createElement('div');
            div.id = `box-${i}`;
            div.innerHTML = `box-${i}`;
            document.getElementById('container').appendChild(div);
            div.className = 'box';
            div.style.width = parseInt(`${boxWidth}`) - 1 + '%';
            div.addEventListener("click", function () {
                if (this.classList.value.includes('active')) {
                    _self.updateScore(true);
                }
                else {
                    _self.updateScore(false);
                }
            });
        }
        _self.highLightRandomBox();
    },

    gameRestart: function () {
        let _self = this;
        _self.gameStop('restart');

        // setTimeout(() => {
        //     _self.gameStart();
        // }, 1000);

        // _self.gameStart();

    },

    updateScore: function (type) {
        let _self = this;
        if (_self.isGameStarted) {
            if (type) {
                _self.totalScore++;
            }
            else {
                _self.totalScore--;
            }
        }
        console.log('update', _self.totalScore);
        document.querySelector("#score").innerHTML = _self.totalScore;
    },
    highLightRandomBox: function () {
        let _self = this,
            currentBoxIndex = 0;
        _self.intervalRef = setInterval(() => {
            if (_self.isGameStarted) {
                if (currentBoxIndex > 0) {
                    document.querySelectorAll(".box")[currentBoxIndex - 1].classList.remove("active");
                }
                currentBoxIndex = Math.floor(Math.random() * _self.currentLevel * _self.currentLevel) + 1;
                document.querySelectorAll(".box")[currentBoxIndex - 1].classList.add("active");
            }
            else {
                clearInterval(_self.intervalRef);
            }
        }, 3000);
    }
}


