var urlUser = "http://localhost:8080/DIS_Server_Privat_war_exploded/user";


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
            window.location.replace("https://www.google.dk");
            window.open ("https://www.google.dk");
            alert("Test")
            localStorage.setItem('token', data);
            window.location.replace("loginMenuAdmin.html");

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