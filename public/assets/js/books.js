$(function () {
  $('#reading-tracker progress').val(Math.random() * 100); //finished books/total books
  $('.change-status').on('click', function () {
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
      function () {
        location.reload();
      }
    );
  });

  $('.newBookForm').on('submit', function (event) {
    event.preventDefault();
    const term = $('#newBookName').val();
    console.log(term);
    fetch(`/api/search/${term}`)
      .then(res => res.json())
      .then(booksData => {
        console.log(booksData);
        let html = '<ol>';
        for (let book of booksData.items) {
          if (!book.volumeInfo.title || !book.volumeInfo.authors || !book.volumeInfo.description) {
            continue;
          }
          const descriptionArray = book.volumeInfo.description.split('. ');
          const description = descriptionArray[0] + (descriptionArray.length > 1 ? ' ...' : '.');
          html += '<li>';
          if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
            html += `<img src='${book.volumeInfo.imageLinks.smallThumbnail}'>`;
          }
          html += `<p>Title: ${book.volumeInfo.title} <br> Author: ${book.volumeInfo.authors} <br> Description: ${description}</p>`;
          html += `<button data-bookid='${book.id}'>More Info</button>`;
          html += `<button data-isbn="${book.id}">Add to Bookshelf</button>`;
          html += '</li>';
        }
        html += '</ol>';
        $('#search-results').html(html).show();
        // eslint-disable-next-line no-use-before-define
        $('[data-bookid]').on('click', getBookId);
        $('#search-results [data-isbn]').on('click', addToBookshelf);
      });
  });

  function getBookId() {
    const id = $(this).attr('data-bookid');
    // eslint-disable-next-line no-use-before-define
    fetch(`/api/book/${id}`).then(res => res.json()).then(moreBookData);
  }
  function moreBookData(book) {
    const moreInfo = book.volumeInfo.infoLink;
    window.location.href = `${moreInfo}`;
  }


  function randomString() {
    let generatedRandom = "";
    var lowercaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const max = 4;
    const min = 2;
    const len = Math.random() * (max - min + 1) + min;
    for (let i = 0; i < len; i++) {
      const index = Math.floor(Math.random() * lowercaseArray.length);
      const letter = lowercaseArray[index];
      generatedRandom += letter;
    }
    return generatedRandom;
  }

  $('#random-button').on('click', function (event) {
    event.preventDefault();
    const term = randomString();
    fetch(`/api/search/${term}`)
      .then(res => res.json())
      .then(booksData => {
        console.log(booksData);
        if (!booksData.totalItems) {
          return $("#random-button").click();
        }
        let html = '';
        for (let book of booksData.items) {
          if (!book.volumeInfo.title || !book.volumeInfo.authors || !book.volumeInfo.description) {
            continue;
          }
          const descriptionArray = book.volumeInfo.description.split('. ');
          const description = descriptionArray[0] + (descriptionArray.length > 1 ? ' ...' : '.');
          html += '';
          if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
            html += `<img src='${book.volumeInfo.imageLinks.smallThumbnail}'>`;
          }
          html += `<p>Title: ${book.volumeInfo.title} <br> Author: ${book.volumeInfo.authors} <br> Description: ${description}</p>`;
          html += `<button data-isbn="${book.id}">Add to Bookshelf</button>`
          break;
        }
        if (!html) {
          return $("#random-button").click();
        }
        html = `${html}`;
        $("#shelvesModal .modal-body").html(html);
        $('#shelvesModal [data-isbn]').on('click', addToBookshelf);
        // $('#random-book').html(html).show();
        // eslint-disable-next-line no-use-before-define
      });

  });
  function addToBookshelf() {
    let isbn = $(this).attr("data-isbn");
    console.log(isbn);
  }
});


