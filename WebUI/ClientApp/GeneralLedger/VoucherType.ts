
$(document).ready(() => {
    VoucherType.InitalizeComponent();
})

namespace VoucherType {


    var Details: Array<A_Voucher_Types> = new Array<A_Voucher_Types>();
    var Display_Type: Array<A_Voucher_Types> = new Array<A_Voucher_Types>();

    var btnAddDetails: HTMLButtonElement;
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession(Modules.StkDefItemType);
    var Model: A_Voucher_Types = new A_Voucher_Types();

    var CountGrid = 0;
    var Newcount;
    var compcode: Number;
    var btnBack_Def: HTMLButtonElement;
    var btnSave_Def: HTMLButtonElement;
    var btnUpdate_Def: HTMLButtonElement;

    var IsRestriction: HTMLInputElement;
    var IsCapture: HTMLInputElement;
    var IsDrainage: HTMLInputElement;
    var VoutcherType;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {
        ////
        $('#divIconbar').addClass('hidden_Control');
        $('#iconbar_Definition').removeClass('hidden_Control');
        $("#divShow").removeClass("display_none");
        lang == "ar" ? document.getElementById('Screen_name').innerHTML = "انواع السند" : document.getElementById('Screen_name').innerHTML = "Voucher types";

        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        InitalizeControls();
        InitalizeEvents();
        IsRestriction.checked = true;
        Display();

    }
    $('#btnUpdate_Def').on('click', function () {

        if (SysSession.CurrentPrivileges.EDIT) {
            debugger
            $('#btnSave_Def').removeClass("display_none");
            $('#btnBack_Def').removeClass("display_none");
            $(".Edit").removeAttr("disabled");
            $("#btnUpdate_Def").addClass("display_none");

            // $("#div_Add").addClass("disabledDiv");
        }
        else {
            $('#btnSave_Def').addClass("display_none");
            $('#btnBack_Def').addClass("display_none");

            $("#btnUpdate_Def").removeClass("display_none");

        }
        if (SysSession.CurrentPrivileges.AddNew) {
            // $(".btnAddDetails").removeAttr("disabled");

            $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign');
        }
        else {
            $(".btnAddDetails").attr("disabled", "disabled");

        }
        if (SysSession.CurrentPrivileges.Remove) {
            //
            $(".fa-minus-circle").removeClass("display_none");

        }
        else {
            $(".fa-minus-circle").addClass("display_none");
        }

    });
    function InitalizeControls() {
        ////
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnUpdate_Def = document.getElementById("btnUpdate_Def") as HTMLButtonElement;
        btnSave_Def = document.getElementById("btnSave_Def") as HTMLButtonElement;
        btnBack_Def = document.getElementById("btnBack_Def") as HTMLButtonElement;

        IsRestriction = document.getElementById("IsRestriction") as HTMLInputElement;
        IsCapture = document.getElementById("IsCapture") as HTMLInputElement;
        IsDrainage = document.getElementById("IsDrainage") as HTMLInputElement;

    }


    function InitalizeEvents() {
        btnAddDetails.onclick = AddNewRow;//
        btnSave_Def.onclick = btnSave_onclick;
        btnBack_Def.onclick = btnBack_onclick;
        IsRestriction.onchange = Display;
        IsCapture.onchange = Display;
        IsDrainage.onchange = Display;
    }

    function AddNewRow() {

        if (!SysSession.CurrentPrivileges.AddNew) return;
        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {

                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            BuildControl(CountGrid);
            debugger
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode
            $("#txtCode" + CountGrid).removeAttr("disabled");
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#txtDescL" + CountGrid).removeAttr("disabled");
            //$("#div_Data :input").removeAttr("disabled");
            $(".Edit").removeAttr("disabled");
            $("#txtTypeCode" + CountGrid).removeAttr("disabled");

            CountGrid++;
        }

        $("#btnUpdate_Def").addClass("display_none");
        $(".fa-minus-circle").removeClass("display_none");

    }

