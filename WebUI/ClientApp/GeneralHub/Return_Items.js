$(document).ready(function () {
    Return_Items.InitalizeComponent();
});
var Return_Items;
(function (Return_Items) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _GridItems = new JsGrid();
    var New_Item = new Array();
    var _Invoices = new Array();
    var _InvoiceItems = new Array();
    var _Inv = new Vnd_Inv_SlsMan();
    var _InvItems = new Array();
    var _Model = new ItemsCodes();
    var txtSearch;
    var Coding_Confirm;
    var InvoiceID = 0;
    var Valid_Ret = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Display_Items();
        Close_Loder();
    }
    Return_Items.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearchCoding');
        Coding_Confirm = document.getElementById('Coding_Confirm');
    }
    function InitializeEvents() {
        txtSearch.onkeyup = _SearchBox_Change;
        Coding_Confirm.onclick = Confirm_onclick;
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
            { title: "Code", name: "ItemCode", type: "text", width: "100px" },
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
                title: "Price", css: "ColumPadding", name: "Unitprice", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = item.Unitprice.toString();
                    txt.style.textAlign = "center";
                    txt.style.backgroundColor = "#f0f8ff";
                    return txt;
                }
            },
            {
                title: "Chack Item",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.InvoiceItemID;
                    txt.className = "checkbox";
                    txt.checked = true;
                    txt.style.width = "20px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        if (txt.checked == true) {
                            $('#txtItemRemark' + item.InvoiceItemID).attr('disabled', 'disabled');
                            $('#txtItemRemark' + item.InvoiceItemID).val('');
                        }
                        else {
                            $('#txtItemRemark' + item.InvoiceItemID).removeAttr('disabled');
                            $('#txtItemRemark' + item.InvoiceItemID).val('');
                            $('#txtItemRemark' + item.InvoiceItemID).focus();
                        }
                        CompletTotalGrid();
                    };
                    return txt;
                }
            },
            {
                title: "Remark", css: "ColumPadding", name: "Remark", width: "100px", visible: false,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "text";
                    txt.style.width = "100%";
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.textAlign = "center";
                    txt.id = "txtItemRemark" + item.InvoiceItemID;
                    txt.disabled = true;
                    txt.onchange = function (e) {
                    };
                    return txt;
                }
            },
        ];
        _GridItems.Bind();
    }
    function _SearchBox_Change() {
        debugger;
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
    function Display_Items() {
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"));
        _Inv = _Invoices.filter(function (x) { return x.InvoiceID == InvoiceID; })[0];
        _InvItems = _InvoiceItems.filter(function (x) { return x.InvoiceID == InvoiceID; });
        debugger;
        _GridItems.DataSource = _InvItems;
        _GridItems.Bind();
        CompletTotalGrid();
        Event_key('Enter', 'Txt_Delivery_Code', 'Coding_Confirm');
        $('#Txt_Delivery_Code').focus();
    }
    function CompletTotalGrid() {
        var Txt_Item_Total = 0;
        var Net_Total = 0;
        var Net_TotalReturn = 0;
        for (var i = 0; i < _InvItems.length; i++) {
            var ChkView = document.getElementById("ChkView" + _InvItems[i].InvoiceItemID);
            if (ChkView.checked == true) {
                Txt_Item_Total = Txt_Item_Total + (_InvItems[i].SoldQty * _InvItems[i].Unitprice);
            }
            else {
                Net_TotalReturn = Net_TotalReturn + (_InvItems[i].SoldQty * _InvItems[i].Unitprice);
            }
        }
        $('#Txt_Total_LineCountCoding').val(_InvItems.length);
        $('#Txt_Net_TotalRet').val(Digits(Net_TotalReturn, 1));
        $('#Txt_Item_Total').val(Digits(Txt_Item_Total, 1));
        $('#Txt_VatAmount').val(_Inv.VatAmount);
        $('#Txt_CommitionAmount').val(_Inv.CommitionAmount);
        $('#Txt_Net_Total').val(Digits(Number((Txt_Item_Total + _Inv.CommitionAmount + _Inv.VatAmount).toFixed(2)), 1));
    }
    function Assign() {
        debugger;
        _Model = new ItemsCodes;
        _Model.InvoiceID = _Inv.InvoiceID;
        _Model.UserCode = SysSession.CurrentEnvironment.UserCode;
        _Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        _Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);
        var IDItems = '';
        var Frist = true;
        Valid_Ret = 0;
        for (var i = 0; i < _InvItems.length; i++) {
            var ChkView = document.getElementById("ChkView" + _InvItems[i].InvoiceItemID);
            if (ChkView.checked == false) {
                _InvItems[i].InvoiceItemID;
                if (Frist == true) {
                    IDItems = IDItems + _InvItems[i].InvoiceItemID.toString();
                    Frist = false;
                }
                else {
                    IDItems = IDItems + ',' + _InvItems[i].InvoiceItemID.toString();
                }
                Valid_Ret++;
            }
        }
        _Model.ItemCode = IDItems;
    }
    function Confirm_onclick() {
        Assign();
        if (Valid_Ret == _InvItems.length) {
            ShowMessage("At least one Item must be selected 🤨");
            return;
        }
        if (Number($('#Txt_Delivery_Code').val()) == 0) {
            Errorinput($('#Txt_Delivery_Code'), 'Please a Enter Delivery Code 😡');
            return;
        }
        if (Number($('#Txt_Delivery_Code').val()) != _Inv.QRCode) {
            Errorinput($('#Txt_Delivery_Code'), 'Worning Delivery Code 😡');
            return;
        }
        if (Valid_Ret == 0) {
            UpdateInvStatus(InvoiceID, 0, 5, 'Deliver Customer ( ' + _Inv.InvoiceID + ' )', function () {
                ShowMessage("Done 😍");
                $("#Display_Back_Page2").click();
                $('#Back_Page').click();
                Close_Loder();
            });
        }
        else {
            try {
                Ajax.CallsyncSave({
                    type: "Post",
                    url: sys.apiUrl("SlsInvoice", "ReturnInvoice"),
                    data: JSON.stringify(_Model),
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
            catch (e) {
                Close_Loder();
                ShowMessage("Error 😒");
            }
        }
    }
})(Return_Items || (Return_Items = {}));
//# sourceMappingURL=Return_Items.js.map