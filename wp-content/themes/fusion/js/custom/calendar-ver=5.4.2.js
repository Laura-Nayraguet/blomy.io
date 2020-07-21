var autocomplete;
const componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  autocomplete_address = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete_address'), {
      types: ['address']
    });
  autocomplete_address.setComponentRestrictions({'country': ['fr']});
  autocomplete_address.setFields(['address_component']);
  autocomplete_address.addListener('place_changed', fillInAddress);

  autocomplete_city = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete_city'), {
      types: ['(cities)']
    });
  autocomplete_city.setComponentRestrictions({'country': ['fr']});
  autocomplete_city.setFields(['address_component']);
  autocomplete_city.addListener('place_changed', fillInCity);
}

function fillInAddress() {
  var place = autocomplete_address.getPlace();
  var resolvedPlace = {}
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      resolvedPlace[addressType] = val;
    }

    var address = [resolvedPlace.street_number, resolvedPlace.route];
    address = address.filter(Boolean);
    jQuery("#autocomplete_address").val(address.join(' ')).addClass('autocompleted');
    jQuery("#autocomplete_city").val(resolvedPlace.locality).addClass('autocompleted');
    if(typeof resolvedPlace.postal_code !== "undefined") {
      jQuery("#zipCode").val(resolvedPlace.postal_code).addClass('autocompleted');
    } else {
      jQuery("#zipCode").val('').removeClass('autocompleted');
    }
    // Force validation after setting the values
    jQuery("#payment-form").validate().element("#autocomplete_address");
  }
}

function fillInCity() {
  var place = autocomplete_city.getPlace();
  var resolvedPlace = {}
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      resolvedPlace[addressType] = val;
    }

    jQuery("#autocomplete_city").val(resolvedPlace.locality).addClass('autocompleted');
    if(typeof resolvedPlace.postal_code !== "undefined") {
      jQuery("#zipCode").val(resolvedPlace.postal_code).addClass('autocompleted');
    } else {
      jQuery("#zipCode").val('').removeClass('autocompleted');
    }
  }
}

jQuery(document).ready(function ($) {

  function updatePrice(element) {
    let selectedValue = $(':selected', element).text();
    let tvaContainer = $('#tvaPrice');
    let priceContainer = $('#totalPrice');
    let totalPrice = (priceContainer.data('unit-price') * selectedValue).toFixed(2);

    $('#orderButton').text(`Commander • ${totalPrice}€`);

    $('#tvaPrice .priceValue').text(`${(tvaContainer.data('tva-price') * selectedValue).toFixed(2)}€`);
    $('#totalPrice .priceValue').text(`${totalPrice}€`);
  }

  $("#quantitySelection").change(function() {
    updatePrice(this);
  });

  updatePrice($("#quantitySelection"));

  $("#autocomplete_address, #autocomplete_city, #zipCode").change(function() {
    $(this).removeClass('autocompleted');
  });

  $('.tipsy').tipsy({gravity: 'e'});

  $("#payment-form").validate({
    rules: {
      zipCode: {
        required: true,
        digits: true,
        normalizer: function(value) {
          return $.trim(value);
        }
      }
    }
  });

  // Prevent validating the form with enter
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

});