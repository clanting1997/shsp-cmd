class test {
    constructor($test) {
        this.$test = $test;

        this.listener();
    }

    listener() {
        console.log('the jquery works !!');
    }
}

export default(() => {
    $('body').each(function() {
        new test($(this));
    })
})