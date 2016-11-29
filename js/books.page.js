var urlBook = "http://localhost:8080/DIS_Server_Privat_war_exploded/book";



$(document).ready(function () {

    var $booksTableBody = $("#booksTableBody");

    $.ajax({

        url: "http://localhost:8080/DIS_Server_Privat_war_exploded/book",
        method: "GET",


        dataType: "json",
        contentType: "application/json",
        success: function (data, status, xhr) {

            var dec = encryptDecrypt(data);
            var tests = JSON.parse(dec);



            tests.forEach(function (test) {

                $booksTableBody.append(
                    "<tr>" +
                    "<td>" + test.bookID    + "</td>" +
                    "<td>" + test.title     + "</td>" +
                    "<td>" + test.version   + "</td>" +
                    "<td>" + test.ISBN      + "</td>" +
                    "<td>" + test.priceAB   + "</td>" +
                    "<td>" + test.priceSAXO + "</td>" +
                    "<td>" + test.priceCDON + "</td>" +
                    "<td>" + test.publisher + "</td>" +
                    "<td>" + test.author    + "</td>" +



                    "</tr>"
                );

            });


        },
        error: function(a, b, c){
            console.log(a, b, c);
        }

    });
});

function encryptDecrypt(input) {
    var key = ['A', 'B', 'C']; //Can be any chars, and any size array
    var output = [];

    for (var i = 0; i < input.length; i++) {
        var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
        output.push(String.fromCharCode(charCode));
    }
    return output.join("");
}


