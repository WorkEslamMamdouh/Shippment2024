$(document).ready(function () {
    CustSalSum.InitalizeComponent();
});
var CustSalSum;
(function (CustSalSum) {
    var compcode;
    var AccountType = 1;
    var sys = new SystemTools();
    var SysSession = GetSystemSession(Modules.Clientaccstat);
    //------------------------------------------------------------
    var Details_Type_D_Category = new Array();
    var Details_CustomerGroup = new Array();
    var SalesmanDetails = new Array();
    var Details = new Array();
    var CustomersDetails = new Array();
    var CustomersDetailsfillc = new Array();
    var Customer = new A_Rec_D_Customer();
    //------------------------------------------------------------
    var txt_ID_APP_Category;
    var txt_ID_APP_Group;
    var ddlCustomer;
    var txtDateFrom;
    var txtDateTo;
    var Rddetails;
    var Rd_sum;
    var Rd_sumProcc;
    var btnReset;
    var InvoiceTy1;
    var InvoiceTy2;
    var InvoiceTy3;
    var SalTy1;
    var SalTy2;
    var SalTy3;
    var Payment1;
    var Payment2;
    var Payment3;
    var TheCost1;
    var TheCost2;
    var Rd_Code;
    var Rd_Name;
    var Rd_NumTr;
    var Rd_totals_sales;
    var indebtedness;
    //--- Print Buttons
    var btnPrint;
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    function InitalizeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "تقرير ايراد مبيعات العملاء";
        }
        else {
            document.getElementById('Screen_name').innerHTML == "Customer Sales Sum";
        }
        $('#btnPrint').addClass('display_none');
        $("#iconMainPages").addClass("d-none");
        $("#iconReportPages").removeClass("d-none");
        $("#btnPrintTrview").addClass("print-report");
        $("#btnPrintTrview span").text("عرض تقرير");
        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtDateTo.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        Display_CustomerCat();
        Display_CustomerGroup();
        Display_Salesman();
        FillddlCustomer();
        fillddlBranch();
        Rddetails.checked = true;
        Rd_Code.checked = true;
        //Display(); 
        $('#Div_Ord_Total').addClass('display_none');
        SalTy3.checked = true;
        InvoiceTy3.checked = true;
        Payment3.checked = true;
    }
    CustSalSum.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txt_ID_APP_Category = document.getElementById("txt_ID_APP_Category");
        txt_ID_APP_Group = document.getElementById("txt_ID_APP_Group");
        ddlCustomer = document.getElementById("ddlCustomer");
        txtDateFrom = document.getElementById("txtFromDate");
        txtDateTo = document.getElementById("txtToDate");
        Rddetails = document.getElementById("Rd_detail");
        Rd_sum = document.getElementById("Rd_sum");
        Rd_sumProcc = document.getElementById("Rd_sumProcc");
        SalTy1 = document.getElementById("SalTy1");
        SalTy2 = document.getElementById("SalTy2");
        SalTy3 = document.getElementById("SalTy3");
        Payment1 = document.getElementById("Payment1");
        Payment2 = document.getElementById("Payment2");
        Payment3 = document.getElementById("Payment3");
        InvoiceTy1 = document.getElementById("InvoiceTy1");
        InvoiceTy2 = document.getElementById("InvoiceTy2");
        InvoiceTy3 = document.getElementById("InvoiceTy3");
        TheCost1 = document.getElementById("TheCost1");
        TheCost2 = document.getElementById("TheCost2");
        Rd_Code = document.getElementById("Rd_Code");
        Rd_Name = document.getElementById("Rd_Name");
        Rd_NumTr = document.getElementById("Rd_NumTr");
        Rd_totals_sales = document.getElementById("Rd_totals_sales");
        //Rddetails = document.querySelector("input[name=details]:checked");
        btnReset = document.getElementById("btnReset");
        //---------------------------------------------------------------------- Print Buttons
        btnPrint = document.getElementById("btnPrint");
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
    }
    function InitalizeEvents() {
        txt_ID_APP_Category.onchange = FillddlCustomer;
        txt_ID_APP_Group.onchange = FillddlCustomer;
        btnReset.onclick = btnReset_onclick();
        // Print Buttons
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        //btnPrint.onclick = () => { PrintReport(4); }
        Rddetails.onchange = SelectTotalOrDetail;
        Rd_sum.onchange = SelectTotalOrDetail;
        Rd_sumProcc.onchange = SelectTotalOrDetail;
    }
    //----------------------------------------------------( Get AllBranch )
    function fillddlBranch() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GBranch", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var BranchDetails = result.Response;
                    for (var i = 0; i < BranchDetails.length; i++) {
                        $('#dbBranch').append('<option value="' + BranchDetails[i].BRA_CODE + '">' + (lang == "ar" ? BranchDetails[i].BRA_DESC : BranchDetails[i].BRA_DESCL) + '</option>');
                    }
                }
            }
        });
    }
    //----------------------------------------------------( Get cus_Cat )
    function Display_CustomerCat() {
        //var StkDefCategory: Array<I_D_Category> = new Array<I_D_Category>();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefCategory", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details_Type_D_Category = result.Response;
                    DisplayStGenDefCustomerCat();
                }
            }
        });
    }
    function DisplayStGenDefCustomerCat() {
        for (var i = 0; i < Details_Type_D_Category.length; i++) {
            $('#txt_ID_APP_Category').append('<option value="' + Details_Type_D_Category[i].CatID + '">' + (lang == "ar" ? Details_Type_D_Category[i].Cat_DescA : Details_Type_D_Category[i].Cat_DescE) + '</option>');
        }
    }
    //----------------------------------------------------( Get cus_Group )
    function Display_CustomerGroup() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GenDefGroup", "GetAll"),
            data: {
                CompCode: compcode, AccountType: AccountType, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                //
                var result = d;
                if (result.IsSuccess) {
                    Details_CustomerGroup = result.Response;
                    DisplayStkCustomerGroup();
                }
            }
        });
    }
    function DisplayStkCustomerGroup() {
        for (var i = 0; i < Details_CustomerGroup.length; i++) {
            $('#txt_ID_APP_Group').append('<option value="' + Details_CustomerGroup[i].GroupID + '">' + (lang == "ar" ? Details_CustomerGroup[i].Group_DescA : Details_CustomerGroup[i].Group_DescE) + '</option>');
            $('#txt_Grop').append('<option value="' + Details_CustomerGroup[i].GroupID + '">' + (lang == "ar" ? Details_CustomerGroup[i].Group_DescA : Details_CustomerGroup[i].Group_DescE) + '</option>');
        }
    }
    //----------------------------------------------------( Get sales_man )
    function Display_Salesman() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
            data: {
                CompCode: compcode, IsSalesEnable: true, BranchCode: SysSession.CurrentEnvironment.BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    //
                    SalesmanDetails = result.Response;
                    SalesmanDetails = SalesmanDetails.filter(function (s) { return s.Isactive == true; });
                    DisplaySalesman();
                }
            }
        });
    }
    function DisplaySalesman() {
        for (var i = 0; i < SalesmanDetails.length; i++) {
            $('#ddlSalesman').append('<option value="' + SalesmanDetails[i].SalesmanId + '">' + (lang == "ar" ? SalesmanDetails[i].NameA : SalesmanDetails[i].NameE) + '</option>');
        }
    }
    //----------------------------------------------------(Get customer)
    function FillddlCustomer() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AccDefCustomer", "GetAll"),
            data: {
                CompCode: compcode, BranchCode: SysSession.CurrentEnvironment.BranchCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    CustomersDetails = result.Response;
                    CustomersDetailsfillc = new Array();
                    if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() == "Null") {
                        CustomersDetailsfillc = CustomersDetails.filter(function (x) { return x.CatID == Number(txt_ID_APP_Category.value); });
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEE", "Select Category");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEA", "اختر العميل");
                        }
                    }
                    else if ($('#txt_ID_APP_Category').val() == "Null" && $('#txt_ID_APP_Group').val() != "Null") {
                        CustomersDetailsfillc = CustomersDetails.filter(function (x) { return x.GroupId == Number($('#txt_ID_APP_Group').val()); });
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEE", "Select Category");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEA", "اختر العميل");
                        }
                    }
                    else if ($('#txt_ID_APP_Category').val() != "Null" && $('#txt_ID_APP_Group').val() != "Null") {
                        CustomersDetailsfillc = CustomersDetails.filter(function (x) { return x.CatID == Number(txt_ID_APP_Category.value) && x.GroupId == Number($('#txt_ID_APP_Group').val()); });
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEE", "Select Category");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(CustomersDetailsfillc, ddlCustomer, "CustomerId", "NAMEA", "اختر العميل");
                        }
                    }
                    else {
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(CustomersDetails, ddlCustomer, "CustomerId", "NAMEE", "Select Category");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(CustomersDetails, ddlCustomer, "CustomerId", "NAMEA", "اختر العميل");
                        }
                    }
                    // CustomersDetails = CustomersDetails.filter(s => s.STATUS == true);
                }
            }
        });
    }
    //----------------------------------------------------(Get Date )
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
    //----------------------------------------------------( Data )
    function btnReset_onclick() {
        txtDateFrom.value = DateFormat(SysSession.CurrentEnvironment.StartDate);
        txtDateTo.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        discharge();
    }
    function discharge() {
        $('#txt_ID_APP_Category option[value=Null]').prop('selected', 'selected').change();
        $('#ddlSalesman option[value=Null]').prop('selected', 'selected').change();
        $('#txt_ID_APP_Group option[value=Null]').prop('selected', 'selected').change();
        $('#ddlCustomer option[value=null]').prop('selected', 'selected').change();
        $('#txt_PaymentType option[value=All]').prop('selected', 'selected').change();
    }
    function SelectTotalOrDetail() {
        if (Rddetails.checked) {
            $('#Div_Ord_Total').addClass('display_none');
        }
        else {
            $('#Div_Ord_Total').removeClass('display_none');
        }
    }
    //----------------------------------------------------( Report )
    function PrintReport(OutType) {
        var rp = new ReportParameters();
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        rp.RepType = OutType; //output report as View
        if (SysSession.CurrentEnvironment.BranchName == null || SysSession.CurrentEnvironment.BranchNameEn == null) {
            rp.BraNameA = " ";
            rp.BraNameE = " ";
        }
        else {
            rp.BraNameA = SysSession.CurrentEnvironment.BranchName;
            rp.BraNameE = SysSession.CurrentEnvironment.BranchNameEn;
        }
        rp.FromDate = DateFormatRep(txtDateFrom.value);
        rp.ToDate = DateFormatRep(txtDateTo.value);
        rp.braCode = $('#dbBranch').val() == 'null' ? -1 : $('#dbBranch').val();
        if ($("#txt_ID_APP_Category").val() == "Null") { //-------------جميع الفئات
            rp.CatId = -1;
        }
        else {
            rp.CatId = Number($("#txt_ID_APP_Category").val());
        }
        if ($("#txt_ID_APP_Group").val() == "Null") { //-------------جميع المجموعات
            rp.Groupid = -1;
        }
        else {
            rp.Groupid = Number($("#txt_ID_APP_Group").val());
        }
        if ($("#ddlSalesman").val() == "Null") { //-------------جميع المناديب 
            rp.SalesmanID = -1;
        }
        else {
            rp.SalesmanID = Number($("#ddlSalesman").val());
        }
        if ($("#ddlCustomer").val() == "null") { //-------------جميع العملاء 
            rp.CustomerID = -1;
        }
        else {
            rp.CustomerID = Number($("#ddlCustomer").val());
        }
        rp.PaymentType = $("#txt_PaymentType").val();
        //  SalesType
        if (SalTy1.checked == true) {
            rp.SalesType = 1;
        }
        else if (SalTy2.checked == true) {
            rp.SalesType = 2;
        }
        else {
            rp.SalesType = 0;
        }
        //  InvoiceTy
        if (InvoiceTy1.checked == true) {
            rp.invType = 1;
        }
        else if (InvoiceTy2.checked == true) {
            rp.invType = 2;
        }
        else {
            rp.invType = 0;
        }
        //  TheCost
        if (TheCost1.checked == true) {
            rp._ShowCost = 1;
        }
        else {
            rp._ShowCost = 0;
        }
        //  OrderBy
        if (Rd_Code.checked == true) {
            rp.orderby = 1;
        }
        else if (Rd_Name.checked == true) {
            rp.orderby = 2;
        }
        else if (Rd_NumTr.checked == true) {
            rp.orderby = 3;
        }
        else {
            rp.orderby = 4;
        }
        debugger;
        //  Rd_detail
        if (Rddetails.checked == true) { //******  تقرير تفصيلي  
            rp.check = 1;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_CustomerSalesSumDetail", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if (Rd_sum.checked == true) { //******  اجمالي موزع بنوع المبيعات 
            rp.check = 2;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_CustomerSalesSumTotal", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if (Rd_sumProcc.checked == true) { //****** اجمالي موزع بنوع العملية 
            rp.check = 3;
            Ajax.Callsync({
                url: Url.Action("IProc_Rpt_CustomerSalesSumTotal", "GeneralReports"),
                data: rp,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(CustSalSum || (CustSalSum = {}));
//# sourceMappingURL=CustSalSum.js.map