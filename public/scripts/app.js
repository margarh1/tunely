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
    $('#songModal').modal('hide');
  });

  $('#albums').on('click', '.delete-album', function() {
    var albumId = $(this).closest('.album').attr('data-album-id');
    $.ajax({
      method: 'DELETE',
      url: '/api/albums/' + albumId,
      success: deletedAlbum,
      error: onError
    });
  });

  $('#albums').on('click', '.edit-album', function() {
    console.log($(this).closest('.album').attr('data-album-id') +' was clicked');
    $(this).text('Save Changes');
    $(this).toggleClass('save-changes').removeClass('edit-album');
    var inputSpans = $(this).closest('.album').find('.list-group span').slice(0,3);
    for (var idx = 0; idx < inputSpans.length; idx++) {
      var current = inputSpans[idx];
      current.outerHTML = "<input class=" + current.className + "></input>";
      $(this).closest('.album').find('input')[idx].defaultValue = current.textContent;
    };
  });

  $('#albums').on('click', '.save-changes', function() {
    console.log($(this).closest('.album').attr('data-album-id') + ' was clicked');
    var albumId = $(this).closest('.album').attr('data-album-id');
    console.log($(this).serialize());
    // $.ajax({
    //   method: 'PUT',
    //   url: '/api/albums' + albumId,
    //   data: $(this).serialize();
    //   success: updateAlbumSuccess,
    //   error: onError
    // })
  });

});



// this function takes a single album and renders it to the page
function renderAlbum(album) {
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

function deletedAlbum() {
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderAllAlbums,
    error: onError
  });
};




