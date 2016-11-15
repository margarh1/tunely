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
  });

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

  $('#albums').on('click', '.add-song', function() {
    console.log('add-song was clicked');
    var id = $(this).closest('.album').data('album-id');
    $('#songModal').data('album-id', id).modal();
  });

  $('#songModal').on('click', '#saveSong', function handleNewSongSubmit(event) {
    event.preventDefault();
    var albumId = $('#songModal').data('albumId');
    var newSongToAlbum = '/api/albums/' + albumId;
    var songName = 'name=' + $('#songName').val();
    var trackNumber = $('#trackNumber').prop('name') + '=' + $('#trackNumber').val();
    var modalData = songName + '&' + trackNumber;
    $.ajax({
      method: 'POST',
      url: newSongToAlbum,
      data: modalData,
      success: addNewSong,
      error: onError
    });
    $('#songName').val('');
    $('#trackNumber').val('');
  });

});



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  // console.log('rendering album:', album);
  var albumsSource = $('#albumsTemplate').html();
  var albumsTemplate = Handlebars.compile(albumsSource);
  var albumsHtml = albumsTemplate(album);
  $('#albums').prepend(albumsHtml);
};

function renderAllAlbums(json) {
  json.forEach(renderAlbum);
};

function onError(xhr, status, errorThrown) {
  alert('Sorry, there was a problem!');
  console.log('Error: ' + errorThrown);
  console.log('Status: ' + status);
  console.dir(xhr);
};

function addNewAlbum(json) {
  renderAlbum(json);
};

function addNewSong(json) {
  renderAlbum(json);
};




