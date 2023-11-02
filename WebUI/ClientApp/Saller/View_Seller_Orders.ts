
$(document).ready(() => {
    View_Seller_Orders.InitalizeComponent();

});

namespace View_Seller_Orders {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
     

    var Btn_ViewOrder: HTMLButtonElement;
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();

        Close_Loder();
        //Clear();
    }
    function InitalizeControls() {
        Btn_ViewOrder = document.getElementById("Btn_ViewOrder") as HTMLButtonElement;
         
    }
    function InitializeEvents() {

       
        Btn_ViewOrder.onclick = Btn_ViewOrder_onclick;
         
    }

    function Btn_ViewOrder_onclick() {
        //alert(100)
        OpenPagePartial("View_Order", "View Order");
    }
    
}
