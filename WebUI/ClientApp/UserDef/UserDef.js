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
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase(); });
        Display_Data();
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
    function Display_Data() {
        debugger;
        $('#DivContainer :input').val("");
        $('#Usr_Gender').val("1");
        $('#Submit_Update_Profile').val("Update");
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
        if (Usr_UserType.value == "3") {
            $('#div_zone').removeClass('display_none');
        }
        else {
            $('#div_zone').addClass('display_none');
        }
    }
    function SubmitUpdate() {
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
        var Name = $('#Usr_Full_Name').val();
        var address = $('#Usr_Address').val();
        var Mobile = $('#Usr_Mobile').val();
        var IDNO = $('#Usr_ID_Num').val();
        var Email = $('#Usr_Mail').val();
        var UserName = $('#Usr_UserCode').val();
        var Password = $('#Usr_Password').val();
        var ZoneID = Usr_UserType.value == "3" ? Number($('#Usr_Zone').val()) : Number($('#Usr_UserType').val());
        var NameFun = Usr_UserType.value == "3" ? "InsertSalesMan" : "InsertUser";
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesMan", NameFun),
            data: { CompCode: 1, BranchCode: 1, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, ZoneID: ZoneID },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
                    Display_Data();
                    UserType_Change();
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
        ShowMessage("Updated 🤞😉");
    }
})(UserDef || (UserDef = {}));
//# sourceMappingURL=UserDef.js.map