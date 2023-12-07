$(document).ready(function () {
    Login.InitalizeComponent();
});
var Login;
(function (Login) {
    var sys = new SystemTools();
    var SystemEnv = new SystemEnvironment();
    var USERS = new Array();
    var Control = new Array();
    var rgstr_button;
    var Submit_Register;
    var Submit_Login;
    var Reg_FrontID_Img;
    var Reg_BackID_Img;
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
        localStorage.setItem("TypeUser", "2");
        $('#bodyLogin').addClass('hidden_Control');
        var today = new Date();
        var yyyy = today.getFullYear();
        SystemEnv.ScreenLanguage = "en";
        SystemEnv.CurrentYear = yyyy.toString();
        SystemEnv.CompCode = $('#CompCode').val();
        SystemEnv.BranchCode = $('#BranchCode').val();
        SystemEnv.CompanyName = $('#CompanyName').val();
        InitalizeControls();
        InitializeEvents();
        Event_key('Enter', 'txtUsername', 'Submit_Login');
        Event_key('Enter', 'txtPassword', 'Submit_Login');
        Event_key('Enter', 'Reg_Password', 'Submit_Register');
        Event_key('Enter', 'Reg_Validation_Code', 'Submit_Register');
        //setTimeout(function () {
        USERS = GetGlopelDataUser();
        USERS.length == 0 ? GetData_Header() : null;
        Close_Loder();
        //}, 300);
        $('#bodyLogin').removeClass('hidden_Control');
        var TypeUser = localStorage.getItem("TypeUser");
        if (TypeUser == '2') {
            $('._rgstr').removeClass('hidden_Control');
            $('._ready').addClass('hidden_Control');
        }
        else {
            $('._ready').removeClass('hidden_Control');
            $('._rgstr').addClass('hidden_Control');
        }
    }
    Login.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        rgstr_button = document.getElementById("rgstr_button");
        Submit_Login = document.getElementById("Submit_Login");
        Reg_FrontID_Img = document.getElementById("Reg_FrontID_Img");
        Reg_BackID_Img = document.getElementById("Reg_BackID_Img");
        Submit_Register = document.getElementById("Submit_Register");
        txtUsername = document.getElementById("txtUsername");
        txtPassword = document.getElementById("txtPassword");
    }
    function InitializeEvents() {
        Submit_Login.onclick = SubmitLogin;
        Submit_Register.onclick = SubmitRegister;
        rgstr_button.onclick = function () { $("#Reg_FrontID_Img").attr("Name_Img", ""); $("#Reg_BackID_Img").attr("Name_Img", ""); $('._Clear_Reg').val(''); $('#Reg_Type_Payment').val('1'); $('#Reg_FrontID_Img').removeClass('_backColor'); $('#Reg_BackID_Img').removeClass('_backColor'); };
        Reg_FrontID_Img.onclick = Reg_FrontID_Img_onclick;
        Reg_BackID_Img.onclick = Reg_BackID_Img_onclick;
    }
    function GetData_Header() {
        var Table;
        Table =
            [
                { NameTable: 'G_USERS', Condition: "" },
                { NameTable: 'I_Control', Condition: " CompCode = " + $('#CompCode').val() + "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        USERS = GetDataTable('G_USERS');
        Control = GetDataTable('I_Control');
        console.log(Control);
        SetGlopelDataUser(USERS);
    }
    function Reg_FrontID_Img_onclick() {
        Upload_image('Reg_FrontID_Img', 'Profile_Seller', '');
    }
    function Reg_BackID_Img_onclick() {
        Upload_image('Reg_BackID_Img', 'Profile_Seller', '');
    }
    function SubmitLogin() {
        debugger;
        if (txtUsername.value.trim() == "" && txtPassword.value.trim() == "") {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
            return;
        }
        if (txtUsername.value.trim() == "") {
            Errorinput(txtUsername);
            return;
        }
        if (txtPassword.value.trim() == "") {
            Errorinput(txtPassword);
            return;
        }
        var USER = USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == txtUsername.value.trim().toLowerCase() && x.USER_PASSWORD == txtPassword.value.trim() && x.USER_ACTIVE == true; });
        if (USER.length > 0) {
            debugger;
            SystemEnv.UserCode = txtUsername.value.trim();
            SystemEnv.JobTitle = setVal(USER[0].JobTitle);
            SystemEnv.I_Control = Control[0];
            SystemEnv.VendorID = setVal(USER[0].VendorID);
            SystemEnv.SalesManID = setVal(USER[0].SalesManID);
            SystemEnv.Vnd_CompName = setVal(USER[0].Vnd_CompName);
            document.cookie = "Harley_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
            $('.Layout_Home').removeClass('display_none');
            OpenPage("Home");
        }
        else {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
        }
    }
    function SubmitRegister() {
        debugger;
        if ($('#Reg_Comp_Name').val().trim() == "") {
            Errorinput($('#Reg_Comp_Name'), "Please a Enter Company Name 🤨");
            return;
        }
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
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail 😡");
            return;
        }
        else if (setVal($("#Reg_FrontID_Img").attr("Name_Img")) == "") {
            Errorinput($('#Reg_FrontID_Img'), "Please a Enter FrontID Img 😡");
            return;
        }
        else if (setVal($("#Reg_BackID_Img").attr("Name_Img")) == "") {
            Errorinput($('#Reg_BackID_Img'), "Please a Enter BackID Img 😡");
            return;
        }
        //else if ($('#Reg_ID_Num').val().trim() == "") {
        //    Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number 😡");
        //    return
        //}
        //let USERID_Num = USERS.filter(x => x.Fax == $('#Reg_ID_Num').val().trim().toLowerCase())
        //if (USERID_Num.length > 0) {
        //    Errorinput($('#Reg_ID_Num'), "This ID Number is already used 🤣");
        //    return
        //}
        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name 😡");
            return;
        }
        var USER = USERS.filter(function (x) { return x.USER_CODE.toLowerCase() == $('#Reg_UserName').val().trim().toLowerCase(); });
        if (USER.length > 0) {
            Errorinput($('#Reg_UserName'), "This User is already used 🤣");
            return;
        }
        else if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password 😡");
            return;
        }
        else if ($('#Reg_Validation_Code').val().trim() == "") {
            Errorinput($('#Reg_Validation_Code'), "Please a Enter Valid Code 😡");
            return;
        }
        else if ($('#Reg_Validation_Code').val().trim() != Control[0].InvoiceTransCode.toString()) {
            Errorinput($('#Reg_Validation_Code'), "Error Valid Code 😡");
            return;
        }
        var Name = $('#Reg_Full_Name').val().trim();
        var address = $('#Reg_Address').val().trim();
        var Mobile = $('#Reg_Mobile').val().trim();
        var IDNO = "";
        var Email = $('#Reg_Mail').val().trim();
        var UserName = $('#Reg_UserName').val().trim();
        var Password = $('#Reg_Password').val().trim();
        var CompName = $('#Reg_Comp_Name').val().trim();
        var Type_Payment = $('#Reg_Type_Payment').val();
        var FrontID_Img = $("#Reg_FrontID_Img").attr("Name_Img").trim();
        var BackID_Img = $("#Reg_BackID_Img").attr("Name_Img").trim();
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("Seller", "SignUp"),
            data: { CompCode: SystemEnv.CompCode, BranchCode: SystemEnv.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, CompName: CompName, Type_Payment: Type_Payment, FrontID_Img: FrontID_Img, BackID_Img: BackID_Img },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
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
                { NameTable: 'I_Control', Condition: " CompCode = " + $('#CompCode').val() + "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var _USER = GetDataTable('G_USERS');
        USERS.push(_USER[0]);
        ShowMessage("Inserted 😍");
        $('#login_button').click();
        $('#txtUsername').val($('#Reg_UserName').val().trim());
        $('#txtPassword').val("");
        setTimeout(function () {
            $('#txtPassword').focus();
        }, 200);
        SetGlopelDataUser(USERS);
        Control = GetDataTable('I_Control');
        SystemEnv.I_Control = Control[0];
    }
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map