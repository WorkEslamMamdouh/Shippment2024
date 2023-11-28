
$(document).ready(() => {
    Items_In_Stores.InitalizeComponent();

});

namespace Items_In_Stores {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var New_Invoices: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();

    var txtSearch: HTMLInputElement; 
    var Filter_View: HTMLButtonElement;
    var _Print_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;
    var db_Store: HTMLSelectElement;

    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        InitializeGrid();
        GetData_STORE();
        //GetData_Invoice();
        Close_Loder(); 
        SetRefresh(GetModuleCode())
    }
    function SetRefresh(moduleCode: string) {
        debugger

        // Event listener for dynamically generated buttons
        $(document).on('click', '.Refresh_' + moduleCode, function () {
            if (Number($('#Txt_VendorID').val()) == 0) {
                return;
            }
            GetData_Invoice()
            // Shows an alert when a dynamically created button is clicked
        });
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement; 
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        _Print_View = document.getElementById('_Print_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
        db_Store = document.getElementById('db_Store') as HTMLSelectElement;
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
        _Grid.OnItemEditing = () => { };
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
            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = _InvoiceItems.filter(x => x.InvoiceItemID.toString().search(search) >= 0 || x.ItemDescA.toLowerCase().search(search) >= 0 || x.ItemCode.toLowerCase().search(search) >= 0);

            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        } else {
            _Grid.DataSource = _InvoiceItems;
            _Grid.Bind();
        }
    }
    function GetData_STORE() { 

        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'G_STORE', Condition: " IsActive = 1" },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        let _STORE = GetDataTable('G_STORE');

        let db_Store = document.getElementById("db_Store") as HTMLSelectElement;
        DocumentActions.FillCombowithdefult(_STORE, db_Store, "StoreId", 'DescA', 'Select Store');

    }
    function GetData_Invoice() {
        CleaningList_Table();
        debugger
        let StartDate = DateFormat($('#Txt_From_Date').val());
        let EndDate = DateFormat($('#Txt_To_Date').val());
        let Con = "";
        if ($('#db_Store').val()  != 'null') {
            Con = " and StoreID =" + Number($('#db_Store').val());
        }
        else {
            Errorinput($('#db_Store'), "Must Select Store")
            return
        }
        var Table: Array<Table>;
        Table =
            [                
                { NameTable: 'Sls_InvoiceItem', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where  Status = 3 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        debugger 
        _InvoiceItems = GetDataTable('Sls_InvoiceItem');
           
        SetGlopelDataInvoiceItems(_InvoiceItems);

        Display_Orders();

        $('#btnDelete_Filter').removeClass('display_none');
    }
    function Display_Orders() {

        let _Invs = _InvoiceItems
        _Grid.DataSource = _Invs;
        _Grid.Bind();
         
        $('#Txt_Total_LineCount').val(_InvoiceItems.length); 
        $('#Txt_Total_Amount').val(SumValue(_InvoiceItems, "Unitprice", 1));
    } 
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        $('#Txt_VendorID').val('') 
        $('#db_Store').val('null')
        $('#btnDelete_Filter').addClass('display_none')

        _Grid.DataSource = New_Invoices;
        _Grid.Bind();


        $('#Txt_Total_LineCount').val(New_Invoices.length); 
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "Unitprice", 1));
    }
    function _Print_View_List() {

        debugger
        _Grid.PageSize = 100000000000;
        let _Invs = _InvoiceItems
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        debugger 
        printDiv(_Grid.ElementName)
        //PrintTable(_Grid.ElementName)

        setTimeout(function () {
            _Grid.PageSize = 15;
            let _IInvs = _InvoiceItems
            _Grid.DataSource = _IInvs;

            _Grid.Bind();
        }, 100);
        
    }

 
}
