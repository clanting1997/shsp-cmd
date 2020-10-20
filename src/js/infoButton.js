class infoButton {
    constructor($infoButton) {
        this.$infoButton = $infoButton;
        this.$buttonInfoWrapper = this.$infoButton.find('.button-info-wrapper');
        this.$buttonText = this.$buttonInfoWrapper.find('h1');
        this.listener();
    }

    listener() {
        const infoButton = this.$infoButton,
            buttonInfoWrapper = this.$buttonInfoWrapper,
            buttonText = this.$buttonText;

            buttonText.text('What is this?');

        buttonInfoWrapper.on('click', function () {
            top.location.href="https://www.guru-shsp.com/what-is-this"
        })

    }
}

export default(() => {
    $('.button-info').each(function() {
        new infoButton($(this));
    })
})