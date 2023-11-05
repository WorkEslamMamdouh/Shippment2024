$(document).ready(function () {
    View_Order.InitalizeComponent();
});
var View_Order;
(function (View_Order) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Inv = new Vnd_Inv_SlsMan();
    var _Invoices = new Array();
    var _InvoiceItems = new Array();
    var InvoiceID = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"));
        _Inv = _Invoices.filter(function (x) { return x.InvoiceID == InvoiceID; })[0];
        Display_information_Inv();
        Close_Loder();
    }
    View_Order.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitializeEvents() {
    }
    function Display_information_Inv() {
        $("#View_Status" + _Inv.Status).addClass("is-active");
        $("#Name_Cust_View_Or").html("Name: " + _Inv.CustomerName);
        $("#Phone_View_Or").html("Phone: " + _Inv.CustomerMobile1 + " & " + _Inv.CustomerMobile2);
        $("#RefNo_TrNo_View_Or").html(" RefNo ( " + _Inv.RefNO + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TrNo ( " + _Inv.TrNo + " )");
        $("#Coun_Total_View_Or").html(" Counter Item ( " + _Inv.ItemCount + "  ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total ( " + _Inv.NetAfterVat + "  )");
    }
})(View_Order || (View_Order = {}));
//# sourceMappingURL=View_Order.js.map