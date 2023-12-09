﻿
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

    var btn_RetrunSeller: HTMLButtonElement;
    var btn_Delete: HTMLButtonElement;
    var btn_freeze: HTMLButtonElement;
    var btn_Edit_Order: HTMLButtonElement;
    var btn_Confirm: HTMLButtonElement;
    var btn_Open_Location: HTMLButtonElement;
    var btn_Print: HTMLButtonElement;
    var btn_Delivery_Order: HTMLButtonElement;
    var btn_Deliver_shipment: HTMLButtonElement;
    var btn_Order_shipment: HTMLButtonElement;
    var btn_Deliver_Customer: HTMLButtonElement;
    var btn_Receiving_Order: HTMLButtonElement;
    var btn_Active: HTMLButtonElement;
    var btn_Return: HTMLButtonElement;
    var btn_Return_All_Order: HTMLButtonElement;


    var InvoiceID = 0;
    var Flage_Back = 0;

    export function InitalizeComponent() {

        let _USERS = GetGlopelDataUser()
        _USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase())

        InitalizeControls();
        InitializeEvents();

        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        Display_information_Inv();
        Display_Role_User();

        Close_Loder();

        SetRefresh(GetModuleCode())
    }
    function SetRefresh(moduleCode: string) {

        $(document).on('click', '.Refresh_' + moduleCode, function () {
            Dis_Refrsh();
            // Shows an alert when a dynamically created button is clicked
        });
    }
    function InitalizeControls() {

        btn_RetrunSeller = document.getElementById('btn_RetrunSeller') as HTMLButtonElement;
        btn_Delete = document.getElementById('btn_Delete') as HTMLButtonElement;
        btn_freeze = document.getElementById('btn_freeze') as HTMLButtonElement;
        btn_Edit_Order = document.getElementById('btn_Edit_Order') as HTMLButtonElement;
        btn_Confirm = document.getElementById('btn_Confirm') as HTMLButtonElement;
        btn_Open_Location = document.getElementById('btn_Open_Location') as HTMLButtonElement;
        btn_Print = document.getElementById('btn_Print') as HTMLButtonElement;
        btn_Delivery_Order = document.getElementById('btn_Delivery_Order') as HTMLButtonElement;
        btn_Deliver_shipment = document.getElementById('btn_Deliver_shipment') as HTMLButtonElement;
        btn_Order_shipment = document.getElementById('btn_Order_shipment') as HTMLButtonElement;
        btn_Deliver_Customer = document.getElementById('btn_Deliver_Customer') as HTMLButtonElement;
        btn_Receiving_Order = document.getElementById('btn_Receiving_Order') as HTMLButtonElement;
        btn_Active = document.getElementById('btn_Active') as HTMLButtonElement;
        btn_Return = document.getElementById('btn_Return') as HTMLButtonElement;
        btn_Return_All_Order = document.getElementById('btn_Return_All_Order') as HTMLButtonElement;
    }
    function InitializeEvents() {
        btn_RetrunSeller.onclick = btn_RetrunSeller_onclick
        btn_Delete.onclick = btn_Delete_onclick
        btn_freeze.onclick = btn_freeze_onclick
        btn_Edit_Order.onclick = btn_Edit_Order_onclick
        btn_Confirm.onclick = btn_Confirm_onclick
        btn_Open_Location.onclick = btn_Open_Location_onclick
        btn_Print.onclick = btn_Print_onclick
        btn_Delivery_Order.onclick = btn_Delivery_Order_onclick
        btn_Deliver_shipment.onclick = btn_Deliver_shipment_onclick
        btn_Order_shipment.onclick = btn_Order_shipment_onclick
        btn_Deliver_Customer.onclick = btn_Deliver_Customer_onclick
        btn_Receiving_Order.onclick = btn_Receiving_Order_onclick
        btn_Active.onclick = btn_Active_onclick
        btn_Return.onclick = btn_Return_onclick
        btn_Return_All_Order.onclick = btn_Return_All_Order_onclick
    }

    function Display_information_Inv() {
        $("#btn_Order_shipment").addClass('display_none');

        $("._clearSta").removeClass("is-active");
        $("#View_Status" + _Inv.Status).addClass("is-active");

        $("#Name_Campany_View_Or").html("Company: " + _Inv.Remark);
        $("#Name_Cust_View_Or").html("Customer: " + _Inv.CustomerName);
        $("#Phone_View_Or").html("Phone: " + _Inv.CustomerMobile1 + " & " + _Inv.CustomerMobile2);
        $("#RefNo_TrNo_View_Or").html(" RefNo ( " + _Inv.RefNO + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TrNo ( " + _Inv.TrNo + " )");
        $("#Vat_Total_View_Or").html(" Vat ( " + _Inv.VatAmount + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total ( " + _Inv.TotalAmount + " ) ");
        $("#Comm_Total_View_Or").html(" Commition ( " + _Inv.CommitionAmount + " ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Net Total ( " + _Inv.NetAfterVat + " ) ");
        $("#Coun_View").html("  &nbsp;&nbsp;&nbsp;    Counter Item ( " + _Inv.ItemCount + " ) ");


        if (_Inv.SalesmanId != 0 && _Inv.SalesmanId != null) {
            let htm = `      <div class="u-container-layout u-similar-container u-valign-middle u-container-layout-5">
                        <span class="u-align-center u-file-icon u-icon u-text-white u-icon-4"><img src="/NewStyle/images/2560416-11b1db70.png" alt=""></span>
                        <h4 class="u-align-center u-custom-font u-text u-text-font u-text-6">
                            Deliver ( ${_Inv.SlsMan_Name} )<br>
                        </h4>
                    </div>`
            $("#btn_Deliver_shipment").html(htm);

            $("#btn_Order_shipment").removeClass('display_none');
        }

    }

    function Display_Role_User() {

        $(".USER" + _USER[0].USER_TYPE).removeClass('hidden_Control')
        $(".Status" + _Inv.Status).removeClass('display_none')


        if (_USER[0].USER_TYPE == 10) {
            if (_Inv.Status == 0) { //freeze
                $("#btn_Active").removeClass("display_none")
                $("#btn_freeze").addClass("display_none")
                $("#btn_Edit_Order").removeClass("display_none")
            }
            if (_Inv.Status == 1) { //Active
                $("#btn_Active").addClass("display_none")
                $("#btn_Edit_Order").addClass("display_none")
                $("#btn_freeze").removeClass("display_none")
            }
            if (_Inv.Status == 2) { //Confirm
                $("#btn_Active").addClass("display_none")
                $("#btn_freeze").removeClass("display_none")
                $("#btn_Edit_Order").addClass("display_none")
            }
        }

        $("#btn_Order_shipment").addClass('display_none');

        if (_Inv.SalesmanId != 0 && _Inv.SalesmanId != null) {
            $("#btn_Order_shipment").removeClass('display_none');
        }
    }

    //******************************************************* Events Buttons ************************************

    function btn_RetrunSeller_onclick() {
        UpdateInvStatus(InvoiceID, 0, 10, 'Retrun To Seller( ' + _Inv.InvoiceID + ' )', () => {
            $('#Back_Page').click();
            $("#Display_Back_Page").click();
        })
    }
    function btn_Delete_onclick() {
        UpdateInvStatus(InvoiceID, 0, -1, 'Delete Invoice ( ' + _Inv.InvoiceID + ' )', () => {
            $('#Back_Page').click();
            $("#Display_Back_Page").click();

        })
    }
    function btn_freeze_onclick() {

        UpdateInvStatus(InvoiceID, 0, 0, 'Freeze Invoice ( ' + _Inv.InvoiceID + ' )', () => {
            $("#btn_Active").removeClass("display_none")
            $("#btn_Edit_Order").removeClass("display_none")
            $("#btn_freeze").addClass("display_none")
            $("#Display_Back_Page").click();
        })
    }
    function btn_Active_onclick() {
        UpdateInvStatus(InvoiceID, 0, 1, 'Active Invoice ( ' + _Inv.InvoiceID + ' )', () => {
            $("#btn_Active").addClass("display_none")
            $("#btn_Edit_Order").addClass("display_none")
            $("#btn_freeze").removeClass("display_none")
            $("#Display_Back_Page").click();
        })
    }

    function btn_Edit_Order_onclick() {
        localStorage.setItem("InvoiceID", InvoiceID.toString())
        OpenPagePartial("Edit_Order", "Edit Order", null, () => { Display_Refrsh() });
    }
    function btn_Confirm_onclick() {

        if (Number(_Inv.CommitionAmount) <= 0) {
            Errorinput($('#btn_Edit_Order'), 'Please a Review Order 😒 ')
            return
        }

        UpdateInvStatus(InvoiceID, 0, 2, 'Confirm Invoice ( ' + _Inv.InvoiceID + ' )', () => {
            $('#Back_Page').click();
            $("#Display_Back_Page").click();

        })
    }
    function btn_Receiving_Order_onclick() {
        localStorage.setItem("InvoiceID", InvoiceID.toString())
        OpenPagePartial("Coding_Items", "Download items", null, () => { Display_Refrsh() });
    }
    function btn_Print_onclick() {

        localStorage.setItem("InvoiceID", InvoiceID.toString())
        localStorage.setItem("InvoiceNote", "0")
        OpenPagePartial("Print_Order", "Print Order 🧺");

    }
    function btn_Delivery_Order_onclick() {

        localStorage.setItem("InvoiceID", InvoiceID.toString())
        localStorage.setItem("InvoiceNote", "1")
        OpenPagePartial("Print_Order", "Print Order 🧺");
    }
    function btn_Deliver_shipment_onclick() {
        sys.FindKey("Deliver", "btnDeliver", " Isactive = 1 and ZoneID =" + _Inv.ZoneID, () => {

            let id = SearchGrid.SearchDataGrid.SelectedKey

            UpdateInvStatus(InvoiceID, id, 3, 'Deliver Shipment ( ' + _Inv.InvoiceID + ' )', () => {
                $('#Back_Page').click();
                $("#Display_Back_Page").click();
            })


        });
    }
    function btn_Order_shipment_onclick() {

        UpdateInvStatus(InvoiceID, _Inv.SalesmanId, 4, 'Confirm Invoice ( ' + _Inv.InvoiceID + ' )', () => {
            $('#Back_Page').click();
            $("#Display_Back_Page").click();

        })
    }
    function btn_Open_Location_onclick() {
        // Replace '1600 Amphitheatre Parkway, Mountain View, CA' with the desired address
        //var address = '1600 Amphitheatre Parkway, Mountain View, CA';
        var address = _Inv.Location;

        // Create the Google Maps URL
        var googleMapsUrl = 'https://www.google.com/maps?q=' + encodeURIComponent(address);

        // Open the URL in a new tab/window
        window.open(googleMapsUrl, '_blank');
    }
    function btn_Deliver_Customer_onclick() {
        UpdateInvStatus(InvoiceID, 0, 5, 'Deliver Customer ( ' + _Inv.InvoiceID + ' )', () => {
            $('#Back_Page').click();
            $("#Display_Back_Page").click();
        })
    }
    function btn_Return_onclick() {
        localStorage.setItem("InvoiceID", InvoiceID.toString())
        OpenPagePartial("Return_Items", "Return Items", null, () => { Display_Refrsh() });
    }
    function btn_Return_All_Order_onclick() {

        let StatusDesc = 'Return All Order ( ' + _Inv.InvoiceID + ' )';
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SlsInvoice", "UpdateInvTrType"),
            data: { CompCode: Number(SysSession.CurrentEnvironment.CompCode), BranchCode: Number(SysSession.CurrentEnvironment.BranchCode), InvoiceID: InvoiceID, TrType: 1, UserCode: SysSession.CurrentEnvironment.UserCode, StatusDesc: StatusDesc },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {


                    ShowMessage('Done ✅')
                    $('#Back_Page').click();
                    $("#Display_Back_Page").click();
                    Close_Loder();
                } else {
                    Close_Loder();
                }
            }
        });
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }


        Dis_Refrsh();
    }
    function Dis_Refrsh() {
        debugger
        $("#btn_Order_shipment").addClass('display_none');
        $("#Display_Back_Page").click();

        _Inv = new Vnd_Inv_SlsMan();
        _Invoices = new Array<Vnd_Inv_SlsMan>();

        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        if (_Inv == null) {

            alert(Flage_Back)
            if (Flage_Back < 2) {
                Flage_Back ++ ;
                $('#Back_Page').click();
            }

            return;
        }

        Display_information_Inv();
    }
}
