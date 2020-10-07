class Questions {
    constructor($Questions) {
        this.$Questions = $Questions;
        this.listener();
    }
 
    listener() {

            //maak een array aan met de vraag
            var Q1 = {
                //Milieu - Gezondheid - Fininancien - Maatschappelijk
                Question: ["good to see you here. I wished I could shake your hand in person, but alas, we all know, no handshaking and for now you have to do with me, your virtual host. So tell me, I suppose we can meet up life again next year, how would you travel to Eindhoven?"],
                antwoord1: ["Plane", "You come from far, I quess?", 1,1,0,0],
                antwoord2: ["train", 'I guess you knew most DDW locations are close to a train station', 2,1,0,0],
                antwoord3: ['Bicycle or on foot', 'I guess you live close?', 2,2,0,0],
                antwoord4: ['Car or Motorcycle', 'You might have a parking problem', 1,1,0,0],
                antwoord5: ['None of those', 'You are not coming? Or travel by air balloon, that would be an entrance!', 0,0,0,0],
            };

            //Functie om vraag te verwerken
            function Vraag(VraagArray){
                //Voeg de vraag toe op het scherm
                console.log(VraagArray);
                console.log(VraagArray.Question);

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
            let Vraag1 = new Vraag(Q1);



            //$.each(A1, function(key, value) {
            //    A1.appendTo('.Questions');

            //    var radioBtn = $('<input type="radio" name="rbtnCount" />');
            //    radioBtn.appendTo('.Questions');
            //});

            console.log('Deur vragen geimporteerd');
        }
    }

    export default(() => {
        $('.Questions').each(function() {
            new Questions($(this));
        })
    })