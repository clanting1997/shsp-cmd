import {arrayMax} from "three/src/utils";
import Sound from "./Sound";

class Questions {
    constructor($Questions) {
        this.$Questions = $Questions;
        this.$question = this.$Questions.find('.question');
        this.$QuestionsContent = this.$Questions.find('.question-content');
        this.listener();
    }

    listener() {
        const question = this.$Questions,
        questionContent = this.$QuestionsContent;
        var name = this.$name;

            var GenderQuestion = {
                Question: "Wait... wait, just one more question! I almost forgot, but please tell me, are you, or do feel you more...",
                Answers: [{
                    0: ['Male', 'empty', 0, 0, 0, 1],
                }, {
                    1: ['Female', 'empty', 0, 0, 0, 1]
                }]
            }

            //als de persoon nog niets geklikt heeft
            if (question.hasClass('AskName')) {
                var AskName = "Who are you? Please tell me your name.";

                //voeg vraag toe
                questionContent.append("<div class='question-title'>" + AskName + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');

                //voeg formulier toe
                answersContent.append("<form class='option'><input type='text' placeholder='name' id='name' contenteditable=\"true\"></label><br> <input type='submit' value='> Next Question'></form>");


                $(function(){
                    $(".option").submit(function(e) {
                        name = $("#name").val();
                        console.log(name);
                        question.removeClass('AskName');
                        question.addClass('AskCity');
                        questionContent.empty();
                        askCity();
                    });
                });
            }

                function askCity() {
                    var AskCity = "You want to enter? No not yet, I have a few more questions.<br> First, tell me where you live. <br> Dit zou een invulveld worden, maar dit is stiekem waardevol";

                    //voeg vraag toe
                    questionContent.append("<div class='question-title'>" + AskCity + "</div><div class='answers'></div>");
                    const answersContent = questionContent.find('.answers');
                    
                    //voeg formulier toe
                    answersContent.append("<button id='geefgeo'>Give Location</button> <br> <button id='geengeo'>No way!</button>")
                    
                    //klik op give location
                    $("#geefgeo").click(function(){
                        function getLocation() {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(savePosition);
                            } else { 
                              x.innerHTML = "Geolocation is not supported by this browser.";
                            }
                          }
                          getLocation();

                          function savePosition(position) {
                            var latitude = Math.round(position.coords.latitude);
                            var longitude = Math.round(position.coords.longitude);
                            console.log(latitude + longitude)
                           }
                           question.removeClass('AskCity');
                           question.addClass('AskGender');
                           questionContent.empty();
                           askGender();
                    }); 
                    
                    //klik op no way
                    $("#geengeo").click(function(){
                        question.removeClass('AskCity');
                        question.addClass('AskGender');
                        questionContent.empty();
                        askGender();
                    })
                }

            function askGender() {
                const answers = GenderQuestion.Answers;
                questionContent.append("<div class='question-title'>" + GenderQuestion.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                    transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        social = answer[5];
                    answersContent.append("<div class='option-"+i+"'><input type='radio' name='gender-1' id='"+transport+"' value='"+transport+"'><label for='"+transport+"'>" + transport  + "</label></div>");
                    })
                answersContent.append("<button id='geefgender'> Continue </button>");

                $("#geefgender").click(function(){
                    var gender = $("input[name='gender-1']:checked").val()
                    console.log(gender);
                    Sound();
                    question.removeClass('AskGender');
                    question.addClass('door');
                    questionContent.empty();
                    askDoor();
                })
            }

                    //maak een array aan met de vraag
                    var DoorQuestions = {
                        //Milieu - Gezondheid - Fininancien - Maatschappelijk
                        Question: ["Hello, " + name + " good to see you here. I wished I could shake your hand in person, but alas, we all know, no handshaking and for now you have to do with me, your virtual host. So tell me, I suppose we can meet up life again next year, how would you travel to Eindhoven?"],
                        Answers: [{
                            0: ['Plane', 'You come from far, I guess?', 1, 1, 0, 0],
                        }, {
                            1: ['Train', 'I guess you knew most DDW locations are close to a train station', 2, 1, 0, 0],
                        }, {
                            2: ['Bicycle or on foot', 'I guess you live close?', 2, 2, 0, 0],
                        }, {
                            3: ['Car or Motorcycle', 'You might have a parking problem', 1, 1, 0, 0],
                        }, {
                            4: ['None of those', 'You are not coming? Or travel by air balloon, that would be an entrance!', 0,0,0,0],
                        }]
                    };
                    
        function askDoor() {
            if (question.hasClass('door')) {
                const answers = DoorQuestions.Answers;
                questionContent.append("<div class='question-title'>" + DoorQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers,  function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        social = answer[5];
                    answersContent.append("<div class='option-"+i+"'><input type='radio' name='door-1' value='"+transport+"' id='"+transport+"'><label for='"+transport+"'>" + transport  + "</label></div>");
                
                });

                question.removeClass('door');
            } else if (question.hasClass('douche')) {
            }
        }
    }
}

    export default(() => {
        $('.question').each(function() {
            new Questions($(this));
        })
    })