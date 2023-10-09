$(document).ready(function () {
    VATReport.InitializeComponent();
});
var VATReport;
(function (VATReport) {
    //************system variables
    var SysSession = GetSystemSession(Modules.VatReport);
    var sys = new SystemTools();
    //***********Variables
    var VatPeriodDetail = new Array();
    var VatPeriodHeaderDetail = new VatPeriodMatserDetail();
    var VatPeriod = new Array();
    var SalesGrid = new JsGrid();
    var PurGrid = new JsGrid();
    var vatyear = SysSession.CurrentEnvironment.CurrentYear;
    //***********Controls
    var drpVatPeriod;
    var txtFromDate;
    var txtToDate;
    var btn_Save;
    var btnEdit;
    var btn_Back;
    var btnLoad;
    var txtCORRECTIONS;
    var txtVAT_PREVBALANCE;
    var txtVOUCHER_CODE;
    var btnClose;
    var btnReopen;
    var btnDeliveringReport;
    var LbSlsAmount;
    var LbSlsChanges;
    var LbSlsVat;
    var LbPurAmount;
    var LbPurChanges;
    var LbPurVat;
    var rd_close;
    var rd_delivered;
    var rd_Open;
    var txtNETVAT_AMOUNT;
    var txtTOTALPERIODVAT;
    //print buttons					
    var btnPrintTrview;
    var btnPrintTrPDF;
    var btnPrintTrEXEL;
    var btnPrint;
    var updStat = false;
    //*************************Initialization************************//		  
    function InitializeComponent() {
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "الاقرار الضريبي ";
        }
        else {
            document.getElementById('Screen_name').innerHTML = "Vat Report";
        }
        InitializeControls();
        InitializeEvents();
        Load_VatPeriod();
        InitializeSalesGrid();
        InitializePurGrid();
        btnEdit.disabled = !SysSession.CurrentPrivileges.EDIT;
        btnClose.disabled = !SysSession.CurrentPrivileges.CUSTOM1;
        btnReopen.disabled = !SysSession.CurrentPrivileges.CUSTOM2;
        $('#iconMainPages').addClass("d-none");
        $('#iconReportPages').addClass("d-none");
    }
    VATReport.InitializeComponent = InitializeComponent;
    function InitializeControls() {
        drpVatPeriod = document.getElementById("drpVatPeriod");
        btnLoad = document.getElementById("btnLoad");
        txtVOUCHER_CODE = document.getElementById("txtVOUCHER_CODE");
        rd_delivered = document.getElementById("rd_delivered");
        txtFromDate = document.getElementById("txtFromDate");
        txtToDate = document.getElementById("txtToDate");
        txtCORRECTIONS = document.getElementById("txtCORRECTIONS");
        txtVAT_PREVBALANCE = document.getElementById("txtVAT_PREVBALANCE");
        txtNETVAT_AMOUNT = document.getElementById("txtNETVAT_AMOUNT");
        txtTOTALPERIODVAT = document.getElementById("txtTOTALPERIODVAT");
        rd_close = document.getElementById("rd_close");
        rd_Open = document.getElementById("rd_Open");
        btnClose = document.getElementById("btnClose");
        btnReopen = document.getElementById("btnReopen");
        btnDeliveringReport = document.getElementById("btnDeliveringReport");
        LbSlsAmount = document.getElementById("LbSlsAmount");
        LbSlsChanges = document.getElementById("LbSlsChanges");
        LbSlsVat = document.getElementById("LbSlsVat");
        btnEdit = document.getElementById("btnEdit");
        btn_Save = document.getElementById("btn_Save");
        btn_Back = document.getElementById("btn_Back");
        LbPurAmount = document.getElementById("LbPurAmount");
        LbPurChanges = document.getElementById("LbPurChanges");
        LbPurVat = document.getElementById("LbPurVat");
        //print 						
        btnPrintTrview = document.getElementById("btnPrintTrview");
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF");
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL");
        btnPrint = document.getElementById("btnPrint");
    }
    function InitializeEvents() {
        drpVatPeriod.onchange = drpVatPeriod_onchange;
        btnLoad.onclick = btnLoad_onclick;
        txtCORRECTIONS.onkeyup = ComputeTotals;
        txtVAT_PREVBALANCE.onkeyup = ComputeTotals;
        btnReopen.onclick = btnReopen_onclick;
        btnClose.onclick = btnClose_onclick;
        btnDeliveringReport.onclick = btnDeliveringReport_onclick;
        btnEdit.onclick = btnEdit_onclick;
        btn_Save.onclick = btnSave_onclick;
        btn_Back.onclick = btnBack_onclick;
        btnPrintTrview.onclick = function () { PrintReport(1); };
        btnPrintTrPDF.onclick = function () { PrintReport(2); };
        btnPrintTrEXEL.onclick = function () { PrintReport(3); };
        btnPrint.onclick = function () { PrintReport(4); };
    }
    function InitializeSalesGrid() {
        var res = GetResourceList("");
        SalesGrid.ElementName = "divSalesGrid";
        SalesGrid.Paging = true;
        SalesGrid.PageSize = 10;
        SalesGrid.Sorting = true;
        SalesGrid.InsertionMode = JsGridInsertionMode.Binding;
        SalesGrid.Editing = false;
        SalesGrid.Inserting = false;
        SalesGrid.SelectedIndex = 1;
        SalesGrid.OnItemEditing = function () { };
        SalesGrid.PrimaryKey = "LineOrder";
        SalesGrid.Columns = [
            { title: res.App_Code, name: "COMP_CODE", type: "number", width: "10%", visible: false },
            { title: res.App_Code, name: "VAT_YEAR", type: "number", width: "10%", visible: false },
            { title: res.App_Number, name: "LineOrder", type: "number", width: "10%" },
            { title: res.TransDesc, name: "DESCRIPTION", type: "number", width: "30%" },
            { title: res.App_Amount, name: "Val_Amount", type: "text", width: "20%" },
            { title: res.Update_Sales, name: "Upd_Amount", type: "text", width: "20%" },
            { title: res.App_Tax, name: "VAT_Amount", type: "text", width: "20%" }
        ];
        SalesGrid.Bind();
    }
    function InitializePurGrid() {
        var res = GetResourceList("");
        PurGrid.ElementName = "divPurGrid";
        PurGrid.Paging = true;
        PurGrid.PageSize = 10;
        PurGrid.Sorting = true;
        PurGrid.InsertionMode = JsGridInsertionMode.Binding;
        PurGrid.Editing = false;
        PurGrid.Inserting = false;
        PurGrid.SelectedIndex = 1;
        PurGrid.OnItemEditing = function () { };
        PurGrid.PrimaryKey = "LineOrder";
        PurGrid.Columns = [
            { title: res.App_Code, name: "COMP_CODE", type: "number", width: "10%", visible: false },
            { title: res.App_Code, name: "VAT_YEAR", type: "number", width: "10%", visible: false },
            { title: res.App_Number, name: "LineOrder", type: "number", width: "10%" },
            { title: res.TransDesc, name: "DESCRIPTION", type: "number", width: "30%" },
            { title: res.App_Amount, name: "Val_Amount", type: "text", width: "20%" },
            { title: res.Update_Purshase, name: "Upd_Amount", type: "text", width: "20%" },
            { title: res.App_Tax, name: "VAT_Amount", type: "text", width: "20%" }
        ];
        PurGrid.Bind();
    }
    function Load_VatPeriod() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "GetAllByComp"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, compcode: Number(SysSession.CurrentEnvironment.CompCode)
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    VatPeriod = result.Response;
                    VatPeriod = VatPeriod.filter(function (x) { return x.VAT_YEAR == Number(vatyear); });
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "ar")
                        DocumentActions.FillComboFirstvalue(VatPeriod, drpVatPeriod, "PERIOD_CODE", "PERIOD_CODE", "- اختر -", null);
                    else
                        DocumentActions.FillComboFirstvalue(VatPeriod, drpVatPeriod, "PERIOD_CODE", "PERIOD_CODE", "- select -", null);
                }
            }
        });
    }
    function btnLoad_onclick() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "CalculateVatPeriod"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
                VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value)
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DisplayMassage("تم التحميل بنجاح", "", MessageType.Succeed);
                    DisplayData();
                    btnEdit_onclick();
                    ComputeTotals();
                }
            }
        });
    }
    function btnClose_onclick() {
        if (!SysSession.CurrentPrivileges.CUSTOM1)
            return;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "ChangeStatus"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
                VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value), status: 1
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DisplayMassage("تم الاغلاق بنجاح", "", MessageType.Succeed);
                    DisplayData();
                }
            }
        });
    }
    function btnReopen_onclick() {
        if (!SysSession.CurrentPrivileges.CUSTOM2)
            return;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "ChangeStatus"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
                VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value), status: 0
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DisplayMassage("تم إعادة الفتح بنجاح", "", MessageType.Succeed);
                    DisplayData();
                }
            }
        });
    }
    function btnDeliveringReport_onclick() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "DeliveringReport_VatPeriod"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
                VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value)
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DisplayMassage("تم تقديم الاقرار الضريبي بنجاح", "", MessageType.Succeed);
                    DisplayData();
                }
            }
        });
    }
    function btnEdit_onclick() {
        $(".btnEdit").removeClass("display_none");
        $(".btnback").addClass("display_none");
        $(".Editable").removeAttr('disabled');
    }
    function btnBack_onclick() {
        updStat = false;
        DisplayData();
    }
    function btnSave_onclick() {
        if (updStat) {
            loading('btnsave');
            setTimeout(function () {
                finishSave('btnsave');
                var selected = VatPeriod.filter(function (x) { return x.PERIOD_CODE == Number(drpVatPeriod.value); })[0];
                selected.CORRECTIONS = Number(txtCORRECTIONS.value);
                selected.VAT_PREVBALANCE = Number(txtVAT_PREVBALANCE.value);
                selected.TOTALPERIODVAT = Number($("#txtTOTALPERIODVAT").val());
                selected.NETVAT_AMOUNT = Number($("#txtNETVAT_AMOUNT").val());
                selected.UserCode = SysSession.CurrentEnvironment.UserCode;
                selected.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
                Ajax.Callsync({
                    type: "post",
                    url: sys.apiUrl("AVATPERIOD", "Update"),
                    data: JSON.stringify(selected),
                    success: function (d) {
                        var result = d;
                        if (result.IsSuccess) {
                            updStat = false;
                            DisplayData();
                        }
                    }
                });
            }, 100);
        }
        else {
            DisplayMassage("لا يوجد تعديل للحفظ", "", MessageType.Worning);
            Errorinput(txtVAT_PREVBALANCE);
            Errorinput(txtCORRECTIONS);
        }
    }
    function drpVatPeriod_onchange() {
        if (drpVatPeriod.value != "null" && drpVatPeriod.value != "") {
            DisplayData();
        }
        else {
            Clear();
        }
        AdjustButtons();
    }
    function AdjustButtons() {
        $(".btnEdit").addClass("display_none");
        $(".btnback").removeClass("display_none");
        $(".Editable").attr('disabled', 'disabled');
        if (rd_Open.checked) {
            $(".closed").addClass("display_none");
            $(".Open").removeClass("display_none");
        }
        else if (rd_close.checked) {
            $(".closed").removeClass("display_none");
            $(".Open").addClass("display_none");
        }
        else if (rd_delivered.checked) {
            $(".closed").addClass("display_none");
            $(".Open").addClass("display_none");
        }
    }
    function Clear() {
        VatPeriodDetail = new Array();
        SalesGrid.DataSource = VatPeriodDetail;
        SalesGrid.Bind();
        PurGrid.DataSource = VatPeriodDetail;
        PurGrid.Bind();
        $('#DivDetail :input').val('0');
        txtVOUCHER_CODE.innerHTML = "0";
        LbSlsAmount.innerHTML = "0";
        LbSlsVat.innerHTML = "0";
        LbSlsChanges.innerHTML = "0";
        LbPurAmount.innerHTML = "0";
        LbPurVat.innerHTML = "0";
        LbPurChanges.innerHTML = "0";
    }
    function DisplayData() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("AVATPERIOD", "GetVatHeader_Detail"),
            data: {
                UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
                VAT_YEAR: vatyear, PERIOD_CODE: Number(drpVatPeriod.value)
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    VatPeriodHeaderDetail = result.Response;
                    txtFromDate.value = DateFormat(VatPeriodHeaderDetail.AVAT_PERIOD.FROM_DATE);
                    txtToDate.value = DateFormat(VatPeriodHeaderDetail.AVAT_PERIOD.TO_DATE);
                    txtVOUCHER_CODE.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.VOUCHER_CODE);
                    txtCORRECTIONS.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.CORRECTIONS);
                    txtVAT_PREVBALANCE.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.VAT_PREVBALANCE);
                    txtNETVAT_AMOUNT.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.NETVAT_AMOUNT);
                    txtTOTALPERIODVAT.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.TOTALPERIODVAT);
                    VatPeriodHeaderDetail.AVAT_PERIOD.STATUS == 0 ? rd_Open.checked = true : VatPeriodHeaderDetail.AVAT_PERIOD.STATUS == 1 ? rd_close.checked = true : rd_delivered.checked = true;
                    var SlsPeriodDet = VatPeriodHeaderDetail.AQVAT_GetPeriodDetailSales.sort(function (a, b) { return a.LineOrder - b.LineOrder; });
                    SalesGrid.DataSource = SlsPeriodDet;
                    SalesGrid.Bind();
                    LbSlsAmount.innerHTML = VatPeriodHeaderDetail.vatsales.RoundToSt(2);
                    LbSlsVat.innerHTML = VatPeriodHeaderDetail.AVAT_PERIOD.SALES_VAT.RoundToSt(2);
                    LbSlsChanges.innerHTML = VatPeriodHeaderDetail.Updsales.RoundToSt(2);
                    //****************************************			   
                    var PurPeriodDet = VatPeriodHeaderDetail.AQVAT_GetPeriodDetailPur.sort(function (a, b) { return a.LineOrder - b.LineOrder; });
                    PurGrid.DataSource = PurPeriodDet;
                    PurGrid.Bind();
                    LbPurAmount.innerHTML = VatPeriodHeaderDetail.vatPur.RoundToSt(2);
                    LbPurVat.innerHTML = VatPeriodHeaderDetail.AVAT_PERIOD.PUR_VAT.RoundToSt(2);
                    LbPurChanges.innerHTML = VatPeriodHeaderDetail.UpdPur.RoundToSt(2);
                    AdjustButtons();
                }
            }
        });
    }
    function ComputeTotals() {
        updStat = true;
        txtNETVAT_AMOUNT.value = (Number(txtTOTALPERIODVAT.value) - (Number(txtVAT_PREVBALANCE.value) + Number(txtCORRECTIONS.value))).RoundToSt(2);
    }
    //*************************Print**************************//  
    function PrintReport(OutType) {
        if (drpVatPeriod.value == "null") {
            DisplayMassage("يجب اختيار الفترة", "", MessageType.Error);
            Errorinput(drpVatPeriod);
            return;
        }
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
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        var BranchNameA = SysSession.CurrentEnvironment.BranchName;
        var BranchNameE = SysSession.CurrentEnvironment.BranchName;
        if (BranchNameA == null || BranchNameE == null) {
            BranchNameA = " ";
            BranchNameE = " ";
        }
        rp.BraNameA = BranchNameA;
        rp.BraNameE = BranchNameE;
        rp.vatyear = Number(vatyear);
        rp.prdcode = Number(drpVatPeriod.value);
        Ajax.CallAsync({
            url: Url.Action("IProc_Prnt_VATReport", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
                //PrintTransactionLog(SysSession.CurrentEnvironment.UserCode, SysSession.CurrentEnvironment.CompCode, SysSession.CurrentEnvironment.BranchCode, Modules.AccTrReceiptNoteNew, SysSession.CurrentEnvironment.CurrentYear, rp.TRId.toString());
            }
        });
    }
    VATReport.PrintReport = PrintReport;
})(VATReport || (VATReport = {}));
//# sourceMappingURL=VatReport.js.map