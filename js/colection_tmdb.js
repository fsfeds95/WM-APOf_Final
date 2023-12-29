$(document).ready(function () {
 $("#searchButton").click(function () {
  var searchQuery = $("#searchInput").val();

  searchCollection(searchQuery);
 });

 function searchCollection(query) {
  if (query == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   $.getJSON(
    "https://api.themoviedb.org/3/search/collection?api_key=74dc824830c7f93dc61b03e324070886&query="+query +"&language=es",
    function (data) {
     var collections = data.results;

     if (collections.length === 0) {
      $("#results").html("<p>No se encontraron películas con ese título.</p>");
     } else {
      displayCollection(collections);
     }
    }
   );
  }
 }

 function displayCollection(collections) {
  var resultsHtml = "";

  collections.forEach(function (collection) {
   var idCollection = collection.id;

   var title = collection.name;

   var originalTitle = collection.original_name;

   var posterPath = collection.poster_path;

   var backdropPath = collection.backdrop_path;

   var overview = collection.overview;

   var replaceTitle = {
    ":": "",
    " ": "_",
    "-": "",
    "¡": "",
    "!": "",
    ",": "",
    "¿": "",
    "á": "a",
    "é": "e",
    "í": "i",
    "ó": "o",
    "ú": "u"
   };
//------------------------------------------

 function searchCollectionDetails(query) {
    if (query == "") {
     $("#results").html("<p>Ingrese un título de película para buscar.</p>");
    } else {
      $.getJSON('https://api.themoviedb.org/3/collection/'+idCollection+'?api_key=74dc824830c7f93dc61b03e324070886&language=es',
      function (data) {
        var collectionsDetails = data.results;
        if (collectionsDetails.length === 0) {
          $("#results").html("<p>No se encontraron películas con ese título.</p>");
        } else {
          displayCollectionDetails(collectionsDetails);
        }
      }
      );
    }
 }
 console.log('https://api.themoviedb.org/3/collection/'+idCollection+'?api_key=74dc824830c7f93dc61b03e324070886&language=es')
 
//------------------------------------------
   resultsHtml += `	<div class="movie-card">
			<div class="movie-card__header" style="background-image: url(https://image.tmdb.org/t/p/w500${backdropPath})">
				<span class="movie-card_genre">
					ID: ${idCollection}
				</span>
				<span class="movie-card_genre">
					<a href="https://wmapof.cyclic.app/p?url=https://image.tmdb.org/t/p/original${posterPath}" target="_blank">
						Poster
					</a>
				</span>
				<span class="movie-card_genre">
					<a href="https://wmapof.cyclic.app/b?url=https://image.tmdb.org/t/p/original${backdropPath}" target="_blank">
						Backdrop
					</a>
				</span>
				<span class="movie-card_genre">
					<a href="https://www.themoviedb.org/movie/${idCollection}/" target="_blank">
						Toda la información
					</a>
				</span>
			</div>
		<div class="movie-card_content">
				<div class="movie-card__poster" style="background-image: url(https://image.tmdb.org/t/p/w500${posterPath})"></div>
			<div class="d">


        <button class="copy" onclick="copyTextById('peli_${idCollection}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
				<div class="contenedor border" id="peli_${idCollection}_1">${title.replace(/:|\s|-|!|¡|,|¿/g, function (match) {
      return replaceTitle[match];
     })}_540p_dual-lat_@AstroPeliculasOf.mp4</div>
        
        
        <button class="copy" onclick="copyTextById('peli_${idCollection}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
				<div class="contenedor border" id="peli_${idCollection}_2">
					<div class="titulo_es">
						<b>
							🔠&nbsp;&#42;&#42;#${title.replace(/:|\s|-|!|¡|,|¿/g, function(match) {return replaceTitle[match];})
        .substring(1, 0)}&#42;&#42;
						</b>
					</div>
					<div class="titulo_es">
						<b>
							🍿&nbsp;&#42;&#42;${title}&#42;&#42;
						</b>
					</div>
					<div class="titulo_en"><b>📽&nbsp;&#95;&#95;<i>${originalTitle}</i>&#95;&#95;</b></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="coleccion">
					  <b>📦&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#42;&#42;Colección&nbsp;|&#42;&#42;</b>&nbsp;&#42;&#42;#${originalTitle.replace(/:|\s|-|!|¡|,|¿/g, function (match) {
      return replaceTitle[match];
     })}&#42;&#42;</div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="Sinopsis"><code>&#96;&#96;&#96;📝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sinopsis&nbsp;|<br>${overview}&#96;&#96;&#96;</code></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&#42;&#42;&nbsp;@AstroPeliculasOf</b></div></div>
			</div>
		</div>
	</div>`;
  });

  $("#results").html(resultsHtml);
 }
 
});