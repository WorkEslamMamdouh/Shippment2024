﻿$(document).ready(() => {

    AccountGroup.InitalizeComponent();
})
namespace AccountGroup {
    var compcode: Number;
    var AccountType: Number = 1;
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession(Modules.AccountGroup);
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;

    var AccountDetails: A_ACCOUNT_GROUP = new A_ACCOUNT_GROUP();
    var CostCenterDetails: G_COST_CENTER = new G_COST_CENTER();

    var chkview: HTMLInputElement
    var chk_Certified: HTMLInputElement
    var chk_New: HTMLInputElement
    var chk_IncludeInvTR: HTMLInputElement

    var btnReset;
    // Print Buttons
    var btnPrint: HTMLButtonElement;
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;

    var btnGroupCodeSearch: HTMLButtonElement;
    
    var btnCCostSearch: HTMLButtonElement;

    var txtGroupCode_ID: HTMLInputElement;
    var txtGroupCode_DESC: HTMLInputElement;  
    var txtCenter_Cost_ID: HTMLInputElement;
    var txtCenter_Cost_DESC: HTMLInputElement;
    var reptype1: HTMLInputElement;
    var reptype3: HTMLInputElement;

    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    export function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "كشف حساب مجمع ";

        } else {
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



    function InitalizeControls() {
         
        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        btnGroupCodeSearch = document.getElementById("btnGroupCodeSearch") as HTMLButtonElement;
        txtGroupCode_ID = document.getElementById("txtGroupCode_ID") as HTMLInputElement;
        txtGroupCode_DESC = document.getElementById("txtGroupCode_DESC") as HTMLInputElement;  
        txtCenter_Cost_ID = document.getElementById("txtCenter_Cost_ID") as HTMLInputElement;
        txtCenter_Cost_DESC = document.getElementById("txtCenter_Cost_DESC") as HTMLInputElement;        
        reptype1 = document.getElementById("reptype1") as HTMLInputElement;        
        reptype3 = document.getElementById("reptype3") as HTMLInputElement;        
        btnCCostSearch = document.getElementById("btnCCostSearch") as HTMLButtonElement;
        chkview = document.getElementById("chkview") as HTMLInputElement;
        chk_Certified = document.getElementById("chk_Certified") as HTMLInputElement;
        chk_New = document.getElementById("chk_New") as HTMLInputElement;
        chk_IncludeInvTR = document.getElementById("chk_IncludeInvTR") as HTMLInputElement;

        btnReset = document.getElementById("btnReset") as HTMLButtonElement;

         

        //---------------------------------------------------------------------- Print Buttons

        btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;

    }
    function InitalizeEvents() {
        // Print Buttons
        btnPrintTrview.onclick = () => { PrintReport(1); }
        btnPrintTrPDF.onclick = () => { PrintReport(2); }
        btnPrintTrEXEL.onclick = () => { PrintReport(3); }
        btnPrint.onclick = () => { PrintReport(4); }

        btnGroupCodeSearch.onclick = btnGroupCodeSearch_onclick;
        txtGroupCode_ID.onchange = txtGroupCode_ID_onchange;
        
        btnCCostSearch.onclick = btnCCostSearch_onclick;
        txtCenter_Cost_ID.onchange = txtCenter_Cost_ID_onchange;

        btnReset.onclick = btnReset_onclick;


    }



    function btnGroupCodeSearch_onclick() {


        sys.FindKey(Modules.AccountGroup, "btnAccGroupSearch", "COMP_CODE= " + compcode + " ", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey
            $('#txtGroupCode_ID').val(id);
            GetAccByCode(id);
            $('#txtGroupCode_DESC').val((lang == "ar" ? AccountDetails.DESCA : AccountDetails.DESCL));

           
        });

    }
 
    function btnCCostSearch_onclick() {



        let sys: SystemTools = new SystemTools();
        sys.FindKey(Modules.Accountstatement, "btnCCostSearch", "COMP_CODE=" + compcode + " ", () => {
            let id = SearchGrid.SearchDataGrid.SelectedKey
            $('#txtCenter_Cost_ID').val(id);
            GetCostCenterByCode(id);
            $('#txtCenter_Cost_DESC').val((lang == "ar" ? CostCenterDetails.CC_DESCA : CostCenterDetails.CC_DESCE));
        });

    }
    function GetCostCenterByCode(CC_Code: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("CostCenter", "GetByCostCntreCode"),
            data: { CompCode: compcode, CostCntreCode: CC_Code, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    CostCenterDetails = result.Response as G_COST_CENTER;

                    debugger
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
    function GetAccByCode(AccCode: string) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetByAccCode_GROUP"),
            data: { CompCode: compcode, AccCode: AccCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    AccountDetails = result.Response as A_ACCOUNT_GROUP;
                    
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
        var today: Date = new Date();
        var dd: string = today.getDate().toString();
        var ReturnedDate: string;
        var mm: string = (today.getMonth() + 1).toString();
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
    function PrintReport(OutType: number) {
        if ($('#txtGroupCode_ID').val() == "" ) {
            WorningMessage("يجب ادخال الحساب!", "Must Enter Account!", "تحذير", "worning");
            return;

        }

        let rp: ReportParameters = new ReportParameters();

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
        rp.RepType = OutType;//output report as View
        rp.FromDate = DateFormatRep(txtFromDate.value);
        rp.ToDate = DateFormatRep(txtToDate.value);

        rp.IncludeInvTR = chk_IncludeInvTR.checked == true ? 1 : 0;

        if ($('#txtGroupCode_ID').val() == "") {
            rp.GroupCode = "-1";
        } else {
            rp.GroupCode = $('#txtGroupCode_ID').val();
        }
         

        if ($('#txtCenter_Cost_ID').val() == "") {
            rp.cc_code = "-1";
        }
        else {
            rp.cc_code = $('#txtCenter_Cost_ID').val();
        }

        if (reptype1.checked == true) { 
            rp.TrType = 1  
        } else if (reptype3.checked == true) {
          
            rp.TrType = 2  
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

        if ($('#txtGroupCode_ID').val() == ""  ) {
            MessageBox.Show("يجب اختيار الحساب", "تنبيه")
            return;
        }



        Ajax.Callsync({
            url: Url.Action("AProc_Rpt_GLAccountGroupStatment", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                
                window.open(result, "_blank");
            }
        })
    }
}