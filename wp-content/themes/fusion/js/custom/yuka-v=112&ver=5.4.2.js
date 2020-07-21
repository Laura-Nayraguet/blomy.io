jQuery(document).ready(function ($) {
	$('.js-scrollTo').on('click', function() { // Au clic sur un élément
		var page = $(this).attr('href'); // Page cible
		var speed = 900; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: $(page).offset().top - 20 }, speed ); // Go
		return false;
	});

	$('article.post-type-essential.format-grid').hover(function() {
		$(this).toggleClass('hover');
	});

	$('article.post-type-essential.format-grid').click(function() {
		var link = $('a', this).attr('href');
		window.location = link;
	});

	$('article.post-type-essential.format-grid').matchHeight();

	$('.article-sources a.see').click(function(e) {
		e.preventDefault();
		$('.article-sources ul').slideToggle();
		$('span', this).toggleClass('up');
	});

	// Chrismas
	$('#christmas-wallpapers a').removeAttr('data-gal');

	// Share product
	$("body.page-template-template-share_product #shadow").fadeIn();
	$("body.page-template-template-share_product #phone-container .phone").delay(200).animate({ height: $("body.page-template-template-share_product #phone-container .phone").width() * 1.022 }, 500);

	$('.mobile-menu-toggler').on('click', function () {
		$('.burger-icon').toggleClass('open');
	});

	// Custom Bootstrap carousel
	$('.carousel.bleed').on('slide.bs.carousel', function (e) {
		$(this).find('.carousel-item.active').removeClass('active')
		$(e.relatedTarget).addClass('active')
		var itemOffset = $(e.relatedTarget).outerWidth(true)
		var wrapper = $(e.currentTarget).find('.carousel-inner')
		var currentPosition = parseInt($(wrapper).css('transform').split(',')[4])
		var newPosition = (e.direction == 'left') ? currentPosition - (itemOffset * (e.to - e.from)) : currentPosition + (itemOffset * (e.from - e.to))
		$(wrapper).css('transform', "matrix(1, 0, 0, 1, " + newPosition + ", 0)")
	})
	function resizeEnd(){
		$(".carousel.bleed").carousel('cycle')
	}
	var resumeCarousel
	window.onresize = function(){
	  clearTimeout(resumeCarousel)
	  $(".carousel.bleed").find(".carousel-inner").css("transform", "")
	  $(".carousel.bleed").carousel('pause').carousel(0)
	  resumeCarousel = setTimeout(resizeEnd, 100)
	};

	$('#carousel-application-desktop').on('slide.bs.carousel', function (e) {
		$("#iphone-carousel-desktop .features .feature").removeClass('active')
		$(`#iphone-carousel-desktop .features .feature[data-slide=${e.to}]`).addClass('active')
	});

	$("#iphone-carousel-desktop .features .feature").click(function(e) {
		var slide = $(this).attr('data-slide')
		$('#carousel-application-desktop').carousel(parseInt(slide))
	});

	$('#iphone-carousel-mobile #carousel-features').on('slide.bs.carousel', function (e) {
		$("#iphone-carousel-mobile .iphone").css('display', 'none')
		$(`#iphone-carousel-mobile .iphone[data-slide=${e.to}]`).fadeIn()
	});

	$(".premium input#slider").change(function() {
		var prices = [10, 15, 20, 50];
		var emoji = ["2-fingers", "face-happy", "face-hug", "face-love"];
		$(".price span.value").text(prices[$(this).val()]);
		$(".price img").attr('src', '/wp-content/themes/fusion/images/premium/emoji/'+emoji[$(this).val()]+'.png');
	});

	if($(".premium #payment-form input#email").length > 0 && $(".premium #payment-form input#email").val() != "") {
		validateEmail($(".premium #payment-form input#email"));
	}

	$(".premium #payment-form input#email").change(function() {

		$('.email .valid-feedback').hide();
		$('.email .invalid-feedback').hide();

		if($(this).val() == "") {
			$('.email .error').slideUp('fast');
			return;
		}

		validateEmail($(this));
	});

	function validateEmail(element) {
		$('.email .loading-feedback').removeClass('d-none');
		element.prop( "disabled", true);

		$.ajax({
			type: "get",
			url: "/wp-json/yuka/user/"+element.val(),
			context: element,
			})
			.done(function(data) {
				if(data == true) {
					$('.email .valid-feedback').show();
					$('.email .error').slideUp('fast');
				} else {
					$('.email .invalid-feedback').show();
					$('.email .error').slideDown('fast');
				}
			})
			.fail(function() {
				$('.email .invalid-feedback').show();
				$('.email .error').slideDown('fast');
			})
			.always(function() {
				$(this).prop("disabled", false);
				$('.email .loading-feedback').addClass('d-none');
			});
	}

	$("input#email").emailautocomplete({
		domains: ["gmail.com", "hotmail.com", "sfr.fr", "orange.fr", "yahoo.fr", "icloud.com", "free.fr", "laposte.net", "wanadoo.fr", "bbox.fr", "hotmail.fr", "me.com", "icloud.com", "outlook.com", "msn.com", "live.com", "me.com"]
	});
});