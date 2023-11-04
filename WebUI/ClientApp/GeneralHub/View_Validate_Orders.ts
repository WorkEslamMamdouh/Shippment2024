﻿
$(document).ready(() => {
    View_Validate_Orders.InitalizeComponent();

});

namespace View_Validate_Orders {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var _Invoices: Array<Sls_Invoice> = new Array <Sls_Invoice>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();

    var txtSearch: HTMLInputElement; 
     
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        GetData_Invoice();
        InitializeGrid();
        Display_Orders();
        Close_Loder(); 
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
    }
    function InitializeEvents() {

        txtSearch.onkeyup = _SearchBox_Change;
         
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
            { title: "TrNo", name: "InvoiceID", type: "number", width: "100px" },
            { title: "RefNO", name: "RefNO", type: "number", width: "100px" },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: (s: string, item: Sls_Invoice): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            { title: "Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Mobile", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            
        ];
        _Grid.Bind();
        
    }
    function _SearchBox_Change() {
        $("#_Grid").jsGrid("option", "pageIndex", 1);

        if (txtSearch.value != "") {
            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = _Invoices.filter(x => x.InvoiceID.toString().search(search) >= 0 || x.CustomerName.toLowerCase().search(search) >= 0 || x.RefNO.toLowerCase().search(search) >= 0 || x.CustomerMobile1.toLowerCase().search(search) >= 0 || x.NetAfterVat.toString().search(search) >= 0);

            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        } else {
            _Grid.DataSource = _Invoices;
            _Grid.Bind();
        }
    }
    function GetData_Invoice() {
        debugger

        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'Sls_Invoice', Condition: " TrType = 0 and Status = 1 " },
            { NameTable: 'Sls_InvoiceItem', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where TrType = 0 and Status = 1" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        debugger
        _Invoices = GetDataTable('Sls_Invoice');
        _InvoiceItems = GetDataTable('Sls_InvoiceItem');

        SetGlopelDataInvoice(_Invoices);
        SetGlopelDataInvoiceItems(_InvoiceItems);
        
    }

    function Display_Orders() {
        
        _Invoices = _Invoices.sort(dynamicSort("InvoiceID")); 
        _Grid.DataSource = _Invoices;
        _Grid.Bind();
         

        $('#Txt_Total_LineCount').val(_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(_Invoices, "NetAfterVat", 1));
    } 

     
}