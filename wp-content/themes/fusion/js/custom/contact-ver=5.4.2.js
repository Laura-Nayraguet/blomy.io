jQuery(document).ready(function ($) {
	$('input[name=your-app-email]').focusin(function(){  
		$('.your-app-email.field-warning').slideDown();
	}).focusout(function(){  
		$('.your-app-email.field-warning').slideUp();
	});

	document.addEventListener('wpcf7mailsent', function( event ) {
    	$('.message-banner, .link-banner').hide();
	}, false);
});