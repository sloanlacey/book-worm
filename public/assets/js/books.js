$(function() {
  $('.change-status').on('click', function() {
    const id = $(this).data('id');

    const bookStatus = {
      // eslint-disable-next-line camelcase
      have_read: true
    };

    console.log(bookStatus);

    $.ajax('/api/books/' + id, {
      type: 'PUT',
      data: bookStatus
    }).then(
      function() {
        location.reload();
      }
    );
  });

  $('.newBookForm').on('submit', function(event) {
    event.preventDefault();
    const term = $('#newBookName').val();
    fetch(`/api/search/${term}`)
      .then(res => res.json())
      .then(booksData => {
        console.log(booksData);
        let html = '<ol>';
        for (let book of booksData.items) {
          html += `<li>${book.volumeInfo.title}</li>`;
        }
        html += '</ol>';
        $('#search-results').html(html).show();
      });
  });
});