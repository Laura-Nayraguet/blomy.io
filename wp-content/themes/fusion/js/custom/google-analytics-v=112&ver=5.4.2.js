(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-76822640-1', 'auto');
ga('require', 'GTM-N4NTH6L');
ga('send', 'pageview');

dataLayer = [];

jQuery(document).ready(function ($) {
	$('.discover-video a').click(function() {
		ga('send', 'event', 'Video', 'play', '1 minute video');
	});

	$('.facebook-page a').click(function() {
		ga('send', 'event', 'Facebook', 'open', 'Click facebook page');
	});

	$('.home #features-slider ul.tab-list li a').click(function() {
		ga('send', 'event', 'Slider', 'click', 'Click on feature slider');
	});

	$('#mc4wp-form-1 input[type=submit]').click(function() {
		ga('send', 'event', 'App Android', 'subscribe', 'Subscribe to Android');
	});

	$('.info-flash a.no-color').click(function() {
		ga('send', 'event', 'Info-flash', 'click', 'Link Cash Investigation');
	});

	$('.info-flash a.subscribe').click(function() {
		ga('send', 'event', 'Info-flash', 'click', 'Link Subscribe');
		$('html, body').animate({
			scrollTop: $("#subscribe-news").offset().top - 80
		}, 500);
	});

	$('#primary-menu .appstore-link').click(function() {
		ga('send', 'event', 'App iPhone', 'download', 'Primary menu');
	});

	$('#agency-header .appstore-link').click(function() {
		ga('send', 'event', 'App iPhone', 'download', 'Header');
	});

	$('#primary-menu .playstore-link').click(function() {
		ga('send', 'event', 'App Android', 'download', 'Primary menu');
	});

	$('#agency-header .playstore-link').click(function() {
		ga('send', 'event', 'App Android', 'download', 'Header');
	});

	$('.home #medias .cell-1 a').click(function() { ga('send', 'event', 'Media', 'click', 'Science et Avenir'); });
	$('.home #medias .cell-2 a').click(function() { ga('send', 'event', 'Media', 'click', 'France Inter'); });
	$('.home #medias .cell-3 a').click(function() { ga('send', 'event', 'Media', 'click', 'Tele Matin'); });
	$('.home #medias .cell-4 a').click(function() { ga('send', 'event', 'Media', 'click', 'Europe 1'); });
	$('.home #medias .cell-5 a').click(function() { ga('send', 'event', 'Media', 'click', 'LCI'); });

	// Track outbound link in the blog
	$(".single.single-post article.post a[target='_blank']").each(function() {
		$(this).click(function() {
			trackOutboundLink($(this).attr('href'));
			return true;
		});
	});

	// Track Christmas links
	$('#christmas-wallpapers a').click(function() {
		ga('send', 'event', 'Wallpaper', 'download', $(this).attr('title'));
	});

	$('body.impact-measure a.btn').click(function() {
		ga('send', 'event', 'PDF', 'download', 'Social impact');
	});
});

/**
* Fonction de suivi des clics sur des liens sortants dans Analytics
* Cette fonction utilise une chaîne d'URL valide comme argument et se sert de cette chaîne d'URL
* comme libellé d'événement. Configurer la méthode de transport sur 'beacon' permet d'envoyer le clic
* au moyen de 'navigator.sendBeacon' dans les navigateurs compatibles.
*/
var trackOutboundLink = function(url) {
   ga('send', 'event', 'outbound', 'click', url, {
     'transport': 'beacon'
   });
}