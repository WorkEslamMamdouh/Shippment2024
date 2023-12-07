
$(document).ready(() => {
    Chase_Delivery.InitalizeComponent();

});

namespace Chase_Delivery {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();
    var _Grid_Ret: JsGrid = new JsGrid();

    var New_Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
    var _IQ_ItemCollect: Array<IQ_ItemCollect> = new Array<IQ_ItemCollect>();

    var _Zones: Array<Zones> = new Array<Zones>();
    var _ZonesFltr: Array<Zones> = new Array<Zones>();

    var _Invs;
    var _Invs_Ret;
    var txtSearch: HTMLInputElement;
    var txtSearchRet: HTMLInputElement;
    var Filter_Select_Delivery: HTMLButtonElement;
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement; 
    var View_Invoices: HTMLButtonElement;
    var View_Return: HTMLButtonElement;
    var db_Zone: HTMLSelectElement;
    var db_FamilyZone: HTMLSelectElement;

    var SalesmanId = 0;
    export function InitalizeComponent() {


        $('.Txt_Ret_Tot').addClass('display_none'); $('.Txt_Inv_Tot').removeClass('display_none')
        InitalizeControls();
        InitializeEvents();
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        InitializeGrid();
        InitializeGrid_Ret();
        GetData_Zones();
        //GetData_Invoice();
        Close_Loder();

    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
        txtSearchRet = document.getElementById('txtSearchRet') as HTMLInputElement;
        Filter_Select_Delivery = document.getElementById('Filter_Select_Delivery') as HTMLButtonElement;
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement; 
        View_Invoices = document.getElementById('View_Invoices') as HTMLButtonElement;
        View_Return = document.getElementById('View_Return') as HTMLButtonElement;
        db_FamilyZone = document.getElementById('db_FamilyZone') as HTMLSelectElement;
        db_Zone = document.getElementById('db_Zone') as HTMLSelectElement;
    }
    function InitializeEvents() {

        txtSearch.onkeyup = _SearchBox_Change;
        txtSearchRet.onkeyup = _SearchBoxRet_Change;
        Filter_Select_Delivery.onclick = Filter_Select_Delivery_onclick;
        Filter_View.onclick = GetData_InvoiceCollect;
        btnDelete_Filter.onclick = Clear; 

        db_FamilyZone.onchange = FltrZones;
        View_Invoices.onclick = () => { $('.Txt_Ret_Tot').addClass('display_none'); $('.Txt_Inv_Tot').removeClass('display_none') }
        View_Return.onclick = () => { $('.Txt_Ret_Tot').removeClass('display_none'); $('.Txt_Inv_Tot').addClass('display_none') }
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
            { title: "Cust Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Cust Mobile1", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "Address", name: "Address", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            {
                title: "Status", css: "ColumPadding", name: "Status", width: "100px",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    if (item.Status == 4) {
                        txt.innerHTML = 'Not Deliver'
                        txt.style.color = 'red'
                        txt.style.fontWeight = 'bold'
                    }
                    else {
                        txt.innerHTML = 'Done Deliver'
                        txt.style.color = '#00dd40'
                        txt.style.fontWeight = 'bold'
                    }
                    return txt;
                }
            },
            {
                title: "View",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Review");
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
    function InitializeGrid_Ret() {
        _Grid_Ret.ElementName = "_Grid_Ret";
        _Grid_Ret.PrimaryKey = "TRID";
        _Grid_Ret.Paging = true;
        _Grid_Ret.PageSize = 15;
        _Grid_Ret.Sorting = true;
        _Grid_Ret.InsertionMode = JsGridInsertionMode.Binding;
        _Grid_Ret.Editing = false;
        _Grid_Ret.Inserting = false;
        _Grid_Ret.SelectedIndex = 1;
        _Grid_Ret.OnItemEditing = () => { };
        _Grid_Ret.Columns = [
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
            { title: "Cust Name", name: "CustomerName", type: "text", width: "100px" },
            { title: "Cust Mobile1", name: "CustomerMobile1", type: "text", width: "100px" },
            { title: "Address", name: "Address", type: "text", width: "100px" },
            { title: "ItemCount", name: "ItemCount", type: "number", width: "100px" },
            { title: "Total", name: "NetAfterVat", type: "text", width: "100px" },
            {
                title: "View",
                itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Review");
                    txt.id = "butView" + item.InvoiceID;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

                    txt.onclick = (e) => {
                        ViewInvoice(item.InvoiceID);
                    };
                    return txt;
                }
            },
        ];
        _Grid_Ret.Bind();

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
    function _SearchBoxRet_Change() {
        $("#_Grid_Ret").jsGrid("option", "pageIndex", 1);

        if (txtSearch.value != "") {
            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = _Invoices.filter(x => x.InvoiceID.toString().search(search) >= 0 || x.CustomerName.toLowerCase().search(search) >= 0 || x.RefNO.toLowerCase().search(search) >= 0 || x.CustomerMobile1.toLowerCase().search(search) >= 0 || x.NetAfterVat.toString().search(search) >= 0);

            _Grid_Ret.DataSource = SearchDetails;
            _Grid_Ret.Bind();
        } else {
            _Grid_Ret.DataSource = _Invoices;
            _Grid_Ret.Bind();
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
        _ZonesFltr = _Zones.filter(x => x.FamilyZoneID == Number(db_FamilyZone.value));
        DocumentActions.FillCombowithdefult(_ZonesFltr, db_Zone, "ZoneID", 'DescA', 'Select Zone');

    }
    function GetData_InvoiceCollect() {
        CleaningList_Table();
        debugger
        let StartDate = DateFormat($('#Txt_From_Date').val());
        let EndDate = DateFormat($('#Txt_To_Date').val());
        let Con = "";
        if (Number($('#Txt_SalesmanId').val()) != 0) {
            Con = " and ( SalesmanId =" + Number($('#Txt_SalesmanId').val()) + " )";
        }
        else {
            Errorinput($('#Filter_Select_Delivery'), "Must Select Delivery")
            return
        }
        var Table: Array<Table>;
        Table =
            [
            { NameTable: 'Vnd_Inv_SlsMan', Condition: " (TrType = 1)   AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 0)   AND (Status = 5)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 0) AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + "" },
            { NameTable: 'IQ_ItemCollect', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where (TrType = 1)   AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 0) AND  (Status = 5) and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + " OR (TrType = 0) AND (Status = 4)  and (TrDate >=N'" + StartDate + "') and (TrDate <= N'" + EndDate + "')" + Con + ")" },
            ]

        DataResult(Table);
        //**************************************************************************************************************
        debugger
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

        $('#Tap_View_Inv').html('View Invoice');
        $('#Tap_View_Ret').html('View Retrun');

        _Invs = _Invoices.filter(x => x.TrType == 0)
        _Grid.DataSource = _Invs;
        _Grid.Bind();
        debugger
        _Invs_Ret = _Invoices.filter(x => x.TrType == 1)
        _Grid_Ret.DataSource = _Invs_Ret;
        _Grid_Ret.Bind();

        $('#Txt_Total_LineCountRet').val(_Invs_Ret.length);
        $('#Txt_Total_ItemsCountRet').val(SumValue(_Invs_Ret, "ItemCount"));
        $('#Txt_Total_Amount_Return').val(SumValue(_Invs_Ret, "NetAfterVat", 1));

        $('#Txt_Total_LineCount').val(_Invs.length);
        $('#Txt_Total_ItemsCount').val(SumValue(_Invs, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(_Invs, "NetAfterVat", 1));

        if (_Invs.length > 0) {
            $('#Tap_View_Inv').html('View Invoice ( ' + _Invs.length + ' )');
        }

        if (_Invs_Ret.length > 0) {
            $('#Tap_View_Ret').html('View Retrun ( ' + _Invs_Ret.length + ' )');
        }

    }
    function Filter_Select_Delivery_onclick() {
         
        debugger
        let Con = "";
        if ($('#db_FamilyZone').val() == 'null') {
            Errorinput($('#db_FamilyZone'), "Must Select Family  Zone")
            return
        }
        debugger
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


        sys.FindKey("Follow_UP", "btnSalesman", "  Status = 4 " + Con + "", () => {
            debugger
            let dataScr = SearchGrid.SearchDataGrid.dataScr
            SalesmanId = SearchGrid.SearchDataGrid.SelectedKey
            dataScr = dataScr.filter(x => x.SalesmanId == SalesmanId);
            $('#Txt_SalesmanId').val(SalesmanId)
            Filter_Select_Delivery.innerHTML = "( " + dataScr[0].SlsMan_Name + " )";
        });
    }
    function Clear() {
        $('#Txt_From_Date').val(DateStartYear())
        $('#Txt_To_Date').val(GetDate())
        $('#Txt_SalesmanId').val('')
        Filter_Select_Delivery.innerHTML = 'Select Delivery'
        $('#btnDelete_Filter').addClass('display_none')
        $('#db_Zone').val('null')
        SalesmanId = 0;
        _Grid.DataSource = New_Invoices;
        _Grid.Bind();

        _Grid_Ret.DataSource = New_Invoices;
        _Grid_Ret.Bind();

        $('#Txt_Total_LineCountRet').val(New_Invoices.length);
        $('#Txt_Total_ItemsCountRet').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount_Return').val(SumValue(New_Invoices, "NetAfterVat", 1));

        $('#Txt_Total_LineCount').val(New_Invoices.length);
        $('#Txt_Total_ItemsCount').val(SumValue(New_Invoices, "ItemCount"));
        $('#Txt_Total_Amount').val(SumValue(New_Invoices, "NetAfterVat", 1));


        $('#Tap_View_Inv').html('View Invoice');
        $('#Tap_View_Ret').html('View Retrun');

    }

    function ViewInvoice(InvoiceID) { 
        localStorage.setItem("InvoiceID", InvoiceID.toString())
        localStorage.setItem("InvoiceNote", "0")
        OpenPagePartial("Print_Order", "Print Order 🧺"); 
    }
     

}
