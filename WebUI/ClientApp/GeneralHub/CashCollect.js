$(document).ready(function () {
    CashCollect.InitalizeComponent();
});
var CashCollect;
(function (CashCollect) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _Grid_Ret = new JsGrid();
    var New_Invoices = new Array();
    var _Invoices = new Array();
    var _InvoiceItems = new Array();
    var _IQ_ItemCollect = new Array();
    var _Zones = new Array();
    var _ZonesFltr = new Array();
    var _Invs;
    var _Invs_Ret;
    var txtSearch;
    var txtSearchRet;
    var Filter_Select_Delivery;
    var Filter_View;
    var btnDelete_Filter;
    var Inv_Confirm;
    var View_Invoices;
    var View_Return;
    var db_Zone;
    var db_FamilyZone;
    var SalesmanId = 0;
    function InitalizeComponent() {
        $('.Txt_Ret_Tot').addClass('display_none');
        $('.Txt_Inv_Tot').removeClass('display_none');
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        InitializeGrid();
        InitializeGrid_Ret();
        GetData_Zones();
        //GetData_Invoice();
        Close_Loder();
    }
    CashCollect.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        txtSearchRet = document.getElementById('txtSearchRet');
        Filter_Select_Delivery = document.getElementById('Filter_Select_Delivery');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        Inv_Confirm = document.getElementById('Inv_Confirm');
        View_Invoices = document.getElementById('View_Invoices');
        View_Return = document.getElementById('View_Return');
        db_FamilyZone = document.getElementById('db_FamilyZone');
        db_Zone = document.getElementById('db_Zone');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        txtSearchRet.onkeyup = _SearchBoxRet_Change;
        Filter_Select_Delivery.onclick = Filter_Select_Delivery_onclick;
        Filter_View.onclick = GetData_InvoiceCollect;
        btnDelete_Filter.onclick = Clear;
        Inv_Confirm.onclick = Inv_Confirm_Onclick;
        db_FamilyZone.onchange = FltrZones;
        View_Invoices.onclick = function () { $('.Txt_Ret_Tot').addClass('display_none'); $('.Txt_Inv_Tot').removeClass('display_none'); };
        View_Return.onclick = function () { $('.Txt_Ret_Tot').removeClass('display_none'); $('.Txt_Inv_Tot').addClass('display_none'); };
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "TRID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: "InvoiceID", name: "InvoiceID", type: "text", width: "5%", visible: false },
            { title: "TrNo", name: "InvoiceID", type: "number", width: "100px" },
            { title: "RefNO", name: "RefNO", type: "number", width: "100px" },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: "Cust Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Cust Mobile1", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "Address", name: "Address", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            {
                title: "View",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Review");
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewInvoice(item.InvoiceID);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function InitializeGrid_Ret() {
        _Grid_Ret.ElementName = "_Grid_Ret";
        _Grid_Ret.PrimaryKey = "TRID";
        _Grid_Ret.Paging = true;
        _Grid_Ret.PageSize = 15;
        _Grid_Ret.Sorting = true;
        _Grid_Ret.InsertionMode = JsGridInsertionMode.Binding;
        _Grid_Ret.Editing = false;
        _Grid_Ret.Inserting = false;
        _Grid_Ret.SelectedIndex = 1;
        _Grid_Ret.OnItemEditing = function () { };
        _Grid_Ret.Columns = [
            { title: "InvoiceID", name: "InvoiceID", type: "text", width: "5%", visible: false },
            { title: "TrNo", name: "InvoiceID", type: "number", width: "100px" },
            { title: "RefNO", name: "RefNO", type: "number", width: "100px" },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: "Cust Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Cust Mobile1", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "Address", name: "Address", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            {
                title: "View",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Review");
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewInvoice(item.InvoiceID);
                    };
                    return txt;
                }
            },
        ];
        _Grid_Ret.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _Invoices.filter(function (x) { return x.InvoiceID.toString().search(search_1) >= 0 || x.CustomerName.toLowerCase().search(search_1) >= 0 || x.RefNO.toLowerCase().search(search_1) >= 0 || x.CustomerMobile1.toLowerCase().search(search_1) >= 0 || x.NetAfterVat.toString().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _Invoices;
            _Grid.Bind();
        }
    }
    function _SearchBoxRet_Change() {
        $("#_Grid_Ret").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_2 = txtSearch.value.toLowerCase();
            var SearchDetails = _Invoices.filter(function (x) { return x.InvoiceID.toString().search(search_2) >= 0 || x.CustomerName.toLowerCase().search(search_2) >= 0 || x.RefNO.toLowerCase().search(search_2) >= 0 || x.CustomerMobile1.toLowerCase().search(search_2) >= 0 || x.NetAfterVat.toString().search(search_2) >= 0; });
            _Grid_Ret.DataSource = SearchDetails;
            _Grid_Ret.Bind();
        }
        else {
            _Grid_Ret.DataSource = _Invoices;
            _Grid_Ret.Bind();
        }
    }
    function GetData_Zones() {
        var Table;
        Table =
            [
                { NameTable: 'Zones', Condition: " Active = 1" },
                { NameTable: 'FamilyZone', Condition: " Active = 1" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        _Zones = GetDataTable('Zones');
        var _FamilyZones = GetDataTable('FamilyZone');
        DocumentActions.FillCombowithdefult(_FamilyZones, db_FamilyZone, "FamilyZoneID", 'DescA', 'Select Family Zone');
        FltrZones();
    }
    function FltrZones() {
        _ZonesFltr = _Zones.filter(function (x) { return x.FamilyZoneID == Number(db_FamilyZone.value); });
        DocumentActions.FillCombowithdefult(_ZonesFltr, db_Zone, "ZoneID", 'DescA', 'Select Zone');
    }
    function GetData_InvoiceCollect() {
        CleaningList_Table();
        debugger;
        var StartDate = DateFormat($('#Txt_From_Date').val());
        var EndDate = DateFormat($('#Txt_To_Date').val());
        var Con = "";
        if (Number($('#Txt_SalesmanId').val()) != 0) {
            Con = " and ( SalesmanId =" + Number($('#Txt_SalesmanId').val()) + " )";
        }
        else {
            Errorinput($('#Filter_Select_Delivery'), "Must Select Delivery");
            return;
        }
        var Table;
        Table =
            [
                { NameTable: 'Vnd_Inv_SlsMan', Condition: " (TrType = 0) AND (Status = 5) and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 1) AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + "" },
                { NameTable: 'IQ_ItemCollect', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where (TrType = 0) AND (Status = 5) and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 1) AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + ")" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _Invoices = GetDataTable('Vnd_Inv_SlsMan');
        _InvoiceItems = GetDataTable('IQ_ItemCollect');
        _IQ_ItemCollect = GetDataTable('IQ_ItemCollect');
        _Invoices = _Invoices.sort(dynamicSort("InvoiceID"));
        SetGlopelDataInvoice(_Invoices);
        SetGlopelDataInvoiceItems(_InvoiceItems);
        SetGlopelDataIQ_ItemCollect(_IQ_ItemCollect);
        Display_Orders();
        $('#btnDelete_Filter').removeClass('display_none');
    }
    function Display_Orders() {
        $('#Tap_View_Inv').html('View Invoice');
        $('#Tap_View_Ret').html('View Retrun');
        _Invs = _Invoices.filter(function (x) { return x.TrType == 0; });
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        debugger;
        _Invs_Ret = _Invoices.filter(function (x) { return x.TrType == 1; });
        _Grid_Ret.DataSource = _Invs_Ret;
        _Grid_Ret.Bind();
        $('#Txt_Total_LineCountRet').val(_Invs_Ret.length);
        $('#Txt_Total_ItemsCountRet').val(SumValue(_Invs_Ret, "ItemCount"));
        $('#Txt_Total_Amount_Return').val(SumValue(_Invs_Ret, "NetAfterVat", 1));
        $('#Txt_Total_LineCount').val(_Invs.length);
        $('#Txt_Total_ItemsCount').val(SumValue(_Invs, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(_Invs, "NetAfterVat", 1));
        if (_Invs.length > 0) {
            $('#Tap_View_Inv').html('View Invoice ( ' + _Invs.length + ' )');
        }
        if (_Invs_Ret.length > 0) {
            $('#Tap_View_Ret').html('View Retrun ( ' + _Invs_Ret.length + ' )');
        }
    }
    function Filter_Select_Delivery_onclick() {
        if (db_Zone.value == 'null') {
            Errorinput($('#db_Zone'), "Must Select Zone");
            return;
        }
        debugger;
        var Con = " and ZoneID = " + db_Zone.value + "";
        sys.FindKey("Salesman", "btnSalesman", " Status = 5 " + Con + "", function () {
            debugger;
            var dataScr = SearchGrid.SearchDataGrid.dataScr;
            SalesmanId = SearchGrid.SearchDataGrid.SelectedKey;
            dataScr = dataScr.filter(function (x) { return x.SalesmanId == SalesmanId; });
            $('#Txt_SalesmanId').val(SalesmanId);
            Filter_Select_Delivery.innerHTML = "( " + dataScr[0].SlsMan_Name + " )";
        });
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        $('#Txt_SalesmanId').val('');
        Filter_Select_Delivery.innerHTML = 'Select Delivery';
        $('#btnDelete_Filter').addClass('display_none');
        SalesmanId = 0;
        _Grid.DataSource = New_Invoices;
        _Grid.Bind();
        _Grid_Ret.DataSource = New_Invoices;
        _Grid_Ret.Bind();
        $('#Txt_Total_LineCountRet').val(New_Invoices.length);
        $('#Txt_Total_ItemsCountRet').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount_Return').val(SumValue(New_Invoices, "NetAfterVat", 1));
        $('#Txt_Total_LineCount').val(New_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "NetAfterVat", 1));
        $('#Tap_View_Inv').html('View Invoice');
        $('#Tap_View_Ret').html('View Retrun');
    }
    function ViewInvoice(InvoiceID) {
        localStorage.setItem("InvoiceID", InvoiceID.toString());
        localStorage.setItem("InvoiceNote", "0");
        OpenPagePartial("Print_Order", "Print Order 🧺");
    }
    function Inv_Confirm_Onclick() {
        if (SalesmanId == 0) {
            Errorinput($('#Filter_Select_Delivery'), "Must Select Delivery");
            return;
        }
        var ListInvoiceID = '';
        var Frist = true;
        for (var i = 0; i < _Invs.length; i++) {
            if (Frist == true) {
                ListInvoiceID = ListInvoiceID + _Invs[i].InvoiceID.toString();
                Frist = false;
            }
            else {
                ListInvoiceID = ListInvoiceID + ',' + _Invs[i].InvoiceID.toString();
            }
        }
        if (ListInvoiceID.trim() != "") {
            if ($('#Txt_Transfer_No').val().trim() == "") {
                $('#Tap_View_Inv').click();
                $('#Tap_View_Inv').addClass('active');
                $('#Tap_View_Ret').removeClass('active');
                Errorinput($('#Txt_Transfer_No'), "Must Enter Transfer No , If you will Collect Cash ,Put ( 0 ) ");
                return;
            }
        }
        var ListInvoiceIDRet = "";
        Frist = true;
        for (var i = 0; i < _Invs_Ret.length; i++) {
            if (Frist == true) {
                ListInvoiceIDRet = ListInvoiceIDRet + _Invs_Ret[i].InvoiceID.toString();
                Frist = false;
            }
            else {
                ListInvoiceIDRet = ListInvoiceIDRet + ' , ' + _Invs_Ret[i].InvoiceID.toString();
            }
        }
        var StatusDesc = 'Done Collect From Delivery Inv ( ' + ListInvoiceID + ' ) ' + '\n' + 'Done Return Inv From Delivery ( ' + ListInvoiceIDRet + ' ) ';
        var TrnsNo = $('#Txt_Transfer_No').val();
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("SlsInvoice", "CashCollectFrom_Delivery"),
            data: { CompCode: Number(SysSession.CurrentEnvironment.CompCode), BranchCode: Number(SysSession.CurrentEnvironment.BranchCode), ListInvoiceID: ListInvoiceID, ListInvoiceIDRet: ListInvoiceIDRet, SlsManID: SalesmanId, UserCode: SysSession.CurrentEnvironment.UserCode, StatusDesc: StatusDesc, TrnsNo: TrnsNo },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    ShowMessage("Done 😍");
                    $("#Display_Back_Page2").click();
                    $('#Back_Page').click();
                    Close_Loder();
                }
                else {
                    Close_Loder();
                    ShowMessage("Error 😒");
                }
            }
        });
    }
})(CashCollect || (CashCollect = {}));
//# sourceMappingURL=CashCollect.js.map