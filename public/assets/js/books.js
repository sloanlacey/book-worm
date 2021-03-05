$(function () {
  async function addToBookshelf(){
    try {
      console.log("We hit add to bookshelf");
      const id = $(this).attr('data-isbn');
      await fetch(`/api/bookshelf/${id}`, {
        method: 'POST'
      })
    } catch(err){
      console.log(err);
      alert("Something went wrong! Book not saved");
    }
  }
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
          html += `<p><span class="list-spans">Title: ${book.volumeInfo.title}</span> <br> <span class="list-spans">Author: ${book.volumeInfo.authors}</span> <br> <span class="list-spans">Description: ${description}</p></span>`;
          html += `<button data-bookclass='${book.id}'>More Info</button>`;
          html += `<button data-isbn="${book.id}">Add to Bookshelf</button>`;
          html += '</li>';
        }
        html += '</ol>';
        $('#search-results').html(html).show();
        // eslint-disable-next-line no-use-before-define
        $('[data-bookid]').on('click', getBookId);
        // eslint-disable-next-line no-use-before-define
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
    let generatedRandom = '';
    var lowercaseArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
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
          return $('#random-button').click();
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
          html += `<button class='add-to-bookshelf' data-isbn='${book.id}'>Add to Bookshelf</button>`;
          break;
        }
        if (!html) {
          return $('#random-button').click();
        }
        html = `${html}`;
        $('.random-body').html(html);
        $('.add-to-bookshelf').on('click', addToBookshelf);
        // eslint-disable-next-line no-use-before-define
        $('#random-save').on('click', addToBookshelf);
        // $('#random-book').html(html).show();
        // eslint-disable-next-line no-use-before-define
      
      });
  });


  $('#tracker-btn').on('click', function(event){
    event.preventDefault()
    fetch('/api/chart').then(chartData =>{
      console.log(chartData)
    const chartType = '?cht=p3';
    //const chartPercent = '&chd=t:30,20,10,40';
    const value = $('#value').val();
    const value2 = $('#value2').val();
    const value3 = $('#value3').val();
    const chartPercent = `&chd=t:${value},${value2}`
    const chartSize ='&chs=700x190';
    //const chartTxt = '&chl=Hi|From|data|api';
    const word = $('#word').text();
    const word2 = $('#word2').text();
    const word3 = $('#word3').text();
    chartTxt =`&chl=${word}|${word2}|${word3}`
    const chartColor = '&chco=EA469E|03A9F4|FFC00C|FF2027';
    const chartURL = `https://image-charts.com/chart${chartType}${chartPercent}${chartSize}${chartTxt}${chartColor}`
    //const chartEx = 'https://image-charts.com/chart?cht=p3&chd=t:30,20,10,40&chs=700x190'

    const chart = $('<img>');
    chart.attr("src", chartURL);
    $("#reading-tracker").append(chart);
    })
  });
});


