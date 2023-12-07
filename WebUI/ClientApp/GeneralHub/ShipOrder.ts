
$(document).ready(() => {
    ShipOrder.InitalizeComponent();

});

namespace ShipOrder {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var New_Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _IQ_ItemCollect: Array<IQ_ItemCollect> = new Array<IQ_ItemCollect>();
    var _Zones: Array<Zones> = new Array<Zones>();
    var _ZonesFltr: Array<Zones> = new Array<Zones>();

    var txtSearch: HTMLInputElement;
    var db_Zone: HTMLSelectElement;
    var db_FamilyZone: HTMLSelectElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;

    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        InitializeGrid();
        GetData_Zones();
        Close_Loder();

        SetRefresh(GetModuleCode())
    }
    function SetRefresh(moduleCode: string) {


        // Event listener for dynamically generated buttons
        $(document).on('click', '.Refresh_' + moduleCode, function () {
            if ($('#db_Zone').val() == 'null') {
                return;
            }
            GetData_InvoiceShip()
            // Shows an alert when a dynamically created button is clicked
        });
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
        db_FamilyZone = document.getElementById('db_FamilyZone') as HTMLSelectElement;
        db_Zone = document.getElementById('db_Zone') as HTMLSelectElement;
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() {

        txtSearch.onkeyup = _SearchBox_Change;
        Filter_View.onclick = GetData_InvoiceShip;
        btnDelete_Filter.onclick = Clear;
        db_FamilyZone.onchange = FltrZones;
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
                title: "Type", css: "ColumPadding", name: "Type", width: "100px",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    if (item.TrType == 0) {
                        txt.innerHTML = "Invoice"; 
                    }
                    else {
                        txt.innerHTML = "Return";
                    }
                    return txt;
                }
            },
            {
                title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = DateFormat(item.TrDate);
                    return txt;
                }
            },
            {
                title: "Receive Date", css: "ColumPadding", name: "DeliveryDate", width: "100px",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    txt.innerHTML = DateFormat(item.DeliveryDate);
                    return txt;
                }
            },
            { title: "Cust Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Cust Mobile1", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "Address", name: "Address", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            {
                title: "View",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("View");
                    txt.style.backgroundColor = "chocolate";
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewInvoiceDetail(item.InvoiceID);
                    };
                    return txt;
                }
            },
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
    function GetData_Zones() {


        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'Zones', Condition: " Active = 1" },
            { NameTable: 'FamilyZone', Condition: " Active = 1" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        
       _Zones = GetDataTable('Zones');
        let _FamilyZones = GetDataTable('FamilyZone');                                          

        DocumentActions.FillCombowithdefult(_FamilyZones, db_FamilyZone, "FamilyZoneID", 'DescA', 'Select Family Zone');
        FltrZones();
    }
    function FltrZones() {
       _ZonesFltr =  _Zones.filter(x => x.FamilyZoneID == Number(db_FamilyZone.value));
        DocumentActions.FillCombowithdefult(_ZonesFltr, db_Zone, "ZoneID", 'DescA', 'Select Zone');

	}
    function GetData_InvoiceShip() {
        CleaningList_Table();

        let StartDate = DateFormat($('#Txt_From_Date').val());
        let EndDate = DateFormat($('#Txt_To_Date').val());
        let Con = "";

        if ($('#db_FamilyZone').val() == 'null') {           
            Errorinput($('#db_FamilyZone'), "Must Select Family  Zone")
            return
        }

        if ($('#db_Zone').val() != 'null') {
            Con = " and ZoneID =" + Number($('#db_Zone').val());
        } else {
            let zoneValues = "";
            for (var i = 1; i < db_Zone.childElementCount; i++) {
                db_Zone.selectedIndex = i;
                let valu = db_Zone.value;
                zoneValues = zoneValues + valu
                if (i != db_Zone.childElementCount - 1) {
                    zoneValues = zoneValues + ","
                }
            }
            db_Zone.selectedIndex = 0;
            Con = " and ZoneID in (" + zoneValues + ")";
        }
        if ($('#db_TrType').val() != '-1') {
            Con = Con + " and TrType =" + Number($('#db_TrType').val());
        }
             
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'Vnd_Inv_SlsMan', Condition: "  Status = 3 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "'" + Con },
                { NameTable: 'Sls_InvoiceItem', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where  Status = 3 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
                { NameTable: 'IQ_ItemCollect', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where  Status = 3 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' " + Con + ")" },
            ]

        DataResult(Table);
        //**************************************************************************************************************

        _Invoices = GetDataTable('Vnd_Inv_SlsMan');
        _InvoiceItems = GetDataTable('Sls_InvoiceItem');
        _IQ_ItemCollect = GetDataTable('IQ_ItemCollect');

        _Invoices = _Invoices.sort(dynamicSort("InvoiceID"));

        SetGlopelDataInvoice(_Invoices);
        SetGlopelDataInvoiceItems(_InvoiceItems);
        SetGlopelDataIQ_ItemCollect(_IQ_ItemCollect);

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
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        $('#db_Zone').val('null')
        $('#db_FamilyZone').val('null')
        $('#db_TrType').val('-1')
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
    function ViewInvoiceDetail(InvoiceID) {
        localStorage.setItem("InvoiceID", InvoiceID.toString())
        localStorage.setItem("InvoiceNote", "1")
        OpenPagePartial("Print_Order", "Print Order 🧺");
    }


    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData_InvoiceShip();
    }
}