    function Display() {
        debugger

        if (IsRestriction.checked == true) {
            VoutcherType = IsRestriction.value;
        }
        else {
            if (IsCapture.checked == true) {
                VoutcherType = IsCapture.value;
            }
            else {
                VoutcherType = IsDrainage.value;
            }
        }
        Display_Type = new Array<A_Voucher_Types>();

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("VoucherType", "GetAll"),
            data: { CompCode: compcode, vouchertype: VoutcherType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    Display_Type = result.Response as Array<A_Voucher_Types>;

                    $("#div_Data").html("");
                    CountGrid = 0;
                    debugger
                    for (var i = 0; i < Display_Type.length; i++) {
                        debugger
                        BuildControl(i);
                        Bind_Data(i);
                        CountGrid++;
                    }
                }
            }
        });
    }
    function BuildControl(cnt: number) {

        var Html = `<tr id="Row${cnt}">
                        <td class="">
                            <i id="btn_minus${cnt}" class="fas fa-minus-circle display_none btn_minus fs-5"></i>
                        </td>
                        <td>
                            <div class="form-group">
                                <input id="txtTypeCode${cnt}" type="number" class="form-control " disabled />
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <input id="txtTypeDescA${cnt}" type="text" class="form-control Edit" disabled />
                            </div>
                        </td> 
                        <td>
                            <div class="form-group">
                                <input id="txtTypeDescE${cnt}" type="text" class="form-control Edit" disabled />
                            </div>
                        </td>
					<input id="txt_StatusFlag${cnt}" type="hidden"  disabled>
                    </tr>`

        $('#div_Data').append(Html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#txtTypeCode" + cnt).on('change', function () {
            debugger
            if (!CheckDuplicateGrid(cnt, CountGrid, "txtTypeCode", "txt_StatusFlag")) {
                DisplayMassage('خطاء رقم  موجود من قبل', '(Please enter account number)', MessageType.Error); 
                return false;
            }
            else {
                if ($("#txt_StatusFlag" + cnt).val() != "i")
                    $("#txt_StatusFlag" + cnt).val("u");
            } 
        });
        $("#txtTypeDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtTypeDescE" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });

    }
    function Bind_Data(cnt: number) { 
        $("#txtTypeCode" + cnt).val(Display_Type[cnt].TYPE_CODE);
        $("#txtTypeDescA" + cnt).val(Display_Type[cnt].TYPE_DESCA);
        $("#txtTypeDescE" + cnt).val(Display_Type[cnt].TYPE_DESCE);
        $("#txt_StatusFlag" + cnt).val(""); 
    }
    function Assign() {
        Details = new Array<A_Voucher_Types>();
        var StatusFlag: String;
        for (var i = 0; i < CountGrid; i++) {
            let singleModel = new A_Voucher_Types();
            StatusFlag = $("#txt_StatusFlag" + i).val();
            if (StatusFlag == "i" || StatusFlag == "u" || StatusFlag == "d") {
                singleModel.COMP_CODE = Number(SysSession.CurrentEnvironment.CompCode);
                singleModel.VoucherType = VoutcherType;
                singleModel.TYPE_CODE = Number($("#txtTypeCode" + i).val());
                singleModel.TYPE_DESCA = $("#txtTypeDescA" + i).val();
                singleModel.TYPE_DESCE = $("#txtTypeDescE" + i).val();
                singleModel.StatusFlag = StatusFlag.toString();
                Details.push(singleModel);
            }
        }
    }
    function Update() {
        debugger
        Assign();
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("VoucherType", "UpdateVouchers"),
            data: JSON.stringify(Details),
            success: (d) => {
                debugger
                let result = d as BaseResponse;
                if (result.IsSuccess) {

                    DisplayMassage('تم الحفظ بنجاح', `Updated Succesfully`, MessageType.Succeed);

                }
                else {
                    DisplayMassage('خطأ بالبيانات', `Error in Data`, MessageType.Error);
                }
                Succes();
            }
        });

    }

    function btnSave_onclick() {
        Assign();
        var CanAdd: boolean = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    return;
                }
            }
        }
        Newcount = 0;
        Update();
    }
    function Succes() {
        $('#btnUpdate_Def').removeClass('display_none');
        $('#btnBack_Def').addClass('display_none');
        $('#btnSave_Def').addClass('display_none');
        $('#btnAddDetails').addClass('display_none');
        $("#div_Add").removeClass("disabledDiv");
        Display();
    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
            $("#Row" + RecNo).attr("hidden", "true");
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');
        });
    }
    function Validation_Grid(rowcount: number) {

        if (($("#txt_StatusFlag" + rowcount).val() == 'd' || $("#txt_StatusFlag" + rowcount).val() == 'm')) {
            return true;
        }

        if (($("#txtTypeCode" + rowcount).val() == "")) {
            DisplayMassage(" يجب ادخال كود ", "Enter the Code", MessageType.Error);
            Errorinput($("#txtTypeCode" + rowcount))
            return false;
        }

        if (
            $("#txtTypeDescA" + rowcount).val() == "" || $("#txtTypeDescE" + rowcount).val() == "") {
            DisplayMassage("ادخل الوصف ", "Enter the Description", MessageType.Error);
            Errorinput($("#txtTypeDescA" + rowcount))
            Errorinput($("#txtTypeDescE" + rowcount))

            return false;
        }

        if (($("#txt_StatusFlag" + rowcount).val() != 'd' && $("#txt_StatusFlag" + rowcount).val() != 'u')) {
            Newcount++;
        }


        return true;
    }


    function btnBack_onclick() {
        $('#btnBack_Def').addClass("display_none");
        $('#btnSave_Def').addClass("display_none");
        $("#div_Add").removeClass("disabledDiv");
        $('#btnAddDetails').attr('class', 'glyphicon glyphicon-plus-sign  display_none')
        $("#div_Data :input").attr("disabled", "true");
        $(".fa-minus-circle").addClass("display_none");
        $("#btnUpdate_Def").removeClass("display_none");

        CountGrid = 0;
        $("#div_Data").html("");
        Display();
    }

}













