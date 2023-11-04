$(document).ready(function () {
    Zone.InitalizeComponent();
});
var Zone;
(function (Zone) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USERS = new Array();
    var _USER = new Array();
    var _Zones = new Array();
    var CountGrid = 0;
    var Submit_Update_Profile;
    var Submit_Backdown_Profile;
    function InitalizeComponent() {
        debugger;
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE == SysSession.CurrentEnvironment.UserCode; });
        Display_Data();
        Close_Loder();
    }
    Zone.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile");
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
        Submit_Backdown_Profile.onclick = BackeDown;
    }
    function BackeDown() {
        WorningMessage("هل انت متأكد من التراجع عن التعديلات ؟", "Are you sure for undoing the modifications?", "تحذير", "worning", function () {
            $('#Zone_Grid').html("");
            CountGrid = 0;
            Display_Data();
        });
    }
    function Display_Data() {
        debugger;
        var Table;
        Table =
            [
                { NameTable: 'Zones', Condition: "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _Zones = GetDataTable('Zones');
        for (var i = 0; i < _Zones.length; i++) {
            BuildGrid(i);
            $("#Txt_ZoneID".concat(i)).val(_Zones[i].ZoneID);
            $("#Txt_ZoneCode".concat(i)).val(_Zones[i].ZoneCode);
            $("#Txt_DescA".concat(i)).val(_Zones[i].DescA);
            $("#chk_Active".concat(i)).prop('checked', _Zones[i].Active);
            $("#Txt_Remarks".concat(i)).val(_Zones[i].Remarks);
            $("#txtStatusFlag".concat(i)).val('');
            CountGrid++;
        }
    }
    function SubmitUpdate() {
        if ($('#Reg_Comp_Name').val().trim() == "" && _USER[0].USER_TYPE == 10) {
            Errorinput($('#Reg_Comp_Name'), "Please a Enter Company Name 🤨");
            return;
        }
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name 🤨");
            return;
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address 🤨");
            return;
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile 😏");
            return;
        }
        else if ($('#Reg_ID_Num').val().trim() == "") {
            Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number 😡");
            return;
        }
        var USERID_Num = _USERS.filter(function (x) { return x.Fax == $('#Reg_ID_Num').val().trim() && x.USER_CODE != _USER[0].USER_CODE; });
        if (USERID_Num.length > 0) {
            Errorinput($('#Reg_ID_Num'), "This ID Number is already used 🤣");
            return;
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail 😡");
            return;
        }
        else if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password 😡");
            return;
        }
        debugger;
        var Name = $('#Reg_Full_Name').val().trim();
        var CompName = $('#Reg_Comp_Name').val().trim();
        var address = $('#Reg_Address').val().trim();
        var Mobile = $('#Reg_Mobile').val().trim();
        var IDNO = $('#Reg_ID_Num').val().trim();
        var Email = $('#Reg_Mail').val().trim();
        var UserName = SysSession.CurrentEnvironment.UserCode;
        var Password = $('#Reg_Password').val().trim();
        var Idven = Number(_USER[0].SalesManID);
        var NameFun = _USER[0].USER_TYPE == 10 ? "UpdateSeller" : "UpdateProfile";
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("Seller", NameFun),
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, VendorId: Idven, CompName: CompName },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    //GetUSERSByCodeUser(UserName);
                    Close_Loder();
                }
                else {
                }
            }
        });
    }
    function BuildGrid(cnt) {
        var html = '<tr id="Row' + cnt + '" style="height: 51px; ">' +
            '<input id="Txt_ZoneID' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<input id="txtStatusFlag' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<td class="btn_minus" style = "width: 2%;" > ' +
            '<button  id="btn_minus' + cnt + '"> <i class="fa-solid fa-circle-minus" > </i></button > ' +
            '</td>' +
            '<td class="u-table-cell" > ' +
            '<input type="text" id="Txt_ZoneCode' + cnt + '" maxlength="50" class="Clear_Header  u-input u-input-rectangle">' +
            '</td>' +
            '<td class="u-table-cell" > ' +
            '<input type="text" id="Txt_DescA' + cnt + '" maxlength="200" class="Clear_Header  u-input u-input-rectangle">' +
            '</td>' +
            '<td class="u-table-cell" > ' +
            '<input type="checkbox" id="chk_Active' + cnt + '" class="checkbox">' +
            '</td>' +
            '<td class="u-table-cell" > ' +
            '<input type="text" id="Txt_Remarks' + cnt + '" maxlength="500" class="Clear_Header  u-input u-input-rectangle">' +
            '</td>' +
            '</tr>';
        $('#Zone_Grid').append(html);
        $("#Txt_ZoneCode".concat(cnt)).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#Txt_DescA".concat(cnt)).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#Txt_Remarks".concat(cnt)).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#chk_Active".concat(cnt)).on('click', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#btn_minus".concat(cnt)).on('click', function () {
            DeleteRow(cnt);
        });
    }
    function DeleteRow(RecNo) {
        debugger;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            $("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
            $("#Row" + RecNo).attr("hidden", "true");
        });
    }
})(Zone || (Zone = {}));
//# sourceMappingURL=Zone.js.map