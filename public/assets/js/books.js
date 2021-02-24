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

    $('.newBurgerForm').on('submit', function(event) {
        event.preventDefault();

        $('.burgersContainer').show();

        const newBook = {
            book_name: $('#newBurgerName').val().trim(),
            have_read: 0
        }

        console.log(newBook);

        $.ajax('/api/books/', {
            type: 'POST',
            data: newBook
        }).then(
            function() {
                location.reload();
            }
        )
    })
});