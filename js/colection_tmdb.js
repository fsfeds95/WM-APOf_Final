$(document).ready(function () {
 $("#searchButton").click(function () {
  var searchQuery = $("#searchInput").val();

  searchMovies(searchQuery);
 });

 function searchMovies(query) {
  if (query == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   $.getJSON(
    "https://api.themoviedb.org/3/search/collection?api_key=74dc824830c7f93dc61b03e324070886&query="+query +"&language=es",
    function (data) {
     var movies = data.results;

     if (movies.length === 0) {
      $("#results").html("<p>No se encontraron películas con ese título.</p>");
     } else {
      displayMovies(movies);
     }
    }
   );
  }
 }

 function displayMovies(movies) {
  var resultsHtml = "";

  movies.forEach(function (movie) {
   var id = movie.id;

   var title = movie.name;

   var originalTitle = movie.original_name;

   var posterPath = movie.poster_path;

   var backdropPath = movie.backdrop_path;

   var overview = movie.overview;

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

   resultsHtml += `	<div class="movie-card">
			<div class="movie-card__header" style="background-image: url(https://image.tmdb.org/t/p/w500${backdropPath})">
				<span class="movie-card_genre">
					ID: ${id}
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
					<a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
						Toda la información
					</a>
				</span>
			</div>
		<div class="movie-card_content">
				<div class="movie-card__poster" style="background-image: url(https://image.tmdb.org/t/p/w500${posterPath})"></div>
			<div class="d">


        <button class="copy" onclick="copyTextById('peli_${id}_1', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
				<div class="contenedor border" id="peli_${id}_1">${title.replace(/:|\s|-|!|¡|,|¿/g, function (match) {
      return replaceTitle[match];
     })}_540p_dual-lat_@AstroPeliculasOf.mp4</div>
        
        
        <button class="copy" onclick="copyTextById('peli_${id}_2', this)"><i class="fa-regular fa-clipboard"></i> Copiar</button>
				<div class="contenedor border" id="peli_${id}_2">
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