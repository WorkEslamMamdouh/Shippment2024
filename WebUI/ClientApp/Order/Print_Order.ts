
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
     
    var _Print_Invoice: HTMLButtonElement;
     
    var ItemTotal = 0;
    var ItemCount = 0;
    var InvoiceID = 0;

    export function InitalizeComponent() {

        let _USERS = GetGlopelDataUser()
        _USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase())

        InitalizeControls();
        InitializeEvents();  
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        _InvItems = _InvoiceItems.filter(x => x.InvoiceID == InvoiceID)
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
    } 
  
    function Create_Invoice_Print() {
        $('#Print_Name_Cust').html("<strong>Name:</strong> " + _Inv.CustomerName);
        $('#Print_Name_Phone').html("<strong>Phone:</strong> " + _Inv.CustomerMobile1);
        $('#Print_Name_Address').html("<strong>Address:</strong> " + _Inv.Address);

        $('#Tran_ID_Print').html("<strong>Transaction ID:</strong> " + _Inv.InvoiceID + " <br/><strong>        RefNO :</strong> " + _Inv.RefNO);
        $('#Tran_Date_Print').html("<strong>Date:</strong> " + DateFormat(_Inv.DeliveryDate));

        $('#Body_Inv_Print').html('');

        ItemTotal = 0;
        ItemCount = 0;
        for (var i = 0; i < _InvItems.length; i++) {
            if ($('#StatusFlag' + i).val() != 'd' && $('#StatusFlag' + i).val() != 'm') {
                let Row = `    <tr>
                            <td>${_InvItems[i].ItemDescA} </td>
                            <td>${_InvItems[i].SoldQty}</td>
                            <td>${_InvItems[i].Unitprice}</td>
                            <td>${(_InvItems[i].SoldQty * _InvItems[i].Unitprice).toFixed(2)}</td>
                        </tr>`

                ItemTotal = ItemTotal + _InvItems[i].ItemTotal;
                ItemCount = ItemCount + _InvItems[i].SoldQty;

                $('#Body_Inv_Print').append(Row);
            }
        }

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
    }
    function _Print_Invoice_onclick() {
        printDiv('Body_Print_Inv')
    }
}
