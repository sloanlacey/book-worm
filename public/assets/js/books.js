$(function() {
  $('#reading-tracker progress').val(Math.random()*100); //finished books/total books
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
          if(!book.volumeInfo.title || !book.volumeInfo.authors || !book.volumeInfo.description) {
            continue;
          }
          const descriptionArray = book.volumeInfo.description.split('. ');
          const description = descriptionArray[0] + (descriptionArray.length > 1? ' ...': '.');
          html += '<li>';
          if(book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail){
            html += `<img src='${book.volumeInfo.imageLinks.smallThumbnail}'>`;
          }
          html += `<p>Title: ${book.volumeInfo.title} <br> Author: ${book.volumeInfo.authors} <br> Description: ${description}</p>`;
          html += `<button data-bookid='${book.id}'>More Info</button></li>`;
        }
        html += '</ol>';
        $('#search-results').html(html).show();
        // eslint-disable-next-line no-use-before-define
        $('[data-bookid]').on('click', getBookId);
      });
  });

  function getBookId(){
    const id = $(this).attr('data-bookid');
    // eslint-disable-next-line no-use-before-define
    fetch(`/api/book/${id}`).then(res => res.json()).then(moreBookData);
  }
  function moreBookData(book) {
    const moreInfo = book.volumeInfo.infoLink;
    window.location.href =`${moreInfo}`;
  }
});

$('.openLibraryForm').on('submit', function(event) {
  event.preventDefault();
  const term = $('#readBook').val();
  fetch(`/api/title/${term}`)
    .then(res => res.json())
    .then(booksData => {
      console.log(booksData);
      let html = '<ol>';
      for (let book of booksData.docs) {
        if(!book.docs.title || !book.docs.author_name || !book.docs.subject || !book.docs.has_fulltext) {
          continue;
        }
        html += `<p>Title: ${book.docs.title} <br> Author: ${book.docs.author_name} <br> Subject: ${book.docs.subject}</p>`;
        html += `<button data-readbook='${book.docs.has_fulltext}'>Read Now!</button></li>`;
      }
      html += '</ol>';
      $('#search-results-2').html(html).show();
      // eslint-disable-next-line no-use-before-define
      $('[data-readbook]').on('click', readBook);
    });
});

function readBook(book) {
  const readThisBook = book.docs.isbn;
  window.location.href =`https://openlibrary.org/isbn/${readThisBook}`;
}

