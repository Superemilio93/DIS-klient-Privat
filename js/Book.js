var urlBook = "http://localhost:8080/DIS_Server_Privat_war_exploded/book";

function getBooks() {
    var $booksTableBody = $("#booksTableBody");

    $.ajax({

        url: "http://localhost:8080/DIS_Server_Privat_war_exploded/book",
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status, xhr) {

            var dec = JSON.parse(encryptDecrypt(data));

            $("#booksTable").DataTable({
                data: dec,
                columns: [
                    { data : "bookID" },
                    { data : "title" },
                    { data : "version" },
                    { data : "ISBN" },
                    { data : "priceAB" },
                    { data : "priceSAXO" },
                    { data : "priceCDON" },
                    { data : "publisher" },
                    { data : "author" }
                ]
            });

            /*

            tests.forEach(function (book) {

                $booksTableBody.append(
                    "<tr>" +
                    "<td>" + book.bookID    + "</td>" +
                    "<td>" + book.title     + "</td>" +
                    "<td>" + book.version   + "</td>" +
                    "<td>" + book.ISBN      + "</td>" +
                    "<td>" + book.priceAB   + "</td>" +
                    "<td>" + book.priceSAXO + "</td>" +
                    "<td>" + book.priceCDON + "</td>" +
                    "<td>" + book.publisher + "</td>" +
                    "<td>" + book.author    + "</td>" +
                    "</tr>"
                );

            });
            */

        },
        error: function(a, b, c){
            console.log(a, b, c);
        }

    });
}

function encryptDecrypt(input) {
    var key = ['A', 'B', 'C']; //Can be any chars, and any size array
    var output = [];

    for (var i = 0; i < input.length; i++) {
        var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
        output.push(String.fromCharCode(charCode));
    }
    return output.join("");
}

