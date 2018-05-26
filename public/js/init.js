(function($){
  $(function(){

    $('.sidenav').sidenav();
    

  }); // end of document ready
})(jQuery); // end of jQuery name space
$(document).ready(function(){
  $('select').formSelect();



  
});

$("#imgImp").change(function() {
  readURL(this);
});
$(document).ready(function(){
  /*$('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });*/
});