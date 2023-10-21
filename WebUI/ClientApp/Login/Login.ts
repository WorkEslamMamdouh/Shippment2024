
$(document).ready(() => { 
    Login.InitalizeComponent();
    
});

namespace Login {
    var sys: SystemTools = new SystemTools();


    var Submit_Login: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;

    export function InitalizeComponent() {
       
        InitalizeControls();
        InitializeEvents();


        Event_key('Enter', 'txtUsername', 'Submit_Login');

        Event_key('Enter', 'txtPassword', 'Submit_Login');

    }
    function InitalizeControls() {
        Submit_Login = document.getElementById("Submit_Login") as HTMLButtonElement;
        txtUsername = document.getElementById("txtUsername") as HTMLInputElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
    }
    function InitializeEvents() {
         
        Submit_Login.onclick = SubmitLogin;
        
    }

    function SubmitLogin() {

        debugger
        if (txtUsername.value.trim() == "" && txtPassword.value.trim() == "") {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
            return
        }
         
        if (txtUsername.value.trim() == "") {
            Errorinput(txtUsername);
            return
        }

        if (txtPassword.value.trim() == "") {
            Errorinput(txtPassword);
            return
        }

        $('.Layout_Home').removeClass('display_none');
        OpenPage("Home");
    }

     
}
