import {arrayMax} from "three/src/utils";
import Sound from "./Sound";
import Guru from "./guru";

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
        var empty = "empty";
        var GenderQuestion = {
            Question: "Wait... wait, just one more question! I almost forgot, but please tell me, are you, or do feel you more...",
            Answers: [{
                0: ['Male', 'empty', 0, 1.2, 0, 1, 0],
            }, {
                1: ['Female', 'empty', 0, 1.2, 0, 1, 0],
            }]
        }

        if (question.hasClass("passedStart")){
            stelVraag(name);
        }

        //als de persoon nog niets geklikt heeft
        if (question.hasClass('AskName')) {
            var AskName = "Who are you? Please tell me your name.";

            //voeg vraag toe
            questionContent.append("<div class='question-title'>" + AskName + "</div><div class='answers'></div>");
            const answersContent = questionContent.find('.answers');

            //voeg formulier toe
            answersContent.append("<form class='option'><input type='text' placeholder='name' id='name' contenteditable=\"true\"></label><br> <input type='submit' value='> Next Question'></form>");


            $(function () {
                $(".option").submit(function (e) {
                    name = $("#name").val();

                    if (name === "" || name === undefined || name === null) {
                        AskName = "You won’t tell me your name? Please choose one of these."
                        answersContent.empty().append("<form class='option-two'><div><input type='radio' name='name' id='sir-lancelot' value='Sir Lancelot' contenteditable=\"true\"><label for='sir-lancelot'>Sir Lancelot</label></div><div><input type='radio' name='name' id='henry' value='Henry' contenteditable=\"true\"><label for='henry'>Henry</label></div><div><input type='radio' name='name' id='the-pope' value='The Pope' contenteditable=\"true\"><label for='the-pope'>The Pope</label></div><div><input type='radio' name='name' id='beyonce' value='Beyonce' contenteditable=\"true\"><label for='beyonce'>Beyonce</label></div><div><input type='radio' name='name' id='god-knows' value='God Knows' contenteditable=\"true\"><label for='god-knows'>God knows</label></div><input type='submit' value='> Next Question'></form>")

                        $(function () {
                            $('.option-two').submit(function (e) {
                                const name = $("input[name='name']:checked").val();
                                // Guru();
                                question.removeClass('AskName');
                                question.addClass('AskCity');
                                questionContent.empty();
                                askCity(name);
                            });
                        });
                    } else {
                        // Guru();
                        console.log(name);
                        question.removeClass('AskName');
                        question.addClass('AskCity');
                        questionContent.empty();
                        askCity(name);
                    }
                });
            });
        }

        function askCity(name) {
            var AskCity = "You want to enter? No not yet, I have a few more questions.<br> First, tell me where you live. <br> Dit zou een invulveld worden, maar dit is stiekem waardevol";

            //voeg vraag toe
            questionContent.append("<div class='question-title'>" + AskCity + "</div><div class='answers'></div>");
            const answersContent = questionContent.find('.answers');

            //voeg formulier toe
            answersContent.append("<button id='geefgeo'>Give Location</button> <br> <button id='geengeo'>No way!</button>")

            //klik op give location
            $("#geefgeo").click(function () {
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
                    $('.Guru').attr({
                        "data-red": parseInt(((latitude * 255) / 90).toFixed(0)),
                        "data-blue": parseInt(((longitude * 255) / 180).toFixed(0))
                    });
                }

                question.removeClass('AskCity');
                question.addClass('AskGender');
                questionContent.empty();
                askGender(name);
            });

            //klik op no way
            $("#geengeo").click(function () {
                $('.Guru').attr({
                    "data-red": 0,
                    "data-blue": 0
                });
                question.removeClass('AskCity');
                question.addClass('AskGender');
                questionContent.empty();
                askGender(name);
            })
        }

        function askGender(name) {
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
                    society = answer[5],
                    social = answer[6];
                answersContent.append("<div class='option-" + i + "'><input type='radio' name='gender-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
            })
            answersContent.append("<button id='geefgender'> > Next Question </button>");

            $("#geefgender").click(function () {
                // var gender = $("input[name='gender-1']:checked").val();
                var gender = $("input[name='gender-1']:checked"),
                    genderVal = gender.val(),
                    environment = gender.data("environment"),
                    health = gender.data("health"),
                    finance = gender.data("finance"),
                    society = gender.data("society"),
                    social = gender.data("social");

                if (genderVal != undefined) {
                    $('.Guru').attr({
                        "data-environment": environment,
                        "data-health": health,
                        "data-finance": finance,
                        "data-society": society,
                        "data-social": social,
                    });
                    $.firstGuru();
                    $(".sound").addClass(genderVal);
                    Sound();
                    question.removeClass('AskGender');
                    question.addClass('door');
                    questionContent.empty();
                    stelVraag(name);
                }
            })
        }

        //Milieu - gezondheid - financien-maatschappelijk - sociaal
        function stelVraag(name) {
            //maak een array aan met de vraag
            var DoorQuestions = {
                //Milieu - Gezondheid - Fininancien - Maatschappelijk - Sociaal
                Question: ["Hello, " + name + " good to see you here. I wished I could shake your hand in person, but alas, we all know, no handshaking and for now you have to do with me, your virtual host. So tell me, I suppose we can meet up life again next year, how would you travel to Eindhoven?"],
                Answers: [{
                    0: ['Plane', 'You come from far, I guess?', 1, 1, 0, 0, 0],
                }, {
                    1: ['Train', 'I guess you knew most DDW locations are close to a train station', 2, 1, 0, 0, 0],
                }, {
                    2: ['Bicycle or on foot', 'I guess you live close?', 2, 2, 0, 0, 0],
                }, {
                    3: ['Car or Motorcycle', 'You might have a parking problem', 1, 1, 0, 0, 0],
                }, {
                    4: ['None of those', 'You are not coming? Or travel by air balloon, that would be an entrance!', 0, 0, 0, 0, 0],
                }]
            };

            var DoorQuestions2 = {
                Question: ["So, " + name + " I am a bit curious, how much money did you earn last month, in euro’s, you can make a guess? "],
                Answers: [{
                    0: ['Less than 500', empty, 0, 1, 0, 0, 0],
                }, {
                    1: ['500 - 1000', empty, 0, 1, 0, 0, 0],
                }, {
                    2: ['1000 - 3000', empty, 0, 1, 0, 0, 0],
                }, {
                    3: ['3000 - 5000', empty, 0, 1, 0, 0, 0],
                }, {
                    4: ["more than 5000", empty, 0, 1, 0, 0, 0],
                }, {
                    5: ["I'm not telling you that!", "You don’t want to answer that, no problem…", 0, 0, 0, 0, 0]
                }]
            };

            var DoorQuestions3 = {
                Question: [" I just have one more urgent question for you before I can give you the key. Dear " + name + ", how healthy do you feel today?"],
                Answers: [{
                    0: ['I feel absolutely fine!', "Great, here is the key!", 1, 0, 0, 0, 0],
                }, {
                    1: ['Bit tired, but otherwise OK.', "So, take care not to overdo yourself, here is the key!", 1, 0, 0, 0, 0],
                }, {
                    2: ['Coughing and sneezing, but this online, so no problem.', "Indeed, no problem, here is the key!", 1, 0, 0, 0, 0],
                }, {
                    3: ['Running a fever and glad I am at home.', "Wow impressed you are here, here is the key!", 1, 0, 0, 0, 0],
                }, {
                    4: ["Physical fine, but mentally…", "Ah, well, we all have those days, be welcome, here is the key!", 1, 0, 0, 0, 0],
                }]
            };

            var RefrigeratorQuestions = {
                Question: ["Hai " + name + "! I guess you are feeling hungry. I am just curious, what kind of food do you like to eat? You know, I have a thing for colours. If you would look into your own refrigerator right now, what would you see? Mind you, you might be looking into my brother or sisters inside. So tell me, what would you see."],
                Answers: [{
                    0: ['Mostly green', empty, 0, 1, 0, 0, 0],
                }, {
                    1: ['A lot of white', empty, 0, 1, 0, 0, 0],
                }, {
                    2: ['Red and pink', empty, 0, 1, 0, 0, 0],
                }, {
                    3: ['Yellow', empty, 0, 1, 0, 0, 0],
                }, {
                    4: ["A mix of everything", empty, 0, 1, 0, 0, 0],
                }, {
                    5: ["I'm not telling you!", "What, no answer? No problem. Let's move on to the next question.", 0, 0, 0, 0, 0]
                }]
            };

            var RefrigeratorQuestions2 = {
                Question: ["Now I have a visual image of your refrigerator I can imagine what kind of food you have in there. But I might be wrong. So, would you like to tell me more about your preferences. Do you like healthy food? Of course, you know eating healthy is important, but yes. Knowing and doing is not always the same. So, tell me, how much fruit and vegetables do you eat on a day, make a guess."],
                Answers: [{
                    0: ['Fruit? Vegetables? No way!', empty, 0, 1, 0, 0, 0],
                }, {
                    1: ['I guess 1 piece of fruit and 100-gram vegetables', empty, 0, 1, 0, 0, 0],
                }, {
                    2: ['I follow the rule, 2 pieces of fruit and 250-gram vegetables', empty, 0, 1, 0, 0, 0],
                }, {
                    3: ['Are you kidding me, it’s mostly fruit and vegetables? But you know not all of them need to be refrigerated right?', empty, 0, 1, 0, 0, 0],
                }, {
                    4: ["I'm not telling you!", "No problem, I just have one last question for you.", 0, 0, 0, 0, 0]
                }]
            };

            var RefrigeratorQuestions3 = {
                Question: ["So, last question, a short one. Do you often throw away food?"],
                Answers: [{
                    0: ['Yes', empty, 1, 0, 1, 0, 0],
                }, {
                    1: ['No', empty, 1, 0, 1, 0, 0],
                }, {
                    2: ['Sorry refrigerator, none of your business', empty, 0, 0, 0, 0, 0],
                }]
            };

            var RefrigeratorQuestions4 = {
                Question: ["Wait, wait. I just forgot. Would you like me to order some food for you? Just connect me to your daily planner and I can advise you, you know? How does that sound to you?"],
                Answers: [{
                    0: ['That would be awesome!', "Yes, yes. Thank you, and good luck!", 0, 1, 1, 0, 0],
                }, {
                    1: ['You mean you can see if I have guests over for dinner?', "Yes, yes. Thank you, and good luck!", 0, 0, 1, 0, 1],
                }, {
                    2: ['Maybe I can call you on my way back home and you can arrange it all?', "Yes, yes. Thank you, and good luck!", 0, 1, 1, 0, 1],
                }, {
                    3: ["Aren't you the curious one?", "Yes, yes. Thank you, and good luck!", 0, 0, 0, 0, 1]
                }]
            };

            var PhoneQuestions = {
                Question: ["Thanks " + name + " for picking me up.  So happy you want to talk with me! You know you can do a lot more with me than just talk. Ah, " + name + " of course, you already knew that. On your own phone, which social media do you use? Please tell me all!"],
                Answers: [{
                    0: ['Instagram', "Yes, yes. Thank you, and good luck!", 0, 1, 0, 1, 1],
                }, {
                    1: ['Facebook', "Yes, yes. Thank you, and good luck!", 0, 0, 1, 0, 1],
                }, {
                    2: ['Twitter', "Yes, yes. Thank you, and good luck!", 0, 1, 1, 0, 1],
                }, {
                    3: ["LinkedIN", "Yes, yes. Thank you, and good luck!", 0, 0, 0, 0, 1]
                }, {
                    4: ["WhatsApp", empty, 0, 1, 0, 1, 1]
                }, {
                    5: ["Snapchat", empty, 0, 1, 0, 1, 1]
                }, {
                    6: ["I don't use any social media, so none of the above", empty, 0, 1, 0, 1, 1]
                }, {
                    7: ["None of your business!", "Is that question to private? You can skip it. But brace yourself, next question might be even more private.", 0, 0, 0, 0, 0]
                }]
            };

            var PhoneQuestions2 = {
                Question: ["In my experience, most people do not like to give an honest answer to this question, but of course you are the exception. How much time do you spent on your phone on daily bases?"],
                Answers: [{
                    0: ['0-1 hour', empty, 0, 1, 0, 0, 1],
                }, {
                    1: ['1-2 hours', empty, 0, 1, 0, 0, 1],
                }, {
                    2: ['2-3 hours', empty, 0, 1, 0, 0, 1],
                }, {
                    3: ["3-4 hours", empty, 0, 1, 0, 0, 1]
                }, {
                    4: ["4-5 hours", empty, 0, 1, 0, 0, 1]
                }, {
                    5: ["5 hours more", empty, 0, 1, 0, 0, 1]
                }, {
                    6: ["None of your business!", "To personal? No problem, you don’t have to answer every question.", 0, 0, 0, 0, 0]
                }]
            };

            var PhoneQuestions3 = {
                Question: ["Next question, this is a bit painful for me. When will you replace me for a younger version?"],
                Answers: [{
                    0: ['When you are broken and beyond repair', empty, 0, 1, 0, 0, 1],
                }, {
                    1: ['When your screen is broken', empty, 0, 1, 0, 0, 1],
                }, {
                    2: ['When a newer version of you is available', empty, 0, 1, 0, 0, 1],
                }, {
                    3: ["When you are running out of memory", empty, 0, 1, 0, 0, 1]
                }, {
                    4: ["None of your business!", empty, 0, 0, 0, 0, 0]
                }]
            };

            var PhoneQuestions4 = {
                Question: ["Oh Really? And, I hardly dare to ask. When you replace me, what do you do with me? Please tell me that you don’t just throw me away. I mean, if it where you, how would you feel? I have been your friend, haven’t I?"],
                Answers: [{
                    0: ['Of course I throw you away, what else would I do?', "Sorry, I have another call coming in. Nice to meet you, so long!", 1, 0, 1, 0, 0],
                }, {
                    1: ['I try to sell you for the best possible price.', "Sorry, I have another call coming in. Nice to meet you, so long!", 1, 0, 1, 0, 0],
                }, {
                    2: ['I bring you to a recycle station, so the best parts of you can have a longer life!', "Sorry, I have another call coming in. Nice to meet you, so long!", 1, 0, 1, 0, 0],
                }, {
                    3: ["I keep you for sentimental reasons.", "Sorry, I have another call coming in. Nice to meet you, so long!", 1, 0, 1, 0, 0]
                }, {
                    4: ["I'm not telling you.", "Sorry, I have another call coming in. Nice to meet you, so long!", 0, 0, 0, 0, 0]
                }]
            };

            var ToiletQuestions = {
                Question: ["Oh, you are visiting me, so happy! First time today! You know, I am one of the most personal objects in your house. How is your relationship with your own ehm … toilet? Maybe crazy question, how often do you visit your toilet a day?"],
                Answers: [{
                    0: ['Not so often, once or twice', empty, 1, 1, 0, 0, 0],
                }, {
                    1: ['Pretty much average', empty, 1, 1, 0, 0, 0],
                }, {
                    2: ['My toilet and me have a really good relationship, we see each other at least 6 times a day', empty, 1, 1, 0, 0, 0],
                }, {
                    3: ["That's none of your business!", empty, 0, 0, 0, 0, 0]
                }]
            };

            var ToiletQuestions2 = {
                Question: ["TOILET: You know, if you like I could analyse your pee and tell you how healthy you are, would you like that?"],
                Answers: [{
                    0: ['Yes', empty, 0, 1, 0, 0, 0],
                }, {
                    1: ['No', empty, 0, 0, 0, 0, 0],
                }]
            };

            var ToiletQuestions3 = {
                Question: ["OK, it might be a bit confronting, knowing all about your pee. But you know, you could have me installed at the home of an elderly person you care about. And I could update you daily or weekly on his or her health, how would you like that?"],
                Answers: [{
                    0: ['That would be awesome, daily please so I know if they are still up and running.', empty, 0, 1, 0, 1, 1],
                }, {
                    1: ['I guess I would have to ask their permission first.', empty, 0, 1, 0, 1, 1],
                }, {
                    2: ['Daily seems a bit much, but once a month would be nice.', empty, 0, 1, 0, 1, 1],
                }, {
                    3: ["Are you kidding me? Can I read all the pee of my whole family?", empty, 0, 1, 0, 1, 1]
                }]
            };

            var ToiletQuestions4 = {
                Question: ["Hey, have you already spoken to my buddy the shower? Guess what, we have a mutual question. Do you have any idea how much water we use on a daily base?"],
                Answers: [{
                    0: ['Yes, I know exactly how much, and I also know what I pay for water. ', empty, 1, 0, 1, 0, 0],
                }, {
                    1: ['I kind of know, not exactly.', empty, 1, 0, 1, 0, 0],
                }, {
                    2: ['I have no idea but would be interested to know.', empty, 1, 0, 1, 0, 0],
                }, {
                    3: ["I don’t know and I don’t care.", empty, 0, 0, 0, 0, 0]
                }]
            };

            var ShowerQuestions = {
                Question: ["Hey! Have you spoken to my buddy the Toilet? Who do you prefer to spend more time with " + name + ", me or him?"],
                Answers: [{
                    0: ['Of course, you shower!', empty, 0, 0, 0, 0, 1],
                }, {
                    1: ['Hmm, I would certainly miss toilet more if I didn’t have him.', empty, 0, 0, 0, 0, 1]
                }]
            };

            var ShowerResponse = "If we keep playing this popularity game, I win. Won’t you agree, " + name + "? But you know, duty calls, come on shower, let's move on. Thanks " + name + ", see you soon!";
            var ShowerQuestions2 = {
                Question: ["I see, hard to compare us, right? You need toilet every day, me maybe not. But tell me truly, how good is your relationship with your own shower?"],
                Answers: [{
                    0: ['Very good, we meet every day twice, mornings and evenings!', ShowerResponse, 1, 0, 1, 0, 0],
                }, {
                    1: ['Honestly? I prefer a bath.', ShowerResponse, 1, 0, 1, 0, 0]
                }, {
                    2: ["I like to wake up with a shower every day.", ShowerResponse, 1, 0, 1, 0, 0]
                }, {
                    3: ["Only when I have to.", ShowerResponse, 1, 0, 1, 0, 0]
                }]
            };

            if (question.hasClass('door')) {
                const answers = DoorQuestions.Answers;
                questionContent.append("<div class='question-title'>" + DoorQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='door-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");

                $('#transportation').click(function () {
                    const transportation = $("input[name='door-1']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('door');
                    question.addClass('door2');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
                question.removeClass('door');
            }
            else if (question.hasClass('door2')) {
                const answers = DoorQuestions2.Answers;
                questionContent.append("<div class='question-title'>" + DoorQuestions2.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='door-2' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");

                $('#transportation').click(function () {
                    const transportation = $("input[name='door-2']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('door2');
                    question.addClass('door3');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('door3')) {
                const answers = DoorQuestions3.Answers;
                questionContent.append("<div class='question-title'>" + DoorQuestions3.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='door-3' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");

                $('#transportation').click(function () {
                    const transportation = $("input[name='door-3']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.hide();
                    question.removeClass('door3');
                    question.removeClass('begonnen');
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('douche')) {
                const answers = ShowerQuestions.Answers;
                questionContent.append("<div class='question-title'>" + ShowerQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='douche-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='douche-1']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('douche');
                    question.addClass('douche2');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('douche2')) {
                const answers = ShowerQuestions2.Answers;
                questionContent.append("<div class='question-title'>" + ShowerQuestions2.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='douche-2' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='douche-2']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('douche2');
                    question.removeClass('begonnen');
                    question.hide();
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
            else if (question.hasClass('koelkast')) {
                const answers = RefrigeratorQuestions.Answers;
                questionContent.append("<div class='question-title'>" + RefrigeratorQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='koelkast-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='koelkast-1']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('koelkast');
                    question.addClass('koelkast2');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('koelkast2')) {
                const answers = RefrigeratorQuestions2.Answers;
                questionContent.append("<div class='question-title'>" + RefrigeratorQuestions2.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='koelkast-2' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='koelkast-2']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('koelkast2');
                    question.addClass('koelkast3');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
            else if (question.hasClass('koelkast3')) {
                const answers = RefrigeratorQuestions3.Answers;
                questionContent.append("<div class='question-title'>" + RefrigeratorQuestions3.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='koelkast-3' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='koelkast-3']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('koelkast3');
                    question.addClass('koelkast4');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('koelkast4')) {
            const answers = RefrigeratorQuestions4.Answers;
            questionContent.append("<div class='question-title'>" + RefrigeratorQuestions4.Question + "</div><div class='answers'></div>");
            const answersContent = questionContent.find('.answers');
            $.each(answers, function (i, val) {
                const answer = $(this)[0][i],
                    transport = answer[0],
                    context = answer[1],
                    environment = answer[2],
                    health = answer[3],
                    finance = answer[4],
                    society = answer[5],
                    social = answer[6];
                answersContent.append("<div class='option-" + i + "'><input type='radio' name='koelkast-4' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
            });
            answersContent.append("<button id='transportation'> > Next Question </button>");

            $('#transportation').click(function () {
                const transportation = $("input[name='koelkast-4']:checked"),
                    transportationVal = transportation.val(),
                    environment = transportation.data("environment"),
                    health = transportation.data("health"),
                    finance = transportation.data("finance"),
                    society = transportation.data("society"),
                    social = transportation.data("social");
                questionContent.empty();
                question.removeClass('koelkast4');
                question.removeClass('begonnen');
                question.hide();
                if (transportationVal != undefined) {
                    $('.Guru').attr({
                        "data-environment": environment,
                        "data-health": health,
                        "data-finance": finance,
                        "data-society": society,
                        "data-social": social,
                    });
                    $.updateData();
                    $.playSound();
                }
            });
            }
            else if (question.hasClass('telefoon')) {
                const answers = PhoneQuestions.Answers;
                questionContent.append("<div class='question-title'>" + PhoneQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='telefoon-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='telefoon-1']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('telefoon');
                    question.addClass('telefoon2');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('telefoon2')) {
                const answers = PhoneQuestions2.Answers;
                questionContent.append("<div class='question-title'>" + PhoneQuestions2.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='telefoon-2' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='telefoon-2']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('telefoon2');
                    question.addClass('telefoon3');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
            else if (question.hasClass('telefoon3')) {
                const answers = PhoneQuestions3.Answers;
                questionContent.append("<div class='question-title'>" + PhoneQuestions3.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='telefoon-3' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='telefoon-3']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('telefoon3');
                    question.addClass('telefoon4');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('telefoon4')) {
            const answers = PhoneQuestions4.Answers;
            questionContent.append("<div class='question-title'>" + PhoneQuestions4.Question + "</div><div class='answers'></div>");
            const answersContent = questionContent.find('.answers');
            $.each(answers, function (i, val) {
                const answer = $(this)[0][i],
                    transport = answer[0],
                    context = answer[1],
                    environment = answer[2],
                    health = answer[3],
                    finance = answer[4],
                    society = answer[5],
                    social = answer[6];
                answersContent.append("<div class='option-" + i + "'><input type='radio' name='telefoon-4' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
            });
            answersContent.append("<button id='transportation'> > Next Question </button>");

            $('#transportation').click(function () {
                const transportation = $("input[name='telefoon-4']:checked"),
                    transportationVal = transportation.val(),
                    environment = transportation.data("environment"),
                    health = transportation.data("health"),
                    finance = transportation.data("finance"),
                    society = transportation.data("society"),
                    social = transportation.data("social");
                questionContent.empty();
                question.removeClass('telefoon4');
                question.removeClass('begonnen');
                question.hide();
                if (transportationVal != undefined) {
                    $('.Guru').attr({
                        "data-environment": environment,
                        "data-health": health,
                        "data-finance": finance,
                        "data-society": society,
                        "data-social": social,
                    });
                    $.updateData();
                    $.playSound();
                }
            });
            }
            else if (question.hasClass('toilet1')) {
                const answers = ToiletQuestions.Answers;
                questionContent.append("<div class='question-title'>" + ToiletQuestions.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='toilet-1' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='toilet-1']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('toilet');
                    question.addClass('toilet2');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });
            }
            else if (question.hasClass('toilet2')) {
                const answers = ToiletQuestions2.Answers;
                questionContent.append("<div class='question-title'>" + ToiletQuestions2.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='toilet-2' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='toilet-2']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('toilet2');
                    question.addClass('toilet3');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
            else if (question.hasClass('toilet3')) {
                const answers = ToiletQuestions3.Answers;
                questionContent.append("<div class='question-title'>" + ToiletQuestions3.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='toilet-3' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='toilet-3']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('toilet3');
                    question.addClass('toilet4');
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
            else if (question.hasClass('toilet4')) {
                const answers = ToiletQuestions4.Answers;
                questionContent.append("<div class='question-title'>" + ToiletQuestions4.Question + "</div><div class='answers'></div>");
                const answersContent = questionContent.find('.answers');
                $.each(answers, function (i, val) {
                    const answer = $(this)[0][i],
                        transport = answer[0],
                        context = answer[1],
                        environment = answer[2],
                        health = answer[3],
                        finance = answer[4],
                        society = answer[5],
                        social = answer[6];
                    answersContent.append("<div class='option-" + i + "'><input type='radio' name='toilet-4' value='" + transport + "' id='" + transport + "' data-environment='" + environment + "' data-health='" + health + "' data-finance='" + finance + "' data-society='" + society + "' data-social='" + social + "'><label for='" + transport + "'>" + transport + "</label></div>");
                });
                answersContent.append("<button id='transportation'> > Next Question </button>");
    
                $('#transportation').click(function () {
                    const transportation = $("input[name='toilet-4']:checked"),
                        transportationVal = transportation.val(),
                        environment = transportation.data("environment"),
                        health = transportation.data("health"),
                        finance = transportation.data("finance"),
                        society = transportation.data("society"),
                        social = transportation.data("social");
                    questionContent.empty();
                    question.removeClass('toilet4');
                    question.addClass('begonnen');
                    question.hide();
                    stelVraag(name);
                    if (transportationVal != undefined) {
                        $('.Guru').attr({
                            "data-environment": environment,
                            "data-health": health,
                            "data-finance": finance,
                            "data-society": society,
                            "data-social": social,
                        });
                        $.updateData();
                        $.playSound();
                    }
                });

            }
        }
    }
}  

 

export default(() => {
    $('.question').each(function() {
        new Questions($(this));
    })
})