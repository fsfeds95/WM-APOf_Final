// BASE
const BASE_URL = 'https://api.themoviedb.org/3';
// Resolución de imagenes
const IMG_ORI = 'https://image.tmdb.org/t/p/original';
const IMG_500 = 'https://image.tmdb.org/t/p/w500';
const IMG_300 = 'https://image.tmdb.org/t/p/w300';
const IMG_185 = 'https://image.tmdb.org/t/p/w185';
const IMG_92 = 'https://image.tmdb.org/t/p/w92';
// API key TMDB
const API_KEY = 'api_key=74dc824830c7f93dc61b03e324070886';
const query = 'query=';
// Lenguajes
const LANG_ES = 'language=es-MX';
const LANG_EN = 'language=en-US';

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
    BASE_URL + "/search/movie?" + API_KEY + "&query=" +
     query +
     "&" + LANG_ES,
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

   var title = movie.title;

   var originalTitle = movie.original_title;

   var tagline = movie.tagline;

   var releaseYear = movie.release_date.split("-")[0];

   var posterPath = movie.poster_path;

   var backdropPath = movie.backdrop_path;
   
   var backdropUrl = backdropPath ? (language === "en-US" ? IMG_500 : IMG_ORI) + backdropPath : "";

   var language = movie.original_language;

   var overview = movie.overview;
   
   var duration = movie.runtime;

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

   resultsHtml += `<div class="movie-card">
<div class="movie-card__header" style="background-image: url(${obtenerBackdropPelicula(id)})">
  <span class="movie-card_genre">ID:‎ ${id}</span>
  <span class="movie-card_genre">
    <a href="https://watermark-astropeliculas-final.onrender.com/p?url=https://image.tmdb.org/t/p/original${posterPath}" target="_blank">
      Poster
    </a>
  </span>
  <span class="movie-card_genre">
    <a href="https://watermark-astropeliculas-final.onrender.com/b?url=${obtenerBackdropPelicula(id)}" target="_blank">
      Backdrop
    </a>
  </span>
  <span class="movie-card_genre">
    <a href="https://www.themoviedb.org/movie/${id}/" target="_blank">
      Información
    </a>
  </span>
</div>
<div class="movie-card_content">
  <div class="movie-card__poster" data-src="${IMG_500+posterPath}"></div>
  <div class="d">
      
<button class="copy" onclick="copyTextById('peli_${id}_2', this)"><i class="fa-regular fa-clipboard"></i>‎ Copiar</button>

<div class="contenedor border" id="peli_${id}_2">




<div class="titulo_es"><b>🍿‎ *${title}*‎ _(${releaseYear})_</b></div>


<div class="titulo_en"><b>📽‎ <i>_*${originalTitle}*_</i></b></div>




<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>




<div class="genero"><b>🎭‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ *Género*‎ |</b>‎ _${getGenres(movie.genre_ids)}_</div><div>‎ </div>


<div class="calidad"><b>📺‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ *Calidad*‎ |‎ *HD*</b></div><div>‎ </div>


<div class="idioma"><b>🗣‎ *Idioma Original*‎ |‎ *${getLanguage(language)}*</b></div><div>‎ </div>


<div class="audio"><b>🎧‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ *Audio*‎ |‎ 🇲🇽‎ *Latino*</b></div><div>‎ </div>




<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>




<div class="trailer">
🎞️‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ <b>*Trailer*‎ |‎ <a href="https://youtu.be/${getTrailerKey(id)}">https://youtu.be/${getTrailerKey(id)}</a></b></div><div>‎ </div>


<div class="descarga">⬇️‎ <b>*Ver / Descargar* | </div>




<div class="separador">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>




<div class="posdata">
⚠️‎ *Posdata:*‎ *_Necesitas‎ tener‎ la‎ aplicación‎ de‎ TeraBox‎ para‎ ver‎ las‎ peliculas,‎ descargala‎ gratis‎ en‎ Play‎ Store‎ o‎ App‎ Store._*</div>
</div>
</div>
</div>
</div>`;
  });

  $("#results").html(resultsHtml);

// Seleccionar todos los elementos con la clase 'movie-card__poster'
const lazyImages = document.querySelectorAll('.movie-card__poster');

// Opciones de configuración del IntersectionObserver
const lazyImageOptions = {
  rootMargin: '0px', // Margen alrededor del viewport (0px indica que el margen es cero)
  threshold: 0.1 // Umbral de visibilidad (0.1 significa que el 10% del elemento debe ser visible)
};

// Crear una instancia de IntersectionObserver con una función de devolución de llamada
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.style.opacity = 1; // Mostramos la imagen al establecer la opacidad en 1
      lazyImage.style.backgroundImage = `url(${lazyImage.getAttribute('data-src')})`;
      lazyImageObserver.unobserve(lazyImage);
    }
  });
}, lazyImageOptions);

