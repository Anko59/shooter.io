$('#Login').on('click', function () {
  // $( ".cover-container" ).append( "<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>");
  console.log("click!");
});
console.log("connected");
var selected = "King of the Hill";
$(function(){
	$('div.product-chooser').not('.disabled').find('div.product-chooser-item').on('click', function(){
		$(this).parent().parent().find('div.product-chooser-item').removeClass('selected');
		$(this).addClass('selected');
		$(this).find('input[type="radio"]').prop("checked", true);
		selected = $(this).attr('id');
		console.log(selected);
	});
});
var redirect = function(location) {
    window.location = location;
}
$(function(){
	$('#Login').on('click', function() {
		socket = io.connect("http://localhost:80");
		socket.emit('User', selected);
		var pseudo = $('#Pseudo').val();
		socket.on('id', function(data) {
			var id = data.id;
			var url = data.url;
	        var data = {
	            pseudo: pseudo,
	            id: id,
	            url: url
	        };
	        document.cookie = "id=" + data.id.toString();
	        socket.emit('dataPlayer', data);
	        setTimeout(function(){
	        	redirect(url);
	        },3000);
	    });
	});
});