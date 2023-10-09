$(document).ready(() => {
	VATReport.InitializeComponent();
})
namespace VATReport {	 
	//************system variables
	var SysSession: SystemSession = GetSystemSession(Modules.VatReport);
	var sys: SystemTools = new SystemTools();
	//***********Variables
	var VatPeriodDetail: Array<AQVAT_GetPeriodDetail> = new Array<AQVAT_GetPeriodDetail>();
	var VatPeriodHeaderDetail: VatPeriodMatserDetail = new VatPeriodMatserDetail();
	var VatPeriod: Array<AVAT_PERIOD> = new Array<AVAT_PERIOD>();
	var SalesGrid: JsGrid = new JsGrid();
	var PurGrid: JsGrid = new JsGrid();
	var vatyear = SysSession.CurrentEnvironment.CurrentYear;	  
	//***********Controls
	var drpVatPeriod: HTMLSelectElement;
	var txtFromDate: HTMLInputElement;
	var txtToDate: HTMLInputElement;
	var btn_Save: HTMLButtonElement;
	var btnEdit: HTMLButtonElement;
	var btn_Back: HTMLButtonElement;
	var btnLoad: HTMLButtonElement;
	var txtCORRECTIONS: HTMLInputElement;
	var txtVAT_PREVBALANCE: HTMLInputElement;
	var txtVOUCHER_CODE: HTMLInputElement;
	var btnClose: HTMLButtonElement;
	var btnReopen: HTMLButtonElement;
	var btnDeliveringReport: HTMLButtonElement;
	var LbSlsAmount: HTMLLabelElement;
	var LbSlsChanges: HTMLLabelElement;
	var LbSlsVat: HTMLLabelElement;
	var LbPurAmount: HTMLLabelElement;
	var LbPurChanges: HTMLLabelElement;
	var LbPurVat: HTMLLabelElement;
	var rd_close: HTMLInputElement;
	var rd_delivered: HTMLInputElement;
	var rd_Open: HTMLInputElement;
	var txtNETVAT_AMOUNT: HTMLInputElement;
	var txtTOTALPERIODVAT: HTMLInputElement;
	//print buttons					
	var btnPrintTrview: HTMLButtonElement;
	var btnPrintTrPDF: HTMLButtonElement;
	var btnPrintTrEXEL: HTMLButtonElement;	  
	var btnPrint: HTMLButtonElement;
	var updStat: boolean = false;
	//*************************Initialization************************//		  
	export function InitializeComponent() {
		if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
			document.getElementById('Screen_name').innerHTML = "الاقرار الضريبي ";
		} else {
			document.getElementById('Screen_name').innerHTML = "Vat Report";
		}
		InitializeControls();
		InitializeEvents();
		Load_VatPeriod();
		InitializeSalesGrid();
		InitializePurGrid();   
		btnEdit.disabled = !SysSession.CurrentPrivileges.EDIT;
		btnClose.disabled = !SysSession.CurrentPrivileges.CUSTOM1;
		btnReopen.disabled = !SysSession.CurrentPrivileges.CUSTOM2;	   
		$('#iconMainPages').addClass("d-none");
		$('#iconReportPages').addClass("d-none");	   
	}
	function InitializeControls() {
		drpVatPeriod = document.getElementById("drpVatPeriod") as HTMLSelectElement;
		btnLoad = document.getElementById("btnLoad") as HTMLButtonElement;
		txtVOUCHER_CODE = document.getElementById("txtVOUCHER_CODE") as HTMLInputElement;
		rd_delivered = document.getElementById("rd_delivered") as HTMLInputElement;
		txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
		txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
		txtCORRECTIONS = document.getElementById("txtCORRECTIONS") as HTMLInputElement;
		txtVAT_PREVBALANCE = document.getElementById("txtVAT_PREVBALANCE") as HTMLInputElement;
		txtNETVAT_AMOUNT = document.getElementById("txtNETVAT_AMOUNT") as HTMLInputElement;
		txtTOTALPERIODVAT = document.getElementById("txtTOTALPERIODVAT") as HTMLInputElement;
		rd_close = document.getElementById("rd_close") as HTMLInputElement;
		rd_Open = document.getElementById("rd_Open") as HTMLInputElement;
		btnClose = document.getElementById("btnClose") as HTMLButtonElement;
		btnReopen = document.getElementById("btnReopen") as HTMLButtonElement;
		btnDeliveringReport = document.getElementById("btnDeliveringReport") as HTMLButtonElement;
		LbSlsAmount = document.getElementById("LbSlsAmount") as HTMLLabelElement;
		LbSlsChanges = document.getElementById("LbSlsChanges") as HTMLLabelElement;
		LbSlsVat = document.getElementById("LbSlsVat") as HTMLLabelElement;
		btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;
		btn_Save = document.getElementById("btn_Save") as HTMLButtonElement;
		btn_Back = document.getElementById("btn_Back") as HTMLButtonElement;
		LbPurAmount = document.getElementById("LbPurAmount") as HTMLLabelElement;
		LbPurChanges = document.getElementById("LbPurChanges") as HTMLLabelElement;
		LbPurVat = document.getElementById("LbPurVat") as HTMLLabelElement;
		//print 						
		btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
		btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
		btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;   
		btnPrint = document.getElementById("btnPrint") as HTMLInputElement;
	}
	function InitializeEvents() {
		drpVatPeriod.onchange = drpVatPeriod_onchange;
		btnLoad.onclick = btnLoad_onclick;
		txtCORRECTIONS.onkeyup = ComputeTotals;
		txtVAT_PREVBALANCE.onkeyup = ComputeTotals;		    
		btnReopen.onclick = btnReopen_onclick;
		btnClose.onclick = btnClose_onclick;
		btnDeliveringReport.onclick = btnDeliveringReport_onclick;
		btnEdit.onclick = btnEdit_onclick;
		btn_Save.onclick = btnSave_onclick;
		btn_Back.onclick = btnBack_onclick;		 
		btnPrintTrview.onclick = () => { PrintReport(1); }
		btnPrintTrPDF.onclick = () => { PrintReport(2); }
		btnPrintTrEXEL.onclick = () => { PrintReport(3); }
		btnPrint.onclick = () => { PrintReport(4); }
	}    
	function InitializeSalesGrid() {

		let res: any = GetResourceList("");
		SalesGrid.ElementName = "divSalesGrid";
		SalesGrid.Paging = true;
		SalesGrid.PageSize = 10;
		SalesGrid.Sorting = true;
		SalesGrid.InsertionMode = JsGridInsertionMode.Binding;
		SalesGrid.Editing = false;
		SalesGrid.Inserting = false;
		SalesGrid.SelectedIndex = 1;
		SalesGrid.OnItemEditing = () => { };
		SalesGrid.PrimaryKey = "LineOrder";
		SalesGrid.Columns = [
			{ title: res.App_Code, name: "COMP_CODE", type: "number", width: "10%", visible: false },
			{ title: res.App_Code, name: "VAT_YEAR", type: "number", width: "10%", visible: false },
			{ title: res.App_Number, name: "LineOrder", type: "number", width: "10%" },
			{ title: res.TransDesc, name: "DESCRIPTION", type: "number", width: "30%" },
			{ title: res.App_Amount, name: "Val_Amount", type: "text", width: "20%" },
			{ title: res.Update_Sales, name: "Upd_Amount", type: "text", width: "20%" },
			{ title: res.App_Tax, name: "VAT_Amount", type: "text", width: "20%" }
		];
		SalesGrid.Bind();


	}		  
	function InitializePurGrid() {	  
		let res: any = GetResourceList("");
		PurGrid.ElementName = "divPurGrid";
		PurGrid.Paging = true;
		PurGrid.PageSize = 10;
		PurGrid.Sorting = true;
		PurGrid.InsertionMode = JsGridInsertionMode.Binding;
		PurGrid.Editing = false;
		PurGrid.Inserting = false;
		PurGrid.SelectedIndex = 1;
		PurGrid.OnItemEditing = () => { };
		PurGrid.PrimaryKey = "LineOrder";
		PurGrid.Columns = [
			{ title: res.App_Code, name: "COMP_CODE", type: "number", width: "10%", visible: false },
			{ title: res.App_Code, name: "VAT_YEAR", type: "number", width: "10%", visible: false },
			{ title: res.App_Number, name: "LineOrder", type: "number", width: "10%" },
			{ title: res.TransDesc, name: "DESCRIPTION", type: "number", width: "30%" },
			{ title: res.App_Amount, name: "Val_Amount", type: "text", width: "20%" },
			{ title: res.Update_Purshase, name: "Upd_Amount", type: "text", width: "20%" },
			{ title: res.App_Tax, name: "VAT_Amount", type: "text", width: "20%" }
		];
		PurGrid.Bind();
	}
	function Load_VatPeriod() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "GetAllByComp"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, compcode: Number(SysSession.CurrentEnvironment.CompCode)
			},
			success: function (d) {
				var result = d;
				if (result.IsSuccess) {	   
					VatPeriod = result.Response as Array<AVAT_PERIOD>;
					VatPeriod = VatPeriod.filter(x => x.VAT_YEAR == Number(vatyear));
					if (SysSession.CurrentEnvironment.ScreenLanguage == "ar")
						DocumentActions.FillComboFirstvalue(VatPeriod, drpVatPeriod, "PERIOD_CODE", "PERIOD_CODE", "- اختر -", null);
					else
						DocumentActions.FillComboFirstvalue(VatPeriod, drpVatPeriod, "PERIOD_CODE", "PERIOD_CODE", "- select -", null);
				}
			}
		});
	}	  
	function btnLoad_onclick() {   
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "CalculateVatPeriod"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
				VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value)
			},
			success: function (d) {
				var result = d;
				if (result.IsSuccess) {
					DisplayMassage("تم التحميل بنجاح", "", MessageType.Succeed)
					DisplayData();
					btnEdit_onclick();
					ComputeTotals();
				}
			}
		});
	}		 			 
	function btnClose_onclick() {
		if (!SysSession.CurrentPrivileges.CUSTOM1) return;
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "ChangeStatus"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
				VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value), status: 1
			},
			success: function (d) {
				var result = d;
				if (result.IsSuccess) {
					DisplayMassage("تم الاغلاق بنجاح", "", MessageType.Succeed)	 
					DisplayData();		
				}
			}
		});
	}		  	 
	function btnReopen_onclick() {
		if (!SysSession.CurrentPrivileges.CUSTOM2) return;
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "ChangeStatus"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
				VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value), status: 0
			},
			success: function (d) {
				var result = d;
				if (result.IsSuccess) {
					DisplayMassage("تم إعادة الفتح بنجاح", "", MessageType.Succeed)	 

					DisplayData();			  
				}
			}
		});
	}	  
	function btnDeliveringReport_onclick() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "DeliveringReport_VatPeriod"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
				VAT_YEAR: vatyear, VatPeriod: Number(drpVatPeriod.value)
			},
			success: function (d) {
				var result = d;
				if (result.IsSuccess) {	    
					DisplayMassage("تم تقديم الاقرار الضريبي بنجاح", "", MessageType.Succeed)	 
					DisplayData();		
				}
			}
		});
	}	  	 
	function btnEdit_onclick() {
		$(".btnEdit").removeClass("display_none");	  
		$(".btnback").addClass("display_none");
		$(".Editable").removeAttr('disabled');
	}
	function btnBack_onclick() {
		updStat = false;
		DisplayData();
	}								    
	function btnSave_onclick() {
		if (updStat) {
		loading('btnsave');

		setTimeout(function () {

			finishSave('btnsave');

			let selected = VatPeriod.filter(x => x.PERIOD_CODE == Number(drpVatPeriod.value))[0];
			selected.CORRECTIONS = Number(txtCORRECTIONS.value);
			selected.VAT_PREVBALANCE = Number(txtVAT_PREVBALANCE.value);
			selected.TOTALPERIODVAT = Number($("#txtTOTALPERIODVAT").val());
			selected.NETVAT_AMOUNT = Number($("#txtNETVAT_AMOUNT").val());
			selected.UserCode = SysSession.CurrentEnvironment.UserCode;
			selected.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
			Ajax.Callsync({
				type: "post",
				url: sys.apiUrl("AVATPERIOD", "Update"),
				data: JSON.stringify(selected),
				success: function (d) {
					var result = d;
					if (result.IsSuccess) {
						updStat = false;  
						DisplayData();
					}
				}
			});
			}, 100);	 
		}
		else {
			DisplayMassage("لا يوجد تعديل للحفظ", "", MessageType.Worning)
			Errorinput(txtVAT_PREVBALANCE);
			Errorinput(txtCORRECTIONS);
		}
	}
	function drpVatPeriod_onchange() {
		if (drpVatPeriod.value != "null" && drpVatPeriod.value != "") {
			DisplayData();
		}
		else {
			Clear();
		}
		AdjustButtons();
	}
	function AdjustButtons() {
		$(".btnEdit").addClass("display_none");
		$(".btnback").removeClass("display_none");
		$(".Editable").attr('disabled', 'disabled');
		if (rd_Open.checked) {
			$(".closed").addClass("display_none");
			$(".Open").removeClass("display_none");				   
		}
		else if (rd_close.checked) {
			$(".closed").removeClass("display_none");
			$(".Open").addClass("display_none");			    
		}
		else if (rd_delivered.checked) {
			$(".closed").addClass("display_none");
			$(".Open").addClass("display_none");				 
		}
	}	    
	function Clear() {			   
		VatPeriodDetail = new Array<AQVAT_GetPeriodDetail>();
		SalesGrid.DataSource = VatPeriodDetail;
		SalesGrid.Bind(); 
		PurGrid.DataSource = VatPeriodDetail;
		PurGrid.Bind();
		$('#DivDetail :input').val('0');
		txtVOUCHER_CODE.innerHTML = "0";
		LbSlsAmount.innerHTML = "0";
		LbSlsVat.innerHTML = "0";
		LbSlsChanges.innerHTML = "0";
		LbPurAmount.innerHTML = "0";
		LbPurVat.innerHTML = "0";
		LbPurChanges.innerHTML ="0";
	}   
	function DisplayData() {
		
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AVATPERIOD", "GetVatHeader_Detail"),
			data: {
				UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, COMP_CODE: Number(SysSession.CurrentEnvironment.CompCode),
				VAT_YEAR: vatyear, PERIOD_CODE: Number(drpVatPeriod.value)
			},
			success: function (d) {	    
				var result = d;
				if (result.IsSuccess) {					 
					VatPeriodHeaderDetail = result.Response as VatPeriodMatserDetail;
					txtFromDate.value = DateFormat(VatPeriodHeaderDetail.AVAT_PERIOD.FROM_DATE);
					txtToDate.value = DateFormat(VatPeriodHeaderDetail.AVAT_PERIOD.TO_DATE);
					txtVOUCHER_CODE.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.VOUCHER_CODE);
					txtCORRECTIONS.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.CORRECTIONS);
					txtVAT_PREVBALANCE.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.VAT_PREVBALANCE);
					txtNETVAT_AMOUNT.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.NETVAT_AMOUNT);
					txtTOTALPERIODVAT.value = setVal(VatPeriodHeaderDetail.AVAT_PERIOD.TOTALPERIODVAT);
					VatPeriodHeaderDetail.AVAT_PERIOD.STATUS == 0 ? rd_Open.checked = true : VatPeriodHeaderDetail.AVAT_PERIOD.STATUS == 1 ? rd_close.checked = true : rd_delivered.checked = true;
					let SlsPeriodDet = VatPeriodHeaderDetail.AQVAT_GetPeriodDetailSales.sort(function (a, b) { return a.LineOrder - b.LineOrder; });
					SalesGrid.DataSource = SlsPeriodDet;
					SalesGrid.Bind();
					LbSlsAmount.innerHTML = VatPeriodHeaderDetail.vatsales.RoundToSt(2);
					LbSlsVat.innerHTML = VatPeriodHeaderDetail.AVAT_PERIOD.SALES_VAT.RoundToSt(2);
					LbSlsChanges.innerHTML = VatPeriodHeaderDetail.Updsales.RoundToSt(2);
					//****************************************			   
					let PurPeriodDet = VatPeriodHeaderDetail.AQVAT_GetPeriodDetailPur.sort(function (a, b) { return a.LineOrder - b.LineOrder; });
					PurGrid.DataSource = PurPeriodDet;
					PurGrid.Bind();
					LbPurAmount.innerHTML = VatPeriodHeaderDetail.vatPur.RoundToSt(2);
					LbPurVat.innerHTML = VatPeriodHeaderDetail.AVAT_PERIOD.PUR_VAT.RoundToSt(2);
					LbPurChanges.innerHTML = VatPeriodHeaderDetail.UpdPur.RoundToSt(2);
					AdjustButtons();
				}
			}
		});
	}
	function ComputeTotals() {		
		updStat = true;
		txtNETVAT_AMOUNT.value = (Number(txtTOTALPERIODVAT.value) -( Number(txtVAT_PREVBALANCE.value)+ Number(txtCORRECTIONS.value)) ).RoundToSt(2);
	}
	//*************************Print**************************//  
	export function PrintReport(OutType: number) {
		if (drpVatPeriod.value == "null") {
			DisplayMassage("يجب اختيار الفترة", "", MessageType.Error)
			Errorinput(drpVatPeriod);
			return;	  
		}
		if (!SysSession.CurrentPrivileges.PrintOut) return;
		let rp: ReportParameters = new ReportParameters();	 	 
		rp.RepType = OutType;//output report as View
		rp.CompCode = SysSession.CurrentEnvironment.CompCode;
		rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
		rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
		rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
		rp.UserCode = SysSession.CurrentEnvironment.UserCode;
		rp.Tokenid = SysSession.CurrentEnvironment.Token;
		rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
		rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
		rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
		var BranchNameA = SysSession.CurrentEnvironment.BranchName;
		var BranchNameE = SysSession.CurrentEnvironment.BranchName;
		if (BranchNameA == null || BranchNameE == null) {

			BranchNameA = " ";
			BranchNameE = " ";
		}
		rp.BraNameA = BranchNameA;
		rp.BraNameE = BranchNameE;		 
		rp.vatyear = Number(vatyear);
		rp.prdcode = Number(drpVatPeriod.value);				  
		Ajax.CallAsync({
			url: Url.Action("IProc_Prnt_VATReport", "GeneralReports"),
			data: rp,
			success: (d) => {
				let result = d.result as string;
				window.open(result, "_blank");
				//PrintTransactionLog(SysSession.CurrentEnvironment.UserCode, SysSession.CurrentEnvironment.CompCode, SysSession.CurrentEnvironment.BranchCode, Modules.AccTrReceiptNoteNew, SysSession.CurrentEnvironment.CurrentYear, rp.TRId.toString());
			}
		})	    
	}		   
}