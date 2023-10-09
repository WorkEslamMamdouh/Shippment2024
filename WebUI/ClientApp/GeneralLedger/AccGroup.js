$(document).ready(function () {
    AccGroup.InitalizeComponent();
});
var AccGroup;
(function (AccGroup) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession(Modules.AccGroup);
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    var Name_Screen = (lang == "ar" ? 'مجمع الحسابات ' : 'LnkVoucher');
    var CompCode = Number(SysSession.CurrentEnvironment.CompCode);
    var BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
    var TransactionsGrid = new JsGrid();
    var LnkTransDetails = new Array();
    var _AccGroupMasterDetails = new AccGroupMasterDetails();
    var AccountDetails = new A_ACCOUNT();
    var AccountDetailsIst = new Array();
    var txtSearch;
    var txtGROUP_CODE;
    var btnBack;
    var btnShow;
    var btnAdd;
    var btnUpdate;
    var btnSave;
    var btnAddDetails;
    //////////////////////////////////////////print buttons////////////////////////////////////////////     
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var btnPrintTransaction;
    var Events = 0;
    var CountGrid = 0;
    var IsNew = false;
    function InitalizeComponent() {
        $("#btnPrintTransaction").addClass("hidden_Control");
        $("#btnPrintTrview").addClass("display_none");
        $("#btnPrintTrPDF").addClass("display_none");
        $("#btnPrintTrEXEL").addClass("display_none");
        document.getElementById('Screen_name').innerHTML = Name_Screen;
        InitalizeControls();
        InitalizeEvents();
        InitializeGrid();
        GetData_Header();
        btnShow_onclick();
    }
    AccGroup.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnUpdate = document.getElementById("btnUpdate");
        btnSave = document.getElementById("btnSave");
        btnBack = document.getElementById("btnBack");
        btnAddDetails = document.getElementById("btnAddDetails");
        ////////    
        ////////         
        txtSearch = document.getElementById("txtSearch");
        txtGROUP_CODE = document.getElementById("txtGROUP_CODE");
        //print 
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
        btnPrintTransaction = document.getElementById("btnPrintTransaction");
    }
    function InitalizeEvents() {
        //********************************Btn****************************
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onClick;
        btnBack.onclick = btnBack_onclick;
        btnUpdate.onclick = btnUpdate_onclick;
        btnAddDetails.onclick = AddNewRow;
        //********************************onchange****************************    
        txtSearch.onkeyup = _SearchBox_Change;
        txtGROUP_CODE.onchange = Chack_CODE;
        //*******************************print*****************************
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrintTransaction.onclick = PrintTransaction;
        clickEventsVisible();
    }
    function InitializeGrid() {
        var res = GetResourceList("");
        TransactionsGrid.ElementName = "TransactionsGrid";
        TransactionsGrid.OnRowDoubleClicked = GridDoubleClick;
        TransactionsGrid.PrimaryKey = "GROUP_CODE";
        TransactionsGrid.Paging = true;
        TransactionsGrid.PageSize = 10;
        TransactionsGrid.Sorting = true;
        TransactionsGrid.InsertionMode = JsGridInsertionMode.Binding;
        TransactionsGrid.Editing = false;
        TransactionsGrid.Inserting = false;
        TransactionsGrid.SelectedIndex = 1;
        TransactionsGrid.OnItemEditing = function () { };
        TransactionsGrid.Columns = [
            { title: "GROUP_CODE", name: "GROUP_CODE", type: "text", width: "5%", visible: false },
            { title: res.App_Number, name: "GROUP_CODE", type: "text", width: "5%" },
            { title: 'الاسم', name: (lang == "ar" ? "DESCA" : "DESCL"), type: "text", width: "10%" },
            { title: "الملاحظات", name: "REMARKS", type: "text", width: "15%" },
        ];
        TransactionsGrid.Bind();
    }
    function clickEventsVisible() {
        var clickEventCost = 0;
        var clickEventAcc = 0;
        $("#divAccNumber").on('click', function () {
            debugger;
            if (Events == 0) {
                //$(".Acc").toggle();
                /////////////////////////
                var show1 = $(".Acc").is(":visible");
                //var show2 = $(".Acc").is(":visible");
                if (show1 == true) {
                    $(".Acc").addClass("display_none");
                    $("#IdTable").attr("style", "width: 60%;");
                    clickEventAcc = 1;
                }
                else {
                    clickEventAcc = 0;
                    $(".Acc").removeClass("display_none");
                    if (clickEventCost == 0 && clickEventAcc == 0) {
                        $("#IdTable").attr("style", "width: 75%;");
                    }
                }
                Events = 1;
                setTimeout(function () { Events = 0; }, 700);
            }
        });
    }
    //************************************************fillddl**************************************
    function GetData_Header() {
        var Table;
        Table =
            [
                { NameTable: 'A_ACCOUNT_GROUP', Condition: "COMP_CODE = " + CompCode + " order by GROUP_CODE Asc " },
                { NameTable: 'A_ACCOUNT', Condition: " COMP_CODE = " + CompCode + " " },
            ];
        DataResult(Table);
        //**************************************************************************************************************         
        LnkTransDetails = GetDataTable('A_ACCOUNT_GROUP');
        AccountDetailsIst = GetDataTable('A_ACCOUNT');
    }
    function GetAccByCode(AccCode) {
        var flag = true;
        var accObj = AccountDetailsIst.filter(function (s) { return s.ACC_CODE == AccCode; });
        if (accObj.length > 0) {
            AccountDetails = accObj[0];
        }
        else {
            flag = false;
        }
        return flag;
    }
    function _SearchBox_Change() {
        $("#TransactionsGrid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = LnkTransDetails.filter(function (x) { return x.GROUP_CODE.toString().search(search_1) >= 0 || x.DESCA.toLowerCase().search(search_1) >= 0; });
            TransactionsGrid.DataSource = SearchDetails;
            TransactionsGrid.Bind();
        }
        else {
            TransactionsGrid.DataSource = LnkTransDetails;
            TransactionsGrid.Bind();
        }
    }
    //************************************************Btn_Events**********************************    
    function btnShow_onclick() {
        TransactionsGrid.DataSource = LnkTransDetails;
        TransactionsGrid.Bind();
        $('#divGridShow').removeClass('display_none');
        $('#Div_control').addClass('display_none');
    }
    function btnAdd_onclick() {
        CleanDetails();
        Enabled();
        AddNewRow();
        IsNew = true;
        $('#txtGROUP_CODE').removeAttr('disabled');
    }
    function btnSave_onClick() {
        loading('btnSave');
        setTimeout(function () {
            finishSave('btnSave');
            if (!Validation()) {
                return;
            }
            var CanAdd = true;
            if (CountGrid > 0) {
                for (var i = 0; i < CountGrid; i++) {
                    CanAdd = Validation_Grid(i);
                    if (CanAdd == false) {
                        break;
                    }
                }
            }
            if (CanAdd) {
                Assign();
                if (IsNew) {
                    Insert();
                }
                else {
                    Update();
                }
            }
        }, 100);
    }
    function btnBack_onclick() {
        CleanDetails();
        if (IsNew) {
            $('#Div_control').addClass('display_none');
        }
        else {
            DisplayData(TransactionsGrid.SelectedItem);
        }
        disabled();
    }
    function btnUpdate_onclick() {
        Enabled();
        IsNew = false;
        $('#txtGROUP_CODE').attr('disabled', 'disabled');
    }
    //****************************************************CleanInput********************************************* 
    function Enabled() {
        $('._dis').removeAttr('disabled');
        $('.btn_minus_non').removeClass('display_none');
        $('#id_div_Filter').addClass('disabledDiv');
    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled');
        $('._Remarks').attr('disabled', 'disabled');
        $('._Cost').attr('disabled', 'disabled');
        $('#id_div_Filter').removeClass('disabledDiv');
        $('._None_Input').addClass('display_none');
        $('.btn_minus_non').addClass('display_none');
    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val("");
        CountGrid = 0;
        $("#div_Data").html('');
    }
    //****************************************************DisplayData*********************************************
    function GridDoubleClick() {
        CleanDetails();
        DisplayData(TransactionsGrid.SelectedItem);
        disabled();
    }
    function DisplayData(Selecteditem) {
        DocumentActions.RenderFromModel(Selecteditem);
        DisplayDetails(Selecteditem.GROUP_CODE);
    }
    function DisplayDetails(TrID) {
        var Table;
        Table =
            [
                { NameTable: 'AQ_GetAccountGroupDetail', Condition: " COMP_CODE = " + CompCode + " and GROUP_CODE = N'" + TrID + "' " },
            ];
        DataResult(Table);
        //**************************************************************************************************************         
        var List = GetDataTable('AQ_GetAccountGroupDetail');
        debugger;
        CountGrid = 0;
        $("#div_Data").html('');
        for (var i = 0; i < List.length; i++) {
            BuildControls(i);
            DisplayBuildControls(List[i], i);
            CountGrid++;
        }
        $('.table-responsive').scrollLeft(3);
    }
    ////****************************************************Controls Grid Region****************************************************
    function BuildControls(cnt) {
        var html = "";
        html = "<tr id= \"No_Row" + cnt + "\">\n                    \n\t                <td>\n\t\t                <div class=\"form-group display_none btn_minus_non\">\n\t\t\t                <span id=\"btn_minus" + cnt + "\"><i class=\"fas fa-minus-circle  btn-minusNew\"></i></span> \n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t                <button type=\"button\" class=\"style_ButSearch _dis\"  id=\"btnSearchAcc" + cnt + "\" name=\"ColSearch\" disabled>\n                                <i class=\"fa fa-search\"></i>\n                             </button>\n\t\t                </div>\n\t                </td>\n                     <td style=\"width:9%;\">\n\t\t                <div class=\"form-group\">\n\t\t\t                 <input id=\"ACC_CODE" + cnt + "\" value=\"\" name=\"\" disabled type=\"text\" class=\"form-control _dis\" />\n\t\t                </div>\n\t                </td>\n                    <td style=\"width:17%;\" class=\"Acc\">\n\t\t                <div class=\"form-group\">\n\t\t\t                  <input id=\"ACC_DESCA" + cnt + "\" value=\"\" name=\"\" disabled type=\"text\" class=\"form-control\"  />\n\t\t                </div>\n\t                </td>\n                    \n                     \n                </tr>";
        $("#div_Data").append(html);
        BuildAllFild(AQ_GetAccountGroupDetail, cnt, "No_Row");
        $('#btnSearchAcc' + cnt).click(function (e) {
            var sys = new SystemTools();
            sys.FindKey(Modules.JournalVoucher, "btnAccountSearch", "COMP_CODE=" + CompCode + "and ACC_ACTIVE = 1 and DETAIL =1  ", function () {
                var id = SearchGrid.SearchDataGrid.SelectedKey;
                $('#ACC_CODE' + cnt).val(id);
                if (GetAccByCode(id)) {
                    $('#ACC_DESCA' + cnt).val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));
                    $('#txtAccountNameFooter').val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));
                }
                if (!CheckDuplicateGrid(cnt, CountGrid, "ACC_CODE", "StatusFlag")) {
                    DisplayMassage('خطاء رقم الحساب موجود من قبل', '(Please enter account number)', MessageType.Error);
                    $('#ACC_DESCA' + cnt).val('');
                    $('#txtAccountNameFooter').val('');
                    return false;
                }
                if ($("#StatusFlag" + cnt).val() != "i")
                    $("#StatusFlag" + cnt).val("u");
            });
        });
        $("#ACC_CODE" + cnt).on('change', function () {
            var id = $('#ACC_CODE' + cnt).val().trim();
            if (GetAccByCode(id)) {
                if (AccountDetails != null) {
                    $('#ACC_DESCA' + cnt).val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));
                    $('#txtAccountNameFooter').val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));
                    $("#divAccountNameFooter").removeClass("display_none");
                    if (!CheckDuplicateGrid(cnt, CountGrid, "ACC_CODE", "StatusFlag")) {
                        DisplayMassage('خطاء رقم الحساب موجود من قبل', '(Please enter account number)', MessageType.Error);
                        $('#ACC_DESCA' + cnt).val('');
                        $('#txtAccountNameFooter').val('');
                        return false;
                    }
                }
                else {
                    $('#ACC_CODE' + cnt).val("");
                    $('#ACC_DESCA' + cnt).val("");
                    $('#txtAccountNameFooter').val("");
                    $('#Credit' + cnt).val("");
                    DisplayMassage("رقم الحساب غير صحيح ", "Wrong Account number ", MessageType.Error);
                }
            }
            else {
                $('#ACC_CODE' + cnt).val("");
                $('#ACC_DESCA' + cnt).val("");
                $('#txtAccountNameFooter').val("");
                $('#Credit' + cnt).val("");
                DisplayMassage("رقم الحساب غير صحيح ", "Wrong Account number ", MessageType.Error);
            }
        });
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        // on click Region to display Account And Cost Centers Names in Footer
        $("#No_Row" + cnt).on('click', function () {
            var AccCodeVal = $('#ACC_CODE' + cnt).val();
            var AccObj = AccountDetailsIst.filter(function (s) { return s.COMP_CODE == CompCode && s.ACC_CODE == AccCodeVal; });
            if (AccObj.length > 0) {
                $("#divAccountNameFooter").removeClass("display_none");
                $("#txtAccountNameFooter").prop("value", (lang == "ar" ? AccObj[0].ACC_DESCA : AccObj[0].ACC_DESCL));
            }
            else {
                $("#txtAccountNameFooter").prop("value", "");
            }
        });
    }
    function DeleteRow(RecNo) {
        if (!SysSession.CurrentPrivileges.Remove)
            return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", function () {
            var statusFlag = $("#StatusFlag" + RecNo).val();
            if (statusFlag == "i")
                $("#StatusFlag" + RecNo).val("m");
            else
                $("#StatusFlag" + RecNo).val("d");
            $("#No_Row" + RecNo).attr("hidden", "true");
        });
    }
    function AddNewRow() {
        if (!SysSession.CurrentPrivileges.AddNew)
            return;
        var CanAdd = true;
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#StatusFlag" + CountGrid).val("i"); //In Insert mode    
            $("#COMP_CODE" + CountGrid).val(CompCode);
            $("#GROUP_CODE" + CountGrid).val($("#txtGROUP_CODE").val());
            $('._dis').removeAttr('disabled');
            $('.btn_minus_non').removeClass('display_none');
            CountGrid++;
        }
    }
    //****************************************************Validation*********************************************
    function Validation_Grid(rowcount) {
        if ($("#StatusFlag" + rowcount).val() == "d" || $("#StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {
            if ($("#ACC_CODE" + rowcount).val() == "") {
                DisplayMassage('برجاء ادخال رقم الحساب', '(Please enter account number)', MessageType.Error);
                Errorinput($("#ACC_CODE" + rowcount));
                return false;
            }
            return true;
        }
    }
    function Validation() {
        if ($("#txtGROUP_CODE").val().trim() == "") {
            DisplayMassage(' برجاء ادخال رقم المجموعه', '(Please enter account number)', MessageType.Error);
            Errorinput($("#txtGROUP_CODE"));
            return false;
        }
        if ($("#txtGROUP_CODE").val().trim() != "" && IsNew) {
            if (!Chack_CODE()) {
                return false;
            }
        }
        if ($("#txtDESCA").val().trim() == "" && $("#txtDESCL").val().trim() == "") {
            DisplayMassage(' برجاء ادخال الاسم بالعربي', '(Please enter account number)', MessageType.Error);
            Errorinput($("#txtDESCA"));
            return false;
        }
        if ($("#txtDESCL").val() != "" && $("#txtDESCA").val().trim() == "") {
            $("#txtDESCA").val($("#txtDESCL").val());
        }
        if ($("#txtDESCA").val() != "" && $("#txtDESCL").val().trim() == "") {
            $("#txtDESCL").val($("#txtDESCA").val());
        }
        return true;
    }
    function Chack_CODE() {
        var Chak_CODE = LnkTransDetails.filter(function (x) { return x.GROUP_CODE == $("#txtGROUP_CODE").val().trim(); });
        if (Chak_CODE.length > 0) {
            DisplayMassage('خطاء رقم المجموعة موجود من قبل', '(Please enter account number)', MessageType.Error);
            Errorinput($("#txtGROUP_CODE"));
            return false;
        }
        return true;
    }
    //****************************************************Assign_Data*********************************************
    function Assign() {
        debugger;
        var Master = new A_ACCOUNT_GROUP;
        DocumentActions.AssignToModel(Master);
        Master.COMP_CODE = CompCode;
        Master.GROUP_CODE = $('#txtGROUP_CODE').val();
        var Model = new Array();
        Model = AssignBuildControls(AQ_GetAccountGroupDetail, CountGrid);
        debugger;
        console.log(Model);
        debugger;
        Model.map(function (name) { return name.GROUP_CODE.trim() === '' ? name.GROUP_CODE = $('#txtGROUP_CODE').val() : name.GROUP_CODE = name.GROUP_CODE; });
        _AccGroupMasterDetails.A_ACCOUNT_GROUP = Master;
        _AccGroupMasterDetails.A_ACCOUNT_GROUP_DETAIL = Model;
        _AccGroupMasterDetails.Branch_Code = SysSession.CurrentEnvironment.BranchCode;
        _AccGroupMasterDetails.Comp_Code = SysSession.CurrentEnvironment.CompCode;
        _AccGroupMasterDetails.MODULE_CODE = Modules.AccGroup;
        _AccGroupMasterDetails.UserCode = SysSession.CurrentEnvironment.UserCode;
        _AccGroupMasterDetails.sec_FinYear = SysSession.CurrentEnvironment.CurrentYear;
    }
    function Insert() {
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("AccDefAccounts", "InsertDetail"),
            data: JSON.stringify(_AccGroupMasterDetails),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    var res = result.Response;
                    DisplayMassage("تم الاضافه بنجاح", "Success", MessageType.Succeed);
                    Success(res[0].GROUP_CODE, res[0]);
                    Save_Succ_But();
                }
                else {
                    DisplayMassage("خطأء", "Error", MessageType.Error);
                }
            }
        });
    }
    function Update() {
        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("AccDefAccounts", "UpdateDetail"),
            data: JSON.stringify(_AccGroupMasterDetails),
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    var res = result.Response;
                    DisplayMassage("تم التعديل بنجاح", "Success", MessageType.Succeed);
                    Success(res[0].GROUP_CODE, res[0]);
                    Save_Succ_But();
                }
                else {
                    DisplayMassage("خطأء", "Error", MessageType.Error);
                }
            }
        });
    }
    function Success(ID, res) {
        debugger;
        IsNew = true;
        btnBack_onclick();
        LnkTransDetails = LnkTransDetails.filter(function (x) { return x.GROUP_CODE != ID; });
        LnkTransDetails.push(res);
        LnkTransDetails = LnkTransDetails.sort(dynamicSort("GROUP_CODE"));
        TransactionsGrid.DataSource = LnkTransDetails;
        TransactionsGrid.Bind();
        TransactionsGrid.SelectedItem = res;
        $('#divGridShow').removeClass('display_none');
        $('#Div_control').addClass('display_none');
        CleanDetails();
        DisplayData(res);
        disabled();
    }
    //*******************************************************Print*********************************************************     
    function PrintReport(OutType) {
        if (!SysSession.CurrentPrivileges.PrintOut)
            return;
        var rp = new ReportParameters();
        rp.RepType = OutType; //output report as View 
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        var BranchNameA = SysSession.CurrentEnvironment.BranchName;
        var BranchNameE = SysSession.CurrentEnvironment.BranchNameEn;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        if (BranchNameA == null || BranchNameE == null) {
            BranchNameA = " ";
            BranchNameE = " ";
        }
        rp.BraNameA = BranchNameA;
        rp.BraNameE = BranchNameE;
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        //**************************************************************
        rp.User = SysSession.CurrentEnvironment.UserCode;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.IsGenerated = Number($('#ddlStatus').val());
        Ajax.Callsync({
            url: Url.Action("Rep_LnkVoucherList", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result);
            }
        });
    }
    AccGroup.PrintReport = PrintReport;
    function PrintTransaction() {
        if (!SysSession.CurrentPrivileges.PrintOut)
            return;
        var rp = new ReportParameters();
        rp.TRId = Number($('#TRID').val());
        rp.TrTypeSt = $('#TR_CODE').val();
        rp.Type = 0;
        rp.Name_function = "rptPrnt_LnkVoucher";
        //rp.Name_function = "rptReceiptNote";
        localStorage.setItem("Report_Data", JSON.stringify(rp));
        localStorage.setItem("result", '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
        window.open(Url.Action("ReportsPopup", "Home"), "_blank");
    }
})(AccGroup || (AccGroup = {}));
//# sourceMappingURL=AccGroup.js.map