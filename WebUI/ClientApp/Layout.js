$(document).ready(function () {
    try {
        Layout.InitalizeComponent();
    }
    catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");
    }
});
var Layout;
(function (Layout) {
    var sys = new SystemTools();
    var Back_Page;
    function InitalizeComponent() {
        debugger;
        GetAllPages();
        InitalizeControls();
        InitializeEvents();
    }
    Layout.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Back_Page = document.getElementById("Back_Page");
    }
    function InitializeEvents() {
        Back_Page.onclick = Back_Page_Partial;
    }
})(Layout || (Layout = {}));
//# sourceMappingURL=Layout.js.map