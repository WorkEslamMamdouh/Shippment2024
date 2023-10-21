
$(document).ready(() => {
    Home.InitalizeComponent();

});

namespace Home {
    var sys: SystemTools = new SystemTools();


    var Btn_Order_Saller: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;

    export function InitalizeComponent() {

        InitalizeControls();
        InitializeEvents();
         

    }
    function InitalizeControls() {
        Btn_Order_Saller = document.getElementById("Btn_Order_Saller") as HTMLButtonElement;
    }
    function InitializeEvents() {

        Btn_Order_Saller.onclick = Btn_Order_Saller_OnClick;

    }

    function Btn_Order_Saller_OnClick() {
         
        $('.Layout_Home').removeClass('display_none');
        OpenPagePartial("Order_Saller","Ord Saller");
    }


}
