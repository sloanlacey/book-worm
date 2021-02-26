$(function() {
    $('.change-status').on('click', function(event) {
        const id = $(this).data('id');

        const bookStatus = {
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
        )
    })

    $('.newBookForm').on('submit', function(event) {
        event.preventDefault();
        const term = $("#searchBookName").val();
        fetch(`/search/${term}`)
        .then(res => res.json())
        .then(json => {
            let html = "<ol>";
            for (let book of json.items) {
                const title = `${book.volumeInfo.title}`;
                html += `<li>${title}</li>`
            }
            html += "</ol>";
            $('#search-results').html(html).show();
        })
    })
});
