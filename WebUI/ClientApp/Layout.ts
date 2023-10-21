
$(document).ready(() => {
    try {

        Layout.InitalizeComponent();
    } catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");

    }
});

namespace Layout {
    var sys: SystemTools = new SystemTools();  
    var SysSession: SystemSession = GetSystemSession('Home'); 

       
    
    $('Li').addClass('animate__animated animate__fadeInTopRight');
    $('#logOrg').addClass('animate__animated animate__backInDown'); 

    export function InitalizeComponent() {

        GetAllPages();
        //ApplyModules(); 
        //InitializePages();

       

    } 
    function InitializePages() {
        $("#btnSlsTrSalesManagerNew").click(() => { OpenPage(Modules.SlsTrSalesManagerNew); })
        $("#btnSlsTrShowPrice").click(() => { OpenPage(Modules.SlsTrShowPrice); })
         
    }

    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        let obj = [document.getElementById('liItem')];
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;

         Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (d) => {

                modules = d as Array<UserPrivilege>;
            }
        });
        // filter moulules where isavailable = false or access = false 
        let li;
        let li_T;
        for (var i = 0; i < modules.length; i++) {



            let singleUserModule: UserPrivilege = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }

            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE) as HTMLLIElement;
                li_T = document.getElementById("btn" + singleUserModule.MODULE_CODE + "T") as HTMLLIElement;
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
                        let key: string = li.getAttribute("key");
                        li.style.display = "";
                        li_T.style.display = "";
                        li.className = "liItem";
                        li_T.className = "liItem";
                    }

                } catch (e) {

                }



            } else {
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
    export function LogoutUserApi() {
        let userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: (d) => { 
                if (d !== undefined) {
                     
                    window.open(Url.Action("HomePage", "Login"), "_self");

                    return;
                }
            }
        });
    };
     
       
}
