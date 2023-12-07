
$(document).ready(() => {
    RecieptOrders.InitalizeComponent();

});

namespace RecieptOrders {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var New_Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();

    var txtSearch: HTMLInputElement;
    var Filter_Select_Seller: HTMLButtonElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;

    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        InitializeGrid();
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
        Filter_Select_Seller = document.getElementById('Filter_Select_Seller') as HTMLButtonElement;
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
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
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "InvoiceID", name: "InvoiceID", type: "text", width: "5%", visible: false },
            { title: "TrNo", name: "InvoiceID", type: "number", width: "100px" },
            { title: "RefNO", name: "RefNO", type: "number", width: "100px" },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
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
                title: "Control",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Control ⚙️");
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewInvoice(item.InvoiceID);
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
        CleaningList_Table();
        debugger
        let StartDate = DateFormat($('#Txt_From_Date').val());
        let EndDate = DateFormat($('#Txt_To_Date').val());
        let Con = "";
        if (Number($('#Txt_VendorID').val()) != 0) {
            Con = " and VendorID =" + Number($('#Txt_VendorID').val());
        }
        else {
            Errorinput($('#Filter_Select_Seller'), "Must Select Seller")
            return
        }
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'Vnd_Inv_SlsMan', Condition: " TrType = 0 and Status = 2 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "'" + Con },
            { NameTable: 'Sls_InvoiceItem', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where TrType = 0 and Status = 2 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        debugger
        _Invoices = GetDataTable('Vnd_Inv_SlsMan');
        _InvoiceItems = GetDataTable('Sls_InvoiceItem');

        _Invoices = _Invoices.sort(dynamicSort("InvoiceID"));

        debugger
        SetGlopelDataInvoice(_Invoices);
        SetGlopelDataInvoiceItems(_InvoiceItems);

        Display_Orders();

        $('#btnDelete_Filter').removeClass('display_none');
    }
    function Display_Orders() {

        let _Invs = _Invoices
        _Grid.DataSource = _Invs;
        _Grid.Bind();


        $('#Txt_Total_LineCount').val(_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(_Invoices, "NetAfterVat", 1));
    }
    function Filter_Select_Seller_onclick() {
        sys.FindKey("Select_Seller", "btnSelect_Seller", " Status = 2", () => {
            debugger
            let dataScr = SearchGrid.SearchDataGrid.dataScr
            let id = SearchGrid.SearchDataGrid.SelectedKey
            dataScr = dataScr.filter(x => x.VendorID == id);
            $('#Txt_VendorID').val(id)
            Filter_Select_Seller.innerHTML = "( " + dataScr[0].Vnd_Name + " )";
        });
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        $('#Txt_VendorID').val('')
        Filter_Select_Seller.innerHTML = 'Select Seller'
        $('#btnDelete_Filter').addClass('display_none')

        _Grid.DataSource = New_Invoices;
        _Grid.Bind();


        $('#Txt_Total_LineCount').val(New_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "NetAfterVat", 1));
    }

    function ViewInvoice(InvoiceID) {

        localStorage.setItem("InvoiceID", InvoiceID.toString())
        OpenPagePartial("View_Order", "Order 🧺", () => { Display_Refrsh() });
    }

    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        debugger
        GetData_Invoice();
    }
}
