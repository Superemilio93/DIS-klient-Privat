var urlUser = "http://localhost:8080/DIS_Server_Privat_war_exploded/user";
var urlBook = "http://localhost:8080/DIS_Server_Privat_war_exploded/book";
var urlCurriculum = "http://localhost:8080/DIS_Server_Privat_war_exploded/curriculum";

function login() {
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    $.ajax({
        url: urlUser + "/login",
        type: "POST",
        data: encryptDecrypt(JSON.stringify({
            "username" : username,
            "password" : password
        })),
        success: function(data) {
            alert(data);

            localStorage.setItem('token', data);

            getUsers();
        },
        error: function(data) {
            alert(data.message);
        }
    });
}

function addUser() {
    var firstname = $("#inputFirstname").val();
    var lastname = $("#inputLastname").val();
    var username = $("#inputUsername").val();
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();

    $.ajax({
        url: urlUser + "/",
        type: "POST",
        data: encryptDecrypt(JSON.stringify({
            "firstName" : firstname,
            "lastName" : lastname,
            "userName" : username,
            "email" : email,
            "password" : password
        })),
        success: function(data) {
            alert(data.message);
        },
        error: function(data) {
            alert(data.message);
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