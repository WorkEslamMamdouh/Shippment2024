$(document).ready(function () {
    Login.InitalizeComponent();
});
var Login;
(function (Login) {
    var sys = new SystemTools();
    var Submit_Login;
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Event_key('Enter', 'txtUsername', 'Submit_Login');
        Event_key('Enter', 'txtPassword', 'Submit_Login');
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
        $('.Layout_Home').removeClass('display_none');
        OpenPage("Home");
    }
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map