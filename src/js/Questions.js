import {arrayMax} from "three/src/utils";

class Questions {
    constructor($Questions) {
        this.$Questions = $Questions;
        this.$QuestionsContent = this.$Questions.find('.question-content');
        this.listener();
    }

    listener() {
        const question = this.$Questions,
            questionContent = this.$QuestionsContent;

            //maak een array aan met de vraag
            var DoorQuestions = {
                //Milieu - Gezondheid - Fininancien - Maatschappelijk
                Question: "good to see you here. I wished I could shake your hand in person, but alas, we all know, no handshaking and for now you have to do with me, your virtual host. So tell me, I suppose we can meet up life again next year, how would you travel to Eindhoven?",
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
                    answersContent.append("<div class='option-"+i+"'><input type='radio' name='door-1' value='"+transport+"'><label for='"+transport+"'>" + transport  + "</label></div>");
                });

                question.removeClass('door');
            } else if (question.hasClass('douche')) {

        }

            //Functie om vraag te verwerken
            function Vraag(VraagArray){
                //Voeg de vraag toe op het scherm
                // console.log(VraagArray);
                // console.log(VraagArray.Question);
                // console.log(VraagArray.Answers)

                //Bepaal het aantal mogelijke antwoorden (verwijder vraag uit array)
                var vragen = $.grep(VraagArray, function(e){
                    delete ret[e.Question];
               });

                console.log(vragen);

                //Maak voor elk antwoord een radiobutton met antwoordtekst ernaast
                //$.each(antwoord, function(reactie, dialoog){
                //    var radioBtn = $('<input type="radio" name="rbtnCount" />');
                //    radioBtn.appendTo('.Questions');
                //})

                //for (var i = 0; i < antwoord.length; i++){
                //    let Punt = new Punten()
                //}
            };

            //Schrijf de vraag op beeld
            let Vraag1 = new Vraag(DoorQuestions);



            //$.each(A1, function(key, value) {
            //    A1.appendTo('.Questions');

            //    var radioBtn = $('<input type="radio" name="rbtnCount" />');
            //    radioBtn.appendTo('.Questions');
            //});

            console.log('Deur vragen geimporteerd');
        }
    }

    export default(() => {
        $('.question').each(function() {
            new Questions($(this));
        })
    })