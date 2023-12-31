$(document).ready(function () {
    try {
        HomeComponent.InitalizeComponent();
    }
    catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");
    }
});
var HomeComponent;
(function (HomeComponent) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession('Home');
    $('Li').addClass('animate__animated animate__fadeInTopRight');
    $('#logOrg').addClass('animate__animated animate__backInDown');
    function InitalizeComponent() {
        GetAllPages();
        ApplyModules();
        InitializePages();
    }
    HomeComponent.InitalizeComponent = InitalizeComponent;
    function InitializePages() {
        $("#btnSlsTrSalesManagerNew").click(function () { OpenPage(Modules.SlsTrSalesManagerNew); });
        $("#btnSlsTrShowPrice").click(function () { OpenPage(Modules.SlsTrShowPrice); });
    }
    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        var obj = [document.getElementById('liItem')];
        var modules = new Array();
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
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
        // filter moulules where isavailable = false or access = false 
        var li;
        var li_T;
        for (var i = 0; i < modules.length; i++) {
            var singleUserModule = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE);
                li_T = document.getElementById("btn" + singleUserModule.MODULE_CODE + "T");
            }
            if (li != null) {
                try {
                    if (singleUserModule != null) {
                        if (singleUserModule.Access === false) {
                            li.style.display = "none";
                            li_T.style.display = "none";
                        }
                        if (singleUserModule.AVAILABLE === false) {
                            li.style.display = "none";
                            li_T.style.display = "none";
                        }
                    }
                    else {
                        var key = li.getAttribute("key");
                        li.style.display = "";
                        li_T.style.display = "";
                        li.className = "liItem";
                        li_T.className = "liItem";
                    }
                }
                catch (e) {
                }
            }
            else {
                //alert("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
        $('.MED').removeClass('display_none');
        if (SysSession.CurrentEnvironment.I_Control[0].GL_VoucherCCDT_Type != 1) {
            $('#btnDtcostcenter').addClass('display_none');
            $('#btnDtcostcenterT').addClass('display_none');
            $('#btnCcdtAccState').addClass('display_none');
            $('#btnCcdtAccStateT').addClass('display_none');
        }
    }
    function LogoutUserApi() {
        var userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: function (d) {
                if (d !== undefined) {
                    window.open(Url.Action("HomePage", "Login"), "_self");
                    return;
                }
            }
        });
    }
    HomeComponent.LogoutUserApi = LogoutUserApi;
    ;
})(HomeComponent || (HomeComponent = {}));
//# sourceMappingURL=HomeComponent.js.map