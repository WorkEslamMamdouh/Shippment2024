
  

function onchangeFile() {
    debugger
    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];

    if (file != undefined && file != 'undefined' ) {
        //$("#fileName").val("" + file.name + "")

        $("#BtnUpload").removeClass("display_none"); 
        $("#fileUploadInput").attr("style", "background: #0ea300;color: aliceblue;font-weight: bold;");
         

        setTimeout(function () {
            $('#BtnUpload').click();
        }, 1000);
    }
    else {
        $("#BtnUpload").addClass("display_none");
        $("#fileUploadInput").attr("style", "background: #0051a3;color: aliceblue;font-weight: bold;");

        $("#_ImageUpload").attr('src', '');
    }
   
}


function GenerateUUID() {
    return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function uploadImg() {
    debugger
    $("#fileName").val(GenerateUUID());
    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];
    debugger 
    if (file != undefined && file != 'undefined' ) {


        var formData = new FormData();
        formData.append("fileUpload", file);
        debugger
  
        //path = 'D:/Ahmed_Work/Kids4/WebUI/Upload_Img/';
        path = $('#Path_Save').val();
        formData.append("Path_Url", path);

        formData.append("fileName", $('#fileName').val() + fileInput.accept);

         
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/FileUpload/Upload"); // Replace with your server endpoint URL
        xhr.onload = function () {
            if (xhr.status === 200) {
                // File uploaded successfully
                console.log("File uploaded!");
                //alert("File uploaded!")
                $('#Btn_fileUpload').click();

                //$("#_ImageUpload").html('<img id="" class="w-100" src="/Upload_Img/' + $('#fileName').val() + fileInput.accept + '" />');
                //$("#_ImageUpload").html('<img id="" class="w-100" src="' + $('#Path_Upload').val()+ $('#fileName').val() + fileInput.accept + '" />');

            } else {
                // File upload failed
                console.error("File upload failed!");
                alert("File upload failed!")
            }
        };
        xhr.send(formData);
    }
    else {
        
        alert("You Must Select a File")
    }
   
}

 
 