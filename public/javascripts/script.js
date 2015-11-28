$(function() {
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

    });
  });
});
