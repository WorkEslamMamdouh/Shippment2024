
$(document).ready(() => {
    Coding_Items.InitalizeComponent();
});

namespace Coding_Items {
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
        GetData_ItemsAndStore();
        Close_Loder();

    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearchCoding') as HTMLInputElement;
        Coding_Confirm = document.getElementById('Coding_Confirm') as HTMLButtonElement;
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
            { title: "Num", name: "InvoiceItemID", type: "number", width: "10px" },
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
                title: "ItemCode", css: "ColumPadding", name: "ItemCode", width: "100px",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "text";
                    txt.style.width = "100%";
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.textAlign = "center";
                    txt.id = "txtItemCode" + item.InvoiceItemID;

                    txt.onchange = (e) => {
                        if (!CheckItemCode(txt.value.trim(), item.InvoiceItemID)) {
                            Errorinput(txt, 'Code is duplicated 😡')
                            txt.value = '';
                        }
                        else if (!CheckItemCodeInStock(txt.value.trim(), item.InvoiceItemID)) {
                            Errorinput(txt, 'Code is duplicated in Stock 😡')
                            txt.value = '';
                        }
                    };

                    return txt;
                }
            },
            {
                title: "Scan", visible: false,
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Scan Camera 📷");
                    txt.id = "butScan" + item.InvoiceItemID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        Scan_Camera(item.InvoiceItemID);
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
    function GetData_ItemsAndStore() {
        debugger
        _Invoices = GetGlopelDataInvoice();
        _InvoiceItems = GetGlopelDataInvoiceItems();
        InvoiceID = Number(localStorage.getItem("InvoiceID"))
        _Inv = _Invoices.filter(x => x.InvoiceID == InvoiceID)[0]
        _InvItems = _InvoiceItems.filter(x => x.InvoiceID == InvoiceID)




        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'G_STORE', Condition: " IsActive = 1" },
            ]
        DataResult(Table);
        //**************************************************************************************************************
        debugger
        let _G_STORE = GetDataTable('G_STORE');

        let db_Store = document.getElementById("db_Store") as HTMLSelectElement;
        DocumentActions.FillCombowithdefult(_G_STORE, db_Store, "StoreId", 'DescA', 'Select Store');

        db_Store.selectedIndex = 1;

        Display_Items();

    }
    function Display_Items() {

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
    function CheckItemCode(ItemCode: string, InvoiceItemID: number): boolean {

        for (var i = 0; i < _GridItems.DataSource.length; i++) {
            if ($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID).val().trim() == ItemCode && InvoiceItemID != _GridItems.DataSource[i].InvoiceItemID) {

                Errorinput($('#txtItemCode' + _GridItems.DataSource[i].InvoiceItemID))
                
                return false;
            }
        }
        return true;
    }
    function CheckItemCodeInStock(ItemCode: string, InvoiceItemID: number): boolean {

        CleaningList_Table();
        
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'Sls_InvoiceItem', Condition: " ItemCode = N'" + ItemCode.trim() +"' " },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        
        let _ListItem = GetDataTable('Sls_InvoiceItem');

        if (_ListItem.length > 0) { 
            return false;
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

                        //$('#Back_Page').click();
                        Close_Loder();
                    } else {
                        Close_Loder();
                        ShowMessage("Error 😒")
                    }
                }
            });

        } catch (e) {
            Close_Loder();
            ShowMessage("Error 😒")
        }


    } 
    function Scan_Camera(InvoiceItemID) {

        localStorage.setItem("butScan", "butScan" + InvoiceItemID.toString())
        localStorage.setItem("id_txtItemCode", "txtItemCode" + InvoiceItemID.toString())

        $('#Id_ScanCodeClick').click();

        $('#_Gide_Div').addClass("display_none");
        $('#_Scan_Div').removeClass("display_none");
        $('#_Scan_Div').html("");
        $('#_Gide_Div').removeClass("display_none");

    }
}
