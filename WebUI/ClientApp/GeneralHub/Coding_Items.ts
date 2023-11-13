
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

    var txtSearch: HTMLInputElement;

    var InvoiceID = 0;
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        GetData_ItemsAndStore();
        Close_Loder();

    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
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
        _GridItems.OnItemEditing = () => { };
        _GridItems.Columns = [ 
            { title: "Num", name: "InvoiceItemID", type: "number", width: "10px" }, 
            {
                title: "ItemDesc", css: "ColumPadding", name: "ItemDescA", width: "100px",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = item.ItemDescA;
                    txt.style.textAlign = "center";
                    txt.style.backgroundColor = "aliceblue"; 
                    return txt;
                }
            },
            { title: "ItemCode", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: (s: string, item: Sls_InvoiceItem): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "text";
                    txt.style.width = "100%"; 
                    txt.className = "Clear_Header u-input u-input-rectangle";
                    txt.style.textAlign = "center";
                    txt.id = "txtItemCode" + item.InvoiceItemID;
                      
                    return txt;
                }
            },
             
        ];
        _GridItems.Bind();

    }
    function _SearchBox_Change() {
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
                { NameTable: 'G_STORE', Condition: "" },
            ] 
        DataResult(Table);
        //**************************************************************************************************************
        debugger
        let _G_STORE = GetDataTable('G_STORE'); 

        let db_Store = document.getElementById("db_Store") as HTMLSelectElement; 
        DocumentActions.FillCombowithdefult(_G_STORE, db_Store, "StoreId", 'DescA', 'Select Store');

        Display_Items();
         
    }
    function Display_Items() {

        debugger
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

        localStorage.setItem("InvoiceID", InvoiceID.toString())
        OpenPagePartial("View_Order", "Order 🧺");
    }
}
