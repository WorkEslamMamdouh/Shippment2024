$(document).ready(function () {
    AccountGroup.InitalizeComponent();
});
var AccountGroup;
(function (AccountGroup) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession(Modules.AccountGroup);
    var txtFromDate;
    var txtToDate;
    var AccountDetails = new A_ACCOUNT_GROUP();
    var CostCenterDetails = new G_COST_CENTER();
    var chkview;
    var chk_Certified;
    var chk_New;
    var chk_IncludeInvTR;
    var btnReset;
    // Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var btnGroupCodeSearch;
    var btnCCostSearch;
    var txtGroupCode_ID;
    var txtGroupCode_DESC;
    var txtCenter_Cost_ID;
    var txtCenter_Cost_DESC;
    var reptype1;
    var reptype3;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب مجمع ";
        }
        else {
            document.getElementById('Screen_name').innerHTML == "Account Group";
        }
        $("#iconMainPages").addClass("d-none");
        $("#iconReportPages").removeClass("d-none");
        $("#btnPrintTrview").addClass("print-report");
        $("#btnPrintTrview span").text("عرض تقرير");
        InitalizeControls();
        InitalizeEvents();
        txtFromDate.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        chkview.checked = false;
        chk_Certified.checked = true;
        chk_New.checked = true;
        chk_IncludeInvTR.checked = true;
        $('#btnPrint').addClass('display_none');
        txtGroupCode_ID.disabled = false;
        txtCenter_Cost_ID.disabled = false;
    }
    AccountGroup.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        btnGroupCodeSearch = document.getElementById("btnGroupCodeSearch");
        txtGroupCode_ID = document.getElementById("txtGroupCode_ID");
        txtGroupCode_DESC = document.getElementById("txtGroupCode_DESC");
        txtCenter_Cost_ID = document.getElementById("txtCenter_Cost_ID");
        txtCenter_Cost_DESC = document.getElementById("txtCenter_Cost_DESC");
        reptype1 = document.getElementById("reptype1");
        reptype3 = document.getElementById("reptype3");
        btnCCostSearch = document.getElementById("btnCCostSearch");
        chkview = document.getElementById("chkview");
        chk_Certified = document.getElementById("chk_Certified");
        chk_New = document.getElementById("chk_New");
        chk_IncludeInvTR = document.getElementById("chk_IncludeInvTR");
        btnReset = document.getElementById("btnReset");
        //---------------------------------------------------------------------- Print Buttons
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
        btnGroupCodeSearch.onclick = btnGroupCodeSearch_onclick;
        txtGroupCode_ID.onchange = txtGroupCode_ID_onchange;
        btnCCostSearch.onclick = btnCCostSearch_onclick;
        txtCenter_Cost_ID.onchange = txtCenter_Cost_ID_onchange;
        btnReset.onclick = btnReset_onclick;
    }
    function btnGroupCodeSearch_onclick() {
        sys.FindKey(Modules.AccountGroup, "btnAccGroupSearch", "COMP_CODE= " + compcode + " ", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            $('#txtGroupCode_ID').val(id);
            GetAccByCode(id);
            $('#txtGroupCode_DESC').val((lang == "ar" ? AccountDetails.DESCA : AccountDetails.DESCL));
        });
    }
    function btnCCostSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Accountstatement, "btnCCostSearch", "COMP_CODE=" + compcode + " ", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            $('#txtCenter_Cost_ID').val(id);
            GetCostCenterByCode(id);
            $('#txtCenter_Cost_DESC').val((lang == "ar" ? CostCenterDetails.CC_DESCA : CostCenterDetails.CC_DESCE));
        });
    }
    function GetCostCenterByCode(CC_Code) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("CostCenter", "GetByCostCntreCode"),
            data: { CompCode: compcode, CostCntreCode: CC_Code, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CostCenterDetails = result.Response;
                    debugger;
                    if (CostCenterDetails == null) {
                        txtCenter_Cost_ID.value = "";
                        // txtCenter_Cost_DESC.value = "";
                        $('#txtCenter_Cost_DESC').val("");
                        Errorinput(txtCenter_Cost_ID);
                        DisplayMassage("كود التكلفة غير صحيح", "Wrong Account cost", MessageType.Error);
                    }
                    else {
                        $('#txtCenter_Cost_ID').val(CostCenterDetails.CC_CODE);
                        $('#txtCenter_Cost_DESC').val(CostCenterDetails.CC_DESCA);
                    }
                }
            }
        });
    }
    function GetAccByCode(AccCode) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetByAccCode_GROUP"),
            data: { CompCode: compcode, AccCode: AccCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AccountDetails = result.Response;
                }
            }
        });
    }
    function txtGroupCode_ID_onchange() {
        GetAccByCode(txtGroupCode_ID.value);
        if (AccountDetails == null) {
            txtGroupCode_ID.value = "";
            txtGroupCode_DESC.value = "";
            Errorinput(txtGroupCode_ID);
            DisplayMassage("كود الحساب غير صحيح", "Wrong Account code", MessageType.Error);
        }
        else {
            $('#txtGroupCode_ID').val(AccountDetails.GROUP_CODE);
            $('#txtGroupCode_DESC').val(AccountDetails.DESCA);
        }
    }
    function txtCenter_Cost_ID_onchange() {
        txtCenter_Cost_DESC.value = "";
        GetCostCenterByCode(txtCenter_Cost_ID.value);
    }
    function GetDate() {
        var today = new Date();
        var dd = today.getDate().toString();
        var ReturnedDate;
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    function btnReset_onclick() {
        txtFromDate.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        discharge();
        chkview.checked = false;
        chk_Certified.checked = false;
        chk_New.checked = false;
        chk_IncludeInvTR.checked = false;
        //txtGroupCode_ID.disabled = false;
        //txtGroupCode_ID.value = "";
        //txtGroupCode_DESC.value = "";  
        //txtCenter_Cost_ID.disabled = false;
        //txtCenter_Cost_ID.value = "";
        //txtCenter_Cost_DESC.value = "";
    }
    function discharge() {
        $('#txtGroupCode_ID').val("");
        $('#txtGroupCode_DESC').val("");
        $('#txtCenter_Cost_ID').val("");
        $('#txtCenter_Cost_DESC').val("");
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        if ($('#txtGroupCode_ID').val() == "") {
            WorningMessage("يجب ادخال الحساب!", "Must Enter Account!", "تحذير", "worning");
            return;
        }
        var rp = new ReportParameters();
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
        rp.RepType = OutType; //output report as View
        rp.FromDate = DateFormatRep(txtFromDate.value);
        rp.ToDate = DateFormatRep(txtToDate.value);
        rp.IncludeInvTR = chk_IncludeInvTR.checked == true ? 1 : 0;
        if ($('#txtGroupCode_ID').val() == "") {
            rp.GroupCode = "-1";
        }
        else {
            rp.GroupCode = $('#txtGroupCode_ID').val();
        }
        if ($('#txtCenter_Cost_ID').val() == "") {
            rp.cc_code = "-1";
        }
        else {
            rp.cc_code = $('#txtCenter_Cost_ID').val();
        }
        if (reptype1.checked == true) {
            rp.TrType = 1;
        }
        else if (reptype3.checked == true) {
            rp.TrType = 2;
        }
        else {
            rp.TrType = 0;
        }
        if (chk_Certified.checked == true) //------------------------------------( Inclusion of certified restrictions )
         {
            rp.IsAuthVchr = 1;
        }
        else {
            rp.IsAuthVchr = 0;
        }
        if (chk_New.checked == true) //-------------------------------------( Inclusion of new restrictions )
         {
            rp.IsNewVchr = 1;
        }
        else {
            rp.IsNewVchr = 0;
        }
        if (chkview.checked == true) //-----------------------------------( Hide zero accounts )
         {
            rp.exzero = 1;
        }
        else {
            rp.exzero = 0;
        }
        if ($('#txtGroupCode_ID').val() == "") {
            MessageBox.Show("يجب اختيار الحساب", "تنبيه");
            return;
        }
        Ajax.Callsync({
            url: Url.Action("AProc_Rpt_GLAccountGroupStatment", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(AccountGroup || (AccountGroup = {}));
//# sourceMappingURL=AccountGroup.js.map