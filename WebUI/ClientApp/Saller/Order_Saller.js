$(document).ready(function () {
    Order_Saller.InitalizeComponent();
});
var Order_Saller;
(function (Order_Saller) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Id_Back;
    var Id_Next;
    var Id_Back_Step2;
    var Id_Next_Step2;
    var Id_Finish;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
    }
    Order_Saller.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Id_Back = document.getElementById("Id_Back");
        Id_Next = document.getElementById("Id_Next");
        Id_Back_Step2 = document.getElementById("Id_Back_Step2");
        Id_Next_Step2 = document.getElementById("Id_Next_Step2");
        Id_Finish = document.getElementById("Id_Finish");
    }
    function InitializeEvents() {
        Id_Next.onclick = _Next;
        Id_Back.onclick = _Back;
        Id_Back_Step2.onclick = _Back_Step2;
        Id_Next_Step2.onclick = _Next_Step2;
        Id_Finish.onclick = _Finish;
    }
    function _Next() {
        $('#Id_Div_Next').addClass('display_none');
        $('#Id_Div_Back').removeClass('display_none');
        $('#Id_Div_Next_Step2').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Item').removeClass('display_none');
    }
    function _Back() {
        $('#Id_Div_Next').removeClass('display_none');
        $('#Id_Div_Back').addClass('display_none');
        $('#Id_Div_Next_Step2').addClass('display_none');
        $('#Id_Div_Finish').addClass('display_none');
        $('#Id_Div_Back_Step2').addClass('display_none');
        $('#Div_Item').addClass('display_none');
        $('#Div_Review_invoice').addClass('display_none');
        $('#Div_Header').removeClass('display_none');
    }
    function _Back_Step2() {
        $('#Id_Div_Next_Step2').removeClass('display_none');
        $('#Id_Div_Back').removeClass('display_none');
        $('#Id_Div_Back_Step2').addClass('display_none');
        $('#Id_Div_Finish').addClass('display_none');
        $('#Div_Item').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Review_invoice').addClass('display_none');
    }
    function _Next_Step2() {
        $('#Id_Div_Next_Step2').addClass('display_none');
        $('#Id_Div_Back').addClass('display_none');
        $('#Id_Div_Back_Step2').removeClass('display_none');
        $('#Id_Div_Finish').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Item').addClass('display_none');
        $('#Div_Review_invoice').removeClass('display_none');
    }
    function _Finish() {
        alert("Finish");
        _Back();
    }
})(Order_Saller || (Order_Saller = {}));
//# sourceMappingURL=Order_Saller.js.map