const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';
const query = 'query=';
const LANG_ES = 'language=es';
const LANG_EN = 'language=en';

$(document).ready(function () {
 $("#searchButton").click(function () {
  var searchQuery = $("#searchInput").val();

  searchCollection(searchQuery);
 });

 async function searchCollection(searchQuery) {
  if (searchQuery == "") {
   $("#results").html("<p>Ingrese un título de película para buscar.</p>");
  } else {
   try {
     const response = await fetch(BASE_URL + '/search/collection?' + API_KEY + '&' + query + searchQuery + '&' + LANG_ES);
     const data = await response.json();
     const collections = data.results;

     if (collections.length === 0) {
      $("#results").html("<p>No se encontraron películas con ese título.</p>");
     } else {
      displayCollection(collections);
     }
   } catch (error) {
     console.error('¡Ups! Algo salió mal:', error);
   }
  }
 }

 async function displayCollection(collections) {
  var resultsHtml = "";

  for (const collection of collections) {
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

   try {
     const movieTitles = await getMovieTitles(idCollection);
     const totalMovies = await getTotalMovies(idCollection);

     resultsHtml += `<div class="movie-card">
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
  <div class="totalCollection">
    <p>Películas | ${totalMovies}</p>
  </div>
  <div>&nbsp;</div>
  <div class="titulosCollection">
    <p>Titulos | ${movieTitles.join(', ')}</p>
  </div>
  <div>&nbsp;</div>
					<div class="Sinopsis"><code>&#96;&#96;&#96;📝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sinopsis&nbsp;|<br>${overview}&#96;&#96;&#96;</code></div>
					<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
					<div class="redes"><b>▫️&nbsp;&#42;&#42;Síguenos&#42;&#42;&nbsp;@AstroPeliculasOf</b></div></div>
			</div>
		</div>
	</div>`;
   } catch (error) {
     console.error('¡Ups! Algo salió mal:', error);
   }
  }

  $("#results").html(resultsHtml);
 }


 async function getTotalMovies(idCollection) {
  try {
    const response = await fetch(`${BASE_URL}/collection/${idCollection}?${API_KEY}`);
    const data = await response.json();
    const moviesList = data.parts.filter(movie => movie.release_date);
      // Filtrar las películas que tienen una fecha de lanzamiento
    const totalMovies = moviesList.length;
    // Utilizar la longitud del array filtrado
    
    // console.log(`Numeros de películas en la colección ${idCollection}: ${totalMovies}`);
    return totalMovies;
  } catch (error) {
    console.error('¡Ups! Algo salió mal:', error);
    throw error;
  }
 }

async function getMovieTitles(idCollection){
  try {
    const response = await fetch(`${BASE_URL}/collection/${idCollection}?${API_KEY}`);
    const data = await response.json();
    const moviesList = data.parts.filter(movie => movie.release_date);
      // Filtrar las películas que tienen una fecha de lanzamiento
    const sortedTitles = moviesList.map(movie => movie.title).sort();
      // Ordenar los títulos de las películas de la más antigua a la más reciente
    const formattedTitles = sortedTitles.join(', ');
    
    // console.log(`Títulos de la colección ${idCollection}: ${formattedTitles}`);
    return sortedTitles;
  } catch (error) {
    console.error('¡Ups! Algo salió mal:', error);
    throw error;
  }
 }
});