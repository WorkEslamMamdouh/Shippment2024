$(document).ready(function () {
    Home.InitalizeComponent();
});
var Home;
(function (Home) {
    var sys = new SystemTools();
    var Btn_Order_Saller;
    var txtUsername;
    var txtPassword;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
    }
    Home.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Btn_Order_Saller = document.getElementById("Btn_Order_Saller");
    }
    function InitializeEvents() {
        Btn_Order_Saller.onclick = Btn_Order_Saller_OnClick;
    }
    function Btn_Order_Saller_OnClick() {
        $('.Layout_Home').removeClass('display_none');
        OpenPagePartial("Order_Saller", "Ord Saller");
    }
})(Home || (Home = {}));
//# sourceMappingURL=Home.js.map