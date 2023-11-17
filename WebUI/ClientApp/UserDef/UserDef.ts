
$(document).ready(() => {
    UserDef.InitalizeComponent();

});

namespace UserDef {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();

    var _USERS: Array<G_USERS> = new Array<G_USERS>();
    var _USER: Array<G_USERS> = new Array<G_USERS>();
    var _G_Code: Array<G_Codes> = new Array<G_Codes>();
    var _Zones: Array<Zones> = new Array<Zones>();

    var Submit_Update_Profile: HTMLButtonElement;
    var Usr_UserType: HTMLSelectElement;

    export function InitalizeComponent() {

        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);

        InitalizeControls();
        InitializeEvents();

        let User = SysSession.CurrentEnvironment.UserCode; 
        $('#Submit_Update_Profile').val('Add')
        $('#Usr_UserCode').removeAttr('disabled')

        Display_Data();

        if (localStorage.getItem("TypePage") == "UserControl") {
            User = localStorage.getItem("UserControl");
            $('#Submit_Update_Profile').val('Update')
            $('#Usr_UserCode').attr('disabled', 'disabled')
        }
        _USERS = GetGlopelDataUser()
        _USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == User.toLowerCase())

        if (localStorage.getItem("TypePage") == "UserControl") {
            Display_User();

            if (Number(_USER[0].SalesManID) != 0) { 
                $('#Usr_UserType').attr('disabled', 'disabled') 
            }
        }

        Close_Loder();
    }
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile") as HTMLButtonElement;
        Usr_UserType = document.getElementById("Usr_UserType") as HTMLSelectElement;
    }
    function InitializeEvents() {

        Submit_Update_Profile.onclick = SubmitUpdate;
        Usr_UserType.onchange = UserType_Change;
    }
    function Display_User() {
        debugger

        $('#Usr_Full_Name').val(_USER[0].USER_NAME);
        $('#Usr_Address').val(_USER[0].Address);
        $('#Usr_Mobile').val(_USER[0].Mobile);
        $('#Usr_ID_Num').val(_USER[0].Fax);
        $('#Usr_Mail').val(_USER[0].Email);
        $('#Usr_Gender').val(_USER[0].REGION_CODE);
        $('#Usr_UserCode').val(_USER[0].USER_CODE);
        $('#Usr_UserType').val(_USER[0].USER_TYPE);
        if (Number(_USER[0].CashBoxID) != 0) {
            $('#Usr_Zone').val(_USER[0].CashBoxID); 
        }
        else { 
                $('#Usr_Zone').prop('selectedIndex',0);
        }
        $('#Usr_Password').val(_USER[0].USER_PASSWORD);
        UserType_Change();

    }
    function Display_Data() {
        debugger
        $('#DivContainer :input').val("");
        $('#Usr_Gender').val("1");
        $('#Submit_Update_Profile').val("Add");

        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType= 'UserType' and CodeValue not in (1,10)" },
                { NameTable: 'Zones', Condition: "" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        debugger
        _G_Code = GetDataTable('G_Codes');
        _Zones = GetDataTable('Zones');
        FillDropwithAttr(_G_Code, "Usr_UserType", "CodeValue", "DescA", "No", "", "");
        FillDropwithAttr(_Zones, "Usr_Zone", "ZoneID", "DescA", "No", "", "");
    }
    function UserType_Change() {
        if (Usr_UserType.value == "11") {
            $('#div_zone').removeClass('display_none');
        } else {
            $('#div_zone').addClass('display_none');
        }
    }
    function SubmitUpdate() {
        debugger
        if ($('#Usr_Full_Name').val().trim() == "") {
            Errorinput($('#Usr_Full_Name'), "Please a Enter Name 🤨");
            return
        }
        if ($('#Usr_Address').val().trim() == "") {
            Errorinput($('#Usr_Address'), "Please a Enter Address 🤨");
            return
        }
        if ($('#Usr_Mobile').val().trim() == "") {
            Errorinput($('#Usr_Mobile'), "Please a Enter Mobile 🤨");
            return
        }
        if ($('#Usr_ID_Num').val().trim() == "") {
            Errorinput($('#Usr_ID_Num'), "Please a Enter Identity No 🤨");
            return
        }
        if ($('#Usr_Mail').val().trim() == "") {
            Errorinput($('#Usr_Mail'), "Please a Enter Mail 🤨");
            return
        }
        if ($('#Usr_UserCode').val().trim() == "") {
            Errorinput($('#Usr_UserCode'), "Please a Enter User Name 🤨");
            return
        }
        if ($('#Usr_Password').val().trim() == "") {
            Errorinput($('#Usr_Password'), "Please a Enter User Password 🤨");
            return
        }
        debugger

        let Name = $('#Usr_Full_Name').val();
        let address = $('#Usr_Address').val();
        let Mobile = $('#Usr_Mobile').val();
        let IDNO = $('#Usr_ID_Num').val();
        let Email = $('#Usr_Mail').val();
        let Gender = $('#Usr_Gender').val();
        let UserName = $('#Usr_UserCode').val();
        let Password = $('#Usr_Password').val();
        let ZoneID = Number($('#Usr_Zone').val());
        let UserType = Number(Usr_UserType.value);
        let SalesManID = Number(_USER[0].SalesManID);
        let NameFun;
        debugger

        if (localStorage.getItem("TypePage") == "UserControl") {
            if (SalesManID == 0) {
                NameFun = Usr_UserType.value == "11" ? "InsertSalesMan" : "InsertUser";
            }
            else {
                NameFun = Usr_UserType.value == "11" ? "UpdateSalesMan" : "InsertUser";
            }
        }
        else { 
            NameFun = Usr_UserType.value == "11" ? "InsertSalesMan" : "InsertUser";
        }
        debugger

        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesMan", NameFun),
            data: { CompCode: 1, BranchCode: 1, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, SalesManID: SalesManID, ZoneID: ZoneID, UserType: UserType, Gender: Gender },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    GetUSERSByCodeUser(UserName);
                    Display_Data();
                    UserType_Change();
                    $('#Back_Page').click();
                    $("#Display_Back_Page").click();
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
        _USERS = _USERS.filter(x => x.USER_CODE != User_Code)
        _USERS.push(_USER[0]);

        SetGlopelDataUser(_USERS);
        ShowMessage("Done 🤞😉")
    }


}
