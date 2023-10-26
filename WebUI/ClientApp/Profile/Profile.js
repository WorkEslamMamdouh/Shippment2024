$(document).ready(function () {
    Profile.InitalizeComponent();
});
var Profile;
(function (Profile) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USERS = new Array();
    var _USER = new Array();
    var Submit_Update_Profile;
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE == SysSession.CurrentEnvironment.UserCode; });
        Display_Data();
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
    }
    function Display_Data() {
        debugger;
        $('#Reg_Full_Name').val(_USER[0].USER_NAME);
        $('#Reg_Address').val(_USER[0].Address);
        $('#Reg_Mobile').val(_USER[0].Mobile);
        $('#Reg_Mail').val(_USER[0].Email);
        $('#Reg_ID_Num').val(_USER[0].Fax);
        $('#Reg_Password').val(_USER[0].USER_PASSWORD);
    }
    function SubmitUpdate() {
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name 😡");
            return;
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address 😡");
            return;
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile 😡");
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
        var address = $('#Reg_Address').val().trim();
        var Mobile = $('#Reg_Mobile').val().trim();
        var IDNO = $('#Reg_ID_Num').val().trim();
        var Email = $('#Reg_Mail').val().trim();
        var UserName = SysSession.CurrentEnvironment.UserCode;
        var Password = $('#Reg_Password').val().trim();
        var Idven = _USER[0].SalesManID;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Seller", "Update"),
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, VendorId: Idven },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
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
        ShowMessage("Updated 🤞��");
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map