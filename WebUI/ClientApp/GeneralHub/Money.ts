
$(document).ready(() => {
	Money.InitalizeComponent();

});

namespace Money {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var _Grid: JsGrid = new JsGrid();

	var _VouchersList: Array<Voucher_Receipt> = new Array<Voucher_Receipt>();
	var _Vouchersnone: Array<Voucher_Receipt> = new Array<Voucher_Receipt>();

	var txtSearch: HTMLInputElement;
	var drpActive: HTMLSelectElement;
	var Filter_View: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;

	export function InitalizeComponent() {


		InitalizeControls();
		InitializeEvents();
		InitializeGrid();
		$('#Txt_From_Date').val(DateStartYear())
		$('#Txt_To_Date').val(GetDate())
		Close_Loder();
	}
	function InitalizeControls() {
		txtSearch = document.getElementById('txtSearch') as HTMLInputElement;
		Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
		btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
	}
	function InitializeEvents() {

		Filter_View.onclick = GetData_Money;
		txtSearch.onkeyup = _SearchBox_Change;
		btnDelete_Filter.onclick = Clear;
	}
	function InitializeGrid() {
		_Grid.ElementName = "_Grid";
		//_Grid.OnRowDoubleClicked = GridDoubleClick;
		_Grid.PrimaryKey = "ReceiptID";
		_Grid.Paging = true;
		_Grid.PageSize = 15;
		_Grid.Sorting = true;
		_Grid.InsertionMode = JsGridInsertionMode.Binding;
		_Grid.Editing = false;
		_Grid.Inserting = false;
		_Grid.SelectedIndex = 1;
		_Grid.OnItemEditing = () => { };
		_Grid.Columns = [
			{ title: "Tr_No", name: "ReceiptID", type: "text", width: "100px" },
			{
				title: "Type", css: "ColumPadding", name: "TrType", width: "100px",
				itemTemplate: (s: string, item: Voucher_Receipt): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");
					if (item.TrType == 0) {
						txt.innerHTML = 'Receipt'
					} else if (item.TrType == 1) {
						txt.innerHTML = 'Payment'
					} else if (item.TrType == 2) {
						txt.innerHTML = 'Receipt Invoice'
					} else {
						txt.innerHTML = 'Payment Vendor'
					}
					return txt;
				}
			},
			{ title: "Name Recipient", name: "NameRecipient", type: "text", width: "100px" },
			{ title: "Amount", name: "Amount", type: "text", width: "100px" },
			{
				title: "Cash Type", css: "ColumPadding", name: "IsCash", width: "100px",
				itemTemplate: (s: string, item: Voucher_Receipt): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");
					if (item.IsCash == true) {
						txt.innerHTML = 'Cash'
					} else {
						txt.innerHTML = 'Credit'
					}
					return txt;
				}
			},
			{
				title: "Status",
				itemTemplate: (s: string, item: Voucher_Receipt): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "checkbox";
					txt.id = "ChkView" + item.ReceiptID;
					txt.className = "checkbox";
					txt.checked = item.Status;
					txt.style.width = "50px"
					txt.style.height = "35px"
					txt.onclick = (e) => {
						if (item.TrType == 2 || item.TrType == 3) {
							txt.checked = true;
							Errorinput("ChkView" + item.ReceiptID + "", "This is Auto Receipt Invoice ,You Can't un Approve it");
						} else {
							Approve(item.ReceiptID, txt.checked == true ? 1 : 0);
						}

					};

					return txt;
				}
			},
			{
				title: "Edit",
				itemTemplate: (s: string, item: Voucher_Receipt): HTMLInputElement => {
					let txt: HTMLInputElement = document.createElement("input");
					txt.type = "button";
					txt.value = ("Edit ⚙️");
					txt.id = "butView" + item.ReceiptID;
					txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
					if (item.Status == true) {
						txt.disabled = true;

					} else {
						txt.disabled = false;
					}
					txt.onclick = (e) => {
						ViewUser(item);
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
			let SearchDetails = _VouchersList.filter(x => x.NameRecipient.toLowerCase().search(search) >= 0 || x.TransferNo.toLowerCase().search(search) >= 0 || x.Amount.toString().search(search) >= 0 || x.ReceiptID.toString().search(search) >= 0);

			_Grid.DataSource = SearchDetails;
			_Grid.Bind();
		} else {
			_Grid.DataSource = _VouchersList;
			_Grid.Bind();
		}
	}
	function GetData_Money() {
		debugger
		CleaningList_Table();
		let Active = $('#drpActive').val() == "Null" ? "0,1" : $('#drpActive').val();
		let Type = $('#drpType').val() == "Null" ? "0,1,2,3" : $('#drpType').val();
		let From_Date = $('#Txt_From_Date').val();
		let To_Date = $('#Txt_To_Date').val();

		var Table: Array<Table>;
		Table =
			[
				{ NameTable: 'Voucher_Receipt', Condition: "TrDate >= '" + From_Date + "' and TrDate <= '" + To_Date + "' and  TrType in (" + Type + " )  and Status in(" + Active + ")" },
			]
		DataResult(Table);
		//**************************************************************************************************************
		debugger
		_VouchersList = GetDataTable('Voucher_Receipt');
		_VouchersList = _VouchersList.sort(dynamicSortNew("ReceiptID"));
		$('#btnDelete_Filter').removeClass('display_none');
		_Grid.DataSource = _VouchersList;
		_Grid.Bind();
		debugger
		let RecTotal = _VouchersList.filter(x => x.TrType == 0 || x.TrType == 2);
		let PayTotal = _VouchersList.filter(x => x.TrType == 1 || x.TrType == 3);
		let Rec = Number(SumValue(RecTotal, "Amount"));
		let Pay = Number(SumValue(PayTotal, "Amount"));
		$('#Txt_TotalReciept').val(Digits(Rec, 1));
		$('#Txt_TotalPayment').val(Digits(Pay, 1));
		$('#Txt_Net').val(Digits((Number(Rec) - Number(Pay)), 1));
	}
	function ViewUser(item: Voucher_Receipt) {
		debugger
		$("#Open").focus();
		let Page = item.TrType == 0 ? "VoucherReceipt" : "VoucherPayment";
		localStorage.setItem("TypePage", "Money");
		SetGolobalVoucher(item);
		localStorage.setItem("UserControl", item.ReceiptID.toString());
		OpenPagePartial(Page, Page, () => { Display_Refrsh() });
	}
	function Clear() {
		$('#drpActive').val("Null");
		$('#drpType').val("Null");
		$('#btnDelete_Filter').addClass('display_none');
		CleaningList_Table();
		_Grid.DataSource = _Vouchersnone;
		_Grid.Bind();
	}

	var Run_Fun = false;
	function Display_Refrsh() {
		if (!Run_Fun) {
			Run_Fun = true;
			return
		}
		GetData_Money();
	}
	function Approve(ReceiptID: number, Active: number) {
		Ajax.CallsyncSave({
			type: "Get",
			url: sys.apiUrl("SalesMan", "UpdateStatusVoucher"),
			data: { ReceiptID: ReceiptID, Active: Active },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					GetData_Money();
					Close_Loder();
					Active == 0 ? ShowMessage("Voucher Un Approved 🚫 ") : ShowMessage("Voucher Approved 👍")
				} else {

				}
			}
		});

	}
}
