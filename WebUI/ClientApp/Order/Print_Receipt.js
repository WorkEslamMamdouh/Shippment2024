$(document).ready(function () {
    Print_Receipt.InitalizeComponent();
});
var Print_Receipt;
(function (Print_Receipt) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USER = new Array();
    var _Receipt = new Array();
    var _Rec = new Voucher_Receipt();
    var _Print_Recoice;
    var ItemTotal = 0;
    var ItemCount = 0;
    var ReceiptID = 0;
    var ReceiptNote = 0;
    function InitalizeComponent() {
        debugger;
        var _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase(); });
        InitalizeControls();
        InitializeEvents();
        _Receipt = GetGlopelVoucher_Receipt();
        ReceiptID = Number(localStorage.getItem("ReceiptID"));
        ReceiptNote = Number(localStorage.getItem("ReceiptNote"));
        _Rec = _Receipt.filter(function (x) { return x.ReceiptID == ReceiptID; })[0];
        $(".User" + _USER[0].USER_TYPE).removeClass('display_none');
        Display_Rec();
        Close_Loder();
    }
    Print_Receipt.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        _Print_Recoice = document.getElementById("_Print_Recoice");
    }
    function InitializeEvents() {
        _Print_Recoice.onclick = _Print_Recoice_onclick;
    }
    function Display_Rec() {
        debugger;
        var TafkeetArab = TafkeetArabValue(Number(_Rec.Amount.toFixed(2)));
        Create_Recoice_Print(TafkeetArab);
    }
    function Create_Recoice_Print(ArabValue) {
        debugger;
        var TypePay = _Rec.IsCash == true ? "Cash" : "Credit";
        var Type_Receipt = "";
        if (_Rec.TrType == 0) {
            Type_Receipt = "Receipt";
        }
        if (_Rec.TrType == 1) {
            Type_Receipt = "Payment";
        }
        if (_Rec.TrType == 2) {
            Type_Receipt = "Reciept Invoices";
        }
        if (_Rec.TrType == 3) {
            Type_Receipt = "Payment Seller";
        }
        var stauts = "";
        if (_Rec.Status == false) {
            stauts = " 🚫";
        }
        $('#ID_PrintType_Receipt').html(Type_Receipt + " " + stauts);
        $('#Print_TransferNo').html("<strong>Transfer No :</strong> " + _Rec.TransferNo);
        $('#Print_Name_TrDate').html("<strong>Date :</strong> " + DateFormat(_Rec.TrDate));
        $('#Print_Name_Recipient').html("<strong>Name Recipient :</strong> " + _Rec.NameRecipient);
        $('#Print_Type_Pay').html("<strong>Type Pay :</strong> " + TypePay);
        $('#Print_Remark').html("<strong>Remark :</strong> " + _Rec.Remark);
        $('#Txt_TotalAmount').val(ArabValue);
        $('#Total_inv_Print').html(_Rec.Amount.toFixed(2));
        $('#Tran_Date_Transaction_ID').html("<strong>Transaction ID :</strong> " + _Rec.ReceiptID);
        $('#Tran_Date_CreatedAt').html("<strong>Created At :</strong> " + _Rec.CreatedAt);
        $('#Tran_Date_CreatedBy').html("<strong>Created By :</strong> " + _Rec.CreatedBy);
    }
    function _Print_Recoice_onclick() {
        printDiv('Body_Print_Rec');
    }
})(Print_Receipt || (Print_Receipt = {}));
//# sourceMappingURL=Print_Receipt.js.map