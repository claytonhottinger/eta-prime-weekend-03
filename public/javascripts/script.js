$(function() {

  /*
  * Iterates through each form and appends current
  * comments to the dom
  */
  $('form').each(function() {
    var id = $(this).attr('class');
    var dest = '/comments/' + id;
    $.ajax({
      url: dest
    }).done(function(data) {
      data.forEach(function(elem) {
        var $p = $('<p>');
        $p.text(elem.message);
        $('.' + id).append($p);
      });
    });
  });

  /*
  * Sends comment for server to write to json,
  * appends new comment to DOM
  */
  $('body').on('submit','form', function(event) {
    event.preventDefault();
    var id = $(this).attr('class');
    var temp = $(this).serializeArray();
    var newComment = {imageId: $(this).attr('class'),
      message: temp[0].value};
    //ajax call to write new comments.
    //sends post request with newComment object
    //server writes it to comments.json, then returns the object written
    //When call complete, appends comment to the DOM
    $.ajax({
      type: 'post',
      url: '/comments',
      data: newComment
    }).fail(function() {
      $('.' + id).append(
        '<p class="fail">Submission Failed! Please try again</p>');
    }).done(function(data) {
      $('.fail').remove();
      var $p = $('<p>');
      $p.text(data.message);
      $('.' + data.imageId).append($p);
    });
  });

  /**
    Event handler for addition of new memes to the page.
    Creates formData object with file and id, then sends
    post request to the server. Upon completion, appends
    the image and comment form to the DOM.
  */

  $('header').find('form').on('submit', function(event) {
    event.preventDefault();
    var input = $(this).serializeArray();
    console.log(input);
    var formData = new FormData();
    formData.append('file',$(this).find('input[name="newMeme"]')[0].files[0]);
    formData.append('id',input[0].value.split(' ').join('_'));
    $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      data: formData,
      url: '/upload'
    }).done(function(data) {
      var $newMeme = $(
        '<div id="' + data.id.split(' ').join('_') + '">' +
    			'<a href="/memes/' + data.id + '">' +
    				'<img src="' + data.url + '"></img></a>' +
    			'<br>' +
    			'<form class="' + data.id.split(' ').join('_') + '">' +
    				'<input type="text" name="message" required placeholder="Comment here..."></input>' +
    				'<input type="submit"></input>' +
    			'<br>'
      );

      $('body').append($newMeme);
      // '<h3>File uploaded! Refresh the page to see your new meme!</h3>');
    });

  });
});
