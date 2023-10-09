$(document).ready(() => {

	GLAging.InitalizeComponent();
})
namespace GLAging {
	var compcode: Number;
	var AccountType: Number = 1;
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession(Modules.GLAging);

	var AccountDetails: A_ACCOUNT = new A_ACCOUNT();
	var CostCenterDetails: G_COST_CENTER = new G_COST_CENTER();


	var txtToDate: HTMLInputElement;

	var btnReset;

	var chk_Certified: HTMLInputElement
	var chk_New: HTMLInputElement
	var chk_IncludeInvTR: HTMLInputElement

	var CheckD: HTMLInputElement
	var CheckC: HTMLInputElement
	var CheckZ: HTMLInputElement
	var ChecknZ: HTMLInputElement
	var CheckA: HTMLInputElement
	var oneyear: HTMLInputElement
	var threeyear: HTMLInputElement
 

	var btnFromAccSearch: HTMLButtonElement;
	var btnCCostSearch: HTMLButtonElement;
	var txtFromAcc_ID: HTMLInputElement;
	var txtCenter_Cost_ID: HTMLInputElement;
	var txtFromAcc_DESC: HTMLInputElement;
	var txtCenter_Cost_DESC: HTMLInputElement;

	// Print Buttons
	var btnPrint: HTMLButtonElement;
	var btnPrintTrview: HTMLButtonElement;
	var btnPrintTrPDF: HTMLButtonElement;
	var btnPrintTrEXEL: HTMLButtonElement;
	var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
	var FinYear = (SysSession.CurrentEnvironment.CurrentYear);

	export function InitalizeComponent() {
		OpenScreen(SysSession.CurrentEnvironment.UserCode, SysSession.CurrentEnvironment.CompCode, SysSession.CurrentEnvironment.BranchCode, Modules.Accountbalances, SysSession.CurrentEnvironment.CurrentYear);

		$('#footer_1').html('');
		$('#dir_11').addClass('hidden_Control');

		if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "  اعمار مديونية الحسابات";
		}
		else {
			document.getElementById('Screen_name').innerHTML == "general ledger";
		}

        $('#btnPrint').addClass('display_none');

        $("#iconMainPages").addClass("d-none");
        $("#iconReportPages").removeClass("d-none");
        $("#btnPrintTrview").addClass("print-report");
        $("#btnPrintTrview span").text("عرض تقرير");


		InitalizeControls(); 
		InitalizeEvents();
		txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;

		compcode = Number(SysSession.CurrentEnvironment.CompCode);

        chk_Certified.checked = true;
        chk_New.checked = true;
        chk_IncludeInvTR.checked = true;


        ChecknZ.checked = true;
		oneyear.checked = true;




