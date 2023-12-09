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
    var _ItemsCodes = new Array();
    var txtSearch;
    var Coding_Confirm;
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
        txtSearch = document.getElementById('txtSearchCoding');
        Coding_Confirm = document.getElementById('Coding_Confirm');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Coding_Confirm.onclick = Coding_Confirm_onclick;
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
            { title: "Num", name: "InvoiceItemID", type: "number", width: "10px" },
            {
                title: "ItemDesc", css: "ColumPadding", name: "ItemDescA", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = item.ItemDescA;
                    txt.style.textAlign = "center";
                    txt.style.backgroundColor = "#f0f8ff";
                    return txt;
                }
            },
            {
                title: "ItemCode", css: "ColumPadding", name: "ItemCode", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "text";
                    txt.style.width = "100%";
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.textAlign = "center";
                    txt.id = "txtItemCode" + item.InvoiceItemID;
                    txt.onchange = function (e) {
                        if (!CheckItemCode(txt.value.trim(), item.InvoiceItemID)) {
                            Errorinput(txt, 'Code is duplicated 😡');
                            txt.value = '';
                        }
                        else if (!CheckItemCodeInStock(txt.value.trim(), item.InvoiceItemID)) {
                            Errorinput(txt, 'Code is duplicated in Stock 😡');
                            txt.value = '';
                        }
                    };
                    return txt;
                }
            },
            {
                title: "Scan", visible: false,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Scan Camera 📷");
                    txt.id = "butScan" + item.InvoiceItemID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        Scan_Camera(item.InvoiceItemID);
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
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"));
        _Inv = _Invoices.filter(function (x) { return x.InvoiceID == InvoiceID; })[0];
        _InvItems = _InvoiceItems.filter(function (x) { return x.InvoiceID == InvoiceID; });
        var Table;
        Table =
            [
                { NameTable: 'G_STORE', Condition: " IsActive = 1" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var _G_STORE = GetDataTable('G_STORE');
        var db_Store = document.getElementById("db_Store");
        DocumentActions.FillCombowithdefult(_G_STORE, db_Store, "StoreId", 'DescA', 'Select Store');
        db_Store.selectedIndex = 1;
        Display_Items();
    }
    function Display_Items() {
        _GridItems.DataSource = _InvItems;
        _GridItems.Bind();
        $('#Txt_Total_LineCountCoding').val(_InvItems.length);
        //$('#Txt_Total_Amount').val(SumValue(_InvItems, "NetAfterVat", 1));
    }
    //**************************************************Valid*******************************************
    function Valid_Item() {
        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val().trim() == '') {
                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID), 'Please a Enter Item Code 😡');
                return false;
            }
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val() == '0') {
                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID), 'Please a Enter Item Code 😡');
                return false;
            }
        }
        if ($('#db_Store').val() == 'null') {
            Errorinput($('#db_Store'), 'Please a Select Store 😡');
            return false;
        }
        return true;
    }
    function CheckItemCode(ItemCode, InvoiceItemID) {
        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val().trim() == ItemCode && InvoiceItemID != _GridItems.DataSource[i].InvoiceItemID) {
                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID));
                return false;
            }
        }
        return true;
    }
    function CheckItemCodeInStock(ItemCode, InvoiceItemID) {
        CleaningList_Table();
        var Table;
        Table =
            [
                { NameTable: 'Sls_InvoiceItem', Condition: " ItemCode = N'" + ItemCode.trim() + "' " },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        var _ListItem = GetDataTable('Sls_InvoiceItem');
        if (_ListItem.length > 0) {
            return false;
        }
        return true;
    }
    function Assign() {
        _ItemsCodes = new Array();
        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            var _Model = new ItemsCodes;
            _Model.ItemCode = $('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val();
            _Model.InvoiceID = _GridItems.DataSource[i].InvoiceID;
            _Model.InvoiceItemID = _GridItems.DataSource[i].InvoiceItemID;
            _Model.StoreID = Number($('#db_Store').val());
            _Model.UserCode = SysSession.CurrentEnvironment.UserCode;
            _Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
            _Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
            _ItemsCodes.push(_Model);
        }
    }
    function Coding_Confirm_onclick() {
        if (!Valid_Item()) {
            return false;
        }
        Assign();
        try {
            Ajax.CallsyncSave({
                type: "Post",
                url: sys.apiUrl("SlsInvoice", "Coding_Item"),
                data: JSON.stringify(_ItemsCodes),
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess) {
                        ShowMessage("Updated 😍");
                        //$('#Back_Page').click();
                        $("#Display_Back_Page2").click();
                        Close_Loder();
                    }
                    else {
                        Close_Loder();
                        ShowMessage("Error 😒");
                    }
                }
            });
        }
        catch (e) {
            Close_Loder();
            ShowMessage("Error 😒");
        }
    }
    function Scan_Camera(InvoiceItemID) {
        localStorage.setItem("butScan", "butScan" + InvoiceItemID.toString());
        localStorage.setItem("id_txtItemCode", "txtItemCode" + InvoiceItemID.toString());
        $('#Id_ScanCodeClick').click();
        $('#_Gide_Div').addClass("display_none");
        $('#_Scan_Div').removeClass("display_none");
        $('#_Scan_Div').html("");
        $('#_Gide_Div').removeClass("display_none");
    }
})(Coding_Items || (Coding_Items = {}));
//# sourceMappingURL=Coding_Items.js.map