
$(document).ready(() => {
    View_Order.InitalizeComponent();

});

namespace View_Order {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var _Inv: Sls_Invoice = new Sls_Invoice();
    var _Invoices: Array<Sls_Invoice> = new Array<Sls_Invoice>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();

    var InvoiceID = 0;

    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();

        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        Display_information_Inv();
        Close_Loder();
    }
    function InitalizeControls() {

    }
    function InitializeEvents() {

    }

    function Display_information_Inv() {
        $("#View_Status" + _Inv.Status).addClass("is-active");

        $("#Name_Cust_View_Or").html("Name: " + _Inv.CustomerName);
        $("#Phone_View_Or").html("Phone: " + _Inv.CustomerMobile1 + " & " + _Inv.CustomerMobile2);
        $("#RefNo_TrNo_View_Or").html(" RefNo ( " + _Inv.RefNO + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TrNo ( " + _Inv.TrNo+" )");
        $("#Coun_Total_View_Or").html(" Counter Item ( " + _Inv.ItemCount + "  ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total ( " + _Inv.NetAfterVat + "  )");

    }

}
