jQuery(document).ready(function ($) {
  var client = algoliasearch('M8UJG2X7HL', 'd285155ccceb9ec1b5a7cdcad1ab5407');
  var index = client.initIndex('prod_posts_faq');

  $("#aa-search-input").on("keyup", function( event, ui ) {
    let icon = $(".aa-input-icon");
    if(event.target.value.length > 0) icon.hide();
    else {
      icon.show();
      $('#aa-search-input').removeClass('autocomplete-shown');
    }
  });

  autocomplete('#aa-search-input',
  {
    hint: false,
    debug: false,
   }, {
      source: autocomplete.sources.hits(index, {hitsPerPage: 6}),
      //value to be displayed in input control after user's suggestion selection
      displayKey: 'post_title',
      //hash of templates used when rendering dataset
      templates: {
          //'suggestion' templating function used to render a single suggestion
          suggestion: function(suggestion) {
            // console.log(suggestion);
            let title = suggestion._highlightResult.post_title.value;
            let cat = !_.isUndefined(suggestion._highlightResult.taxonomies.aide) ? suggestion._highlightResult.taxonomies.aide[0].value : '';
            return '<span class="title">' + title + '</span>' +
            '<span class="category">' + cat + '</span>'
            ;
          }
      }
  })
  .on('autocomplete:selected', function(event, suggestion, dataset) {
    window.location.href = suggestion.permalink;
  })
  .on('autocomplete:shown', function(event, suggestion, dataset) {
    $('#aa-search-input').addClass('autocomplete-shown');
  })
  .on('autocomplete:closed', function(event, suggestion, dataset) {
    $('#aa-search-input').removeClass('autocomplete-shown');
  })
  .on('autocomplete:empty', function(event, suggestion, dataset) {
    $('#aa-search-input').removeClass('autocomplete-shown');
  });
});