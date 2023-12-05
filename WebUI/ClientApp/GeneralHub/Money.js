$(document).ready(function () {
    Money.InitalizeComponent();
});
var Money;
(function (Money) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _VouchersList = new Array();
    var _Vouchersnone = new Array();
    var txtSearch;
    var drpActive;
    var Filter_View;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        Close_Loder();
    }
    Money.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        Filter_View.onclick = GetData_Money;
        txtSearch.onkeyup = _SearchBox_Change;
        btnDelete_Filter.onclick = Clear;
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "ReceiptID";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: "Tr_No", name: "ReceiptID", type: "text", width: "100px" },
            {
                title: "Type", css: "ColumPadding", name: "TrType", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.TrType == 0) {
                        txt.innerHTML = 'Receipt';
                    }
                    else {
                        txt.innerHTML = 'Payment';
                    }
                    return txt;
                }
            },
            { title: "Name Recipient", name: "NameRecipient", type: "text", width: "100px" },
            { title: "Amount", name: "Amount", type: "text", width: "100px" },
            {
                title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.IsCash == true) {
                        txt.innerHTML = 'Cash';
                    }
                    else {
                        txt.innerHTML = 'Credit';
                    }
                    return txt;
                }
            },
            {
                title: "Status",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.ReceiptID;
                    txt.className = "checkbox";
                    txt.checked = item.Status;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        Approve(item.ReceiptID, txt.checked == true ? 1 : 0);
                    };
                    return txt;
                }
            },
            {
                title: "Edit",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.ReceiptID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    if (item.Status == true) {
                        txt.disabled = true;
                    }
                    else {
                        txt.disabled = false;
                    }
                    txt.onclick = function (e) {
                        ViewUser(item);
                    };
                    return txt;
                }
            },
        ];
        _Grid.Bind();
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _VouchersList.filter(function (x) { return x.NameRecipient.toLowerCase().search(search_1) >= 0 || x.TransferNo.toLowerCase().search(search_1) >= 0 || x.Amount.toString().search(search_1) >= 0 || x.ReceiptID.toString().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _VouchersList;
            _Grid.Bind();
        }
    }
    function GetData_Money() {
        debugger;
        CleaningList_Table();
        var Active = $('#drpActive').val() == "Null" ? "0,1" : $('#drpActive').val();
        var Type = $('#drpType').val() == "Null" ? "0,1" : $('#drpType').val();
        var From_Date = $('#Txt_From_Date').val();
        var To_Date = $('#Txt_To_Date').val();
        var Table;
        Table =
            [
                { NameTable: 'Voucher_Receipt', Condition: "TrDate >= '" + From_Date + "' and TrDate <= '" + To_Date + "' and  TrType in (" + Type + " )  and Status in(" + Active + ")" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _VouchersList = GetDataTable('Voucher_Receipt');
        _VouchersList = _VouchersList.sort(dynamicSortNew("ReceiptID"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _VouchersList;
        _Grid.Bind();
        debugger;
        var RecTotal = _VouchersList.filter(function (x) { return x.TrType == 0; });
        var PayTotal = _VouchersList.filter(function (x) { return x.TrType == 1; });
        var Rec = Number(SumValue(RecTotal, "Amount"));
        var Pay = Number(SumValue(PayTotal, "Amount"));
        $('#Txt_TotalReciept').val(Digits(Rec, 1));
        $('#Txt_TotalPayment').val(Digits(Pay, 1));
        $('#Txt_Net').val(Digits((Number(Rec) - Number(Pay)), 1));
    }
    function ViewUser(item) {
        debugger;
        $("#Open").focus();
        var Page = item.TrType == 0 ? "VoucherReceipt" : "VoucherPayment";
        localStorage.setItem("TypePage", "Money");
        SetGolobalVoucher(item);
        localStorage.setItem("UserControl", item.ReceiptID.toString());
        OpenPagePartial(Page, Page, function () { Display_Refrsh(); });
    }
    function Clear() {
        $('#drpActive').val("Null");
        $('#drpType').val("Null");
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Vouchersnone;
        _Grid.Bind();
    }
    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return;
        }
        GetData_Money();
    }
    function Approve(ReceiptID, Active) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("SalesMan", "UpdateStatusVoucher"),
            data: { ReceiptID: ReceiptID, Active: Active },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetData_Money();
                    Close_Loder();
                    Active == 0 ? ShowMessage("Voucher Un Approved 🚫 ") : ShowMessage("Voucher Approved 👍");
                }
                else {
                }
            }
        });
    }
})(Money || (Money = {}));
//# sourceMappingURL=Money.js.map