// Observar cada elemento con la clase 'movie-card__poster'
lazyImages.forEach(lazyImage => {
  lazyImageObserver.observe(lazyImage);
});
 }

 function getTrailerKey(movieId) {
  var trailerKey = "";

  $.ajax({
   url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fd7402172ca9f36816c7691becaf455f`,

   async: false,

   success: function (data) {
    var videos = data.results.filter(function (video) {
     return (
      video.site === "YouTube" && 
      video.type === "Trailer" && 
      video.iso_639_1 === "en"
     );
    });

    if (videos.length > 0) {
     trailerKey = videos[0].key;
    }
   }
  });

  return trailerKey;
 }

function getGenres(genreIds) {
       var genres = {
         28: "Accion",

         12: "Aventura",

         16: "Animacion",

         35: "Comedia",

         80: "Crimen",

         99: "Documental",

         18: "Drama",

         10751: "Familiar",

         14: "Fantasia",

         36: "Historia",

         27: "Terror",

         10402: "Musica",

         9648: "Misterio",

         10749: "Romance",

         878: "Ciencia‎ Ficcion",

         10770: "Película‎ de‎ la‎ Television",

         53: "Suspenso",

         10752: "Belica",

         37: "Oeste",

         10759: "Accion‎ y‎ Aventura",

         10762: "Infantil",

         10763: "Noticias",

         10764: "Realidad",

         10765: "Ciencia‎ Ficcion‎ y‎ Fantasia",

         10766: "Serial",

         10767: "Conversacion",

         10768: "Politico",

         10769: "Opcion‎ Interactiva"
};

  var genreList = [];

  genreIds.forEach(function (genreId) {
   if (genres[genreId]) {
    genreList.push(genres[genreId]);
   }
  });

  return genreList.join(",‎ ");
 }

 function getLanguage(languageCode) {
  var languages = {
   en: "🇺🇸‎ Ingles",

   ca: "🇪🇸‎ Catalan",

   es: "🇲🇽‎ /‎ 🇪🇸‎ Español",

   fr: "🇫🇷‎ Frances",

   de: "🇩🇪‎ Aleman",

   it: "🇮🇹‎ Italiano",

   ja: "🇯🇵‎ Japones",

   ko: "🇰🇷‎ /‎ 🇰🇵‎ Coreano",

   ru: "🇷🇺‎ Ruso",

   zh: "🇨🇳‎ Chino"
  };

  return languages[languageCode] || languageCode;
 }
});

function getColor(vote) {
  if (vote >= 10) {
    return '#63b800'
  } else if (vote >= 7.5) {
     return '#c3d800'
  } else if (vote >= 5) {
     return '#fff457'
   } else if (vote >= 2.5) {
      return '#fffbb2'
    } else {
    return '#fffbf4'
  }
}


// Funcion actores ------------------------
function showMovieCredits(movieId) {
  var movieCredits = '';

  $.ajax({
    url: `${BASE_URL}/movie/${movieId}/credits?${API_KEY}&${LANG_ES}`,
    async: false,
    success: function(response) {

      // Filtrar los actores más relevantes
      var relevantActors = response.cast.filter(function(actor) {
        return actor.order <= 2;
        // Puedes ajustar el numero de relevancia según tus preferencias, si quieres que aparezcan "3 actores" tienes que colocar como numero "2"
      });

      // Obtener solo los nombres de los actores y unirlos en un string
      var actorNames = relevantActors.map(function(actor) {
        return actor.name;
      });

      movieCredits = actorNames.join(", ");
      // Dividir los nombres de los actores

    },
    error: function(error) {
      console.log(error);
      // Algo no salió como esperábamos.
    }
  });

  return movieCredits;
}

// Funcion obtener poster de pelicula en español
function obtenerPosterPelicula(movieId) {
  var poster_URL = '';

  $.ajax({
    url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_EN}`,
    async: false,
    success: function(response) {
      var posters = response.posters;

      var posterPath = posters.find(function(poster) {
        return poster.iso_639_1 === "es";
      });

      if (posterPath) {
        poster_URL = `https://image.tmdb.org/t/p/original${posterPath.file_path}`;
      }
    },
    error: function(error) {
      console.log('Ay, mi amor, algo salió mal:', error);
    }
  });

  return poster_URL;
}

// Funcion obtener backdrop de pelicula en español
function obtenerBackdropPelicula(movieId) {
  var backdrop_URL = '';

  $.ajax({
    url: `${BASE_URL}/movie/${movieId}/images?${API_KEY}&include_image_language=es,en,null&${LANG_EN}`,
    async: false,
    success: function(response) {
      var backdrops = response.backdrops;

      var backdropPath = backdrops.find(function(backdrop) {
        return backdrop.iso_639_1 === "en";
      });

      if (backdropPath) {
        backdrop_URL = `https://image.tmdb.org/t/p/original${backdropPath.file_path}`;
      }
    },
    error: function(error) {
      console.log('Ay, mi amor, algo salió mal:', error);
    }
  });

  return backdrop_URL;
}