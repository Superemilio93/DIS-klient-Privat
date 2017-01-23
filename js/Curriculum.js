var urlCurriculum = "http://localhost:8080/DIS_Server_Privat_war_exploded/curriculum/";


function getCurriculum() {
    var $curriculumTableBody = $("#curriculumTableBody");

    $.ajax({

        url: urlCurriculum,
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data, status, xhr) {

            var dec = JSON.parse(encryptDecrypt(data));

            $("#curriculumTable").DataTable({
                data: dec,
                columns: [
                    { data : "curriculumID" },
                    { data : "school" },
                    { data : "education" },
                    { data : "semester" }

                ]
            });

        },
        error: function(a, b, c){
            console.log(a, b, c);
        }

    });
}

function findBook() {

    var selectEducation = $('#selectEducation');
    var selectSemester = $('#selectSemester');
    var curriculumId;

    if(selectEducation.val() == 1) {
        if(selectSemester.val() == 1) {
            curriculumId = 1;
        } else if(selectSemester.val() == 2) {
            curriculumId = 2;
        } else if(selectSemester.val() == 3) {
            curriculumId = 3;
        }
    } else if (selectEducation.val() == 2) {
        if(selectSemester.val() == 1) {
            curriculumId = 4;
        } else if(selectSemester.val() == 2) {
            curriculumId = 5;
        } else if(selectSemester.val() == 3) {
            curriculumId = 6;
        }
    }

    $.ajax({
            url: urlCurriculum + curriculumId + "/books",
        method: "GET",
        dataType: "json",
        contentType: "application/json",
            success: function (data) {
                var dec = JSON.parse(encryptDecrypt(data));

                $("#findBookTable").DataTable({
                    data: dec,
                    bDestroy: true,
                    columns: [
                        {data: "bookID"},
                        {data: "ISBN"},
                        {data: "publisher"},
                        {data: "title"},
                        {data: "author"},
                        {data: "priceAB"},
                        {data: "priceSAXO"},
                        {data: "priceCDON"},
                        {data: "version"}
                    ]
                });

            },
            error: function (data) {
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
