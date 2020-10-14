class StartScreen {
    constructor($StartScreen) {
        this.$startScreen = $StartScreen;
        this.$startScreenWrapper = $StartScreen.find('.start-screen-wrapper');

        this.listener();
    }

    listener() {
        const startScreen = this.$startScreen,
            startScreenWrapper = this.$startScreenWrapper;

        startScreenWrapper.on('click', function () {
            startScreen.hide();
            $('.question').removeClass('begonnen');
        })
    }
}

export default(() => {
    $('.start-screen').each(function() {
        new StartScreen($(this));
    })
})