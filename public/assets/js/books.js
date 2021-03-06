$(function () {

  $('#reading-tracker progress').val(Math.random() * 100); 
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



  $('.newBookForm').on('submit', async function (event) {
    event.preventDefault();
    const term = $('#newBookName').val();
    console.log(term);
    fetch(`/api/search/${term}`)
      .then(res => res.json())
      .then(async booksData => {
        console.log(booksData);
        const bookId = booksData.items[0].id;
        console.log("book id is: ", bookId)
        await fetch(`/api/bookshelf/${bookId}`, {
          method: 'POST'
        }).catch((err) => {
          console.log(err);
          alert("Something went wrong! Book not saved");
        })
        let html = '<div class="row" style="justify-content: center; text-align: center;"> <div class="col-sm-6 col-md-6 col-lg-6" style="background-color: #f5f5f5; border-radius: 25px; margin-bottom: 25px; opacity: .95;"> <ol>';
        for (let book of booksData.items) {
          if (!book.volumeInfo.title || !book.volumeInfo.authors || !book.volumeInfo.description) {
            continue;
          }
          const descriptionArray = book.volumeInfo.description.split('. ');
          const description = descriptionArray[0] + (descriptionArray.length > 1 ? ' ...' : '.');
          html += '<li>';
          if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
            html += `<img src='${book.volumeInfo.imageLinks.smallThumbnail}' style="padding: 10px;">`;
          }
          html += `<p><span class="list-spans"><strong>Title:</strong> ${book.volumeInfo.title}</span> <br> <span class="list-spans"><strong>Author:</strong> ${book.volumeInfo.authors}</span> <br> <span class="list-spans"><strong>Description:</strong> ${description}</p></span>`;
          html += `<button data-isbn="${book.id}" class="bookshelf-btn btn" style="margin-left: 5px;">Move to Finished Books</button>`;
          html += '</li>';
        }
        html += '</ol> </div> </div>';
        $('#search-results').html(html).show();
        // eslint-disable-next-line no-use-before-define
        $('[data-bookclass]').on('click', getBookId);
        // eslint-disable-next-line no-use-before-define
        //$('[data-isbn]').on('click', addToBookshelf);
        $("#bookshelf-body").append(html);
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
            html += `<div class="row" style="justify-content: center; text-align: center;"> <div class="col-sm-6" style="background-color: #f5f5f5; border-radius: 25px; margin-top: 25px; margin-bottom: 25px;"><img src='${book.volumeInfo.imageLinks.smallThumbnail}' style="margin-top: 25px; margin-bottom: 25px;">`;
          }
          html += `<p><strong>Title:</strong> ${book.volumeInfo.title} <br> <strong>Author:</strong> ${book.volumeInfo.authors} <br> <strong>Description:</strong> ${description}</p>`;
          html += `<button class='add-to-finished bookshelf-btn btn' data-isbn='${book.id}' style="margin-bottom: 25px;">Move to Finished Books</button></div> </div>`;
          break;
        }
        if (!html) {
          return $('#random-button').click();
        }
        html = `${html}`;
        $('.random-body').html(html);
        //$('.add-to-bookshelf').on('click', addToBookshelf);
        // eslint-disable-next-line no-use-before-define
        // $('#random-save').on('click', addToBookshelf);
        $("#bookshelf-body").append(html);
        // $('#random-book').html(html).show();
        // eslint-disable-next-line no-use-before-define      
      });
     
  });


  $('#tracker-btn').on('click', function(event){
    event.preventDefault()
    fetch('/api/chart').then(chartData =>{
      console.log(chartData)

    const value = $('#value').val();
    const value2 = $('#value2').val();

    //const value3 = $('#value3').val();
    
    const chartPercent = `&chd=a%3A${value}%7C${value2}`;
    const chartSize ='&chs=700x190';
    //const chartTxt = '&chl=Hi|From|data|api';
    //const word = $('#word').text();
    //const word2 = $('#word2').text();
    //const word3 = $('#word3').text();
    //chartTxt =`&chl=${word}|${word2}|${word3}`
    const chartColor = '&chco=CFB948,E3E3E3';
    const chartURL = `https://image-charts.com/chart?${chartPercent}${chartSize}${chartColor}&cht=bhs`
    //const chartEx = 'https://image-charts.com/chart?chd=a%3A50%7C100&chs=700x80&cht=bhs'

    const chart = $("<img id ='reading-tracker-modal' style='height: 250px; width: 450px;'>");
    chart.attr("src", chartURL);
    $(".reading-tracker-div").append(chart);
    })
  });
});



