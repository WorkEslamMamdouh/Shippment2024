$(document).ready(function () {
    GLAging.InitalizeComponent();
});
var GLAging;
(function (GLAging) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession(Modules.GLAging);
    var AccountDetails = new A_ACCOUNT();
    var CostCenterDetails = new G_COST_CENTER();
    var txtToDate;
    var btnReset;
    var chk_Certified;
    var chk_New;
    var chk_IncludeInvTR;
    var CheckD;
    var CheckC;
    var CheckZ;
    var ChecknZ;
    var CheckA;
    var oneyear;
    var threeyear;
    var btnFromAccSearch;
    var btnCCostSearch;
    var txtFromAcc_ID;
    var txtCenter_Cost_ID;
    var txtFromAcc_DESC;
    var txtCenter_Cost_DESC;
    // Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    var FinYear = (SysSession.CurrentEnvironment.CurrentYear);
    function InitalizeComponent() {
        OpenScreen(SysSession.CurrentEnvironment.UserCode, SysSession.CurrentEnvironment.CompCode, SysSession.CurrentEnvironment.BranchCode, Modules.Accountbalances, SysSession.CurrentEnvironment.CurrentYear);
        $('#footer_1').html('');
        $('#dir_11').addClass('hidden_Control');
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "  اعمار مديونية الحسابات";
        }
        else {
            document.getElementById('Screen_name').innerHTML == "general ledger";
        }
        $('#btnPrint').addClass('display_none');
        $("#iconMainPages").addClass("d-none");
        $("#iconReportPages").removeClass("d-none");
        $("#btnPrintTrview").addClass("print-report");
        $("#btnPrintTrview span").text("عرض تقرير");
        InitalizeControls();
        InitalizeEvents();
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        chk_Certified.checked = true;
        chk_New.checked = true;
        chk_IncludeInvTR.checked = true;
        ChecknZ.checked = true;
        oneyear.checked = true;
        txtFromAcc_ID.disabled = false;
        txtCenter_Cost_ID.disabled = false;
    }
    GLAging.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnPrint = document.getElementById("btnPrint");
        txtToDate = document.getElementById("txtToDate");
        btnFromAccSearch = document.getElementById("btnFromAccSearch");
        btnCCostSearch = document.getElementById("btnCCostSearch");
        CheckD = document.getElementById("CheckD");
        CheckC = document.getElementById("CheckC");
        CheckZ = document.getElementById("CheckZ");
        ChecknZ = document.getElementById("ChecknZ");
        CheckA = document.getElementById("CheckA");
        oneyear = document.getElementById("oneyear");
        threeyear = document.getElementById("threeyear");
        btnReset = document.getElementById("btnReset");
        txtFromAcc_ID = document.getElementById("txtFromAcc_ID");
        txtCenter_Cost_ID = document.getElementById("txtCenter_Cost_ID");
        txtFromAcc_DESC = document.getElementById("txtFromAcc_DESC");
        txtCenter_Cost_DESC = document.getElementById("txtCenter_Cost_DESC");
        chk_Certified = document.getElementById("chk_Certified");
        chk_New = document.getElementById("chk_New");
        chk_IncludeInvTR = document.getElementById("chk_IncludeInvTR");
        //---------------------------------------------------------------------- Print Buttons
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        btnFromAccSearch.onclick = btnFromAccSearch_onclick;
        btnCCostSearch.onclick = btnCCostSearch_onclick;
        btnReset.onclick = btnReset_onclick;
        txtFromAcc_ID.onchange = txtFromAcc_ID_onchange;
        txtCenter_Cost_ID.onchange = txtCenter_Cost_ID_onchange;
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
    }
    //-----------------------------------------------------------------------   (  Button search from Account  )
    function btnFromAccSearch_onclick() {
        sys.FindKey(Modules.GLAging, "btnFromAccSearch", "COMP_CODE= " + compcode + " and DETAIL = 0  ", function () {
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            $('#txtFromAcc_ID').val(id);
            GetAccByCode(id);
            $('#txtFromAcc_DESC').val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));
        });
    }
    function GetAccByCode(AccCode) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetByAccCode"),
            data: { CompCode: compcode, AccCode: AccCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    AccountDetails = result.Response;
                    if (AccountDetails == null) {
                        txtFromAcc_ID.value = "";
                        txtFromAcc_DESC.value = "";
                        Errorinput(txtFromAcc_ID);
                        DisplayMassage("كود الحساب غير صحيح", "Wrong Account Code!", MessageType.Error);
                    }
                    else {
                        txtFromAcc_ID.value = AccountDetails.ACC_CODE;
                        txtFromAcc_DESC.value = AccountDetails.ACC_DESCA;
                    }
                }
            }
        });
    }
    function txtFromAcc_ID_onchange() {
        txtFromAcc_DESC.value = "";
        GetAccByCode(txtFromAcc_ID.value);
    }
    //-----------------------------------------------------------------------   (  Button search Cost Center )
    function btnCCostSearch_onclick() {
        var sys = new SystemTools();
        sys.FindKey(Modules.Accountbalances, "btnCCostSearch", "COMP_CODE=" + compcode + "", function () {
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
                    if (CostCenterDetails == null) {
                        txtCenter_Cost_ID.value = "";
                        txtCenter_Cost_DESC.value = "";
                        Errorinput(txtCenter_Cost_ID);
                        DisplayMassage("كود التكلفه غير صحيح", "Wrong cost code!", MessageType.Error);
                    }
                    else {
                        txtCenter_Cost_ID.value = CostCenterDetails.CC_CODE;
                        txtCenter_Cost_DESC.value = CostCenterDetails.CC_DESCA;
                    }
                }
            }
        });
    }
    function txtCenter_Cost_ID_onchange() {
        txtCenter_Cost_DESC.value = "";
        GetCostCenterByCode(txtCenter_Cost_ID.value);
    }
    //-----------------------------------------------------------------------   (  Get Date  )
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
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        discharge();
        chk_Certified.checked = false;
        chk_New.checked = false;
        CheckD.checked = true;
        oneyear.checked = true;
    }
    function discharge() {
        $('#txtFromAcc_ID').val("");
        $('#txtFromAcc_DESC').val("");
        $('#txtCenter_Cost_ID').val("");
        $('#txtCenter_Cost_DESC').val("");
        $('#txtToAcc_ID').val("");
        $('#txtToAcc_DESC').val("");
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        var rp = new ReportParameters();
        rp.RepType = OutType; //output report as View	  
        rp.ToDate = DateFormatRep(txtToDate.value);
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
        rp.ToDate = DateFormatRep(txtToDate.value);
        rp.orderby = Number($('#orderby').val());
        if ($('#txtCenter_Cost_ID').val() == "") {
            rp.cc_code = "-1";
        }
        else {
            rp.cc_code = $('#txtCenter_Cost_ID').val();
        }
        if ($('#txtFromAcc_ID').val() == "") {
            rp.AccCode = "-1";
        }
        else {
            rp.AccCode = $('#txtFromAcc_ID').val();
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
        if (CheckD.checked == true) {
            rp.BalType = 1;
        }
        else if (CheckC.checked == true) {
            rp.BalType = 2;
        }
        else if (CheckZ.checked == true) {
            rp.BalType = 3;
        }
        else if (ChecknZ.checked == true) {
            rp.BalType = 4;
        }
        else {
            rp.BalType = 0;
        }
        rp.IncludeInvTR = chk_IncludeInvTR.checked == true ? 1 : 0;
        if (oneyear.checked == true) {
            rp.Agtype = 1;
        }
        else if (threeyear.checked == true) {
            rp.Agtype = 3;
        }
        else {
            rp.Agtype = 5;
        }
        if ($('#txtFromAcc_ID').val() == "") {
            MessageBox.Show("يجب اختيار حساب الاستاذ", "تنبيه");
            Errorinput($('#txtFromAcc_ID'));
            return;
        }
        Ajax.Callsync({
            url: Url.Action("AProc_Rpt_GLAging", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(GLAging || (GLAging = {}));
//# sourceMappingURL=GLAging.js.map