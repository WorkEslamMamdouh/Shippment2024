$(document).ready(function () {
    Home.InitalizeComponent();
});
var Home;
(function (Home) {
    var sys = new SystemTools();
    var btn_Logout;
    var Btn_Order_Saller;
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
    }
    Home.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btn_Logout = document.getElementById("btn_Logout");
        Btn_Order_Saller = document.getElementById("Btn_Order_Saller");
    }
    function InitializeEvents() {
        btn_Logout.onclick = btn_LogoutUesr;
        Btn_Order_Saller.onclick = Btn_Order_Saller_OnClick;
    }
    function btn_LogoutUesr() {
        $('.Layout_Home').addClass('display_none');
        OpenPage("Login");
    }
    function Btn_Order_Saller_OnClick() {
        $('.Layout_Home').removeClass('display_none');
        OpenPagePartial("Order_Saller", "Ord Saller");
    }
})(Home || (Home = {}));
//# sourceMappingURL=Home.js.map