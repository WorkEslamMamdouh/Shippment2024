
$(document).ready(() => { 
    Profile.InitalizeComponent();
    
});

namespace Profile {
    var sys: SystemTools = new SystemTools(); 
    var SysSession: SystemSession = GetSystemSession();

     
    var Submit_Register: HTMLButtonElement; 

    export function InitalizeComponent() {
   
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);

        InitalizeControls();
        InitializeEvents();

         
         
         
    }
    function InitalizeControls() { 
      //Submit_Register = document.getElementById("Submit_Register") as HTMLButtonElement; 
    }
    function InitializeEvents() {
          
        //Submit_Register.onclick = SubmitRegister; 
        
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
 
    }

   


    function SubmitUpdate() {
         
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name" );
            return
        } 
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address" );
            return
        } 
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile" );
            return
        } 
        else if ($('#Reg_ID_Num').val().trim() == "") {
            Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number" );
            return
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail" );
            return
        }
        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name" );
            return
        } 
        if ($('#Reg_Password').val().trim() == "") {
             Errorinput($('#Reg_Password'), "Please a Enter Password" );
            return
        }

        let Name = $('#Reg_Full_Name').val().trim();
        let address = $('#Reg_Address').val().trim();
        let Mobile = $('#Reg_Mobile').val().trim();
        let IDNO = $('#Reg_ID_Num').val().trim();
        let Email = $('#Reg_Mail').val().trim();
        let UserName = $('#Reg_UserName').val().trim();
        let Password = $('#Reg_Password').val().trim();


        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Seller", "SignUp"),
            //data: { CompCode: SystemEnv.CompCode, BranchCode: SystemEnv.BranchCode, Name: Name , address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password },
            success: (d) => {//int CompCode,int BranchCode,string Name,string address , string Mobile ,string IDNO,string Email,string UserName,string Password,string UserCode,string Token
                let result = d as BaseResponse;
                if (result.IsSuccess == true) { 
                    let res = result.Response as IQ_GetSlsInvoiceStatisticVer2;
                  
                } else {
                   
                }
            }
        });

    }

     
}
