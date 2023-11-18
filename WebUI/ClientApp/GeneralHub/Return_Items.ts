﻿
$(document).ready(() => {
    Return_Items.InitalizeComponent();
});

namespace Return_Items {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _GridItems: JsGrid = new JsGrid();

    var New_Item: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _Inv: Vnd_Inv_SlsMan = new Vnd_Inv_SlsMan();
    var _InvItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _ItemsCodes: Array<ItemsCodes> = new Array<ItemsCodes>();

    var txtSearch: HTMLInputElement;
    var Coding_Confirm: HTMLButtonElement;

    var InvoiceID = 0;
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Display_Items();
        Close_Loder();

    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearchCoding') as HTMLInputElement;
        Coding_Confirm = document.getElementById('Coding_Confirm') as HTMLInputElement;
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
        _GridItems.OnItemEditing = () => { };
        _GridItems.Columns = [
            { title: "Code", name: "ItemCode", type: "text", width: "100px" },
            {
                title: "ItemDesc", css: "ColumPadding", name: "ItemDescA", width: "100px",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.ItemDescA;
                    txt.style.textAlign = "center";
                    txt.style.backgroundColor = "#f0f8ff";
                    return txt;
                }
            },
            {
                title: "Chack Item",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.InvoiceItemID;
                    txt.className = "checkbox";
                    txt.checked = true;
                    txt.style.width = "20px"
                    txt.style.height = "35px"
                    txt.onclick = (e) => {

                    };
                    return txt;
                }
            },
            {
                title: "Remark", css: "ColumPadding", name: "Remark", width: "100px",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "text";
                    txt.style.width = "100%";
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.textAlign = "center";
                    txt.id = "txtItemRemark" + item.InvoiceItemID;

                    txt.onchange = (e) => {
                       
                    };

                    return txt;
                }
            },

        ];
        _GridItems.Bind();

    }
    function _SearchBox_Change() {
        debugger
        $("#_GridItems").jsGrid("option", "pageIndex", 1);

        if (txtSearch.value != "") {
            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = _InvItems.filter(x => x.InvoiceItemID.toString().search(search) >= 0 || x.ItemDescA.toLowerCase().search(search) >= 0);

            _GridItems.DataSource = SearchDetails;
            _GridItems.Bind();
        } else {
            _GridItems.DataSource = _InvItems;
            _GridItems.Bind();
        }
    }
   
    function Display_Items() {


        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        _InvItems = _InvoiceItems.filter(x => x.InvoiceID == InvoiceID)

        debugger
        _GridItems.DataSource = _InvItems;
        _GridItems.Bind();


        $('#Txt_Total_LineCountCoding').val(_InvItems.length);
        //$('#Txt_Total_Amount').val(SumValue(_InvItems, "NetAfterVat", 1));
    }
    //**************************************************Valid*******************************************
    function Valid_Item(): boolean {
        debugger
        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            debugger
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val().trim() == '') {
                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID), 'Please a Enter Item Code 😡')
                return false
            }
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val() == '0') {
                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID), 'Please a Enter Item Code 😡')
                return false
            }
        }

        if ($('#db_Store').val() == 'null') {
            Errorinput($('#db_Store'), 'Please a Select Store 😡')
            return false
        }
  
        return true;
    }
    
    function Assign() {
        debugger
        _ItemsCodes = new Array<ItemsCodes>();

        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            let _Model = new ItemsCodes;
            _Model.ItemCode = $('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val();
            _Model.InvoiceID = _GridItems.DataSource[i].InvoiceID
            _Model.InvoiceItemID = _GridItems.DataSource[i].InvoiceItemID
            _Model.StoreID = Number($('#db_Store').val());
            _Model.UserCode = SysSession.CurrentEnvironment.UserCode;
            _Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
            _Model.BranchCode = Number(SysSession.CurrentEnvironment.BranchCode);

            _ItemsCodes.push(_Model)
        }


    }
    function Coding_Confirm_onclick() {
        if (!Valid_Item()) {
            return false
        }
        Assign();
        try {
            Ajax.CallsyncSave({
                type: "Post",
                url: sys.apiUrl("SlsInvoice", "Coding_Item"),
                data: JSON.stringify(_ItemsCodes),
                success: (d) => {
                    debugger
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        debugger 
                        ShowMessage("Updated 😍")
                        $("#Display_Back_Page2").click();

                        $('#Back_Page').click();
                        Close_Loder();
                    } else {
                        ShowMessage("Error 😒")
                    }
                }
            });

        } catch (e) {
            ShowMessage("Error 😒")
        }


    } 
 
}