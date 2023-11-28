$(document).ready(function () {
    Items_In_Stores.InitalizeComponent();
});
var Items_In_Stores;
(function (Items_In_Stores) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var New_Invoices = new Array();
    var _InvoiceItems = new Array();
    var txtSearch;
    var Filter_View;
    var _Print_View;
    var btnDelete_Filter;
    var db_Store;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        InitializeGrid();
        GetData_STORE();
        //GetData_Invoice();
        Close_Loder();
        SetRefresh(GetModuleCode());
    }
    Items_In_Stores.InitalizeComponent = InitalizeComponent;
    function SetRefresh(moduleCode) {
        debugger;
        // Event listener for dynamically generated buttons
        $(document).on('click', '.Refresh_' + moduleCode, function () {
            if (Number($('#Txt_VendorID').val()) == 0) {
                return;
            }
            GetData_Invoice();
            // Shows an alert when a dynamically created button is clicked
        });
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        _Print_View = document.getElementById('_Print_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
        db_Store = document.getElementById('db_Store');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = GetData_Invoice;
        btnDelete_Filter.onclick = Clear;
        _Print_View.onclick = _Print_View_List;
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
            { title: "ItemID", name: "InvoiceItemID", type: "number", width: "100px" },
            { title: "ItemCode", name: "ItemCode", type: "text", width: "100px" },
            { title: "ItemDescA", name: "ItemDescA", type: "text", width: "100px" },
            { title: "Unitprice", name: "Unitprice", type: "text", width: "100px" },
        ];
        _Grid.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _InvoiceItems.filter(function (x) { return x.InvoiceItemID.toString().search(search_1) >= 0 || x.ItemDescA.toLowerCase().search(search_1) >= 0 || x.ItemCode.toLowerCase().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _InvoiceItems;
            _Grid.Bind();
        }
    }
    function GetData_STORE() {
        var Table;
        Table =
            [
                { NameTable: 'G_STORE', Condition: " IsActive = 1" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var _STORE = GetDataTable('G_STORE');
        var db_Store = document.getElementById("db_Store");
        DocumentActions.FillCombowithdefult(_STORE, db_Store, "StoreId", 'DescA', 'Select Store');
    }
    function GetData_Invoice() {
        CleaningList_Table();
        debugger;
        var StartDate = DateFormat($('#Txt_From_Date').val());
        var EndDate = DateFormat($('#Txt_To_Date').val());
        var Con = "";
        if ($('#db_Store').val() != 'null') {
            Con = " and StoreID =" + Number($('#db_Store').val());
        }
        else {
            Errorinput($('#db_Store'), "Must Select Store");
            return;
        }
        var Table;
        Table =
            [
                { NameTable: 'Sls_InvoiceItem', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where  Status = 3 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _InvoiceItems = GetDataTable('Sls_InvoiceItem');
        SetGlopelDataInvoiceItems(_InvoiceItems);
        Display_Orders();
        $('#btnDelete_Filter').removeClass('display_none');
    }
    function Display_Orders() {
        var _Invs = _InvoiceItems;
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(_InvoiceItems.length);
        $('#Txt_Total_Amount').val(SumValue(_InvoiceItems, "Unitprice", 1));
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        $('#Txt_VendorID').val('');
        $('#db_Store').val('null');
        $('#btnDelete_Filter').addClass('display_none');
        _Grid.DataSource = New_Invoices;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(New_Invoices.length);
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "Unitprice", 1));
    }
    function _Print_View_List() {
        debugger;
        _Grid.PageSize = 100000000000;
        var _Invs = _InvoiceItems;
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        debugger;
        printDiv(_Grid.ElementName);
        //PrintTable(_Grid.ElementName)
        setTimeout(function () {
            _Grid.PageSize = 15;
            var _IInvs = _InvoiceItems;
            _Grid.DataSource = _IInvs;
            _Grid.Bind();
        }, 100);
    }
})(Items_In_Stores || (Items_In_Stores = {}));
//# sourceMappingURL=Items_In_Stores.js.map