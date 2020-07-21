jQuery(document).ready(function ($) {

	updateEbookPrice($(".ebook input#slider"));
	$(".ebook input#slider").change(function() {
		updateEbookPrice($(this));
	});

	$('.ebook .sunrise').addClass('up');

	$(".slideshow-desktop .light-slider").lightSlider({
		gallery: true,
		item: 1,
		thumbItem: 7,
		galleryMargin: 16,
		mode: 'fade',
		onSliderLoad: function (el) {
			var parent = el.parent();
			parent.find('.lSAction .lSPrev').addClass('hidden');
		}
	});

	$(".slideshow-mobile .light-slider").lightSlider({
		gallery: false,
		item: 1,
		mode: 'fade'
	});

	if($(".ebook #payment-form input#email").length > 0 && $(".ebook #payment-form input#email").val() != "") {
		validateEmailWithNeverBounce($(".ebook #payment-form input#email"));
	}

	$(".ebook #payment-form input#email").change(function() {

		$('.email .valid-feedback').hide();
		$('.email .invalid-feedback').hide();

		if($(this).val() == "") {
			$('.email .error').slideUp('fast');
			return;
		}

		validateEmailWithNeverBounce($(this));
	});

	function updateEbookPrice(element) {
		var prices = [1, 2, 5, 10];
		var emoji = ["2-fingers", "face-happy", "face-hug", "face-love"];
		var sentenses = ["Les petits ruisseaux font les grandes rivières", "Merci, vous êtes vraiment chouette !", "Vous êtes même carrément trop chou !", "Vous êtes extraordinaire, on vous aime !"]
		$(".price span.value").text(prices[element.val()]);
		$(".sentense").html(sentenses[element.val()]);
		$(".price img").attr('src', '/wp-content/themes/fusion/images/premium/emoji/'+emoji[element.val()]+'.png');
	}

	function validateEmailWithNeverBounce(element) {
		$('.email .loading-feedback').removeClass('d-none');
		element.prop( "disabled", true);

		_nb.api.getValidatePublic(element.val(),
			function(result) {
				// Returns a Result object
				if(result.is(['valid','catchall'])) {
					$('.email .valid-feedback').show();
					$('.email .error').slideUp('fast');
				} else {
					$('.email .invalid-feedback').show();
					$('.email .error').slideDown('fast');
				}
				element.prop("disabled", false);
				$('.email .loading-feedback').addClass('d-none');
			},
			function(err) {
				// Returns error message as string
				$('.email .invalid-feedback').show();
				$('.email .error').slideDown('fast');
				element.prop("disabled", false);
				$('.email .loading-feedback').addClass('d-none');
			}
		);
	}
});