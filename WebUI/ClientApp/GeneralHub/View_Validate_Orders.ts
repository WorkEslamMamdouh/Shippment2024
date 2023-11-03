
$(document).ready(() => {
    View_Validate_Orders.InitalizeComponent();

});

namespace View_Validate_Orders {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var _Invoices: Array<Sls_Invoice> = new Array <Sls_Invoice>();
    var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
     
     
    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();
        GetData_Invoice();
        InitializeGrid();
        Display_Orders();
        Close_Loder(); 
    }
    function InitalizeControls() { 
         
    }
    function InitializeEvents() {

        
         
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

        //if (txtSearch.value != "") {
        //    let search: string = txtSearch.value.toLowerCase();
        //    let SearchDetails = LnkTransDetails.filter(x => x.TR_NO.toString().search(search) >= 0 || x.VOUCHER_DESCA.toLowerCase().search(search) >= 0 || x.TR_DESCA.toLowerCase().search(search) >= 0);

        //    _Grid.DataSource = SearchDetails;
        //    _Grid.Bind();
        //} else {
        //    _Grid.DataSource = LnkTransDetails;
        //    _Grid.Bind();
        //}
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
        debugger
        _Invoices = _Invoices.sort(dynamicSort("InvoiceID"));
        debugger
        _Grid.DataSource = _Invoices;
        _Grid.Bind();
        debugger
        //$('#Div_View_Orders').html("");
        //for (var i = 0; i < _Invoices.length; i++) {
        //    Build_Orders(i)
        //}

    }
    function Build_Orders(cnt: number) {
        let html = `

             <div class="u-align-center u-container-align-center-xs u-container-style u-products-item u-repeater-item u-white u-repeater-item-2 animate__animated animate__zoomIn" data-product-id="3">
                    <div class="u-container-layout u-similar-container u-valign-top-xs u-container-layout-2">
                        <!--product_image-->
                        <a class="u-product-title-link"><img alt="" class="u-expanded-width u-image u-image-default u-product-control u-image-2" src="/NewStyle/images/istockphoto-853561716-1024x1024.jpg" style="height: 180px;" ></a><!--/product_image--><!--product_title-->
                        <h6 class="u-align-center-xs u-product-control u-text u-text-2">
                            <a class="u-product-title-link">${_Invoices[cnt].CustomerName}</a>
                        </h6>
                        <h6 class="u-align-center-xs u-product-control u-text u-text-2">
                            <a class="u-product-title-link">( ${_Invoices[cnt].RefNO} )</a>
                        </h6>
                        <div class="u-align-center-xs u-product-control u-product-price u-product-price-2">
                            <div class="u-price-wrapper u-spacing-10">
                                <!--product_old_price-->
                                <div class="u-hide-price u-old-price"><!--product_old_price_content-->$25<!--/product_old_price_content--></div><!--/product_old_price--><!--product_regular_price-->
                                <div class="u-price u-text-palette-2-base" style="font-size: 1.25rem; font-weight: 700;">( ${_Invoices[cnt].NetAfterVat} )</div><!--/product_regular_price-->
                            </div>
                        </div><!--/product_price--><!--product_button--><!--options_json--><!--{"clickType":"go-to-page","content":"View"}--><!--/options_json-->
                        <a id="Btn_ViewOrder${cnt}" class="u-align-center-xs u-border-2 u-border-grey-25 u-border-hover-palette-2-base u-btn u-btn-rectangle u-button-style u-none u-product-control u-text-body-color u-btn-2" data-product-button-click-type="go-to-page"><!--product_button_content-->View<!--/product_button_content--></a><!--/product_button-->
                    </div>
                </div>

`;

        $('#Div_View_Orders').append(html)
         

        $("#Btn_ViewOrder" + cnt).on('click', function () {

            localStorage.setItem("InvoiceID", _Invoices[cnt].InvoiceID.toString())
            OpenPagePartial("View_Order", "Order 🧺");
        });
    }

     
    
}
