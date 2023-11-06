
$(document).ready(() => {
    View_Order.InitalizeComponent();

});

namespace View_Order {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _USER: Array<G_USERS> = new Array<G_USERS>();
    var _Inv: Vnd_Inv_SlsMan = new Vnd_Inv_SlsMan();
    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();

    var btn_Delete: HTMLButtonElement;
    var btn_freeze: HTMLButtonElement;
    var btn_Edit_Order: HTMLButtonElement;
    var btn_Confirm: HTMLButtonElement;
    var btn_Open_Location: HTMLButtonElement;
    var btn_Print: HTMLButtonElement;
    var btn_Delivery_Order: HTMLButtonElement;
    var btn_Deliver_shipment: HTMLButtonElement;
    var btn_Deliver_Customer: HTMLButtonElement;
    var btn_Receiving_Order: HTMLButtonElement;
    var btn_Active: HTMLButtonElement;


    var InvoiceID = 0;

    export function InitalizeComponent() {

        let _USERS = GetGlopelDataUser()
        _USER = _USERS.filter(x => x.USER_CODE == SysSession.CurrentEnvironment.UserCode)

        InitalizeControls();
        InitializeEvents();

        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        Display_information_Inv();
        Display_Role_User();
        Close_Loder();
    }
    function InitalizeControls() {

        btn_Delete = document.getElementById('btn_Delete') as HTMLButtonElement;
        btn_freeze = document.getElementById('btn_freeze') as HTMLButtonElement;
        btn_Edit_Order = document.getElementById('btn_Edit_Order') as HTMLButtonElement;
        btn_Confirm = document.getElementById('btn_Confirm') as HTMLButtonElement;
        btn_Open_Location = document.getElementById('btn_Open_Location') as HTMLButtonElement;
        btn_Print = document.getElementById('btn_Print') as HTMLButtonElement;
        btn_Delivery_Order = document.getElementById('btn_Delivery_Order') as HTMLButtonElement;
        btn_Deliver_shipment = document.getElementById('btn_Deliver_shipment') as HTMLButtonElement;
        btn_Deliver_Customer = document.getElementById('btn_Deliver_Customer') as HTMLButtonElement;
        btn_Receiving_Order = document.getElementById('btn_Receiving_Order') as HTMLButtonElement;
        btn_Active = document.getElementById('btn_Active') as HTMLButtonElement;
    }
    function InitializeEvents() {
        btn_Delete.onclick = btn_Delete_onclick
        btn_freeze.onclick = btn_freeze_onclick
        btn_Edit_Order.onclick = btn_Edit_Order_onclick
        btn_Confirm.onclick = btn_Confirm_onclick
        btn_Open_Location.onclick = btn_Open_Location_onclick
        btn_Print.onclick = btn_Print_onclick
        btn_Delivery_Order.onclick = btn_Delivery_Order_onclick
        btn_Deliver_shipment.onclick = btn_Deliver_shipment_onclick
        btn_Deliver_Customer.onclick = btn_Deliver_Customer_onclick
        btn_Receiving_Order.onclick = btn_Receiving_Order_onclick
        btn_Active.onclick = btn_Active_onclick
    }

    function Display_information_Inv() {
        $("._clearSta").removeClass("is-active");
        $("#View_Status" + _Inv.Status).addClass("is-active");

        $("#Name_Cust_View_Or").html("Name: " + _Inv.CustomerName);
        $("#Phone_View_Or").html("Phone: " + _Inv.CustomerMobile1 + " & " + _Inv.CustomerMobile2);
        $("#RefNo_TrNo_View_Or").html(" RefNo ( " + _Inv.RefNO + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TrNo ( " + _Inv.TrNo + " )");
        $("#Coun_Total_View_Or").html(" Counter Item ( " + _Inv.ItemCount + "  ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total ( " + _Inv.NetAfterVat + "  )");

    }

    function Display_Role_User() {
        $(".Status" + _USER[0].USER_TYPE).removeClass('display_none')

        if (_Inv.Status == 0) { //freeze
            $("#btn_Active").removeClass("display_none")
            $("#btn_freeze").addClass("display_none")
        }
        else { //Active
            $("#btn_Active").addClass("display_none")
            $("#btn_freeze").removeClass("display_none")
        }

    }

    //******************************************************* Events Buttons ************************************

    function btn_Delete_onclick() {
         UpdateInvStatus(InvoiceID, 0, -1, 'Delete Invoice ( ' + _Inv.RefNO + ' )') 
            $('#Back_Page').click();
       
    }
    function btn_freeze_onclick() {
    
         UpdateInvStatus(InvoiceID, 0, 0, 'Freeze Invoice ( ' + _Inv.RefNO + ' )') 
         
            $("#btn_Active").removeClass("display_none")
            $("#btn_freeze").addClass("display_none")
        
    }
    function btn_Active_onclick() {
        UpdateInvStatus(InvoiceID, 0, 1, 'Active Invoice ( ' + _Inv.RefNO + ' )') 
            $("#btn_Active").addClass("display_none")
            $("#btn_freeze").removeClass("display_none")
       

    }

    function btn_Edit_Order_onclick() {

    }
    function btn_Confirm_onclick() {

    }
    function btn_Open_Location_onclick() {

    }
    function btn_Print_onclick() {

    }
    function btn_Delivery_Order_onclick() {

    }
    function btn_Deliver_shipment_onclick() {

    }
    function btn_Deliver_Customer_onclick() {

    }
    function btn_Receiving_Order_onclick() {

    }


}