		txtFromAcc_ID.disabled = false;
		txtCenter_Cost_ID.disabled = false;

	}
	function InitalizeControls() {

		btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;

		txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
		btnFromAccSearch = document.getElementById("btnFromAccSearch") as HTMLButtonElement;
		btnCCostSearch = document.getElementById("btnCCostSearch") as HTMLButtonElement;

		CheckD = document.getElementById("CheckD") as HTMLInputElement;
		CheckC = document.getElementById("CheckC") as HTMLInputElement;
		CheckZ = document.getElementById("CheckZ") as HTMLInputElement;
        ChecknZ = document.getElementById("ChecknZ") as HTMLInputElement;
		CheckA = document.getElementById("CheckA") as HTMLInputElement;
		oneyear = document.getElementById("oneyear") as HTMLInputElement;
		threeyear = document.getElementById("threeyear") as HTMLInputElement;
		btnReset = document.getElementById("btnReset") as HTMLButtonElement;

		txtFromAcc_ID = document.getElementById("txtFromAcc_ID") as HTMLInputElement;
		txtCenter_Cost_ID = document.getElementById("txtCenter_Cost_ID") as HTMLInputElement;
		txtFromAcc_DESC = document.getElementById("txtFromAcc_DESC") as HTMLInputElement;
		txtCenter_Cost_DESC = document.getElementById("txtCenter_Cost_DESC") as HTMLInputElement;

		chk_Certified = document.getElementById("chk_Certified") as HTMLInputElement;
		chk_New = document.getElementById("chk_New") as HTMLInputElement;
		chk_IncludeInvTR = document.getElementById("chk_IncludeInvTR") as HTMLInputElement;








		//---------------------------------------------------------------------- Print Buttons

		btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
		btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
		btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
		btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;

	}
	function InitalizeEvents() {
		btnFromAccSearch.onclick = btnFromAccSearch_onclick;
		btnCCostSearch.onclick = btnCCostSearch_onclick;

		btnReset.onclick = btnReset_onclick;
		txtFromAcc_ID.onchange = txtFromAcc_ID_onchange;
		txtCenter_Cost_ID.onchange = txtCenter_Cost_ID_onchange;



		// Print Buttons
		btnPrintTrview.onclick = () => { PrintReport(1); }
		btnPrintTrPDF.onclick = () => { PrintReport(2); }
		btnPrintTrEXEL.onclick = () => { PrintReport(3); }
		btnPrint.onclick = () => { PrintReport(4); }

	}
	//-----------------------------------------------------------------------   (  Button search from Account  )
	function btnFromAccSearch_onclick() {


        sys.FindKey(Modules.GLAging, "btnFromAccSearch", "COMP_CODE= " + compcode + " and DETAIL = 0  ", () => {
			let id = SearchGrid.SearchDataGrid.SelectedKey
			$('#txtFromAcc_ID').val(id);
			GetAccByCode(id);
			$('#txtFromAcc_DESC').val((lang == "ar" ? AccountDetails.ACC_DESCA : AccountDetails.ACC_DESCL));




		});

	}
	function GetAccByCode(AccCode: string) {

		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("GLDefAccount", "GetByAccCode"),
			data: { CompCode: compcode, AccCode: AccCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					AccountDetails = result.Response as A_ACCOUNT;
					if (AccountDetails == null) {
						txtFromAcc_ID.value = "";
						txtFromAcc_DESC.value = "";
						Errorinput(txtFromAcc_ID);
						DisplayMassage("كود الحساب غير صحيح", "Wrong Account Code!", MessageType.Error)
					}
					else {
						txtFromAcc_ID.value = AccountDetails.ACC_CODE;
						txtFromAcc_DESC.value = AccountDetails.ACC_DESCA;
					}
				}
			}
		});
	}
	function txtFromAcc_ID_onchange() {
		txtFromAcc_DESC.value = "";
		GetAccByCode(txtFromAcc_ID.value);
	}
	//-----------------------------------------------------------------------   (  Button search Cost Center )
	function btnCCostSearch_onclick() {



		let sys: SystemTools = new SystemTools();
		sys.FindKey(Modules.Accountbalances, "btnCCostSearch", "COMP_CODE=" + compcode + "", () => {
			let id = SearchGrid.SearchDataGrid.SelectedKey
			$('#txtCenter_Cost_ID').val(id);
			GetCostCenterByCode(id);
			$('#txtCenter_Cost_DESC').val((lang == "ar" ? CostCenterDetails.CC_DESCA : CostCenterDetails.CC_DESCE));
		});

	}
	function GetCostCenterByCode(CC_Code: string) {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("CostCenter", "GetByCostCntreCode"),
			data: { CompCode: compcode, CostCntreCode: CC_Code, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					CostCenterDetails = result.Response as G_COST_CENTER;
					if (CostCenterDetails == null) {
						txtCenter_Cost_ID.value = "";
						txtCenter_Cost_DESC.value = "";
						Errorinput(txtCenter_Cost_ID);
						DisplayMassage("كود التكلفه غير صحيح", "Wrong cost code!", MessageType.Error);
					} else {
						txtCenter_Cost_ID.value = CostCenterDetails.CC_CODE;
						txtCenter_Cost_DESC.value = CostCenterDetails.CC_DESCA;
					}
				}
			}
		});
	}
	function txtCenter_Cost_ID_onchange() {
		txtCenter_Cost_DESC.value = "";
		GetCostCenterByCode(txtCenter_Cost_ID.value);
	}
	//-----------------------------------------------------------------------   (  Get Date  )
	function GetDate() {
		var today: Date = new Date();
		var dd: string = today.getDate().toString();
		var ReturnedDate: string;
		var mm: string = (today.getMonth() + 1).toString();
		var yyyy = today.getFullYear();
		if (Number(dd) < 10) {
			dd = ('0' + dd);
		}
		if (Number(mm) < 10) {
			mm = ('0' + mm);
		}
		ReturnedDate = yyyy + '-' + mm + '-' + dd;
		return ReturnedDate;
	}

	function btnReset_onclick() {

		txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;

		discharge();
		chk_Certified.checked = false;
		chk_New.checked = false;
		CheckD.checked = true;
		oneyear.checked = true;

	}

	function discharge() {
		$('#txtFromAcc_ID').val("");
		$('#txtFromAcc_DESC').val("");
		$('#txtCenter_Cost_ID').val("");
		$('#txtCenter_Cost_DESC').val("");
		$('#txtToAcc_ID').val("");
		$('#txtToAcc_DESC').val("");
	}



	//----------------------------------------------------( Report )
	function PrintReport(OutType: number) {


		let rp: ReportParameters = new ReportParameters();

		rp.RepType = OutType;//output report as View	  
		rp.ToDate = DateFormatRep(txtToDate.value);
		rp.CompCode = SysSession.CurrentEnvironment.CompCode;
		rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
		rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
		rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
		rp.UserCode = SysSession.CurrentEnvironment.UserCode;
		rp.Tokenid = SysSession.CurrentEnvironment.Token;
		var BranchNameA = SysSession.CurrentEnvironment.BranchName;
		var BranchNameE = SysSession.CurrentEnvironment.BranchNameEn;
		rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
		rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
		rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
		if (BranchNameA == null || BranchNameE == null) {

			BranchNameA = " ";
			BranchNameE = " ";
		}
		rp.BraNameA = BranchNameA;
		rp.BraNameE = BranchNameE;
		rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
		rp.RepType = OutType;//output report as View	   
        rp.ToDate = DateFormatRep(txtToDate.value);
        rp.orderby = Number($('#orderby').val() )
		if ($('#txtCenter_Cost_ID').val() == "") {
			rp.cc_code = "-1";
		}
		else {
			rp.cc_code = $('#txtCenter_Cost_ID').val();
		}
		if ($('#txtFromAcc_ID').val() == "") {
			rp.AccCode = "-1";
		}
		else {
			rp.AccCode = $('#txtFromAcc_ID').val();
		}
		if (chk_Certified.checked == true)  //------------------------------------( Inclusion of certified restrictions )
		{
			rp.IsAuthVchr = 1;
		}
		else {
			rp.IsAuthVchr = 0;
		}
		if (chk_New.checked == true)       //-------------------------------------( Inclusion of new restrictions )
		{
			rp.IsNewVchr = 1;
		}
		else {
			rp.IsNewVchr = 0;
		}

		if (CheckD.checked == true) {
			rp.BalType = 1;
		} else if (CheckC.checked == true) {
			rp.BalType = 2;
		}
		else if (CheckZ.checked == true) {
			rp.BalType = 3;
		} 	
        else if (ChecknZ.checked == true) {
			rp.BalType = 4;
		} else {
			rp.BalType = 0;
		}
		rp.IncludeInvTR = chk_IncludeInvTR.checked == true ? 1 : 0;


		if (oneyear.checked == true) {
			rp.Agtype = 1;
		} else if (threeyear.checked == true) {
			rp.Agtype = 3;
		}
		else {
			rp.Agtype = 5;
		}			   
		if ($('#txtFromAcc_ID').val() == "") {
            MessageBox.Show("يجب اختيار حساب الاستاذ", "تنبيه")
            Errorinput($('#txtFromAcc_ID'))
			return;
		}


		Ajax.Callsync({
			url: Url.Action("AProc_Rpt_GLAging", "GeneralReports"),
			data: rp,
			success: (d) => {
				let result = d.result as string;
				window.open(result, "_blank");
			}
		})
	}
}