$(document).ready(function () {
    USERS.InitalizeComponent();
});
var USERS;
(function (USERS) {
    var sys = new SystemTools();
    var UserGrid = new JsGrid();
    var SysSession = GetSystemSession(Modules.USERS);
    var userObject = new G_USERS();
    var UserMasterDetail = new ModelUserMasterDetail();
    var ModelUser = new G_USERS();
    var singleUserRoles = new G_RoleUsers();
    var SingleUserBranch = new G_USER_BRANCH();
    /*----------------------------------------------------------------- Arrays --------------------------------------------------------------------- */
    var UserDetail = new Array();
    var RoleDetails = new Array();
    var BranchDetails = new Array();
    var UserBranchDetails = new Array();
    var SalesmanDetails = new Array();
    var UserTypeDetails = new Array();
    var CashboxDetails = new Array();
    var UserRoles = new Array();
    var ModelUserRoles = new Array();
    var ModelUserBranch = new Array();
    /*----------------------------------------------------------------- Variable --------------------------------------------------------------------- */
    var ScreenLanguage;
    var CompCode;
    var BraCode;
    var FinYear;
    var CountGridRole = 0;
    var CountGridBranch = 0;
    var IsNew = false;
    var showpss = false;
    var GlobalUserCode = "";
    /*----------------------------------------------------------------- Input Control------------------------------------------------------------------ */
    /*----------------General---------------*/
    var Screen_name;
    var drpStateType;
    var drpSalesman;
    /*----------------Details---------------*/
    var SearchGridUsers;
    var txtUser_Code;
    var txtPassword;
    var chkActive;
    var txtUser_Name;
    var txtDepartmentName;
    var txtJobTitle;
    var txtMobile;
    var txtEmail;
    var txtFirstLogin;
    var txtLastLogin;
    var txtCreatedBy;
    var txtCreatedAt;
    var txtUpdatedBy;
    var txtUpdatedAt;
    var drpuserType;
    var drpuserTypeDt;
    var drpCashBox;
    var drpSalesman;
    /*----------------------------------------------------------------- Button Control------------------------------------------------------------------ */
    /*----------------General---------------*/
    var showpass;
    var btnShow;
    var btnUpdate;
    var btnBack;
    var btnAdd;
    var btnSave;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var btnPrintTransaction;
    /*----------------Details---------------*/
    var btnGive_assignments;
    var btnLoadRoles;
    var btnBlock_permissions;
    var btnGive_assignmentsBr;
    var btnLoadBranchs;
    var btnBlock_permissionsBr;
    var btnAddRole;
    var btnAddBranch;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    /*----------------------------------------------------------------- General Func ------------------------------------------------------------------ */
    function InitalizeComponent() {
        $('#btnPrintTransaction').addClass('hidden_Control');
        $('#btnPrintTrview').addClass('hidden_Control');
        $('#btnPrintTrPDF').addClass('hidden_Control');
        $('#btnPrintTrEXEL').addClass('hidden_Control');
        ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        BraCode = Number(SysSession.CurrentEnvironment.BranchCode);
        FinYear = Number(SysSession.CurrentEnvironment.CurrentYear);
        InitalizeControls();
        InitalizeEvents();
        Screen_name.innerHTML = ScreenLanguage == "ar" ? "المستخدمين" : "Users";
        document.title = "SafePack V1.0-" + (ScreenLanguage == "ar" ? "المستخدمين" : "Users");
        InitializeGrid();
        GetRoles();
        GetBranchs();
        GetuserType();
        GetSalesman();
        GetCashBox();
        GetAllUsers();
        $(document).keydown(function (e) {
            debugger;
            if (showpss == true) {
                $('#txtPassword').attr('type', 'text');
                $('#showpass').removeClass('fa-eye-slash');
                $('#showpass').addClass('fa-eye');
            }
            else {
                $('#txtPassword').attr('type', 'password');
                $('#showpass').addClass('fa-eye-slash');
                $('#showpass').removeClass('fa-eye');
            }
        });
        $(document).click(function (e) {
            debugger;
            if (showpss == true) {
                $('#txtPassword').attr('type', 'text');
                $('#showpass').removeClass('fa-eye-slash');
                $('#showpass').addClass('fa-eye');
            }
            else {
                $('#txtPassword').attr('type', 'password');
                $('#showpass').addClass('fa-eye-slash');
                $('#showpass').removeClass('fa-eye');
            }
        });
    }
    USERS.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        /*----------------General---------------*/
        Screen_name = document.getElementById("Screen_name");
        drpStateType = document.getElementById("drpStateType");
        drpSalesman = document.getElementById("drpSalesman");
        drpuserType = document.getElementById("drpuserType");
        drpuserTypeDt = document.getElementById("drpuserTypeDt");
        drpSalesman = document.getElementById("drpSalesman");
        drpCashBox = document.getElementById("drpCashBox");
        /*----------------Details---------------*/
        SearchGridUsers = document.getElementById("SearchGridUsers");
        txtUser_Code = document.getElementById("txtUser_Code");
        txtPassword = document.getElementById("txtPassword");
        chkActive = document.getElementById("chkActive");
        txtUser_Name = document.getElementById("txtUser_Name");
        txtDepartmentName = document.getElementById("txtDepartmentName");
        txtJobTitle = document.getElementById("txtJobTitle");
        txtMobile = document.getElementById("txtMobile");
        txtEmail = document.getElementById("txtEmail");
        txtFirstLogin = document.getElementById("txtFirstLogin");
        txtLastLogin = document.getElementById("txtLastLogin");
        txtCreatedBy = document.getElementById("txtCreatedBy");
        txtCreatedAt = document.getElementById("txtCreatedAt");
        txtUpdatedBy = document.getElementById("txtUpdatedBy");
        txtUpdatedAt = document.getElementById("txtUpdatedAt");
        /*----------------------------------------------------------------- Button Control------------------------------------------------------------------ */
        /*----------------General---------------*/
        showpass = document.getElementById("showpass");
        btnShow = document.getElementById("btnShow");
        btnUpdate = document.getElementById("btnUpdate");
        btnBack = document.getElementById("btnBack");
        btnAdd = document.getElementById("btnAdd");
        btnSave = document.getElementById("btnSave");
        /*----------------Print---------------*/
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
        btnPrintTransaction = document.getElementById("btnPrintTransaction");
        /*----------------Details---------------*/
        btnAddRole = document.getElementById("btnAddRole");
        btnAddBranch = document.getElementById("btnAddBranch");
        btnGive_assignments = document.getElementById("btnGive_assignments");
        btnLoadRoles = document.getElementById("btnLoadRoles");
        btnBlock_permissions = document.getElementById("btnBlock_permissions");
        btnGive_assignmentsBr = document.getElementById("btnGive_assignmentsBr");
        btnLoadBranchs = document.getElementById("btnLoadBranchs");
        btnBlock_permissionsBr = document.getElementById("btnBlock_permissionsBr");
    }
    function InitalizeEvents() {
        showpass.onclick = showpassword;
        btnShow.onclick = GetAllUsers;
        btnAdd.onclick = btnAdd_onClick;
        btnSave.onclick = btnSave_onClick;
        btnBack.onclick = btnBack_onclick;
        btnUpdate.onclick = btnEdit_onclick;
        btnAddRole.onclick = function () { btnAdd_onclick(true); };
        btnAddBranch.onclick = function () { btnAdd_onclick(false); };
        btnGive_assignments.onclick = function () { Permission(1, true); };
        btnBlock_permissions.onclick = function () { Permission(1, false); };
        btnGive_assignmentsBr.onclick = function () { Permission(2, true); };
        btnBlock_permissionsBr.onclick = function () { Permission(2, false); };
        btnLoadRoles.onclick = LoadAllRoles;
        btnLoadBranchs.onclick = LoadAllBranchs;
        txtUser_Code.onchange = USER_CODEFoundBefore;
        drpuserTypeDt.onchange = drpuserTypeDt_onchange;
        SearchGridUsers.onkeyup = _SearchBox_Change;
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        UserGrid.ElementName = "divGridDetails";
        UserGrid.PrimaryKey = "USER_CODE";
        UserGrid.Paging = true;
        UserGrid.PageSize = 10;
        UserGrid.Sorting = true;
        UserGrid.InsertionMode = JsGridInsertionMode.Binding;
        UserGrid.Editing = false;
        UserGrid.Inserting = false;
        UserGrid.SelectedIndex = 1;
        UserGrid.OnRowDoubleClicked = function () { BindUserInfoData(UserGrid.SelectedKey); };
        UserGrid.Columns = [
            { title: res.User_Code, name: "USER_CODE", type: "text", width: "5%" },
            { title: res.SHT_Name, name: "USER_NAME", type: "text", width: "10%" },
            { title: res.department, name: "DepartmentName", type: "text", width: "20%" },
            { title: res.Job, name: "JobTitle", type: "text", width: "20%" },
            {
                title: res.App_Active, css: "ColumPadding", name: "USER_ACTIVE", width: "7%",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.USER_ACTIVE == true) {
                        txt.innerHTML = "فعال";
                    }
                    else {
                        txt.innerHTML = "غير فعال";
                    }
                    return txt;
                }
            },
        ];
        UserGrid.Bind();
    }
    /*----------------------------------------------------------------- Get Func ------------------------------------------------------------------ */
    function GetAllUsers() {
        $('#DivInvoiceDetails').addClass('display_none');
        var UserType = drpuserType.value == "Null" ? null : Number(drpuserType.value);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetUSER"),
            data: { CompCode: CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, Status: Number(drpStateType.value), UserType: UserType },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserDetail = result.Response;
                    UserGrid.DataSource = UserDetail;
                    UserGrid.Bind();
                }
            }
        });
    }
    function GetRoles() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_Role", "GetAllRoles"),
            data: { Token: "HGFD-" + SysSession.CurrentEnvironment.Token, UserCode: SysSession.CurrentEnvironment.UserCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    RoleDetails = result.Response;
                }
            }
        });
    }
    function GetBranchs() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GBranch", "GetAll"),
            data: { CompCode: CompCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, UserCode: SysSession.CurrentEnvironment.UserCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    BranchDetails = result.Response;
                }
            }
        });
    }
    function GetSalesman() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
            data: {
                CompCode: CompCode, BranchCode: BraCode, IsSalesEnable: true, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    SalesmanDetails = result.Response;
                    SalesmanDetails = SalesmanDetails.filter(function (s) { return s.Isactive == true; });
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        DocumentActions.FillCombowithdefult(SalesmanDetails, drpSalesman, "SalesmanId", "NameE", "Select saleman");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(SalesmanDetails, drpSalesman, "SalesmanId", "NameA", "اختر المندوب");
                    }
                }
            }
        });
    }
    function GetuserType() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GCodes", "GetbycodeTp"),
            data: { CodeType: "UserType", UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserTypeDetails = result.Response;
                    DocumentActions.FillComboFirstvalue(UserTypeDetails, drpuserType, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
                    DocumentActions.FillComboFirstvalue(UserTypeDetails, drpuserTypeDt, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
                }
            }
        });
    }
    function GetCashBox() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefBox", "GetAll"),
            data: { compCode: CompCode, BranchCode: BraCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, ModuleCode: Modules.USERS, FinYear: SysSession.CurrentEnvironment.CurrentYear },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CashboxDetails = result.Response;
                    DocumentActions.FillComboFirstvalue(CashboxDetails, drpCashBox, "CashBoxID", "" + (lang == "ar" ? "CashBox_DescA" : "CashBox_DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
                }
            }
        });
    }
    function GetUSER_Barnch(USER_CODE) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "GetBarnchs_byuser"),
            data: {
                USER_CODE: USER_CODE
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserBranchDetails = result.Response;
                }
            }
        });
    }
    function GetUserRoles(USER_CODE) {
        UserRoles = new Array();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_RoleUsers", "GetUserRoles"),
            data: {
                UserCode: USER_CODE
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    UserRoles = result.Response;
                }
            }
        });
    }
    function BindUserInfoData(UserCode) {
        GlobalUserCode = UserCode;
        $('#DivInvoiceDetails').removeClass('display_none');
        userObject = UserDetail.filter(function (x) { return x.USER_CODE == UserCode; })[0];
        txtUser_Code.value = setVal(userObject.USER_CODE);
        txtPassword.value = setVal(userObject.USER_PASSWORD);
        chkActive.checked = setVal(userObject.USER_ACTIVE);
        txtUser_Name.value = setVal(userObject.USER_NAME);
        txtDepartmentName.value = setVal(userObject.DepartmentName);
        txtJobTitle.value = setVal(userObject.JobTitle);
        txtMobile.value = setVal(userObject.Mobile);
        txtEmail.value = setVal(userObject.Email);
        txtFirstLogin.value = setVal(userObject.FirstLogin);
        txtLastLogin.value = setVal(userObject.LastLogin);
        txtCreatedAt.value = DateTimeFormat(userObject.CreatedAt);
        txtCreatedBy.value = setVal(userObject.CreatedBy);
        txtUpdatedAt.value = DateTimeFormat(userObject.UpdatedAt);
        txtUpdatedBy.value = setVal(userObject.UpdatedBy);
        GetUSER_Barnch(UserCode);
        GetUserRoles(UserCode);
        CountGridRole = 0;
        $('#divGridRoles').html("");
        CountGridBranch = 0;
        $('#divGridBranch').html("");
        for (var i = 0; i < UserRoles.length; i++) {
            BuildControlRoles(i);
            $("#USER_CODE" + i).val(setVal(UserRoles[i].USER_CODE));
            $("#RoleId" + i).val(setVal(UserRoles[i].RoleId));
            $("#txtRoleDesc" + i).val(setVal(UserRoles[i].RoleId));
            $("#txtRemarks" + i).val(setVal(UserRoles[i].Remarks));
            $("#txtActive" + i).prop('checked', UserRoles[i].ISActive);
            $("#txtStatusFlag" + i).val("");
            CountGridRole++;
        }
        for (var i = 0; i < UserBranchDetails.length; i++) {
            BuildControlBranchs(i);
            $("#USER_CODEBr" + i).val(setVal(UserBranchDetails[i].USER_CODE));
            $("#BRA_CODE" + i).val(setVal(UserBranchDetails[i].BRA_CODE));
            $("#txtBranch" + i).val(setVal(UserBranchDetails[i].BRA_CODE));
            $("#txtEXECUTE" + i).prop('checked', UserBranchDetails[i].EXECUTE);
            $("#txtCREATE" + i).prop('checked', UserBranchDetails[i].CREATE);
            $("#txtEDIT" + i).prop('checked', UserBranchDetails[i].EDIT);
            $("#txtDELETE" + i).prop('checked', UserBranchDetails[i].DELETE);
            $("#txtPRINT" + i).prop('checked', UserBranchDetails[i].PRINT);
            $("#txtStatusFlagBr" + i).val("");
            CountGridBranch++;
        }
    }
    /*----------------------------------------------------------------- Action Func ------------------------------------------------------------------ */
    function Permission(Type, check) {
        if (Type == 1) {
            if (check == true) {
                $('.chk').prop('checked', true);
            }
            else {
                $('.chk').prop('checked', false);
            }
        }
        else {
            if (check == true) {
                $('.chkBr').prop('checked', true);
            }
            else {
                $('.chkBr').prop('checked', false);
            }
        }
        var counts = Type == 1 ? CountGridRole : CountGridBranch;
        var stat = Type == 1 ? "txtStatusFlag" : "txtStatusFlagBr";
        for (var i = 0; i < counts; i++) {
            if ($("#" + stat + "" + i).val() != "i") {
                $("#" + stat + "" + i).val("u");
            }
        }
    }
    function drpuserTypeDt_onchange() {
        if (drpuserTypeDt.value == "1") {
            $('.Sls').removeClass("display_none");
            $('.Box').addClass("display_none");
            $('.Sls').removeAttr("disabled");
            $('.Box').attr("disabled", "disabled");
        }
        else if (drpuserTypeDt.value == "2") {
            $('.Sls').addClass("display_none");
            $('.Box').removeClass("display_none");
            $('.Box').removeAttr("disabled");
            $('.Sls').attr("disabled", "disabled");
        }
        else if (drpuserTypeDt.value == "3") {
            $('.Sls').removeClass("display_none");
            $('.Box').removeClass("display_none");
            $('.Sls').removeAttr("disabled");
            $('.Box').removeAttr("disabled");
        }
        else {
            $('.Sls').addClass("display_none");
            $('.Box').addClass("display_none");
            $('.Box').attr("disabled", "disabled");
            $('.Sls').attr("disabled", "disabled");
        }
    }
    function _SearchBox_Change() {
        $("#divGridDetails").jsGrid("option", "pageIndex", 1);
        if (SearchGridUsers.value != "") {
            var search_1 = SearchGridUsers.value.toLowerCase();
            var SearchDetails = UserDetail.filter(function (x) { return x.USER_CODE.toLowerCase().search(search_1) >= 0 || x.USER_NAME.toLowerCase().search(search_1) >= 0; });
            UserGrid.DataSource = SearchDetails;
            UserGrid.Bind();
        }
        else {
            UserGrid.DataSource = UserDetail;
            UserGrid.Bind();
        }
    }
    function BuildControlBranchs(cnt) {
        var html;
        html = "<tr id= \"RowBr" + cnt + "\">\n                    <td class=\"btn_minus display_none\">\n\t\t                <div class=\"form-group\">\n\t\t\t                <span id=\"btn_minusBr" + cnt + "\"><i class=\"fas fa-minus-circle btn_minus display_none\"></i></span>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"BRA_CODE" + cnt + "\" type=\"text\" class=\"form-control\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                             <select id=\"txtBranch" + cnt + "\" type=\"text\" class=\"form-control Edit\" name=\"\" disabled >\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtEXECUTE" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chkBr\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtCREATE" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chkBr\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtEDIT" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chkBr\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtDELETE" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chkBr\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtPRINT" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chkBr\" name=\"\" disabled />\n\t\t                </div>\n\t                </td>\n                   \n                    \n               <input id=\"txtStatusFlagBr" + cnt + "\" type=\"hidden\"   />\n               <input id=\"USER_CODEBr" + cnt + "\" type=\"hidden\"   />\n                </tr>";
        $('#divGridBranch').append(html);
        $("#txtBranch" + cnt).append("<option value=\"Null\">\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0631\u0639</option>");
        for (var i = 0; i < BranchDetails.length; i++) {
            $("#txtBranch" + cnt).append("<option value=\"" + BranchDetails[i].BRA_CODE + "\">" + BranchDetails[i].BRA_DESC + "</option>");
        }
        $("#txtBranch" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
            ValidateDublicateBranch(cnt);
            $("#txtPRINT" + cnt).prop('checked', true);
            $("#txtDELETE" + cnt).prop('checked', true);
            $("#txtEDIT" + cnt).prop('checked', true);
            $("#txtCREATE" + cnt).prop('checked', true);
            $("#txtEXECUTE" + cnt).prop('checked', true);
            $("#BRA_CODE" + cnt).val($("#txtBranch" + cnt).val());
        });
        $("#txtPRINT" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
        });
        $("#txtDELETE" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
        });
        $("#txtEDIT" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
        });
        $("#txtCREATE" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
        });
        $("#txtEXECUTE" + cnt).on('change', function () {
            if ($("#txtStatusFlagBr" + cnt).val() != "i")
                $("#txtStatusFlagBr" + cnt).val("u");
        });
        $("#btn_minusBr" + cnt).on('click', function () {
            DeleteRow(cnt, false);
        });
    }
    function BuildControlRoles(cnt) {
        var html;
        html = "<tr id= \"Row" + cnt + "\">\n                    <td class=\"btn_minus display_none\">\n\t\t                <div class=\"form-group\">\n\t\t\t                <span id=\"btn_minus" + cnt + "\"><i class=\"fas fa-minus-circle btn_minus display_none\"></i></span>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                          <select  id=\"txtRoleDesc" + cnt + "\" type=\"text\" class=\"form-control Edit\" name=\"\" disabled >\n\t\t                </div>\n\t                </td>>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtRemarks" + cnt + "\" type=\"text\" class=\"form-control dis\"  disabled  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtActive" + cnt + "\" type=\"checkbox\" class=\"form-check-input Edit chk\"  disabled />\n\t\t                </div>\n\t                </td>\n                   \n                    \n               <input id=\"txtStatusFlag" + cnt + "\" type=\"hidden\"   />\n               <input id=\"RoleId" + cnt + "\" type=\"hidden\"   />\n               <input id=\"USER_CODE" + cnt + "\" type=\"hidden\"   />\n                </tr>";
        $('#divGridRoles').append(html);
        $("#txtRoleDesc" + cnt).append("<option value=\"Null\">\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</option>");
        for (var i = 0; i < RoleDetails.length; i++) {
            $("#txtRoleDesc" + cnt).append("<option value=\"" + RoleDetails[i].RoleId + "\">" + RoleDetails[i].DescA + "</option>");
        }
        $("#txtRoleDesc" + cnt).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
            ValidateDublicateRoles(cnt);
            $("#txtRemarks" + cnt).val(RoleDetails.filter(function (x) { return x.RoleId == Number($("#txtRoleDesc" + cnt).val()); })[0].Remarks);
            $("#txtActive" + cnt).prop('checked', true);
        });
        $("#txtRemarks" + cnt).on('keyup', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#txtActive" + cnt).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt, true);
        });
    }
    function DeleteRow(RecNo, IsRole) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        if (IsRole == true) {
            WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
                $("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
                $("#Row" + RecNo).attr("hidden", "true");
            });
        }
        else {
            WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
                $("#txtStatusFlagBr" + RecNo).val() == 'i' ? $("#txtStatusFlagBr" + RecNo).val('m') : $("#txtStatusFlagBr" + RecNo).val('d');
                $("#RowBr" + RecNo).attr("hidden", "true");
            });
        }
    }
    function btnAdd_onclick(IsRole) {
        if (IsRole == true) {
            if (RoleDetails.length == CountGridRole) {
                DisplayMassage('عدد الصلاحيات المتاحة لدي الشركة ' + RoleDetails.length + ' صلاحية فقط', 'The number of permissions you have ' + RoleDetails.length + 'permission only', MessageType.Error);
            }
            else {
                BuildControlRoles(CountGridRole);
                $(".btn_minus").removeClass('display_none');
                $(".Edit").removeAttr('disabled');
                $("#txtStatusFlag" + CountGridRole).val("i");
                CountGridRole++;
            }
        }
        else {
            if (BranchDetails.length == CountGridBranch) {
                DisplayMassage('عدد الفروع المتاحة لدي الشركة ' + BranchDetails.length + ' فرع فقط', 'The number of Branchs you have ' + BranchDetails.length + 'BranchDetail only', MessageType.Error);
            }
            else {
                BuildControlBranchs(CountGridBranch);
                $(".btn_minus").removeClass('display_none');
                $("#txtStatusFlagBr" + CountGridBranch).val("i");
                $(".Edit").removeAttr('disabled');
                CountGridBranch++;
            }
        }
    }
    function LoadAllRoles() {
        var _RoleDetails = new Array();
        _RoleDetails = RoleDetails;
        for (var i = 0; i < CountGridRole; i++) {
            if ($("#txtStatusFlag" + i).val() != "m" && $("#txtStatusFlag" + i).val() != "d") {
                _RoleDetails = _RoleDetails.filter(function (x) { return x.RoleId != Number($("#txtRoleDesc" + i).val()); });
            }
            if ($("#txtStatusFlag" + i).val() == "i" && $("#txtRoleDesc" + i).val() == "Null") {
                $("#Row" + i).attr("hidden", "true");
                $("#txtStatusFlag" + i).val("m");
            }
        }
        for (var i = 0; i < _RoleDetails.length; i++) {
            BuildControlRoles(CountGridRole);
            $("#USER_CODE" + CountGridRole).val(txtUser_Code.value);
            $("#txtStatusFlag" + CountGridRole).val("i");
            $("#txtRoleDesc" + CountGridRole).val(_RoleDetails[i].RoleId);
            $("#txtRemarks" + CountGridRole).val(_RoleDetails[i].Remarks);
            CountGridRole++;
        }
        $('.chk').prop('checked', true);
        $(".Edit").removeAttr('disabled');
        $(".btn_minus").removeClass('display_none');
    }
    function LoadAllBranchs() {
        var _BranchDetails = new Array();
        _BranchDetails = BranchDetails;
        for (var i = 0; i < CountGridBranch; i++) {
            if ($("#txtStatusFlagBr" + i).val() != "m" && $("#txtStatusFlagBr" + i).val() != "d") {
                _BranchDetails = _BranchDetails.filter(function (x) { return x.BRA_CODE != Number($("#txtBranch" + i).val()); });
            }
            if ($("#txtStatusFlagBr" + i).val() == "i" && $("#txtBranch" + i).val() == "Null") {
                $("#RowBr" + i).attr("hidden", "true");
                $("#txtStatusFlagBr" + i).val("m");
            }
        }
        for (var i = 0; i < _BranchDetails.length; i++) {
            BuildControlBranchs(CountGridBranch);
            $("#USER_CODEBr" + CountGridBranch).val(txtUser_Code.value);
            $("#txtStatusFlagBr" + CountGridBranch).val("i");
            $("#txtBranch" + CountGridBranch).val(_BranchDetails[i].BRA_CODE);
            $("#BRA_CODE" + CountGridBranch).val(_BranchDetails[i].BRA_CODE);
            CountGridBranch++;
        }
        $('.chkBr').prop('checked', true);
        $(".btn_minus").removeClass('display_none');
        $(".Edit").removeAttr('disabled');
    }
    function validiation() {
        if (txtUser_Code.value.trim() == "") {
            DisplayMassage('يجب إدخال رمز المستخدم', "You must Enter User Code", MessageType.Error);
            inputError("txtUser_Code");
            return false;
        }
        if (txtPassword.value.trim() == "") {
            DisplayMassage('يجب إدخال كلمة السر', "You must Enter Password", MessageType.Error);
            inputError("txtPassword");
            return false;
        }
        if (txtUser_Name.value.trim() == "") {
            DisplayMassage('يجب إدخال اسم المستخدم', "You must Enter User Name", MessageType.Error);
            inputError("txtUser_Name");
            return false;
        }
        if (txtDepartmentName.value.trim() == "") {
            DisplayMassage('يجب إدخال القسم', "You must Enter Department Name", MessageType.Error);
            inputError("txtDepartmentName");
            return false;
        }
        if (txtJobTitle.value.trim() == "") {
            DisplayMassage('يجب إدخال الوظيفة', "You must Enter Job Title", MessageType.Error);
            inputError("txtJobTitle");
            return false;
        }
        if (!validate_email() && txtEmail.value.trim() != "") {
            DisplayMassage('البريد الالكتروني غير صحيح', "Email was Wrong", MessageType.Error);
            inputError("txtEmail");
            return false;
        }
        if (CountGridRole == 0) {
            DisplayMassage('يجب ادخال الصلاحيات', "You must Enter Roles", MessageType.Error);
            inputError("btnAddRole");
            return false;
        }
        for (var i = 0; i < CountGridRole; i++) {
            if ($("#txtRoleDesc" + i).val() == "Null" && ($("#txtStatusFlag" + i).val() != "m" && $("#txtStatusFlag" + i).val() != "d")) {
                DisplayMassage('يجب اختيار الصلاحية', "You must Choose Role", MessageType.Error);
                inputError("txtRoleDesc" + i);
                return false;
            }
        }
        if (CountGridBranch == 0) {
            DisplayMassage('يجب ادخال الفروع', "You must Enter Branchs", MessageType.Error);
            inputError("btnAddBranch");
            return false;
        }
        for (var i = 0; i < CountGridBranch; i++) {
            if ($("#txtBranch" + i).val() == "Null" && ($("#txtStatusFlagBr" + i).val() != "m" && $("#txtStatusFlagBr" + i).val() != "d")) {
                DisplayMassage('يجب اختيار الفرع', "You must Choose Branch", MessageType.Error);
                inputError("txtBranch" + i);
                return false;
            }
        }
        return true;
    }
    function validate_email() {
        var email = txtEmail.value;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function ValidateDublicateRoles(RecNo) {
        for (var i = 0; i < CountGridRole; i++) {
            if (i != RecNo && Number($("#txtRoleDesc" + i).val()) == Number($("#txtRoleDesc" + RecNo).val())) {
                $("#txtRoleDesc" + RecNo).val("Null");
                $("#txtRemarks" + RecNo).val("");
                DisplayMassage('لا يمكنك تكرار الصلاحية', 'You cannot duplicate validity', MessageType.Error);
                inputError("txtRoleDesc" + RecNo);
            }
        }
    }
    function ValidateDublicateBranch(RecNo) {
        for (var i = 0; i < CountGridBranch; i++) {
            if (i != RecNo && Number($("#txtBranch" + i).val()) == Number($("#txtBranch" + RecNo).val())) {
                $("#txtBranch" + RecNo).val("Null");
                DisplayMassage('لا يمكنك تكرار الفرع', 'You cannot duplicate Branch', MessageType.Error);
                inputError("txtBranch" + RecNo);
            }
        }
    }
    function USER_CODEFoundBefore() {
        var res = true;
        var USER_CODE = txtUser_Code.value.toLowerCase();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "CodeFounBefore"),
            data: {
                USER_CODE: USER_CODE, compCode: CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                var Res = result.Response;
                if (Res.length > 0) {
                    txtUser_Code.value = "";
                    inputError("txtUser_Code");
                    DisplayMassage('رمز المسخدم موجود مسبقاً', 'The User code already exists', MessageType.Error);
                }
            }
        });
        return res;
    }
    function showpassword() {
        if (showpss == false) {
            $('#txtPassword').attr('type', 'text');
            $('#showpass').removeClass('fa-eye-slash');
            $('#showpass').addClass('fa-eye');
            showpss = true;
        }
        else {
            $('#txtPassword').attr('type', 'password');
            $('#showpass').addClass('fa-eye-slash');
            $('#showpass').removeClass('fa-eye');
            showpss = false;
        }
    }
    function btnAdd_onClick() {
        IsNew = true;
        CountGridRole = 0;
        CountGridBranch = 0;
        $('#divGridRoles').html('');
        $('#divGridBranch').html('');
        $('#showpass').removeClass('display_none');
        $('#DivInvoiceDetails').removeClass('display_none');
        $('#DivInvoiceDetails :input').val('');
        $('#DivInvoiceDetails :input[type="number"]').val("0");
        $('.dis').attr('disabled', 'disabled');
        $('.Edit').removeAttr('disabled');
        $('#cotrolDiv').addClass('disabledDiv');
        $('#divIconbar').addClass('hidden_Control');
        $('#btnAddRole').removeClass('display_none');
        $('#btnAddBranch').removeClass('display_none');
        $('.btnRoles').removeAttr('disabled');
        txtCreatedBy.value = SysSession.CurrentEnvironment.UserCode;
        txtCreatedAt.value = GetDateAndTime();
        drpuserTypeDt.value = "null";
        drpSalesman.value = "null";
        drpCashBox.value = "null";
    }
    function btnSave_onClick() {
        if (!validiation()) {
            return;
        }
        Update();
    }
    function btnEdit_onclick() {
        IsNew = false;
        $('#showpass').removeClass('display_none');
        $('.dis').attr('disabled', 'disabled');
        $('#cotrolDiv').addClass('disabledDiv');
        $('#divIconbar').addClass('hidden_Control');
        $('#btnAddRole').removeClass('display_none');
        $('#btnAddBranch').removeClass('display_none');
        $('.btnRoles').removeAttr('disabled');
        $('.btn_minus').removeClass('display_none');
        txtUpdatedBy.value = SysSession.CurrentEnvironment.UserCode;
        txtUpdatedAt.value = GetDateAndTime();
        $('.Edit').removeAttr('disabled');
    }
    function btnBack_onclick() {
        if (IsNew == true) {
            $('#DivInvoiceDetails').addClass('display_none');
        }
        sucess();
    }
    function Assign() {
        UserMasterDetail = new ModelUserMasterDetail();
        ModelUser = new G_USERS();
        ModelUserRoles = new Array();
        ModelUserBranch = new Array();
        ModelUser.LoginUrl = false;
        ModelUser.Email = txtEmail.value;
        ModelUser.FirstLogin = txtFirstLogin.value;
        ModelUser.Remarks = "";
        ModelUser.CreatedAt = txtCreatedAt.value;
        ModelUser.CreatedBy = txtCreatedBy.value;
        ModelUser.UpdatedAt = txtUpdatedAt.value;
        ModelUser.UpdatedBy = txtUpdatedBy.value;
        ModelUser.CashBoxID = drpCashBox.value == "null" ? null : Number(drpCashBox.value);
        ModelUser.SalesManID = drpSalesman.value == "null" ? null : Number(drpSalesman.value);
        ModelUser.USER_CODE = txtUser_Code.value;
        ModelUser.USER_PASSWORD = txtPassword.value;
        ModelUser.USER_ACTIVE = chkActive.checked;
        ModelUser.USER_NAME = txtUser_Name.value;
        ModelUser.CompCode = CompCode;
        ModelUser.GRP_CODE = "";
        ModelUser.REGION_CODE = "";
        ModelUser.USER_PASSWORD2 = "";
        ModelUser.CHANGE_PASS_DATE = "";
        ModelUser.City = "";
        ModelUser.Address = "";
        ModelUser.Tel = "";
        ModelUser.Fax = "";
        ModelUser.Mobile = txtMobile.value;
        ModelUser.DepartmentName = txtDepartmentName.value;
        ModelUser.JobTitle = txtJobTitle.value;
        ModelUser.USER_TYPE = drpuserTypeDt.value == "null" ? null : Number(drpuserTypeDt.value);
        ModelUser.ManagedBy = "";
        ModelUser.SYSTEM_CODE = "I";
        ModelUser.SUB_SYSTEM_CODE = "I";
        ModelUser.Tokenid = "";
        ModelUser.LastLogin = txtLastLogin.value;
        ModelUser.Flag_Mastr = "";
        ModelUser.StoreID = 0;
        for (var i = 0; i < CountGridRole; i++) {
            if ($("#txtStatusFlag" + i).val() != 'm' && $("#txtStatusFlag" + i).val() != '') {
                singleUserRoles = new G_RoleUsers();
                singleUserRoles.USER_CODE = txtUser_Code.value;
                singleUserRoles.RoleId = Number($("#txtRoleDesc" + i).val());
                singleUserRoles.OldID = Number($("#RoleId" + i).val());
                singleUserRoles.ISActive = $("#txtActive" + i).prop('checked');
                singleUserRoles.StatusFlag = $("#txtStatusFlag" + i).val();
                ModelUserRoles.push(singleUserRoles);
            }
        }
        for (var i = 0; i < CountGridBranch; i++) {
            if ($("#txtStatusFlagBr" + i).val() != 'm' && $("#txtStatusFlagBr" + i).val() != '') {
                SingleUserBranch = new G_USER_BRANCH();
                SingleUserBranch.USER_CODE = txtUser_Code.value;
                SingleUserBranch.COMP_CODE = CompCode;
                SingleUserBranch.BRA_CODE = Number($("#txtBranch" + i).val());
                SingleUserBranch.EXECUTE = $("#txtEXECUTE" + i).prop('checked');
                SingleUserBranch.CREATE = $("#txtCREATE" + i).prop('checked');
                SingleUserBranch.EDIT = $("#txtEDIT" + i).prop('checked');
                SingleUserBranch.DELETE = $("#txtDELETE" + i).prop('checked');
                SingleUserBranch.PRINT = $("#txtPRINT" + i).prop('checked');
                SingleUserBranch.VIEW = true;
                SingleUserBranch.StatusFlag = $("#txtStatusFlagBr" + i).val();
                ModelUserBranch.push(SingleUserBranch);
            }
        }
        UserMasterDetail.UserCode = SysSession.CurrentEnvironment.UserCode;
        UserMasterDetail.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        UserMasterDetail.Comp_Code = SysSession.CurrentEnvironment.CompCode;
        UserMasterDetail.CompName = SysSession.CurrentEnvironment.CompanyName;
        UserMasterDetail.VatNo = SysSession.CurrentEnvironment.VatNo;
        UserMasterDetail.Branch_Code = BraCode.toString();
        UserMasterDetail.sec_FinYear = FinYear.toString();
        UserMasterDetail.MODULE_CODE = Modules.USERS;
        UserMasterDetail.StatusFlag = IsNew == true ? "i" : "u";
        UserMasterDetail.G_USERS = ModelUser;
        UserMasterDetail.G_RoleUsers = ModelUserRoles;
        UserMasterDetail.G_USER_BRANCH = ModelUserBranch;
    }
    function Update() {
        Assign();
        console.log(UserMasterDetail);
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("G_USERS", "UpdateUserMasterDetail"),
            data: JSON.stringify(UserMasterDetail),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    GlobalUserCode = result.Response;
                    DisplayMassage('تم الحفظ بنجاح', "Updated Succesfully", MessageType.Succeed);
                    IsNew = false;
                    sucess();
                }
                else {
                    DisplayMassage('خطأ بالبيانات', "Error in Data", MessageType.Error);
                }
            }
        });
    }
    function sucess() {
        $('#DivInvoiceDetails :input').attr('disabled', 'disabled');
        $('#cotrolDiv').removeClass('disabledDiv');
        $('#divShow').removeClass('disabledDiv');
        $('#divIconbar').removeClass('hidden_Control');
        $('#btnAddRole').addClass('display_none');
        $('#btnAddBranch').addClass('display_none');
        $('.btnRoles').attr('disabled', 'disabled');
        $('.Edit').attr('disabled', 'disabled');
        $('.btn_minus').addClass('display_none');
        $('#showpass').addClass('display_none');
        $('#txtPassword').attr('type', 'password');
        $('#showpass').addClass('fa-eye-slash');
        $('#showpass').removeClass('fa-eye');
        showpss = false;
        if (IsNew == false) {
            Save_Succ_But();
            GetAllUsers();
            BindUserInfoData(GlobalUserCode);
        }
    }
})(USERS || (USERS = {}));
//# sourceMappingURL=USERS.js.map