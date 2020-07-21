jQuery(document).ready(function ($) {

  // Create a Stripe client
  // var stripe = Stripe('pk_test_NaTxAbabEdizJau8FhmReP7r');
  var stripe = Stripe('pk_live_rULNfPm1oZOmN2XwataPOT17');

  // Apple Pay support
  var paymentRequest = stripe.paymentRequest({
    country: 'FR',
    currency: 'eur',
    total: {
      label: 'Calendrier Yuka',
      amount: 1490,
    },
    requestPayerName: true,
    requestPayerEmail: true,
    requestShipping: true,
    shippingOptions: [
      {
        id: 'free-shipping',
        label: 'Livraison incluse',
        detail: 'Sous 1 semaine',
        amount: 0,
      },
    ]
  });

  function gtag() { dataLayer.push(arguments); }

  paymentRequest.on('token', function(ev) {
    console.log(ev);
    var components = ev.payerName.split(' ');
    let firstname = components.shift();
    let lastname = components.join(' ');
    var formData  = new FormData();
    formData.append('email', ev.payerEmail);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('address', ev.shippingAddress.addressLine[0]);
    if(typeof ev.shippingAddress.addressLine[1] !== "undefined") {
      formData.append('addressComplement', ev.shippingAddress.addressLine[1]);
    }
    formData.append('city', ev.shippingAddress.city);
    formData.append('zipCode', ev.shippingAddress.postalCode);
    formData.append('stripeToken', ev.token.id);
    formData.append('quantity', 1);
    console.log(formData.values());

    fetch('/wp-content/plugins/yuka-stripe/calendar-payment.php', {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      console.log(response);
      if (response.ok) {
        // Report to the browser that the payment was successful, prompting
        // it to close the browser payment interface.
        ev.complete('success');
        if (response.redirected) {
            window.location.href = response.url;
        }
      } else {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        ev.complete('fail');
      }
    });
  });

});