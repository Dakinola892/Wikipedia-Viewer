

document.getElementById('search_text').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      
      
      var searchText = document.getElementById('search_text').value;
      var alteredSearchText = searchText.replace(/\s/g, "+");
      var apiLink = "https://www.crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cinfo&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&inprop=url&gpssearch=" + alteredSearchText + "&gpslimit=10";
      console.log(alteredSearchText);
      $("#main").removeClass("align-items-center");
      $("#main").addClass("align-items-start");
      
      $('#search-results').each(function () {
    this.style.setProperty( 'display', 'block', 'important' );
      });
      
      $('#main').each(function () {
    this.style.setProperty( 'height', '112px', 'important' );
      });
      
      $("#search-results").html('');

      $.getJSON(apiLink, function(data) {
        var jsonData = data.query.pages;
        
        jsonData.forEach(function(item) {
          var pageName = item.title;
          console.log(pageName);
          var pageDescription = item.terms.description[0];
          console.log(pageDescription);
          var url = item.fullurl;
          console.log(url);
          $("#search-results").append(
            '<div id="result" class="d-flex flex-row justify-content-center align-items-center"><div class="d-flex flex-column justify-content-center align-items-center"><a id="test" target="_blank" href="' + url + '">' + pageName + '</a><p class="lead">' + pageDescription + '</p></div></div>')
        })
      });
      
    }
  }

$("#search_text").focus(function() {
  $("#or").fadeOut("fast");
  $("button").fadeOut("fast");
})

$("#search_text").blur(function() {
  $("#or").fadeIn();
  $("button").fadeIn();
})