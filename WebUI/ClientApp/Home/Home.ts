
$(document).ready(() => {
    Home.InitalizeComponent();

});

namespace Home {
    var sys: SystemTools = new SystemTools();


    var btn_Logout: HTMLButtonElement;
    var Btn_Order_Saller: HTMLButtonElement;

    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;

    export function InitalizeComponent() {

        InitalizeControls();
        InitializeEvents();
         

    }
    function InitalizeControls() {
        btn_Logout = document.getElementById("btn_Logout") as HTMLButtonElement;
        Btn_Order_Saller = document.getElementById("Btn_Order_Saller") as HTMLButtonElement;
    }
    function InitializeEvents() {

        btn_Logout.onclick = btn_LogoutUesr;
        Btn_Order_Saller.onclick = Btn_Order_Saller_OnClick;

    }


    function btn_LogoutUesr() {

        $('.Layout_Home').addClass('display_none');
        OpenPage("Login");

    }

    function Btn_Order_Saller_OnClick() {
         
        $('.Layout_Home').removeClass('display_none');
        OpenPagePartial("Order_Saller","Ord Saller");
    }


}
