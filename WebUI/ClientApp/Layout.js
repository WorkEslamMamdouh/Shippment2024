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
        setInterval(RunHarley, 11000);
    }
    Layout.InitalizeComponent = InitalizeComponent;
    function RunHarley() {
        $('#Photo_Harley').removeClass("animate__animated animate__backInRight");
        $('#Photo_Harley').addClass("animate__animated animate__bounceOutLeft");
        $('#UserName').addClass("animate__animated animate__rubberBand");
        $('#Lab_Harley').removeClass("animate__animated animate__fadeInUpBig");
        $('#Lab_Harley').addClass("animate__animated animate__hinge");
        setTimeout(function () {
            $('#UserName').removeClass("animate__animated animate__rubberBand");
            $('#Lab_Harley').removeClass("animate__animated animate__hinge");
            $('#Lab_Harley').addClass("animate__animated animate__fadeInUpBig");
            $('#Photo_Harley').removeClass("animate__animated animate__bounceOutLeft");
            $('#Photo_Harley').addClass("animate__animated animate__backInRight");
        }, 3000);
    }
    function InitalizeControls() {
        Back_Page = document.getElementById("Back_Page");
    }
    function InitializeEvents() {
        Back_Page.onclick = Back_Page_Partial;
    }
})(Layout || (Layout = {}));
//# sourceMappingURL=Layout.js.map