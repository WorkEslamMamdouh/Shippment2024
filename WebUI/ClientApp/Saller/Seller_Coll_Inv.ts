﻿
$(document).ready(() => {
	Seller_Coll_Inv.InitalizeComponent();

});

namespace Seller_Coll_Inv {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var _Grid: JsGrid = new JsGrid();
	var _USER: Array<G_USERS> = new Array<G_USERS>();

	var New_Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
	var _Invoices: Array<Vnd_Inv_SlsMan> = new Array<Vnd_Inv_SlsMan>();
	var _InvoiceItems: Array<Sls_InvoiceItem> = new Array<Sls_InvoiceItem>();
	var _IQ_ItemCollect: Array<IQ_ItemCollect> = new Array<IQ_ItemCollect>();
					  
	var txtSearch: HTMLInputElement;
	var Filter_Select_Delivery: HTMLButtonElement;
	var Filter_View: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;	  
	export function InitalizeComponent() {
		let _USERS = GetGlopelDataUser()
		_USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase())

		InitalizeControls();
		InitializeEvents();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		InitializeGrid();
		Close_Loder();
	}
	function InitalizeControls() {
		txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
		Filter_Select_Delivery = document.getElementById('Filter_Select_Delivery') as HTMLButtonElement;
		Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {
		txtSearch.onkeyup = _SearchBox_Change;
		Filter_View.onclick = GetData_InvoiceCollect;
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
			{ title: "InvoiceID", css: "ColumPadding", name: "InvoiceID", type: "text", width: "5%", visible: false },
			{ title: "TrNo", css: "ColumPadding", name: "InvoiceID", type: "text", width: "50px" },
			{ title: "RefNO", css: "ColumPadding", name: "RefNO", type: "text", width: "100px" },
			{
				title: "TrDate", css: "ColumPadding", name: "TrDate", width: "100px",
				itemTemplate: (s: string, item: Vnd_Inv_SlsMan): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");
					txt.innerHTML = DateFormat(item.TrDate);
					return txt;
				}
			},
			{ title: "Cust Name", css: "ColumPadding", name: "CustomerName", type: "text", width: "300px" },
			{ title: "Cust Mobile1", css: "ColumPadding", name: "CustomerMobile1", type: "text", width: "100px" }, 
			{ title: "ItemCount", css: "ColumPadding", name: "ItemCount", type: "text", width: "100px" },
			{ title: "Total", css: "ColumPadding", name: "NetAfterVat", type: "text", width: "100px" }, 
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
	function ViewInvoice(InvoiceID: number) {
		localStorage.setItem("InvoiceID", InvoiceID.toString())
		localStorage.setItem("InvoiceNote", "0")
		OpenPagePartial("Print_Order", "Print Order 🧺");
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
	function GetData_InvoiceCollect() {
		CleaningList_Table();

		let StartDate = DateFormat($('#Txt_From_Date').val());
		let EndDate = DateFormat($('#Txt_To_Date').val()); 
		 
		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'Vnd_Inv_SlsMan', Condition: "   Status = 7 and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "'"  },
			{ NameTable: 'IQ_ItemCollect', Condition: " InvoiceID in (Select InvoiceID from [dbo].[Sls_Invoice] where   (Status = 7)  and TrDate >=N'" + StartDate + "' and TrDate <= N'" + EndDate + "' )"  },
			]

		DataResult(Table);
		//**************************************************************************************************************
		debugger
		_Invoices = GetDataTable('Vnd_Inv_SlsMan');
		_InvoiceItems = GetDataTable('IQ_ItemCollect');
		_IQ_ItemCollect = GetDataTable('IQ_ItemCollect');

		_Invoices = _Invoices.sort(dynamicSortNew("InvoiceID"));

		SetGlopelDataInvoice(_Invoices);
		SetGlopelDataInvoiceItems(_InvoiceItems);
		SetGlopelDataIQ_ItemCollect(_IQ_ItemCollect);
		 

		let _Invs = _Invoices.filter(x => x.TrType == 0)
		_Grid.DataSource = _Invs;
		_Grid.Bind();

		$('#Txt_Total_LineCount').val(_Invs.length);
		$('#Txt_Total_ItemsCount').val(SumValue(_Invs, "ItemCount"));
		$('#Txt_Total_Amount').val(SumValue(_Invs, "NetAfterVat", 1));
		$('#btnDelete_Filter').removeClass('display_none');
	}
	function Clear() {
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		$('#btnDelete_Filter').addClass('display_none')	   
		_Grid.DataSource = New_Invoices;
		_Grid.Bind();

		$('#Txt_Total_LineCount').val(New_Invoices.length);
		$('#Txt_Total_ItemsCount').val(SumValue(New_Invoices, "ItemCount"));
		$('#Txt_Total_Amount').val(SumValue(New_Invoices, "NetAfterVat", 1));
	}
}
