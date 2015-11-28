$(function() {
  console.log('I\'m here');
  $('form').on('submit', function(event) {
    var newComment = $(this).serializeArray();
    $.ajax({
      type: 'post'
      url: '/comments'
      data: newComment[0]
    }).done(function(data) {

    });
  });
});
