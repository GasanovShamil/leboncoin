$(document).ready(function() {

	$('#upload-button').on('click', function (event) {
    event.preventDefault();
    var files = $('#photos-input').get(0).files,
        formData = new FormData();
    if (files.length === 0) {
        alert('Select atleast 1 file to upload.');
        return false;
    }

    if (files.length > 3) {
        alert('You can only upload up to 3 files.');
        return false;

    }

    for (var i=0; i < files.length; i++) {
        var file = files[i];
        formData.append('photos[]', file, file.name);
    }

    uploadFiles(formData);

	}); 


	$('#textarea1').on('change',function(){
        setTimeout(
            function()
            {
                $("#textarea2").delay(1000).val("The world’s smallest and lightest 15-inch laptop packs powerhouse performance and a stunning InfinityEdge display — all in our most powerful XPS laptop.");
                $("#textarealabel2").addClass("active");
            }, 5000);


    });

	$('#suggestion-button').on('click',function(){
        setTimeout(
            function()
            {
                $("#Prix").val("890");
                $("#PrixLabel").addClass("active");
            }, 5000);


    });
})



function uploadFiles(formData) {

    $.ajax({

        url: 'vision/upload_image',

        method: 'post',

        data: formData,

        processData: false,

        contentType: false,

        

    }).done(function (response) {
        console.log(response.category);
		 $("#textarea0").val(response.category);
        $("#textarealabel0").addClass("active");
       /* var instance = M.FormSelect.getInstance('select');
        instance.select(response)*/

    });
	
}