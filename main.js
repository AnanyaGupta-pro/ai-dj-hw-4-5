leftWrist_score=0
rightWrist_score=0
 dance_monkey="";
 dont_let_me_down="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status=""
song2_status=""

function preload(){
    dance_monkey=loadSound("dance monkey.mp3")
   dont_let_me_down=loadSound("don't let me down.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center()

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)

}
function draw(){
    image(video,0,0,600,500);
    song1_status=dance_monkey.isPlaying();
    song2_status=dont_let_me_down.isPlaying();
    fill("red")
stroke("white")

if(leftWrist_score>0.2){
    circle(leftWristX,leftWristY,40);
dont_let_me_down.stop()
if(song1_status==false){
    dance_monkey.play();
    document.getElementById("song_name").innerHTML="Playing Dance Monkey"
}
    }

    if(rightWrist_score>0.2){
        circle(rightWristX,rightWristY,40);
dance_monkey.stop()
    if(song2_status==false){
       dont_let_me_down.play();
        document.getElementById("song_name").innerHTML="Playing Don't Let Me Down"
    }
        }
    


}
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWrist_score=results[0].pose.keypoints[10].score;
       leftWrist_score=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}