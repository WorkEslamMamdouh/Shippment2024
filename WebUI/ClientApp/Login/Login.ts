
$(document).ready(() => { 
    Login.InitalizeComponent();
    
});

namespace Login {
    var sys: SystemTools = new SystemTools();
    var SystemEnv: SystemEnvironment = new SystemEnvironment();

    var USERS: Array<G_USERS> = new Array <G_USERS>();
    var Control: Array<I_Control> = new Array<I_Control>();


    var Submit_Login: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;

    export function InitalizeComponent() {

        var today: Date = new Date(); 
        var yyyy = today.getFullYear();
        SystemEnv.ScreenLanguage = "en";
        SystemEnv.CurrentYear = yyyy.toString();
        SystemEnv.CompCode = $('#CompCode').val();
        SystemEnv.BranchCode = $('#BranchCode').val();
        SystemEnv.CompanyName = $('#CompanyName').val();
        

        InitalizeControls();
        InitializeEvents();


        Event_key('Enter', 'txtUsername', 'Submit_Login');

        Event_key('Enter', 'txtPassword', 'Submit_Login');

        GetData_Header();
    }
    function InitalizeControls() {
        Submit_Login = document.getElementById("Submit_Login") as HTMLButtonElement;
        txtUsername = document.getElementById("txtUsername") as HTMLInputElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
    }
    function InitializeEvents() {
         
        Submit_Login.onclick = SubmitLogin;
        
    }

    function GetData_Header() {
        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'G_USERS', Condition: "" }, 
            { NameTable: 'I_Control', Condition: " CompCode = " + $('#CompCode').val()+"" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        
          USERS = GetDataTable('G_USERS');
          Control = GetDataTable('I_Control'); 
    }

    function SubmitLogin() {

        debugger
        if (txtUsername.value.trim() == "" && txtPassword.value.trim() == "") {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
            return
        }
         
        if (txtUsername.value.trim() == "") {
            Errorinput(txtUsername);
            return
        }

        if (txtPassword.value.trim() == "") {
            Errorinput(txtPassword);
            return
        }

        let USER = USERS.filter(x => x.USER_CODE == txtUsername.value.trim().toLowerCase() && x.USER_PASSWORD == txtPassword.value.trim() && x.USER_ACTIVE == true)

        if (USER.length > 0) {
            debugger
            SystemEnv.UserCode = txtUsername.value.trim();
            SystemEnv.JobTitle = setVal(USER[0].JobTitle);
            SystemEnv.I_Control = Control[0];
            document.cookie = "Harley_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";

            $('.Layout_Home').removeClass('display_none');
            OpenPage("Home");
        }
        else {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
        }
        
    }

    
     
}
