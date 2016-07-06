$(document).ready(function(){
    var colBlock=50;
    var randColor, defaultColor;
    var colRandBlock;
    var numRandBlock=[];
    var maxLevel=10;
    var Level=1;
    var time=[];
    var resetEnabled=true;
    var lives=3;
    var timer={
        enabled:true,
        start:function(arr) {
            if(timer.enabled){
                var m = arr[0];
                var s = arr[1];
                if (s == 0) {
                  if (m == 0) {
                      wasted();
                      return;
                  }
                  m--;

                  s = 9;
                }
                else s--;
                if (m < 10) {m = m - "0";m = "0" + m;}
                $(".timer").text(m+"."+s);
                arr[0]= m ;
                arr[1]= s ;
                setTimeout(function(){timer.start(time)}, 100);
            }
        }
    };

    $( window ).bind('load resize' ,function () {
        gameAreaSizeInitial();
    });
    $(".livesNum").text(lives);
    $(".start-btn").click(function(){
        $(".start-btn").animate({top:"35%",opacity:"hide"},400);
        lives=3;
        time=[27,0];
        timer.enabled=true;
        startGame();
        timer.start(time);
        $(".livesNum").text(lives);

   });
    $(".gameArea").delegate(".game-block", "click", function(){
        if($(this).css("background-color")==defaultColor){
            miss($(this));
        }
        else{
            $(this).css("background-color",defaultColor);

            colRandBlock--;
            if(colRandBlock<1){
                lvlUp();

            }
        }
    });

    $(".resetGame").click(function(){
        if(resetEnabled==true){
            $(".footer").animate({opacity:"hide"},700);
            Level="0"+1;
            $(".levelNum").text(Level);
            lives=3;
            $(".livesNum").text(lives);
             $(".gameArea").animate({opacity:"0"},300);
             $(".wasted-fon").animate({opacity:"hide"},500);
             $(".win-fon").animate({opacity:"hide"},500);
            setTimeout(function() { removeArea(); }, 300);
            $(".start-btn").animate({top:"50%",opacity:"show"},400);
            timer.enabled=false;

        }
    });
    $('body').keydown(function(event){
        if (event.keyCode === 120) {
           $(".resetGame").click();
        }
    });
    $(".fon").click(function(){
        $(".resetGame").click();

    });


function startGame(){
    do{
        defaultColor=getRandomColor();
        randomColor=getRandomColor();
    }while(defaultColor==randColor)
    if (Level < 10) {Level=Level - "0";Level = "0" + Level;}
    $(".levelNum").text(Level);

    createGame(defaultColor,randomColor);

}

function createGame(defColor,randColor){
    colRandBlock=Level;
    numRandBlock=[];
    removeArea();
    numRandBlock=getRandomArray(numRandBlock,colRandBlock,colBlock-1);
    for (var i=0;i<colBlock;i++){

            if(in_array(i,numRandBlock)){
                generateBlock(randColor,i);
            }

        else{
           generateBlock(defColor);
        }
    }
    $("i.glyphicon.glyphicon-heart").remove();
    for(i=0;i<lives;i++){
        $(".health-information").append('<i class="glyphicon glyphicon-heart enabled"></i>');
    }
    gameAreaSizeInitial();
   $(".gameArea").animate({opacity:"1"},300);
   $(".footer").animate({opacity:"show"},400);
}

function generateBlock(color) {
    $(".gameArea").append('<div class="game-block"\
    style="background:'+color+';"\
    ></div>');
    if($(".gameArea").outerHeight() > $(".gameArea").outerWidth()){
            $(".game-block").css({"width":"20%","height":"10%"});
        }
    else{
        $(".game-block").css({"width":"10%","height":"20%"});
    }
}

function getRandomColor(){
        return "rgb("+getRandomInt(0,225)+", "+getRandomInt(0,225)+", "+getRandomInt(0,225)+")";
    }

function removeArea(removeTime){
        $(".game-block").remove();
}

function in_array(value, array) {
    for(var i = 0; i < array.length; i++)
    {
        if(array[i] == value) return true;
    }
    return false;
}

function getRandomInt(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
}

function getRandomArray(array,col,rand){
  for (var i=0;i<col;i++){
      do{
        temp=getRandomInt(0,rand);

      }while(in_array(temp,array))
      if(!in_array(temp,array)){
        array[i]=temp;
      }
    }
    return array;
}

function lvlUp(){
    if(Level<maxLevel) {Level++;startGame();}
    else {win();Level=1;}

}

function defeat(){
    timer.enabled=false;
    wasted();
    }
function miss(missBlock){
    missBlock.append('<div class="missing"\
    style="color:'+randomColor+';"\
    >MISS</div>');
    if(lives>0){
        $(".health-information i.enabled:last").addClass("disabled").removeClass("enabled");

        lives--;
        $(".livesNum").text(lives);
    }
    else
      defeat();

}
function wasted(){
    resetEnabled=false;
    $(".wasted-fon").animate({opacity:"show"},800);
    setTimeout(function() { resetEnabled=true }, 1500);


}
function win(){
    timer.enabled=false;
    resetEnabled=false;
    $(".win-fon").animate({opacity:"show"},800);
    setTimeout(function() { resetEnabled=true }, 1000);
}
function gameAreaSizeInitial(){
    $(".gameArea").outerHeight($(window).height()-$(".navbar").outerHeight()-$(".footer").outerHeight());
        if($(".gameArea").outerHeight() > $(".gameArea").outerWidth()){
            $(".game-block").css({"width":"20%","height":"10%"});
        }
        else{
            $(".game-block").css({"width":"10%","height":"20%"});
        }
}
});
