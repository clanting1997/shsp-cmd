class StartScreen {
    constructor($StartScreen) {
        this.$startScreen = $StartScreen;
        this.$startScreenWrapper = this.$startScreen.find('.start-screen-wrapper');
        this.$startScreenText = this.$startScreenWrapper.find('h1');

        this.listener();
    }

    listener() {
        const startScreen = this.$startScreen,
            startScreenWrapper = this.$startScreenWrapper,
            startScreenText = this.$startScreenText;

        startScreenText.text('Click to start');

        startScreenWrapper.on('click', function () {
            startScreen.hide();
            $('.question').removeClass('begonnen');
        })

        $.finishScreen = function () {
            startScreenText.text('Finish');
            startScreen.show();

            startScreenWrapper.on('click', function () {
                console.log(answerData);

                var DataJSON = JSON.stringify(answerData);
                $.ajax({
                    type: "POST",
                    url: "data.php",
                    data: {answerData: DataJSON},
                    succes: function() {
                        console.log('data verstuurd');
                    }
                });
            })
        }
    }
}

export default(() => {
    $('.start-screen').each(function() {
        new StartScreen($(this));
    })
})