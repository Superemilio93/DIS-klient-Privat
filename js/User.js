var urlUser = "http://localhost:8080/DIS_Server_Privat_war_exploded/user";

function login() {
    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    var usertype = $("#inputUsertype").val();

    $.ajax({
        url: urlUser + "/login",
        method: "POST",
        data: encryptDecrypt(JSON.stringify({
            "username" : username,
            "password" : password
        })),
        success: function(data) {
            var user = encryptDecrypt(data);

            localStorage.clear('user');
            localStorage.setItem('user', user);

            /*
            var user = JSON.parse(localStorage.getItem('user'));
            alert(user.token);
            alert(user.usertype);
            */

           // window.location.replace("loginMenuAdmin.html");

            var userMenu = JSON.parse(user);
            if (userMenu.usertype == 1) {
                alert("Velkommen Admin");
                window.location.replace("loginMenuAdmin.html");
            } else {
                alert("Velkommen bruger");
                window.location.replace("loginMenuUser.html");
            }
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

function editUser() {
    var firstname = $("#inputFirstname").val();
    var lastname = $("#inputLastname").val();
    var username = $("#inputUsername").val();
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();

    $.ajax({
        url: urlUser + "/",
        type: "PUT",
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











function deleteUser(row) {

    var sessionUser = JSON.parse(localStorage.getItem('user'));

    var user = row.data();

    $.ajax({
        url: urlUser + "/" + user.userID,
        type: "DELETE",
        headers: {
            "authorization" : sessionUser.token
        },
        success: function(data) {
            $('#usersTable').DataTable().row( $(row).parents('tr') ).remove().draw();
            alert("Bruger " + user.userName + " er nu slettet")

        },
        error: function(data) {
            alert(data.message);
        }
    });
}




function getUsers() {

    var sessionUser = JSON.parse(localStorage.getItem('user'));

    $.ajax({
        url: urlUser + "/",
        type: "GET",
        headers: {
            "authorization" : sessionUser.token
        },
        success: function(data) {
            var dec = JSON.parse(encryptDecrypt(data));

            $("#usersTable").DataTable({
                data: dec,
                columns: [
                    { data : "userID" },
                    { data : "firstName" },
                    { data : "lastName" },
                    { data : "userName" },
                    { data : "email" },
                    { data : "password" },
                    { data : "userType" },
                    { defaultContent: "<button class='btn btn-danger' id='deleteButton'>Slet</button>"}
                ]
            });

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

