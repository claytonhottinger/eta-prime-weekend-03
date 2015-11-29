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
  $('form').on('submit', function(event) {
    event.preventDefault();
    var temp = $(this).serializeArray();
    var newComment = {imageId: $(this).attr('class'),
      message: temp[0].value};
    $.ajax({
      type: 'post',
      url: '/comments',
      data: newComment
    }).done(function(data) {
      var $p = $('<p>');
      console.log(data);
      $p.text(data.message);
      $('.' + data.imageId).append($p);
    });
  });
});
