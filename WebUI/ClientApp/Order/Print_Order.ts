
$(document).ready(() => {
    Print_Order.InitalizeComponent();
});

namespace Print_Order {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _USER: Array<G_USERS> = new Array<G_USERS>();

    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _Inv: Vnd_Inv_SlsMan = new Vnd_Inv_SlsMan();
    var _InvItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _IQ_ItemCollect: Array<IQ_ItemCollect> = new Array<IQ_ItemCollect>();

    var _Print_Invoice: HTMLButtonElement;

    var ItemTotal = 0;
    var ItemCount = 0;
    var InvoiceID = 0;
    var InvoiceNote = 0;

    export function InitalizeComponent() {
        debugger
        let _USERS = GetGlopelDataUser()
        _USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase())


        InitalizeControls();
        InitializeEvents();


        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        _IQ_ItemCollect = GetGlopelDataIQ_ItemCollect();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        InvoiceNote = Number(localStorage.getItem("InvoiceNote"))


        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]

        if (InvoiceNote == 1) {
            _InvItems = _InvoiceItems.filter(x => x.InvoiceID == InvoiceID)

        }
        else {
            _InvItems = _IQ_ItemCollect.filter(x => x.InvoiceID == InvoiceID)
        }



        $(".User" + _USER[0].USER_TYPE).removeClass('display_none')
        Display_Inv();
        Close_Loder();

    }
    function InitalizeControls() {

        _Print_Invoice = document.getElementById("_Print_Invoice") as HTMLButtonElement;

    }
    function InitializeEvents() {
        _Print_Invoice.onclick = _Print_Invoice_onclick;

    }
    function Display_Inv() {

        Create_Invoice_Print();

        TotalComplet();

        if (InvoiceNote == 1) {
            $('.Type_Invoice').addClass('display_none')
            $('.Type_Note').removeClass('display_none')
        }
    }

    function Create_Invoice_Print() {
        if (_Inv.TrType == 0) {
            $('#Type_Inv').html("Invoice");
        }
        else {
            $('#Type_Inv').html("Return"); 
        }

        $('#Print_Remark_Inv').html("<strong>Remark :</strong> " + _Inv.Remark);
        $('#Print_Name_Cust').html("<strong>Name:</strong> " + _Inv.CustomerName);
        //$('#Print_Name_Phone').html("<strong>Phone:</strong> " + _Inv.CustomerMobile1);
        $('#Print_Name_Phone').html("<strong>Mobile :&nbsp;</strong> " + _Inv.CustomerMobile1 + "<strong>  &nbsp;&nbsp;    </strong><strong>  /  </strong> <strong>   &nbsp;&nbsp;   </strong>   " + _Inv.CustomerMobile2);
        $('#Print_Name_Address').html("<strong>Address:</strong> " + _Inv.Address);

        $('#Tran_ID_Print').html("<strong>Transaction ID:</strong> " + _Inv.InvoiceID + " <br/><strong>        RefNO :</strong> " + _Inv.RefNO);
        $('#Tran_Date_Print').html("<strong>Date:</strong> " + DateFormat(_Inv.DeliveryDate));

        //$('#Tran_CreatedAt_Print').html("<strong>Created At :</strong> " + _Inv.CreatedAt + "<strong>  &nbsp;&nbsp;  &nbsp;  &nbsp;    </strong>" + "<strong>Created By :</strong> " + _Inv.CreatedBy);
        $('#Tran_CreatedBy_Print').html("<strong>Created By :</strong> " + _Inv.CreatedBy + "<strong>  &nbsp;&nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;    </strong>" + "<strong>Created At :</strong> " + _Inv.CreatedAt);

        if (_Inv.SlsMan_Name != null) {
            $('#Print_Deliver_Name').html("<strong>Deliver Man :</strong> " + _Inv.SlsMan_Name);
        }
        else {
            $('#Print_Deliver_Name').html("");
        }

        $('#Body_Inv_Print').html('');

        ItemTotal = 0;
        ItemCount = 0;
        for (var i = 0; i < _InvItems.length; i++) {
            if ($('#StatusFlag' + i).val() != 'd' && $('#StatusFlag' + i).val() != 'm') {
                let Row = `<tr>
                           <td class="Type_Note display_none">${_InvItems[i].ItemCode} </td>
                           <td>${_InvItems[i].ItemDescA} </td>
                           <td class="Type_Note display_none">${_InvItems[i].Remark} </td>
                           <td Class="Type_Invoice">${_InvItems[i].SoldQty}</td>
                           <td Class="Type_Invoice">${_InvItems[i].Unitprice}</td>
                           <td Class="Type_Invoice">${(_InvItems[i].SoldQty * _InvItems[i].Unitprice).toFixed(2)}</td>
                        </tr>`

                ItemTotal = ItemTotal + (_InvItems[i].Unitprice * _InvItems[i].SoldQty );
                ItemCount = ItemCount + _InvItems[i].SoldQty;

                $('#Body_Inv_Print').append(Row);
            }
        }
        debugger
        $('#Txt_TotalAmount').val(ItemTotal.toFixed(2));

        $('#Txt_NetAmount').val(ItemTotal.toFixed(2));

        $('#Total_inv_Print').html(ItemTotal.toFixed(2));
    }

    function TotalComplet() {
        $('#Txt_PrcVatAmount').val(_Inv.VatType)
        $('#Txt_VatAmount').val(_Inv.VatAmount)
        $('#Txt_TotalAmount').val(_Inv.TotalAmount)
        $('#Txt_CommitionAmount').val(_Inv.CommitionAmount)
        $('#Txt_NetAmount').val(_Inv.NetAfterVat)

        let PrcVat = Number($('#Txt_PrcVatAmount').val());
        let TotalAmount = Number($('#Txt_TotalAmount').val());
        let VatAmount = ((PrcVat * TotalAmount) / 100);
        $('#Txt_VatAmount').val(VatAmount)
        let CommitionAmount = Number($('#Txt_CommitionAmount').val())
        $('#Txt_NetAmount').val((VatAmount + TotalAmount + CommitionAmount).toFixed(2))

        let TafkeetArab = TafkeetArabValue(Number($('#Txt_NetAmount').val()))
        $('#Txt_TotalAmountArab').val(TafkeetArab)

    }
    function _Print_Invoice_onclick() {
        printDiv('Body_Print_Inv')
    }
}
