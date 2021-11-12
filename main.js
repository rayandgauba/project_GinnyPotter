var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width : 350 , 
    heigh : 300 , 
    image_format : 'png' ,  
    png_quality : 90
});

var camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";        
    });
}

console.log("Ml5 Version" , ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/oeu5Q6F1l/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data1 = "The first predection is " + prediction_1;
    speak_data2 = "The second predection is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

    function check(){
        img = document.getElementById("captured_image").src;
        classifier.classify(img , gotResult);
}
    
    function gotResult(error , results){
        if (error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("result_emotion_name1").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();

            if (results[0].label == "happy"){
                document.getElementById("update_emoji").innerHTML = "&#128522;";
            }

            if (results[0].label == "sad"){
                document.getElementById("update_emoji").innerHTML = "&#128546;";
            }

            if (results[0].label == "angry"){
                document.getElementById("update_emoji").innerHTML = "&#128545;";
            }

            if (results[1].label == "happy"){
                document.getElementById("update_emoji").innerHTML = "&#128522;";
            }

            if (results[1].label == "sad"){
                document.getElementById("update_emoji").innerHTML = "&#128546;";
            }

            if (results[1].label == "angry"){
                document.getElementById("update_emoji").innerHTML = "&#128545;";
            }
        }
    }