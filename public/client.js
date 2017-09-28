$('#up').change(function() {//on chnage of select button change label contents
    var filename = $('#up').val().split("\\");
    $('#nameholder').html(filename[filename.length-1]);
});
