/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderAllAlbums,
    error: onError
  })

  $('#newAlbumForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: addNewAlbum,
      error: onError
    });
    $('#newAlbumForm > input').val('');
  });

});





// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);
  var albumsSource = $('#albumsTemplate').html();
  var albumsTemplate = Handlebars.compile(albumsSource);
  var albumsHtml = albumsTemplate(album);
  $('#albums').append(albumsHtml);
}

function renderAllAlbums(json) {
  json.forEach(renderAlbum);
}

function onError(xhr, status, errorThrown) {
  alert('Sorry, there was a problem!');
  console.log('Error: ' + errorThrown);
  console.log('Status: ' + status);
  console.dir(xhr);
};

function addNewAlbum(json) {
  renderAlbum(json);
};

