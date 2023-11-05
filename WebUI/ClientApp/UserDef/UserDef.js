$(document).ready(function () {
    UserDef.InitalizeComponent();
});
var UserDef;
(function (UserDef) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USERS = new Array();
    var _USER = new Array();
    var _G_Code = new Array();
    var Submit_Update_Profile;
    function InitalizeComponent() {
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE == SysSession.CurrentEnvironment.UserCode; });
        Display_Data();
        Close_Loder();
    }
    UserDef.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
    }
    function InitializeEvents() {
        //Submit_Update_Profile.onclick = SubmitUpdate;
    }
    function Display_Data() {
        debugger;
        var Table;
        Table =
            [
                { NameTable: 'G_Codes', Condition: "CodeType= 'UserType' and CodeValue not in (1,10)" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _G_Code = GetDataTable('G_Codes');
        FillDropwithAttr(_G_Code, "Usr_UserType", "CodeValue", "DescA", "No", "", "");
    }
})(UserDef || (UserDef = {}));
//# sourceMappingURL=UserDef.js.map