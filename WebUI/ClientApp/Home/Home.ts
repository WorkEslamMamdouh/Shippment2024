
$(document).ready(() => {
    Home.InitalizeComponent();

});

namespace Home {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var btn_Logout: HTMLButtonElement;  
     

    export function InitalizeComponent() {
        debugger
        $('#UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#JobTitle').html(SysSession.CurrentEnvironment.JobTitle); 

        InitalizeControls();
        InitializeEvents();
        ApplyModules();
        Close_Loder();
    }
    function InitalizeControls() {
        btn_Logout = document.getElementById("btn_Logout") as HTMLButtonElement;  
    }
    function InitializeEvents() {

        btn_Logout.onclick = btn_LogoutUesr;  

        $('._MODULE_CODE').click(function (e) {
            debugger
            let _idBtn = $(this).attr('id');
            let _NameScreen = $(this).attr('NameScreen');

            $('.Layout_Home').removeClass('display_none');
            OpenPagePartial(_idBtn, _NameScreen);
        });
    }
     
    function btn_LogoutUesr() {

        $('.Layout_Home').addClass('display_none');
        OpenPage("Login");

    } 
   
    function ApplyModules() {
    
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode =  SysSession.CurrentEnvironment.BranchCode;
        let UserCode =  SysSession.CurrentEnvironment.UserCode;
        let SystemCode =  'I';
        let SubSystemCode ='I';
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

        debugger
        // filter moulules where isavailable = false or access = false 
        let MODULE_CODE; 
        for (var i = 0; i < modules.length; i++) {
             
            let singleUserModule: UserPrivilege = modules[i];
            debugger

            MODULE_CODE = document.getElementById(singleUserModule.MODULE_CODE)  
            debugger
            if (MODULE_CODE != null) {
                try {
                    if (singleUserModule != null) {
                        if (singleUserModule.Access === true && singleUserModule.AVAILABLE === true) {

                            $('#' + singleUserModule.MODULE_CODE + '').removeClass('hidden_Control');
                        } 
                    }
                    debugger

                }
                catch (e) {

                }



            } else {
                //ShowMessage("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
          
    }

}
