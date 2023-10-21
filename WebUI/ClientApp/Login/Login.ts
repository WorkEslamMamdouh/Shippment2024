
$(document).ready(() => { 
    Login.InitalizeComponent();
    
});

namespace Login {
    var sys: SystemTools = new SystemTools();


    var Submit_Login: HTMLButtonElement;

    export function InitalizeComponent() {
       
        InitalizeControls();
        InitializeEvents();
    }
    function InitalizeControls() {
        Submit_Login = document.getElementById("Submit_Login") as HTMLButtonElement;
    }
    function InitializeEvents() {
         
        Submit_Login.onclick = SubmitLogin;
        
    }

    function SubmitLogin() {

        debugger
        $('.Layout_Home').removeClass('display_none');
        OpenPage("Home");
    }

     
}
