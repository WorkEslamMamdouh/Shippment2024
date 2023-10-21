$(document).ready(function () {
    Login.InitalizeComponent();
});
var Login;
(function (Login) {
    var sys = new SystemTools();
    var Submit_Login;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
    }
    Login.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Login = document.getElementById("Submit_Login");
    }
    function InitializeEvents() {
        Submit_Login.onclick = SubmitLogin;
    }
    function SubmitLogin() {
        debugger;
        $('.Layout_Home').removeClass('display_none');
        OpenPage("Home");
    }
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map