$(function() {
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
      console.log($(this));
      $p.text(data.message);
      $('.' + data.imageId).append($p);
    });
  });
});
