$(document).ready(function () {
    try {
        HomeComponent.InitalizeComponent();
    }
    catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");
    }
});
var HomeComponent;
(function (HomeComponent) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession('Home');
    $('Li').addClass('animate__animated animate__fadeInTopRight');
    $('#logOrg').addClass('animate__animated animate__backInDown');
    function InitalizeComponent() {
        GetAllPages();
        ApplyModules();
        InitializePages();
    }
    HomeComponent.InitalizeComponent = InitalizeComponent;
    function InitializePages() {
        $("#btnGLAging").click(function () { OpenPage(Modules.GLAging); });
        $("#btnHome").click(function () { OpenPage(Modules.Home); });
        $("#btnStkDefItems").click(function () { OpenPage(Modules.StkDefItems); });
        $("#btnStkDefItemsNew").click(function () { OpenPage(Modules.StkDefItemsNew); });
        $("#btnStkDefCategory").click(function () { OpenPage(Modules.StkDefCategory); });
        $("#btnPeriodManagement").click(function () { OpenPage(Modules.PeriodManagement); }); //
        $("#btnItemPeriodSummary").click(function () { OpenPage(Modules.ItemPeriodSummary); }); //
        $("#btnStkDefUnit").click(function () { OpenPage(Modules.StkDefUnit); });
        $("#btnStkDefItemType").click(function () { OpenPage(Modules.StkDefItemType); });
        $("#btnStkDefStore").click(function () { OpenPage(Modules.StkDefStore); });
        $("#btnDashboard").click(function () { OpenPage(Modules.Dashboard); });
        $("#btnAccDefVendor").click(function () { OpenPage(Modules.AccDefVendor); });
        $("#btnAccDefCustomer").click(function () { OpenPage(Modules.AccDefCustomer); });
        $("#btnAccDefSalesmen").click(function () { OpenPage(Modules.AccDefSalesmen); });
        $("#btnAccDefBox").click(function () { OpenPage(Modules.AccDefBox); });
        $("#btnAccDefExpenses").click(function () { OpenPage(Modules.AccDefExpenses); });
        $("#btnAccDefReceipts").click(function () { OpenPage(Modules.AccDefReceipts); });
        $("#btnCashBankAccount").click(function () { OpenPage(Modules.CashBankAccount); });
        $("#btnAgingCust").click(function () { OpenPage(Modules.AgingCust); }); //
        $("#btnAgingVend").click(function () { OpenPage(Modules.AgingVend); }); //
        $("#btnGenDefCustomerCat").click(function () { OpenPage(Modules.GenDefCustomerCat); });
        $("#btnGendefCustomerGroup").click(function () { OpenPage(Modules.GendefCustomerGroup); });
        $("#btnGenDefCustomerAdjust").click(function () { OpenPage(Modules.GenDefCustomerAdjust); });
        $("#btnGenDefVendorCat").click(function () { OpenPage(Modules.GenDefVendorCat); });
        $("#btnGendefVendorGroup").click(function () { OpenPage(Modules.GendefVendorGroup); });
        $("#btnGenDefVendorAdjust").click(function () { OpenPage(Modules.GenDefVendorAdjust); });
        $("#btnAccTrInvReceipt").click(function () { OpenPage(Modules.AccTrInvReceipt); });
        $("#btnAccTrReceiptNote").click(function () { OpenPage(Modules.AccTrReceiptNote); });
        $("#btnAccTrReceiptNoteNew").click(function () { OpenPage(Modules.AccTrReceiptNoteNew); });
        $("#btnAccTrPaymentNote").click(function () { OpenPage(Modules.AccTrPaymentNote); });
        $("#btnAccTrPaymentNoteNew").click(function () { OpenPage(Modules.AccTrPaymentNoteNew); });
        $("#btnAccTrCustomerAdjust").click(function () { OpenPage(Modules.AccTrCustomerAdjust); });
        $("#btnAccTrVendorAdjust").click(function () { OpenPage(Modules.AccTrVendorAdjust); });
        $("#btnSlsTrSales").click(function () { OpenPage(Modules.SlsTrSales); });
        $("#btnSlsTrReturn").click(function () { OpenPage(Modules.SlsTrReturn); });
        $("#btnSlsTrReturnOperation").click(function () { OpenPage(Modules.SlsTrReturnOperation); });
        $("#btnSlsTrReturnNew").click(function () { OpenPage(Modules.SlsTrReturnNew); });
        $("#btnSlsTrSalesManager").click(function () { OpenPage(Modules.SlsTrSalesManager); });
        $("#btnSlsTrSalesManagerNew").click(function () { OpenPage(Modules.SlsTrSalesManagerNew); });
        $("#btnSlsTrSalesOperation").click(function () { OpenPage(Modules.SlsTrSalesOperation); });
        $("#btnSlsTrShowPrice").click(function () { OpenPage(Modules.SlsTrShowPrice); });
        $("#btnPurOrder").click(function () { OpenPage(Modules.PurOrder); });
        $("#btnPurTrReceive").click(function () { OpenPage(Modules.PurTrReceive); });
        $("#btnPurTrReturn").click(function () { OpenPage(Modules.PurTrReturn); });
        $("#btnPurTrpaymemt").click(function () { OpenPage(Modules.PurTrpaymemt); });
        $("#btnProcesses").click(function () { OpenPage(Modules.Processes); });
        $("#btnSalesTrans").click(function () { OpenPage(Modules.SalesTrans); });
        $("#btnProcSalesRet").click(function () { OpenPage(Modules.ProcSalesRet); });
        $("#btnOperationExport").click(function () { OpenPage(Modules.OperationExport); });
        $("#btnOperationScrap").click(function () { OpenPage(Modules.OperationScrap); });
        $("#btnOperationRepScrap").click(function () { OpenPage(Modules.OperationRepScrap); });
        $("#btnProcSalesInvoice").click(function () { OpenPage(Modules.ProcSalesInvoice); });
        $("#btnProcSalesMgr").click(function () { OpenPage(Modules.ProcSalesMgr); }); //
        $("#btnCloseProcesses").click(function () { OpenPage(Modules.CloseProcesses); }); // 
        $("#btnClientaccstat").click(function () { OpenPage(Modules.Clientaccstat); }); //
        $("#btnCollectedaccstat").click(function () { OpenPage(Modules.Collectedaccstat); }); //
        $("#btnSupplieraccstat").click(function () { OpenPage(Modules.Supplieraccstat); }); //
        $("#btnCashBoxAccount").click(function () { OpenPage(Modules.CashBoxAccount); }); //
        $("#btnInventorymove").click(function () { OpenPage(Modules.Inventorymove); }); //
        $("#btnInventoryvalue").click(function () { OpenPage(Modules.Inventoryvalue); }); //
        $("#btnIncomeoperations").click(function () { OpenPage(Modules.Incomeoperations); }); //  
        $("#btnItemsalesSum").click(function () { OpenPage(Modules.ItemsalesSum); }); //
        $("#btnCustSalSum").click(function () { OpenPage(Modules.CustSalSum); }); //
        $("#btnItemPurchase").click(function () { OpenPage(Modules.ItemPurchase); }); //
        $("#btnIssueType").click(function () { OpenPage(Modules.IssueType); }); //
        $("#btnIssueToCC").click(function () { OpenPage(Modules.IssueToCC); }); // 
        $("#btnGLDefAccount").click(function () { OpenPage(Modules.GLDefAccount); }); //
        $("#btnLnkVoucher").click(function () { OpenPage(Modules.LnkVoucher); }); //
        $("#btnJournalVoucher").click(function () { OpenPage(Modules.JournalVoucher); }); //
        $("#btnReceiptVoucher").click(function () { OpenPage(Modules.ReceiptVoucher); }); //
        $("#btnPaymentVoucher").click(function () { OpenPage(Modules.PaymentVoucher); }); //
        $("#btnManagementVoucher").click(function () { OpenPage(Modules.ManagementVoucher); }); //
        $("#btnCostCenter").click(function () { OpenPage(Modules.CostCenter); }); //
        $("#btnAccountGroup").click(function () { OpenPage(Modules.AccountGroup); }); //
        $("#btnAccGroup").click(function () { OpenPage(Modules.AccGroup); }); //
        $("#btnAccountstatement").click(function () { OpenPage(Modules.Accountstatement); }); //
        $("#btnAccountbalances").click(function () { OpenPage(Modules.Accountbalances); }); // 
        $("#btnfinancialreports").click(function () { OpenPage(Modules.financialreports); }); //
        $("#btnUSERS").click(function () { OpenPage(Modules.USERS); }); //
        $("#btnUserActLog").click(function () { OpenPage(Modules.UserActLog); }); //
        $("#btnUserActLogSum").click(function () { OpenPage(Modules.UserActLogSum); }); //
        $("#btnTranPosting").click(function () { OpenPage(Modules.TranPosting); }); //
        $("#btnLnkvarBranch").click(function () { OpenPage(Modules.LnkvarBranch); }); //
        $("#btnLnkTransVoucher").click(function () { OpenPage(Modules.LnkTransVoucher); }); // 
        $("#btnDirecttransfer").click(function () { OpenPage(Modules.Directtransfer); });
        $("#btnSTKAdjust").click(function () { OpenPage(Modules.STKAdjust); });
        $("#btnSTKOpeningbalance").click(function () { OpenPage(Modules.STKOpeningbalance); });
        $("#btnReceiveTransfer").click(function () { OpenPage(Modules.ReceiveTransfer); });
        $("#btnsendTransfer").click(function () { OpenPage(Modules.sendTransfer); });
        $("#btnGenDefAdd").click(function () { OpenPage(Modules.GenDefAdd); });
        $("#btnDefStore").click(function () { OpenPage(Modules.DefStore); });
        $("#btnServiceCategories").click(function () { OpenPage(Modules.ServiceCategories); });
        $("#btnServices").click(function () { OpenPage(Modules.Services); });
        $("#btnSales_Services").click(function () { OpenPage(Modules.Sales_Services); });
        $("#btnSer_Return_Sales").click(function () { OpenPage(Modules.Ser_Return_Sales); });
        $("#btnSer_Purchasing").click(function () { OpenPage(Modules.Ser_Purchasing); });
        $("#btnSer_Return_Pur").click(function () { OpenPage(Modules.Ser_Return_Pur); });
        $("#btnSer_Sales_Report").click(function () { OpenPage(Modules.Ser_Sales_Report); });
        $("#btnSer_Pur_Report").click(function () { OpenPage(Modules.Ser_Pur_Report); });
        $("#btnVatLists").click(function () { OpenPage(Modules.VatLists); });
        $("#btnVatReport").click(function () { OpenPage(Modules.VatReport); });
        $("#btnVatSetting").click(function () { OpenPage(Modules.VatSetting); });
        $("#btnDtcostcenter").click(function () { OpenPage(Modules.Dtcostcenter); });
        $("#btnCcdtAccState").click(function () { OpenPage(Modules.CcdtAccState); });
        $("#btnCollectUnit").click(function () { OpenPage(Modules.CollectUnit); });
        $("#btnVoucherType").click(function () { OpenPage(Modules.VoucherType); });
    }
    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        var obj = [document.getElementById('liItem')];
        var modules = new Array();
        var compCode = SysSession.CurrentEnvironment.CompCode;
        var branchCode = SysSession.CurrentEnvironment.BranchCode;
        var UserCode = SysSession.CurrentEnvironment.UserCode;
        var SystemCode = SysSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var CurrentYear = SysSession.CurrentEnvironment.CurrentYear;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: function (d) {
                modules = d;
            }
        });
        // filter moulules where isavailable = false or access = false 
        var li;
        var li_T;
        for (var i = 0; i < modules.length; i++) {
            var singleUserModule = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE);
                li_T = document.getElementById("btn" + singleUserModule.MODULE_CODE + "T");
            }
            if (li != null) {
                try {
                    if (singleUserModule != null) {
                        if (singleUserModule.Access === false) {
                            li.style.display = "none";
                            li_T.style.display = "none";
                        }
                        if (singleUserModule.AVAILABLE === false) {
                            li.style.display = "none";
                            li_T.style.display = "none";
                        }
                    }
                    else {
                        var key = li.getAttribute("key");
                        li.style.display = "";
                        li_T.style.display = "";
                        li.className = "liItem";
                        li_T.className = "liItem";
                    }
                }
                catch (e) {
                }
            }
            else {
                //alert("wrong code  " + singleUserModule.MODULE_CODE)
            }
        }
        $('.MED').removeClass('display_none');
        if (SysSession.CurrentEnvironment.I_Control[0].GL_VoucherCCDT_Type != 1) {
            $('#btnDtcostcenter').addClass('display_none');
            $('#btnDtcostcenterT').addClass('display_none');
            $('#btnCcdtAccState').addClass('display_none');
            $('#btnCcdtAccStateT').addClass('display_none');
        }
    }
    function LogoutUserApi() {
        var userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: function (d) {
                if (d !== undefined) {
                    window.open(Url.Action("HomePage", "Login"), "_self");
                    return;
                }
            }
        });
    }
    HomeComponent.LogoutUserApi = LogoutUserApi;
    ;
})(HomeComponent || (HomeComponent = {}));
//# sourceMappingURL=HomeComponent.js.map