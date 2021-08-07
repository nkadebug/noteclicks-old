$("#pic").change(function () {
    $('#img').attr('src',window.URL.createObjectURL(this.files[0]));
});