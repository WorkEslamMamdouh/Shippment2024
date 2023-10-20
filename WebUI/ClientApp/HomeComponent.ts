
$(document).ready(() => {
    try {

        HomeComponent.InitalizeComponent();
    } catch (e) {
        //window.open(Url.Action("HomePage", "Login"), "_self");

    }
});

namespace HomeComponent { 
    var sys: SystemTools = new SystemTools();  
    var SysSession: SystemSession = GetSystemSession('Home'); 

       
    
    $('Li').addClass('animate__animated animate__fadeInTopRight');
    $('#logOrg').addClass('animate__animated animate__backInDown'); 

    export function InitalizeComponent() {

        GetAllPages();
        ApplyModules(); 
        InitializePages();

    } 
    function InitializePages() { 
        $("#btnGLAging").click(() => {  OpenPage(Modules.GLAging); })
        $("#btnHome").click(() => {  OpenPage(Modules.Home); })
        $("#btnStkDefItems").click(() => {  OpenPage(Modules.StkDefItems); })
        $("#btnStkDefItemsNew").click(() => {  OpenPage(Modules.StkDefItemsNew); })
        $("#btnStkDefCategory").click(() => {  OpenPage(Modules.StkDefCategory); })
        $("#btnPeriodManagement").click(() => {  OpenPage(Modules.PeriodManagement); })//
        $("#btnItemPeriodSummary").click(() => {  OpenPage(Modules.ItemPeriodSummary); })//
        $("#btnStkDefUnit").click(() => {  OpenPage(Modules.StkDefUnit); })
        $("#btnStkDefItemType").click(() => {  OpenPage(Modules.StkDefItemType); })
        $("#btnStkDefStore").click(() => {  OpenPage(Modules.StkDefStore); })
        $("#btnDashboard").click(() => {  OpenPage(Modules.Dashboard); })
        $("#btnAccDefVendor").click(() => {  OpenPage(Modules.AccDefVendor); })
        $("#btnAccDefCustomer").click(() => {  OpenPage(Modules.AccDefCustomer); })
        $("#btnAccDefSalesmen").click(() => {  OpenPage(Modules.AccDefSalesmen); })
        $("#btnAccDefBox").click(() => {  OpenPage(Modules.AccDefBox); })
        $("#btnAccDefExpenses").click(() => {  OpenPage(Modules.AccDefExpenses); })
        $("#btnAccDefReceipts").click(() => {  OpenPage(Modules.AccDefReceipts); })
        $("#btnCashBankAccount").click(() => {  OpenPage(Modules.CashBankAccount); })
        $("#btnAgingCust").click(() => {  OpenPage(Modules.AgingCust); })//
        $("#btnAgingVend").click(() => {  OpenPage(Modules.AgingVend); })//
        $("#btnGenDefCustomerCat").click(() => {  OpenPage(Modules.GenDefCustomerCat); })
        $("#btnGendefCustomerGroup").click(() => {  OpenPage(Modules.GendefCustomerGroup); })
        $("#btnGenDefCustomerAdjust").click(() => {  OpenPage(Modules.GenDefCustomerAdjust); })
        $("#btnGenDefVendorCat").click(() => {  OpenPage(Modules.GenDefVendorCat); })
        $("#btnGendefVendorGroup").click(() => {  OpenPage(Modules.GendefVendorGroup); })
        $("#btnGenDefVendorAdjust").click(() => {  OpenPage(Modules.GenDefVendorAdjust); })
        $("#btnAccTrInvReceipt").click(() => {  OpenPage(Modules.AccTrInvReceipt); })
        $("#btnAccTrReceiptNote").click(() => {  OpenPage(Modules.AccTrReceiptNote); })
        $("#btnAccTrReceiptNoteNew").click(() => {  OpenPage(Modules.AccTrReceiptNoteNew); })
        $("#btnAccTrPaymentNote").click(() => {  OpenPage(Modules.AccTrPaymentNote); })
        $("#btnAccTrPaymentNoteNew").click(() => {  OpenPage(Modules.AccTrPaymentNoteNew); })
        $("#btnAccTrCustomerAdjust").click(() => {  OpenPage(Modules.AccTrCustomerAdjust); })
        $("#btnAccTrVendorAdjust").click(() => {  OpenPage(Modules.AccTrVendorAdjust); })
        $("#btnSlsTrSales").click(() => {  OpenPage(Modules.SlsTrSales); })
        $("#btnSlsTrReturn").click(() => {  OpenPage(Modules.SlsTrReturn); })
        $("#btnSlsTrReturnOperation").click(() => {  OpenPage(Modules.SlsTrReturnOperation); })
        $("#btnSlsTrReturnNew").click(() => {  OpenPage(Modules.SlsTrReturnNew); })
        $("#btnSlsTrSalesManager").click(() => {  OpenPage(Modules.SlsTrSalesManager); })
        $("#btnSlsTrSalesManagerNew").click(() => {  OpenPage(Modules.SlsTrSalesManagerNew); })
        $("#btnSlsTrSalesOperation").click(() => {  OpenPage(Modules.SlsTrSalesOperation); })
        $("#btnSlsTrShowPrice").click(() => {  OpenPage(Modules.SlsTrShowPrice); })
        $("#btnPurOrder").click(() => {  OpenPage(Modules.PurOrder); })
        $("#btnPurTrReceive").click(() => {  OpenPage(Modules.PurTrReceive); })
        $("#btnPurTrReturn").click(() => {  OpenPage(Modules.PurTrReturn); })
        $("#btnPurTrpaymemt").click(() => {  OpenPage(Modules.PurTrpaymemt); })
        $("#btnProcesses").click(() => {  OpenPage(Modules.Processes); })
        $("#btnSalesTrans").click(() => {  OpenPage(Modules.SalesTrans); })
        $("#btnProcSalesRet").click(() => {  OpenPage(Modules.ProcSalesRet); })
        $("#btnOperationExport").click(() => {  OpenPage(Modules.OperationExport); })
        $("#btnOperationScrap").click(() => {  OpenPage(Modules.OperationScrap); })
        $("#btnOperationRepScrap").click(() => {  OpenPage(Modules.OperationRepScrap); })
        $("#btnProcSalesInvoice").click(() => {  OpenPage(Modules.ProcSalesInvoice); })
        $("#btnProcSalesMgr").click(() => {  OpenPage(Modules.ProcSalesMgr); })//
        $("#btnCloseProcesses").click(() => {  OpenPage(Modules.CloseProcesses); })// 
        $("#btnClientaccstat").click(() => {  OpenPage(Modules.Clientaccstat); })//
        $("#btnCollectedaccstat").click(() => {  OpenPage(Modules.Collectedaccstat); })//
        $("#btnSupplieraccstat").click(() => {  OpenPage(Modules.Supplieraccstat); })//
        $("#btnCashBoxAccount").click(() => {  OpenPage(Modules.CashBoxAccount); })//
        $("#btnInventorymove").click(() => {  OpenPage(Modules.Inventorymove); })//
        $("#btnInventoryvalue").click(() => {  OpenPage(Modules.Inventoryvalue); })//
        $("#btnIncomeoperations").click(() => {  OpenPage(Modules.Incomeoperations); })//  
        $("#btnItemsalesSum").click(() => {  OpenPage(Modules.ItemsalesSum); })//
        $("#btnCustSalSum").click(() => {  OpenPage(Modules.CustSalSum); })//
        $("#btnItemPurchase").click(() => {  OpenPage(Modules.ItemPurchase); })//
        $("#btnIssueType").click(() => {  OpenPage(Modules.IssueType); })//
        $("#btnIssueToCC").click(() => {  OpenPage(Modules.IssueToCC); })// 
        $("#btnGLDefAccount").click(() => {  OpenPage(Modules.GLDefAccount); })//
        $("#btnLnkVoucher").click(() => {  OpenPage(Modules.LnkVoucher); })//
        $("#btnJournalVoucher").click(() => {  OpenPage(Modules.JournalVoucher); })//
        $("#btnReceiptVoucher").click(() => {  OpenPage(Modules.ReceiptVoucher); })//
        $("#btnPaymentVoucher").click(() => {  OpenPage(Modules.PaymentVoucher); })//
        $("#btnManagementVoucher").click(() => {  OpenPage(Modules.ManagementVoucher); })//
        $("#btnCostCenter").click(() => {  OpenPage(Modules.CostCenter); })//
        $("#btnAccountGroup").click(() => {  OpenPage(Modules.AccountGroup); })//
        $("#btnAccGroup").click(() => {  OpenPage(Modules.AccGroup); })//
        $("#btnAccountstatement").click(() => {  OpenPage(Modules.Accountstatement); })//
        $("#btnAccountbalances").click(() => {  OpenPage(Modules.Accountbalances); })// 
        $("#btnfinancialreports").click(() => {  OpenPage(Modules.financialreports); })//
        $("#btnUSERS").click(() => {  OpenPage(Modules.USERS); })//
        $("#btnUserActLog").click(() => {  OpenPage(Modules.UserActLog); })//
        $("#btnUserActLogSum").click(() => {  OpenPage(Modules.UserActLogSum); })//
        $("#btnTranPosting").click(() => {  OpenPage(Modules.TranPosting); })//
        $("#btnLnkvarBranch").click(() => {  OpenPage(Modules.LnkvarBranch); })//
        $("#btnLnkTransVoucher").click(() => {  OpenPage(Modules.LnkTransVoucher); })// 
        $("#btnDirecttransfer").click(() => {  OpenPage(Modules.Directtransfer); })
        $("#btnSTKAdjust").click(() => {  OpenPage(Modules.STKAdjust); })
        $("#btnSTKOpeningbalance").click(() => {  OpenPage(Modules.STKOpeningbalance); })
        $("#btnReceiveTransfer").click(() => {  OpenPage(Modules.ReceiveTransfer); })
        $("#btnsendTransfer").click(() => {  OpenPage(Modules.sendTransfer); })
        $("#btnGenDefAdd").click(() => {  OpenPage(Modules.GenDefAdd); })
        $("#btnDefStore").click(() => {  OpenPage(Modules.DefStore); })
        $("#btnServiceCategories").click(() => {  OpenPage(Modules.ServiceCategories); })
        $("#btnServices").click(() => {  OpenPage(Modules.Services); })
        $("#btnSales_Services").click(() => {  OpenPage(Modules.Sales_Services); })
        $("#btnSer_Return_Sales").click(() => {  OpenPage(Modules.Ser_Return_Sales); })
        $("#btnSer_Purchasing").click(() => {  OpenPage(Modules.Ser_Purchasing); })
        $("#btnSer_Return_Pur").click(() => {  OpenPage(Modules.Ser_Return_Pur); })
        $("#btnSer_Sales_Report").click(() => {  OpenPage(Modules.Ser_Sales_Report); })
        $("#btnSer_Pur_Report").click(() => {  OpenPage(Modules.Ser_Pur_Report); })
        $("#btnVatLists").click(() => {  OpenPage(Modules.VatLists); })
        $("#btnVatReport").click(() => {  OpenPage(Modules.VatReport); })
        $("#btnVatSetting").click(() => {  OpenPage(Modules.VatSetting); })
        $("#btnDtcostcenter").click(() => {  OpenPage(Modules.Dtcostcenter); })
        $("#btnCcdtAccState").click(() => {  OpenPage(Modules.CcdtAccState); })
        $("#btnCollectUnit").click(() => {  OpenPage(Modules.CollectUnit); })
        $("#btnVoucherType").click(() => {  OpenPage(Modules.VoucherType); }) 
    }

    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        let obj = [document.getElementById('liItem')];
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SysSession.CurrentEnvironment.CompCode;
        let branchCode = SysSession.CurrentEnvironment.BranchCode;
        let UserCode = SysSession.CurrentEnvironment.UserCode;
        let SystemCode = SysSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        let CurrentYear = SysSession.CurrentEnvironment.CurrentYear;

         Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetAllUserPrivilage"),
            async: false,
            data: { year: Number(CurrentYear), compCode: Number(compCode), branchCode: Number(branchCode), UserCode: UserCode, SystemCode: SystemCode, SubSystemCode: SubSystemCode },
            success: (d) => {

                modules = d as Array<UserPrivilege>;
            }
        });
        // filter moulules where isavailable = false or access = false 
        let li;
        let li_T;
        for (var i = 0; i < modules.length; i++) {



            let singleUserModule: UserPrivilege = modules[i];
            //Notification control
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            else if (singleUserModule.MODULE_CODE.substring(0, 4) == "tol_") {

                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }

            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE) as HTMLLIElement;
                li_T = document.getElementById("btn" + singleUserModule.MODULE_CODE + "T") as HTMLLIElement;
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
                        let key: string = li.getAttribute("key");
                        li.style.display = "";
                        li_T.style.display = "";
                        li.className = "liItem";
                        li_T.className = "liItem";
                    }

                } catch (e) {

                }



            } else {
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
    export function LogoutUserApi() {
        let userCode = SysSession.CurrentEnvironment.UserCode;
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "LogoutUser"),
            data: { user: userCode },
            success: (d) => { 
                if (d !== undefined) {
                     
                    window.open(Url.Action("HomePage", "Login"), "_self");

                    return;
                }
            }
        });
    };
     
       
}
