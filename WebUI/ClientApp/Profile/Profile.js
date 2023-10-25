$(document).ready(function () {
    Profile.InitalizeComponent();
});
var Profile;
(function (Profile) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Submit_Register;
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //Submit_Register = document.getElementById("Submit_Register") as HTMLButtonElement; 
    }
    function InitializeEvents() {
        //Submit_Register.onclick = SubmitRegister; 
    }
    function GetData_Header() {
        var Table;
        Table =
            [
                { NameTable: 'G_USERS', Condition: "" },
                { NameTable: 'I_Control', Condition: " CompCode = " + $('#CompCode').val() + "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
    }
    function SubmitRegister() {
        if ($('#Reg_Full_Name').val().trim() == "") {
            Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name");
            return;
        }
        else if ($('#Reg_Address').val().trim() == "") {
            Errorinput($('#Reg_Address'), "Please a Enter Address");
            return;
        }
        else if ($('#Reg_Mobile').val().trim() == "") {
            Errorinput($('#Reg_Mobile'), "Please a Enter Mobile");
            return;
        }
        else if ($('#Reg_ID_Num').val().trim() == "") {
            Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number");
            return;
        }
        else if ($('#Reg_Mail').val().trim() == "") {
            Errorinput($('#Reg_Mail'), "Please a Enter Mail");
            return;
        }
        else if ($('#Reg_UserName').val().trim() == "") {
            Errorinput($('#Reg_UserName'), "Please a Enter User Name");
            return;
        }
        if ($('#Reg_Password').val().trim() == "") {
            Errorinput($('#Reg_Password'), "Please a Enter Password");
            return;
        }
        var Name = $('#Reg_Full_Name').val().trim();
        var address = $('#Reg_Address').val().trim();
        var Mobile = $('#Reg_Mobile').val().trim();
        var IDNO = $('#Reg_ID_Num').val().trim();
        var Email = $('#Reg_Mail').val().trim();
        var UserName = $('#Reg_UserName').val().trim();
        var Password = $('#Reg_Password').val().trim();
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("Seller", "SignUp"),
            //data: { CompCode: SystemEnv.CompCode, BranchCode: SystemEnv.BranchCode, Name: Name , address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    var res = result.Response;
                }
                else {
                }
            }
        });
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map