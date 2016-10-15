var mainState= {
  preload: function(){
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    game.load.image('circle', 'assets/circle.png');
    game.load.image('cloud', 'assets/cloud.png')
  },
  create: function(){

    this.score = 0;

    this.labelScore = game.add.text(20,20,"0", { font: '30px Arial', fill: '#ffffff#' });

    this.pipes = game.add.group();
    this.correct = game.add.group();
    game.stage.backgroundColor = '#37edf8';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var style = { font: "65px Arial", fill: "#ff0044", align: "center"};

    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);
    this.timer = game.time.events.loop(3000, this.spawnCloud, this);

  },

  update: function(){
    if (this.bird.y < 0 || this.bird.y > 490){
      this.restartGame();
    }
    game.physics.arcade.overlap(this.bird, this.correct, this.plusOne, null, this);
    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },

  jump: function(){
    this.bird.body.velocity.y = -350;
  },

  restartGame: function(){
    game.state.start('main');
  },

  spawnCloud:function(){
    var cloud = game.add.sprite(400,Math.floor(Math.random()*490), 'cloud')
    game.physics.arcade.enable(cloud);
    cloud.body.velocity.x = -50;
  },

  plusOne: function(){
    this.score  += 1;
    this.labelScore.text = this.score;
  },

  spawnQuestion: function (x,y){
    var problem = game.add.text(x,y, "", { font: '30px Arial', fill: '#ffffff#' });
    game.physics.arcade.enable(problem);
    problem.body.velocity.x = -200;
    param1 = Math.floor(Math.random()*15);
    param2 = Math.floor(Math.random()*15);
    problem.text = param1.toString() + " + " + param2.toString()
    return (param1 + param2);
  },

  addOnePipe: function (x,y){
      var pipe = game.add.sprite(x,y, 'pipe');

      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200

      pipe.checkWorldsBounds = true;
      pipe.outOfBoundsKill = true;
    },

  addCircle: function (x,y){
      var circle = game.add.sprite(x,y, 'circle');

      game.physics.arcade.enable(circle);
      circle.body.velocity.x = -200
      circle.checkWorldsBounds = true;
      circle.outOfBoundsKill = true;
    },

  addOnePipe: function (x,y){
      var pipe = game.add.sprite(x,y, 'pipe');

      this.pipes.add(pipe);

      game.physics.arcade.enable(pipe);

      pipe.body.velocity.x = -200

      pipe.checkWorldsBounds = true;
      pipe.outOfBoundsKill = true;
    },

  spawnAnswer: function (x, y, num, correct){
      var answer = game.add.text(x,y, num, { font: '30px Arial', fill: '#ffffff#' });
      game.physics.arcade.enable(answer);
      answer.body.velocity.x = -200;

      if (correct){
        this.correct.add(answer);

      }
    },

  addRowOfPipes: function() {
    var obsticle = Math.floor(Math.random()*2)+2;
    answer = this.spawnQuestion(400, (obsticle+1)*60+15);

    answerAry = [];
    if (Math.floor(Math.random()*2) === 0){
      answerAry.push(answer);
      answerAry.push(Math.floor(Math.random()*50));
    }
    else{
      answerAry.push(Math.floor(Math.random()*50));
      answerAry.push(answer);
    }
    var circle1 = Math.floor(Math.random()*2);
    var circle2 = Math.floor(Math.random()*2) + obsticle +3;

    showAnswer = answerAry.pop();
    this.spawnAnswer(430, (circle1)*60+15, showAnswer, showAnswer === answer);
    showAnswer = answerAry.pop();
    this.spawnAnswer(430, (circle2)*60+15, showAnswer, showAnswer === answer);

    for (var i=0 ; i<8 ; i++){
        if (i === obsticle){
          this.addOnePipe(420, i * 60 + 10);
          this.addOnePipe(420, (i+1) * 60 + 10);

          this.addOnePipe(420, (i+2) * 60 + 10);
        }
    }
  },
};

var game = new Phaser.Game(400,490);

game.state.add('main', mainState);

game.state.start('main');
