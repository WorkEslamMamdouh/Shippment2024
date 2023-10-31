$(document).ready(function () {
    Processing_Order.InitalizeComponent();
});
var Processing_Order;
(function (Processing_Order) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Btn_ViewOrder;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Close_Loder();
        //Clear();
    }
    Processing_Order.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Btn_ViewOrder = document.getElementById("Btn_ViewOrder");
    }
    function InitializeEvents() {
        Btn_ViewOrder.onclick = Btn_ViewOrder_onclick;
    }
    function Btn_ViewOrder_onclick() {
        alert(100);
        OpenPagePartial("View_Order", "View Order");
    }
})(Processing_Order || (Processing_Order = {}));
//# sourceMappingURL=Processing_Order.js.map