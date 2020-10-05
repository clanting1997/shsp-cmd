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
        })
    }
}

export default(() => {
    $('.start-screen').each(function() {
        new StartScreen($(this));
    })
})