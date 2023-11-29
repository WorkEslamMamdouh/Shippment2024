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
    var img_Profile;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        var User = SysSession.CurrentEnvironment.UserCode;
        if (localStorage.getItem("TypePage") == "UserControl") {
            User = localStorage.getItem("UserControl");
        }
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == User.toLowerCase(); });
        Display_Data();
        $('#Profile_UserName').html(_USER[0].USER_CODE);
        $('#Profile_JobTitle').html(_USER[0].JobTitle);
        Event_key('Enter', 'Reg_Password', 'Submit_Update_Profile');
        Close_Loder();
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        img_Profile = document.getElementById("img_Profile");
    }
    function InitializeEvents() {
        Submit_Update_Profile.onclick = SubmitUpdate;
        img_Profile.onclick = img_Profile_onclick;
    }
    function img_Profile_onclick() {
        Upload_image('img_Profile', 'Profile_User', setVal(_USER[0].Profile_Img).trim());
    }
    function Display_Data() {
        debugger;
        if (_USER[0].USER_TYPE == 10) {
            $('#div_CompName').removeClass('display_none');
            $('#Reg_Comp_Name').val(_USER[0].Vnd_CompName);
        }
        else {
            $('#div_CompName').addClass('display_none');
            $('#Reg_Comp_Name').val("");
        }
        $('#Reg_Full_Name').val(_USER[0].USER_NAME);
        $('#Reg_Address').val(_USER[0].Address);
        $('#Reg_Mobile').val(_USER[0].Mobile);
        $('#Reg_Mail').val(_USER[0].Email);
        $('#Reg_ID_Num').val(_USER[0].Fax);
        $('#Reg_Password').val(_USER[0].USER_PASSWORD);
        if (setVal(_USER[0].Profile_Img).trim() != "") {
            Display_image('img_Profile', 'Profile_User', _USER[0].Profile_Img.trim());
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
        //else if ($('#Reg_ID_Num').val().trim() == "") {
        //	Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number 😡");
        //	return
        //}
        //let USERID_Num = _USERS.filter(x => x.Fax == $('#Reg_ID_Num').val().trim() && x.USER_CODE != _USER[0].USER_CODE)
        //if (USERID_Num.length > 0) {
        //	Errorinput($('#Reg_ID_Num'), "This ID Number is already used 🤣");
        //	return
        //}
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
        var IDNO = "";
        var Email = $('#Reg_Mail').val().trim();
        var Password = $('#Reg_Password').val().trim();
        var CompName = $('#Reg_Comp_Name').val().trim();
        var UserName = _USER[0].USER_CODE;
        var Profile_Img = $("#img_Profile").attr("Name_Img").trim();
        var Idven = 0;
        if (_USER[0].SalesManID != null) {
            Idven = Number(_USER[0].SalesManID);
        }
        if (_USER[0].VendorID != null) {
            Idven = Number(_USER[0].VendorID);
        }
        var NameFun = _USER[0].USER_TYPE == 10 ? "UpdateSeller" : "UpdateProfile";
        debugger;
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("Seller", NameFun),
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, VendorId: Idven, CompName: CompName, Profile_Img: Profile_Img },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
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
        ShowMessage("Updated 🤞😉");
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map