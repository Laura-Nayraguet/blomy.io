jQuery(document).ready(function ($) {

  // Create a Stripe client
  // var stripe = Stripe('pk_test_NaTxAbabEdizJau8FhmReP7r');
  var stripe = Stripe('pk_live_rULNfPm1oZOmN2XwataPOT17');

  // Create an instance of Elements
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '24px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element
  var card = elements.create('card', {style: style, hidePostalCode: true});

  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = $('#card-errors');
    if (event.error) {
      $('.text', displayError).text(event.error.message);
      $('#card-errors').show();
    } else {
      $('.text', displayError).text('');
      $('#card-errors').hide();
    }
  });

  // Handle form submission
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;
    let formValidate =  $("#payment-form");

    if (typeof formValidate.attr('data-disable-form-validation') === "undefined") {
      formValidate.validate();
      isValid = formValidate.valid();
    }

    if(isValid) {
      var l = Ladda.create(document.querySelector('button.ladda-button'));
      l.start();
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = $('#card-errors');
          $('#card-errors').show();
          $('.text', errorElement).text(result.error.message);
          l.stop();
        } else {
          // Send the token to your server
          stripeTokenHandler(result.token);
        }
      });
    }
  });

  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);

    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }

});