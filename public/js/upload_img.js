$(document).ready(function() {

	$('#upload-button').on('click', function (event) {

    event.preventDefault();



    // Get the files from input, create new FormData.

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



    // Append the files to the formData.

    for (var i=0; i < files.length; i++) {

        var file = files[i];

        formData.append('photos[]', file, file.name);

    }



    // Note: We are only appending the file inputs to the FormData.

    uploadFiles(formData);

	}); 

}

)



function uploadFiles(formData) {

    $.ajax({

        url: 'vision/upload_image',

        method: 'post',

        data: formData,

        processData: false,

        contentType: false,

        

    }).done(function (response) { 
		 ($("#select1").val(response.category)).selected = true;

    });
	
}