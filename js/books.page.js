$(document).ready(function () {

    var $booksTableBody = $("#booksTableBody");

    $.ajax({
        url: "http://localhost:8080/server2_0_war_exploded/book",
        method: "GET",


        dataType: "json",
        contentType: "application/json",
        success: function (books, status, xhr) {

            books.forEach(function (book) {

                $booksTableBody.append(
                    "<tr>" +
                    "<td>" + books.Title + "</td>" +
                    "</tr>"
                );

            });

        },
        error: function(a, b, c){
            console.log(a, b, c);
        }

    });
});
