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
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
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
        GetData_Header();
        $('#bodyLogin').removeClass('hidden_Control');
    }
    Login.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        rgstr_button = document.getElementById("rgstr_button");
        Submit_Login = document.getElementById("Submit_Login");
        Submit_Register = document.getElementById("Submit_Register");
        txtUsername = document.getElementById("txtUsername");
        txtPassword = document.getElementById("txtPassword");
    }
    function InitializeEvents() {
        Submit_Login.onclick = SubmitLogin;
        Submit_Register.onclick = SubmitRegister;
        rgstr_button.onclick = function () { $('._Clear_Reg').val(''); };
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
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name");
            return;
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address");
            return;
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile");
            return;
        }
        else if ($('#Reg_ID_Num').val().trim() == "") {
            Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number");
            return;
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail");
            return;
        }
        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name");
            return;
        }
        var USER = USERS.filter(function (x) { return x.USER_CODE == $('#Reg_UserName').val().trim().toLowerCase(); });
        if (USER.length > 0) {
            Errorinput($('#Reg_UserName'), "This User is already used");
            return;
        }
        if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password");
            return;
        }
        var Name = $('#Reg_Full_Name').val().trim();
        var address = $('#Reg_Address').val().trim();
        var Mobile = $('#Reg_Mobile').val().trim();
        var IDNO = $('#Reg_ID_Num').val().trim();
        var Email = $('#Reg_Mail').val().trim();
        var UserName = $('#Reg_UserName').val().trim();
        var Password = $('#Reg_Password').val().trim();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Seller", "SignUp"),
            data: { CompCode: SystemEnv.CompCode, BranchCode: SystemEnv.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetData_Header();
                    ShowMessage("Success");
                    $('#login_button').click();
                }
                else {
                }
            }
        });
    }
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map