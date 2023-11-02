$(document).ready(function () {
    Home.InitalizeComponent();
});
var Home;
(function (Home) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var btn_Logout;
    function InitalizeComponent() {
        debugger;
        $('#UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        ApplyModules();
        Close_Loder();
    }
    Home.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btn_Logout = document.getElementById("btn_Logout");
    }
    function InitializeEvents() {
        btn_Logout.onclick = btn_LogoutUesr;
        $('._MODULE_CODE').click(function (e) {
            debugger;
            var _idBtn = $(this).attr('id');
            var _NameScreen = $(this).attr('NameScreen');
            $('.Layout_Home').removeClass('display_none');
            OpenPagePartial(_idBtn, _NameScreen);
        });
    }
    function btn_LogoutUesr() {
        $('.Layout_Home').addClass('display_none');
        OpenPage("Login");
    }
    function ApplyModules() {
        var modules = new Array();
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = 'I';
        var SubSystemCode = 'I';
        var CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: function (d) {
                modules = d;
            }
        });
        debugger;
        // filter moulules where isavailable = false or access = false 
        var MODULE_CODE;
        for (var i = 0; i < modules.length; i++) {
            var singleUserModule = modules[i];
            debugger;
            MODULE_CODE = document.getElementById(singleUserModule.MODULE_CODE);
            debugger;
            if (MODULE_CODE != null) {
                try {
                    if (singleUserModule != null) {
                        if (singleUserModule.Access === true && singleUserModule.AVAILABLE === true) {
                            $('#' + singleUserModule.MODULE_CODE + '').removeClass('hidden_Control');
                        }
                    }
                    debugger;
                }
                catch (e) {
                }
            }
            else {
                //ShowMessage("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
    }
})(Home || (Home = {}));
//# sourceMappingURL=Home.js.map