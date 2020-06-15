const cards = document.querySelectorAll('.memory-card');

$('.memory-card').click(function() {
  $(this).toggleClass('flip');
});

