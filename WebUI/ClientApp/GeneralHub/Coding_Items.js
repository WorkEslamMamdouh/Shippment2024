$(document).ready(function () {
    Coding_Items.InitalizeComponent();
});
var Coding_Items;
(function (Coding_Items) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _GridItems = new JsGrid();
    var New_Item = new Array();
    var _Invoices = new Array();
    var _InvoiceItems = new Array();
    var _Inv = new Vnd_Inv_SlsMan();
    var _InvItems = new Array();
    var txtSearch;
    var InvoiceID = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        GetData_ItemsAndStore();
        Close_Loder();
    }
    Coding_Items.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
    }
    function InitializeGrid() {
        _GridItems.ElementName = "_GridItems";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _GridItems.PrimaryKey = "InvoiceItemID";
        _GridItems.Paging = true;
        _GridItems.PageSize = 15;
        _GridItems.Sorting = true;
        _GridItems.InsertionMode = JsGridInsertionMode.Binding;
        _GridItems.Editing = false;
        _GridItems.Inserting = false;
        _GridItems.SelectedIndex = 1;
        _GridItems.OnItemEditing = function () { };
        _GridItems.Columns = [
            { title: "InvoiceItemID", name: "InvoiceItemID", type: "text", width: "0%", visible: false },
            { title: "Num", name: "InvoiceItemID", type: "number", width: "10px" },
            { title: "ItemDesc", name: "ItemDescA", type: "number", width: "30px" },
            {
                title: "View", width: "60px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("View Control ⚙️");
                    txt.id = "butView" + item.InvoiceItemID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        ViewInvoice(item.InvoiceItemID);
                    };
                    return txt;
                }
            },
        ];
        _GridItems.Bind();
    }
    function _SearchBox_Change() {
        $("#_GridItems").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _InvItems.filter(function (x) { return x.InvoiceItemID.toString().search(search_1) >= 0 || x.ItemDescA.toLowerCase().search(search_1) >= 0; });
            _GridItems.DataSource = SearchDetails;
            _GridItems.Bind();
        }
        else {
            _GridItems.DataSource = _InvItems;
            _GridItems.Bind();
        }
    }
    function GetData_ItemsAndStore() {
        debugger;
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"));
        _Inv = _Invoices.filter(function (x) { return x.InvoiceID == InvoiceID; })[0];
        _InvItems = _InvoiceItems.filter(function (x) { return x.InvoiceID == InvoiceID; });
        var Table;
        Table =
            [
                { NameTable: 'G_STORE', Condition: "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        var _G_STORE = GetDataTable('G_STORE');
        var db_Store = document.getElementById("db_Store");
        DocumentActions.FillCombowithdefult(_G_STORE, db_Store, "StoreId", 'DescA', 'Select Store');
        Display_Items();
    }
    function Display_Items() {
        debugger;
        _GridItems.DataSource = _InvItems;
        _GridItems.Bind();
        $('#Txt_Total_LineCount').val(_InvItems.length);
        //$('#Txt_Total_Amount').val(SumValue(_InvItems, "NetAfterVat", 1));
    }
    function Clear() {
        _GridItems.DataSource = New_Item;
        _GridItems.Bind();
        $('#Txt_Total_LineCount').val(New_Item.length);
        //$('#Txt_Total_Amount').val(SumValue(New_Item, "NetAfterVat", 1));
    }
    function ViewInvoice(InvoiceID) {
        localStorage.setItem("InvoiceID", InvoiceID.toString());
        OpenPagePartial("View_Order", "Order 🧺");
    }
})(Coding_Items || (Coding_Items = {}));
//# sourceMappingURL=Coding_Items.js.map