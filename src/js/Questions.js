class Questions {
    constructor($Questions) {
        this.$Questions = $Questions;
        this.deurVraag();
    }

        deurVraag() {
            var Q1 = "Who are you? Please tell me your name.";
            var Q2 = "You want to enter? No not yet, I have a few more questions. First, tell me where you live";
            $('.Questions').append(Q1);
            console.log('Vragen geimporteerd');
        }
    }

    export default(() => {
        $('.Questions').each(function() {
            new Questions($(this));
        })
    })