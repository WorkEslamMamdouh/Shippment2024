
$(document).ready(() => {
    VoucherReceipt.InitalizeComponent();

});

namespace VoucherReceipt {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var btnAdd: HTMLButtonElement;
    var db_Type: HTMLSelectElement;
    var Model: Voucher_Receipt = new Voucher_Receipt();
    var CreatedAt;
    var Createdby;
    var ReceiptID;

    export function InitalizeComponent() {     
        InitalizeControls();
        InitializeEvents();    
        Close_Loder();  
        $('#Txt_TrData').val(GetDate());
        if (localStorage.getItem("TypePage") == "Money") {
            Model = GetGlobalVoucher();
            Veiw_Data();
        }
    }
    function InitalizeControls() {
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        db_Type = document.getElementById("db_Type") as HTMLSelectElement;
    }
    function InitializeEvents() {
        btnAdd.onclick = Add_Reciept;
        db_Type.onchange = db_Type_Change;
        
    }              
    //****************************************************** Validtion and Clear *****************************************
    function Veiw_Data() {
        $('#Txt_Ref_No').val(Model.RefNO);
        $('#Txt_TrData').val(DateFormat(Model.TrDate));
        $('#Txt_nameRecipient').val(Model.NameRecipient);
        db_Type.value = Model.IsCash == true ? "1" : "0";
        $('#Txt_Amount').val(Model.Amount);
        $('#Txt_TransNO').val(Model.TransferNo);
        $('#Txt_Remarks').val(Model.Remark);
        Model.UpdatedAt = DateFormat(GetDateAndTime());
        Model.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        CreatedAt = Model.CreatedAt;
        Createdby = Model.CreatedBy;
        ReceiptID = Model.ReceiptID;

    }
    function db_Type_Change() {
        if (db_Type.value == "0") {
            $('#Trans').removeClass("display_none");    
        } else {
            $('#Trans').addClass("display_none");
            $('#Txt_TransNO').val("");     
		}
	}
    function Add_Reciept() {
        if ($('#Txt_Ref_No').val().trim() == "") {
            Errorinput($('#Txt_Ref_No'), "Please Enter Ref No 🤨");
            return
        }
        if ($('#Txt_nameRecipient').val().trim() == "") {
            Errorinput($('#Txt_nameRecipient'), "Please Enter Name of Recipient 🤨");
            return
        }
        if (db_Type.value == "0" && $('#Txt_TransNO').val().trim() == "") {
            Errorinput($('#Txt_TransNO'), "Please Enter Transfer No 🤨");
            return
        }
        if (Number($('#Txt_Amount').val()) == 0) {
            Errorinput($('#Txt_Amount'), "Please Enter Amount 🤨");
            return
        }
        Model = new Voucher_Receipt();
        Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        Model.BraCode = Number(SysSession.CurrentEnvironment.BranchCode);
        Model.TrType = 0;
        Model.RefNO = $('#Txt_Ref_No').val();
        Model.TrDate = DateFormat($('#Txt_TrData').val());
        Model.NameRecipient = $('#Txt_nameRecipient').val();
        Model.IsCash = db_Type.value == "1" ? true : false;
        Model.Amount = Number($('#Txt_Amount').val());
        Model.TransferNo = $('#Txt_TransNO').val();
        Model.Status = false;
        Model.Remark = $('#Txt_Remarks').val();
        Model.CreatedAt = DateFormat(GetDateAndTime());
        Model.CreatedBy = SysSession.CurrentEnvironment.UserCode; 
        if (ReceiptID != 0) {
            Model.ReceiptID = ReceiptID;
            Model.CreatedAt = CreatedAt;
            Model.CreatedBy = Createdby;
            Model.UpdatedAt = DateFormat(GetDateAndTime());
            Model.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
            Ajax.CallsyncSave({
                type: "Post",
                url: sys.apiUrl("SalesMan", "UpdateVoucher"),
                data: JSON.stringify(Model),
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {
                        ShowMessage("Receipt Updated 🤞😉")
                        Close_Loder();
                        $('#Back_Page').click();
                        $("#Display_Back_Page").click();
                    } else {

                    }
                }
            });
        } else {
            Ajax.CallsyncSave({
                type: "Post",
                url: sys.apiUrl("SalesMan", "InsertVoucher"),
                data: JSON.stringify(Model),
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess == true) {
                        $('#Div_Header :Input').val('');
                        $('#Txt_TrData').val(GetDate());
                        $('#btnAdd').val('Finish');
                        ShowMessage("Receipt Inserted 🤞😉")
                        Close_Loder();
                    } else {

                    }
                }
            });
        }

	}          
    
}
