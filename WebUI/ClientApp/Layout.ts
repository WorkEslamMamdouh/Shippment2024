
$(document).ready(() => {
    try {

        Layout.InitalizeComponent();
    } catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");

    }
});

namespace Layout {
    var sys: SystemTools = new SystemTools();   

        
    var Back_Page: HTMLButtonElement;


    export function InitalizeComponent() {
        debugger
        GetAllPages();
        InitalizeControls();
        InitializeEvents();  
    }  

    function InitalizeControls() { 
        Back_Page = document.getElementById("Back_Page") as HTMLButtonElement;
    }
    function InitializeEvents() {
         
        Back_Page.onclick = Back_Page_Partial;

    }


   
     
}
