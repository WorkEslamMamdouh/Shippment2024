$(document).ready(function () {
    Login.InitalizeComponent();
});
var Login;
(function (Login) {
    var sys = new SystemTools();
    var SystemEnv = new SystemEnvironment();
    var USERS = new Array();
    var Control = new Array();
    var Submit_Login;
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
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
    }
    Login.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Login = document.getElementById("Submit_Login");
        txtUsername = document.getElementById("txtUsername");
        txtPassword = document.getElementById("txtPassword");
    }
    function InitializeEvents() {
        Submit_Login.onclick = SubmitLogin;
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
        var USER = USERS.filter(function (x) { return x.USER_CODE == txtUsername.value.trim().toLowerCase() && x.USER_PASSWORD == txtPassword.value.trim() && x.USER_ACTIVE == true; });
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
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map