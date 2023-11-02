$(document).ready(function () {
    View_Seller_Orders.InitalizeComponent();
});
var View_Seller_Orders;
(function (View_Seller_Orders) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Btn_ViewOrder;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Close_Loder();
        //Clear();
    }
    View_Seller_Orders.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Btn_ViewOrder = document.getElementById("Btn_ViewOrder");
    }
    function InitializeEvents() {
        Btn_ViewOrder.onclick = Btn_ViewOrder_onclick;
    }
    function Btn_ViewOrder_onclick() {
        //alert(100)
        OpenPagePartial("View_Order", "View Order");
    }
})(View_Seller_Orders || (View_Seller_Orders = {}));
//# sourceMappingURL=View_Seller_Orders.js.map