
  

function onchangeFile() {
    debugger
    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];

    if (file != undefined && file != 'undefined' ) {
        //$("#fileName").val("" + file.name + "")

        $("#BtnUpload").removeClass("display_none"); 
        $("#fileUploadInput").attr("style", "background: #0ea300;color: aliceblue;font-weight: bold;");


        $("#" + $("#IdName_View_Img").val() + "").attr('src', '/images/Loder.gif');
        setTimeout(function () {
            $('#BtnUpload').click();
        }, 100);
    }
    else {
        $("#BtnUpload").addClass("display_none");
        $("#fileUploadInput").attr("style", "background: #0051a3;color: aliceblue;font-weight: bold;");

        $("#_ImageUpload").attr('src', '');
    }
   
}

 


function uploadImg() {

  

    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];
    debugger 
    if (file != undefined && file != 'undefined' ) {


        var formData = new FormData();
        formData.append("fileUpload", file);
        debugger
  
        //path = 'D:/Ahmed_Work/Kids4/WebUI/Upload_Img/';
        if ($('#Name_Folder').val().trim() == '') {
            path = $('#Path_Save').val();
        }
        else {
            path = $('#Path_Save').val() + '/' + $('#Name_Folder').val().trim() + '/';
        }
      
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

                debugger
                $("#" + $("#IdName_View_Img").val() + "").attr('src', $("#UrlImg").val());

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

 
 