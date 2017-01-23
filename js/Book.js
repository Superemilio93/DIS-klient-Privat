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

