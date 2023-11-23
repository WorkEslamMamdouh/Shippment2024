$(document).ready(function () {
    Merchant_Payment.InitalizeComponent();
});
var Merchant_Payment;
(function (Merchant_Payment) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var New_Invoices = new Array();
    var _Invoices = new Array();
    var _InvoiceItems = new Array();
    var _IQ_ItemCollect = new Array();
    var txtSearch;
    var Filter_Select_Seller;
    var Filter_View;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        InitializeGrid();
        //GetData_Invoice();
        Close_Loder();
    }
    Merchant_Payment.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_Select_Seller = document.getElementById('Filter_Select_Seller');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Filter_Select_Seller.onclick = Filter_Select_Seller_onclick;
        Filter_View.onclick = GetData_Invoice;
        btnDelete_Filter.onclick = Clear;
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
            { title: "Comp Name", name: "REMARKS", type: "text", width: "100px" },
            { title: "Vnd Name", name: "Vnd_Name", type: "text", width: "100px" },
            { title: "Mobile", name: "Vnd_Mobile", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            {
                title: "View",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("View ✅");
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
                        PrintInvoice(item.InvoiceID);
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
            var SearchDetails = _Invoices.filter(function (x) { return x.InvoiceID.toString().search(search_1) >= 0 || x.CustomerName.toLowerCase().search(search_1) >= 0 || x.RefNO.toLowerCase().search(search_1) >= 0 || x.CustomerMobile1.toLowerCase().search(search_1) >= 0 || x.NetAfterVat.toString().search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _Invoices;
            _Grid.Bind();
        }
    }
    function GetData_Invoice() {
        CleaningList_Table();
        debugger;
        var StartDate = DateFormat($('#Txt_From_Date').val());
        var EndDate = DateFormat($('#Txt_To_Date').val());
        var Con = "";
        if (Number($('#Txt_VendorID').val()) != 0) {
            Con = " and VendorID =" + Number($('#Txt_VendorID').val());
        }
        else {
            Errorinput($('#Filter_Select_Seller'), "Must Select Seller");
            return;
        }
        var Table;
        Table =
            [
                { NameTable: 'Vnd_Inv_SlsMan', Condition: " TrType = 0 and Status = 6 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "'" + Con },
                { NameTable: 'IQ_ItemCollect', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where TrType = 0 and Status = 6 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
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
        var _Invs = _Invoices;
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(_Invoices, "NetAfterVat", 1));
    }
    function Filter_Select_Seller_onclick() {
        sys.FindKey("Select_Seller", "btnSelect_Seller", " Status = 6", function () {
            debugger;
            var dataScr = SearchGrid.SearchDataGrid.dataScr;
            var id = SearchGrid.SearchDataGrid.SelectedKey;
            dataScr = dataScr.filter(function (x) { return x.VendorID == id; });
            $('#Txt_VendorID').val(id);
            Filter_Select_Seller.innerHTML = "( " + dataScr[0].Vnd_Name + " )";
        });
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear());
        $('#Txt_To_Date').val(GetDate());
        $('#Txt_VendorID').val('');
        Filter_Select_Seller.innerHTML = 'Select Seller';
        $('#btnDelete_Filter').addClass('display_none');
        _Grid.DataSource = New_Invoices;
        _Grid.Bind();
        $('#Txt_Total_LineCount').val(New_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "NetAfterVat", 1));
    }
    function PrintInvoice(InvoiceID) {
        localStorage.setItem("InvoiceID", InvoiceID.toString());
        localStorage.setItem("InvoiceNote", "0");
        OpenPagePartial("Print_Order", "Print Order 🧺");
    }
})(Merchant_Payment || (Merchant_Payment = {}));
//# sourceMappingURL=Merchant_Payment.js.map