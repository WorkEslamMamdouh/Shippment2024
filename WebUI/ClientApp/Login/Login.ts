
$(document).ready(() => {
    Login.InitalizeComponent();

});

namespace Login {
    var sys: SystemTools = new SystemTools();
    var SystemEnv: SystemEnvironment = new SystemEnvironment();

    var USERS: Array<G_USERS> = new Array<G_USERS>();
    var Control: Array<I_Control> = new Array<I_Control>();


    var rgstr_button: HTMLButtonElement;
    var Submit_Register: HTMLButtonElement;
    var Submit_Login: HTMLButtonElement;
    var txtUsername: HTMLInputElement;
    var txtPassword: HTMLInputElement;

    export function InitalizeComponent() {
        $('#bodyLogin').addClass('hidden_Control');
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

        Event_key('Enter', 'Reg_Password', 'Submit_Register');

        setTimeout(function () {
            USERS = GetGlopelDataUser();
            USERS.length == 0 ? GetData_Header() : null
            Close_Loder();
        }, 300);
      

        $('#bodyLogin').removeClass('hidden_Control');

    }
    function InitalizeControls() {
        rgstr_button = document.getElementById("rgstr_button") as HTMLButtonElement;
        Submit_Login = document.getElementById("Submit_Login") as HTMLButtonElement;
        Submit_Register = document.getElementById("Submit_Register") as HTMLButtonElement;
        txtUsername = document.getElementById("txtUsername") as HTMLInputElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
    }
    function InitializeEvents() {

        Submit_Login.onclick = SubmitLogin;
        Submit_Register.onclick = SubmitRegister;
        rgstr_button.onclick = () => { $('._Clear_Reg').val('') };

    }

    function GetData_Header() {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_USERS', Condition: "" },
                { NameTable: 'I_Control', Condition: " CompCode = " + $('#CompCode').val() + "" },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        USERS = GetDataTable('G_USERS');
        Control = GetDataTable('I_Control');
        SetGlopelDataUser(USERS);
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

        let USER = USERS.filter(x => x.USER_CODE.toLowerCase() == txtUsername.value.trim().toLowerCase() && x.USER_PASSWORD == txtPassword.value.trim() && x.USER_ACTIVE == true)

        if (USER.length > 0) {
            debugger
            SystemEnv.UserCode = txtUsername.value.trim();
            SystemEnv.JobTitle = setVal(USER[0].JobTitle);
            SystemEnv.I_Control = Control[0];
            SystemEnv.VendorID = setVal(USER[0].SalesManID);
            document.cookie = "Harley_systemProperties=" + encodeURIComponent(JSON.stringify(SystemEnv).toString()) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";

            $('.Layout_Home').removeClass('display_none');
            OpenPage("Home");
        }
        else {
            Errorinput(txtUsername);
            Errorinput(txtPassword);
        }

    }


    function SubmitRegister() {

        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name 😡");
            return
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address 😡");
            return
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile 😡");
            return
        }
        else if ($('#Reg_ID_Num').val().trim() == "") {
            Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number 😡");
            return
        }
        let USERID_Num = USERS.filter(x => x.Fax == $('#Reg_ID_Num').val().trim().toLowerCase())
        if (USERID_Num.length > 0) {
            Errorinput($('#Reg_ID_Num'), "This ID Number is already used 🤣");
            return
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail 😡");
            return
        }
        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name 😡");
            return
        }
        let USER = USERS.filter(x => x.USER_CODE.toLowerCase() == $('#Reg_UserName').val().trim().toLowerCase())
        if (USER.length > 0) {
            Errorinput($('#Reg_UserName'), "This User is already used 🤣");
            return
        }
        if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password 😡");
            return
        }

        let Name = $('#Reg_Full_Name').val().trim();
        let address = $('#Reg_Address').val().trim();
        let Mobile = $('#Reg_Mobile').val().trim();
        let IDNO = $('#Reg_ID_Num').val().trim();
        let Email = $('#Reg_Mail').val().trim();
        let UserName = $('#Reg_UserName').val().trim();
        let Password = $('#Reg_Password').val().trim();



        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("Seller", "SignUp"),
            data: { CompCode: SystemEnv.CompCode, BranchCode: SystemEnv.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password },
            success: (d) => {//int CompCode,int BranchCode,string Name,string address , string Mobile ,string IDNO,string Email,string UserName,string Password,string UserCode,string Token
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);

                    Close_Loder();
                } else {

                }
            }
        });

    }



    function GetUSERSByCodeUser(User_Code: string) {
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_USERS', Condition: " USER_CODE = N'" + User_Code + "'" },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        let _USER = GetDataTable('G_USERS');
        USERS.push(_USER[0]);
        ShowMessage("Inserted 😍")
        $('#login_button').click();
        $('#txtUsername').val($('#Reg_UserName').val().trim())
        $('#txtPassword').val("")
        setTimeout(function () {
            $('#txtPassword').focus();
        }, 200);

        SetGlopelDataUser(USERS);
    }
}
