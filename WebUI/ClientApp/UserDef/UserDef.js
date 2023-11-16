$(document).ready(function () {
    UserDef.InitalizeComponent();
});
var UserDef;
(function (UserDef) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USERS = new Array();
    var _USER = new Array();
    var _G_Code = new Array();
    var _Zones = new Array();
    var Submit_Update_Profile;
    var Usr_UserType;
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        var User = SysSession.CurrentEnvironment.UserCode;
        $('#Submit_Update_Profile').html('Add');
        $('#Usr_UserCode').removeAttr('disabled');
        Display_Data();
        if (localStorage.getItem("TypePage") == "UserControl") {
            User = localStorage.getItem("UserControl");
            $('#Submit_Update_Profile').html('Update');
            $('#Usr_UserCode').attr('disabled', 'disabled');
        }
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == User.toLowerCase(); });
        if (localStorage.getItem("TypePage") == "UserControl") {
            Display_User();
            if (Number(_USER[0].SalesManID) != 0) {
                $('#Usr_UserType').attr('disabled', 'disabled');
            }
        }
        Close_Loder();
    }
    UserDef.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        Usr_UserType = document.getElementById("Usr_UserType");
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
        Usr_UserType.onchange = UserType_Change;
    }
    function Display_User() {
        debugger;
        $('#Usr_Full_Name').val(_USER[0].USER_NAME);
        $('#Usr_Address').val(_USER[0].Address);
        $('#Usr_Mobile').val(_USER[0].Mobile);
        $('#Usr_ID_Num').val(_USER[0].Fax);
        $('#Usr_Mail').val(_USER[0].Email);
        $('#Usr_Gender').val(_USER[0].REGION_CODE);
        $('#Usr_UserCode').val(_USER[0].USER_CODE);
        $('#Usr_UserType').val(_USER[0].USER_TYPE);
        if (Number(_USER[0].CashBoxID) != 0) {
            $('#Usr_Zone').val(_USER[0].CashBoxID);
        }
        else {
            $('#Usr_Zone').prop('selectedIndex', 0);
        }
        $('#Usr_Password').val(_USER[0].USER_PASSWORD);
        UserType_Change();
    }
    function Display_Data() {
        debugger;
        $('#DivContainer :input').val("");
        $('#Usr_Gender').val("1");
        $('#Submit_Update_Profile').val("Add");
        var Table;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType= 'UserType' and CodeValue not in (1,10)" },
                { NameTable: 'Zones', Condition: "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _G_Code = GetDataTable('G_Codes');
        _Zones = GetDataTable('Zones');
        FillDropwithAttr(_G_Code, "Usr_UserType", "CodeValue", "DescA", "No", "", "");
        FillDropwithAttr(_Zones, "Usr_Zone", "ZoneID", "DescA", "No", "", "");
    }
    function UserType_Change() {
        if (Usr_UserType.value == "11") {
            $('#div_zone').removeClass('display_none');
        }
        else {
            $('#div_zone').addClass('display_none');
        }
    }
    function SubmitUpdate() {
        debugger;
        if ($('#Usr_Full_Name').val().trim() == "") {
            Errorinput($('#Usr_Full_Name'), "Please a Enter Name 🤨");
            return;
        }
        if ($('#Usr_Address').val().trim() == "") {
            Errorinput($('#Usr_Address'), "Please a Enter Address 🤨");
            return;
        }
        if ($('#Usr_Mobile').val().trim() == "") {
            Errorinput($('#Usr_Mobile'), "Please a Enter Mobile 🤨");
            return;
        }
        if ($('#Usr_ID_Num').val().trim() == "") {
            Errorinput($('#Usr_ID_Num'), "Please a Enter Identity No 🤨");
            return;
        }
        if ($('#Usr_Mail').val().trim() == "") {
            Errorinput($('#Usr_Mail'), "Please a Enter Mail 🤨");
            return;
        }
        if ($('#Usr_UserCode').val().trim() == "") {
            Errorinput($('#Usr_UserCode'), "Please a Enter User Name 🤨");
            return;
        }
        if ($('#Usr_Password').val().trim() == "") {
            Errorinput($('#Usr_Password'), "Please a Enter User Password 🤨");
            return;
        }
        debugger;
        var Name = $('#Usr_Full_Name').val();
        var address = $('#Usr_Address').val();
        var Mobile = $('#Usr_Mobile').val();
        var IDNO = $('#Usr_ID_Num').val();
        var Email = $('#Usr_Mail').val();
        var Gender = $('#Usr_Gender').val();
        var UserName = $('#Usr_UserCode').val();
        var Password = $('#Usr_Password').val();
        var ZoneID = Number($('#Usr_Zone').val());
        var UserType = Number(Usr_UserType.value);
        var SalesManID = Number(_USER[0].SalesManID);
        var NameFun;
        debugger;
        if (localStorage.getItem("TypePage") == "UserControl") {
            if (SalesManID == 0) {
                NameFun = Usr_UserType.value == "11" ? "InsertSalesMan" : "InsertUser";
            }
            else {
                NameFun = Usr_UserType.value == "11" ? "UpdateSalesMan" : "InsertUser";
            }
        }
        else {
            NameFun = Usr_UserType.value == "11" ? "InsertSalesMan" : "InsertUser";
        }
        debugger;
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesMan", NameFun),
            data: { CompCode: 1, BranchCode: 1, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, SalesManID: SalesManID, ZoneID: ZoneID, UserType: UserType, Gender: Gender },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
                    Display_Data();
                    UserType_Change();
                    $('#Back_Page').click();
                    $("#Display_Back_Page").click();
                    Close_Loder();
                }
                else {
                }
            }
        });
    }
    function GetUSERSByCodeUser(User_Code) {
        var Table;
        Table =
            [
                { NameTable: 'G_USERS', Condition: " USER_CODE = N'" + User_Code + "'" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var _USER = GetDataTable('G_USERS');
        _USERS = _USERS.filter(function (x) { return x.USER_CODE != User_Code; });
        _USERS.push(_USER[0]);
        SetGlopelDataUser(_USERS);
        ShowMessage("Done 🤞😉");
    }
})(UserDef || (UserDef = {}));
//# sourceMappingURL=UserDef.js.map