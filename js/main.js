$(document).ready(function(){

});

$('select').on('change',function(){
	if ( $(this).attr('value') == "" ) {
		$('body').css('color', 'purple');
	} else {
		$('body').css('color', 'red');
	}

})