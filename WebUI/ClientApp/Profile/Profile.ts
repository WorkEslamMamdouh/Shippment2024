﻿
$(document).ready(() => { 
    Profile.InitalizeComponent();
    
});

namespace Profile {
    var sys: SystemTools = new SystemTools(); 
    var SysSession: SystemSession = GetSystemSession();

    var _USERS: Array<G_USERS> = new Array<G_USERS>();
    var _USER: Array<G_USERS> = new Array<G_USERS>();

    var Submit_Update_Profile: HTMLButtonElement;

    export function InitalizeComponent() {
   
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);

        InitalizeControls();
        InitializeEvents();

         
        _USERS = GetGlopelDataUser()
          _USER = _USERS.filter(x => x.USER_CODE == SysSession.CurrentEnvironment.UserCode)
        Display_Data();
    }
    function InitalizeControls() { 
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile") as HTMLButtonElement;
    }
    function InitializeEvents() {
          
        Submit_Update_Profile.onclick = SubmitUpdate;
        
    }

    function Display_Data() {
        debugger
        
        $('#Reg_Full_Name').val(_USER[0].USER_NAME)
        $('#Reg_Address').val(_USER[0].Address)
        $('#Reg_Mobile').val(_USER[0].Mobile)
        $('#Reg_Mail').val(_USER[0].Email)
        $('#Reg_ID_Num').val(_USER[0].Fax)
        $('#Reg_Password').val(_USER[0].USER_PASSWORD)
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
        let USERID_Num = _USERS.filter(x => x.Fax == $('#Reg_ID_Num').val().trim() && x.USER_CODE != _USER[0].USER_CODE)
        if (USERID_Num.length > 0) {
            Errorinput($('#Reg_ID_Num'), "This ID Number is already used");
            return
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail" );
            return
        }
       
        else if ($('#Reg_Password').val().trim() == "") {
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
            url: sys.apiUrl("Seller", "Update"),
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, VendorId: _USER[0].SalesManID },
            success: (d) => {//int CompCode,int BranchCode,string Name,string address , string Mobile ,string IDNO,string Email,string UserName,string Password,string UserCode,string Token
                let result = d as BaseResponse;
                if (result.IsSuccess == true) { 
                    GetUSERSByCodeUser(UserName);

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
        _USERS = _USERS.filter(x => x.USER_CODE != User_Code)
        _USERS.push(_USER[0]);
         
        SetGlopelDataUser(_USERS);
    }

     
}
