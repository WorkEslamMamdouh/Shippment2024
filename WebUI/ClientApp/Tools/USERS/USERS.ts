$(document).ready(() => {
	USERS.InitalizeComponent();
})
namespace USERS {
	var sys: SystemTools = new SystemTools();
	var UserGrid: JsGrid = new JsGrid();
	var SysSession: SystemSession = GetSystemSession(Modules.USERS);
	var userObject: G_USERS = new G_USERS();
	var UserMasterDetail: ModelUserMasterDetail = new ModelUserMasterDetail();
	var ModelUser: G_USERS = new G_USERS();
	var singleUserRoles: G_RoleUsers = new G_RoleUsers();
	var SingleUserBranch: G_USER_BRANCH = new G_USER_BRANCH();
	/*----------------------------------------------------------------- Arrays --------------------------------------------------------------------- */
	var UserDetail: Array<G_USERS> = new Array<G_USERS>();
	var RoleDetails: Array<G_Role> = new Array<G_Role>();
	var BranchDetails: Array<G_BRANCH> = new Array<G_BRANCH>();
	var UserBranchDetails: Array<GQ_GetUserBarnchAccess> = new Array<GQ_GetUserBarnchAccess>();
	var SalesmanDetails: Array<I_Sls_D_Salesman> = new Array<I_Sls_D_Salesman>();
	var UserTypeDetails: Array<G_Codes> = new Array<G_Codes>();
	var CashboxDetails: Array<A_RecPay_D_CashBox> = new Array<A_RecPay_D_CashBox>();
	var UserRoles: Array<GQ_GetUserRole> = new Array<GQ_GetUserRole>();
	var ModelUserRoles: Array<G_RoleUsers> = new Array<G_RoleUsers>();
	var ModelUserBranch: Array<G_USER_BRANCH> = new Array<G_USER_BRANCH>();
	/*----------------------------------------------------------------- Variable --------------------------------------------------------------------- */
	var ScreenLanguage: string;
	var CompCode: number;
	var BraCode: number;
	var FinYear: number;
	var CountGridRole: number = 0;
	var CountGridBranch: number = 0;
	var IsNew: boolean = false;
	var showpss: boolean = false;
	var GlobalUserCode: string = "";
	/*----------------------------------------------------------------- Input Control------------------------------------------------------------------ */
	/*----------------General---------------*/
	var Screen_name: HTMLInputElement;
	var drpStateType: HTMLSelectElement;
	var drpSalesman: HTMLSelectElement;
	/*----------------Details---------------*/
	var SearchGridUsers: HTMLInputElement;
	var txtUser_Code: HTMLInputElement;
	var txtPassword: HTMLInputElement;
	var chkActive: HTMLInputElement;
	var txtUser_Name: HTMLInputElement;
	var txtDepartmentName: HTMLInputElement;
	var txtJobTitle: HTMLInputElement;
	var txtMobile: HTMLInputElement;
	var txtEmail: HTMLInputElement;
	var txtFirstLogin: HTMLInputElement;
	var txtLastLogin: HTMLInputElement;
	var txtCreatedBy: HTMLInputElement;
	var txtCreatedAt: HTMLInputElement;
	var txtUpdatedBy: HTMLInputElement;
	var txtUpdatedAt: HTMLInputElement;
	var drpuserType: HTMLSelectElement;
	var drpuserTypeDt: HTMLSelectElement;
	var drpCashBox: HTMLSelectElement;
	var drpSalesman: HTMLSelectElement;
	/*----------------------------------------------------------------- Button Control------------------------------------------------------------------ */
	/*----------------General---------------*/
	var showpass: HTMLButtonElement;
	var btnShow: HTMLButtonElement;
	var btnUpdate: HTMLButtonElement;
	var btnBack: HTMLButtonElement;
	var btnAdd: HTMLButtonElement;
	var btnSave: HTMLButtonElement;
	var btnPrintTrview: HTMLButtonElement;
	var btnPrintTrPDF: HTMLButtonElement;
	var btnPrintTrEXEL: HTMLButtonElement;
	var btnPrintTransaction: HTMLButtonElement;
	/*----------------Details---------------*/
	var btnGive_assignments: HTMLButtonElement;
	var btnLoadRoles: HTMLButtonElement;
	var btnBlock_permissions: HTMLButtonElement;
	var btnGive_assignmentsBr: HTMLButtonElement;
	var btnLoadBranchs: HTMLButtonElement;
	var btnBlock_permissionsBr: HTMLButtonElement;
	var btnAddRole: HTMLButtonElement;
	var btnAddBranch: HTMLButtonElement;
	var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
	/*----------------------------------------------------------------- General Func ------------------------------------------------------------------ */
	export function InitalizeComponent() {
		 
		$('#btnPrintTransaction').addClass('hidden_Control');
		$('#btnPrintTrview').addClass('hidden_Control');
		$('#btnPrintTrPDF').addClass('hidden_Control');
		$('#btnPrintTrEXEL').addClass('hidden_Control');
		ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
		CompCode = Number(SysSession.CurrentEnvironment.CompCode);
		BraCode = Number(SysSession.CurrentEnvironment.BranchCode);
		FinYear = Number(SysSession.CurrentEnvironment.CurrentYear);
		InitalizeControls();
		InitalizeEvents();
		Screen_name.innerHTML = ScreenLanguage == "ar" ? "المستخدمين" : "Users";
		document.title = "SafePack V1.0-" + (ScreenLanguage == "ar" ? "المستخدمين" : "Users");
		InitializeGrid();
		GetRoles();
		GetBranchs();
		GetuserType();
		GetSalesman();
		GetCashBox();
		GetAllUsers();	   
		$(document).keydown(function (e) {
			debugger
			if (showpss == true) {
				$('#txtPassword').attr('type', 'text');
				$('#showpass').removeClass('fa-eye-slash');
				$('#showpass').addClass('fa-eye');	 
			} else {
				$('#txtPassword').attr('type', 'password');
				$('#showpass').addClass('fa-eye-slash');
				$('#showpass').removeClass('fa-eye');    
			}
		});
		$(document).click(function (e) {
			debugger
			if (showpss == true) {
				$('#txtPassword').attr('type', 'text');
				$('#showpass').removeClass('fa-eye-slash');
				$('#showpass').addClass('fa-eye');  
			} else {
				$('#txtPassword').attr('type', 'password');
				$('#showpass').addClass('fa-eye-slash');
				$('#showpass').removeClass('fa-eye');				 
			}
		});
	}
	function InitalizeControls() {
		 
		/*----------------General---------------*/
		Screen_name = document.getElementById("Screen_name") as HTMLInputElement;
		drpStateType = document.getElementById("drpStateType") as HTMLSelectElement;
		drpSalesman = document.getElementById("drpSalesman") as HTMLSelectElement;
		drpuserType = document.getElementById("drpuserType") as HTMLSelectElement;
		drpuserTypeDt = document.getElementById("drpuserTypeDt") as HTMLSelectElement;
		drpSalesman = document.getElementById("drpSalesman") as HTMLSelectElement;
		drpCashBox = document.getElementById("drpCashBox") as HTMLSelectElement;
		/*----------------Details---------------*/
		SearchGridUsers = document.getElementById("SearchGridUsers") as HTMLInputElement;
		txtUser_Code = document.getElementById("txtUser_Code") as HTMLInputElement;
		txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
		chkActive = document.getElementById("chkActive") as HTMLInputElement;
		txtUser_Name = document.getElementById("txtUser_Name") as HTMLInputElement;
		txtDepartmentName = document.getElementById("txtDepartmentName") as HTMLInputElement;
		txtJobTitle = document.getElementById("txtJobTitle") as HTMLInputElement;
		txtMobile = document.getElementById("txtMobile") as HTMLInputElement;
		txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
		txtFirstLogin = document.getElementById("txtFirstLogin") as HTMLInputElement;
		txtLastLogin = document.getElementById("txtLastLogin") as HTMLInputElement;
		txtCreatedBy = document.getElementById("txtCreatedBy") as HTMLInputElement;
		txtCreatedAt = document.getElementById("txtCreatedAt") as HTMLInputElement;
		txtUpdatedBy = document.getElementById("txtUpdatedBy") as HTMLInputElement;
		txtUpdatedAt = document.getElementById("txtUpdatedAt") as HTMLInputElement;
		/*----------------------------------------------------------------- Button Control------------------------------------------------------------------ */
		/*----------------General---------------*/
		showpass = document.getElementById("showpass") as HTMLButtonElement;
		btnShow = document.getElementById("btnShow") as HTMLButtonElement;
		btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
		btnBack = document.getElementById("btnBack") as HTMLButtonElement;
		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		btnSave = document.getElementById("btnSave") as HTMLButtonElement;
		/*----------------Print---------------*/
		btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
		btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
		btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
		btnPrintTransaction = document.getElementById("btnPrintTransaction") as HTMLButtonElement;
		/*----------------Details---------------*/
		btnAddRole = document.getElementById("btnAddRole") as HTMLButtonElement;
		btnAddBranch = document.getElementById("btnAddBranch") as HTMLButtonElement;
		btnGive_assignments = document.getElementById("btnGive_assignments") as HTMLButtonElement;
		btnLoadRoles = document.getElementById("btnLoadRoles") as HTMLButtonElement;
		btnBlock_permissions = document.getElementById("btnBlock_permissions") as HTMLButtonElement;

		btnGive_assignmentsBr = document.getElementById("btnGive_assignmentsBr") as HTMLButtonElement;
		btnLoadBranchs = document.getElementById("btnLoadBranchs") as HTMLButtonElement;
		btnBlock_permissionsBr = document.getElementById("btnBlock_permissionsBr") as HTMLButtonElement;
	}
	function InitalizeEvents() {
		showpass.onclick = showpassword;
		btnShow.onclick = GetAllUsers;
		btnAdd.onclick = btnAdd_onClick;
		btnSave.onclick = btnSave_onClick;
		btnBack.onclick = btnBack_onclick;
		btnUpdate.onclick = btnEdit_onclick;
		btnAddRole.onclick = () => { btnAdd_onclick(true); };
		btnAddBranch.onclick = () => { btnAdd_onclick(false); };
		btnGive_assignments.onclick = () => { Permission(1, true); }
		btnBlock_permissions.onclick = () => { Permission(1, false); }
		btnGive_assignmentsBr.onclick = () => { Permission(2, true); }
		btnBlock_permissionsBr.onclick = () => { Permission(2, false); }
		btnLoadRoles.onclick = LoadAllRoles;
		btnLoadBranchs.onclick = LoadAllBranchs;
		txtUser_Code.onchange = USER_CODEFoundBefore;
		drpuserTypeDt.onchange = drpuserTypeDt_onchange;
		SearchGridUsers.onkeyup = _SearchBox_Change;
	}
	function InitializeGrid() {
		let res: any = GetResourceList("");
		UserGrid.ElementName = "divGridDetails";
		UserGrid.PrimaryKey = "USER_CODE";
		UserGrid.Paging = true;
		UserGrid.PageSize = 10;
		UserGrid.Sorting = true;
		UserGrid.InsertionMode = JsGridInsertionMode.Binding;
		UserGrid.Editing = false;
		UserGrid.Inserting = false;
		UserGrid.SelectedIndex = 1;
		UserGrid.OnRowDoubleClicked = () => { BindUserInfoData(UserGrid.SelectedKey) };
		UserGrid.Columns = [
			{ title: res.User_Code, name: "USER_CODE", type: "text", width: "5%" },
			{ title: res.SHT_Name, name: "USER_NAME", type: "text", width: "10%" },
			{ title: res.department, name: "DepartmentName", type: "text", width: "20%" },
			{ title: res.Job, name: "JobTitle", type: "text", width: "20%" },
			{
				title: res.App_Active, css: "ColumPadding", name: "USER_ACTIVE", width: "7%",
				itemTemplate: (s: string, item: G_USERS): HTMLLabelElement => {
					let txt: HTMLLabelElement = document.createElement("label");
					if (item.USER_ACTIVE == true) {
						txt.innerHTML = "فعال";
					} else {
						txt.innerHTML = "غير فعال";

					}
					return txt;
				}
			},
		];
		UserGrid.Bind();
	}   
	/*----------------------------------------------------------------- Get Func ------------------------------------------------------------------ */
	function GetAllUsers() {
		$('#DivInvoiceDetails').addClass('display_none');
		let UserType = drpuserType.value == "Null" ? null : Number(drpuserType.value);
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("G_USERS", "GetUSER"),
			data: { CompCode: CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, Status: Number(drpStateType.value), UserType: UserType },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					UserDetail = result.Response as Array<G_USERS>;
					UserGrid.DataSource = UserDetail;
					UserGrid.Bind();
				}
			}
		});
	}
	function GetRoles() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("G_Role", "GetAllRoles"),
			data: { Token: "HGFD-" + SysSession.CurrentEnvironment.Token, UserCode: SysSession.CurrentEnvironment.UserCode },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					RoleDetails = result.Response as Array<G_Role>;
				}
			}
		});
	}
	function GetBranchs() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("GBranch", "GetAll"),
			data: { CompCode: CompCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, UserCode: SysSession.CurrentEnvironment.UserCode },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					BranchDetails = result.Response as Array<G_BRANCH>;
				}
			}
		});
	}
	function GetSalesman() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AccDefSalesMen", "GetAllSalesPeople"),
			data: {
				CompCode: CompCode, BranchCode: BraCode, IsSalesEnable: true, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
			},
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					SalesmanDetails = result.Response as Array<I_Sls_D_Salesman>;
					SalesmanDetails = SalesmanDetails.filter(s => s.Isactive == true);
					if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
						DocumentActions.FillCombowithdefult(SalesmanDetails, drpSalesman, "SalesmanId", "NameE", "Select saleman");
					}
					else {
						DocumentActions.FillCombowithdefult(SalesmanDetails, drpSalesman, "SalesmanId", "NameA", "اختر المندوب");
					}
				}
			}
		});
	}
	function GetuserType() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("GCodes", "GetbycodeTp"),
			data: { CodeType: "UserType", UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					UserTypeDetails = result.Response as Array<G_Codes>;
					DocumentActions.FillComboFirstvalue(UserTypeDetails, drpuserType, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
					DocumentActions.FillComboFirstvalue(UserTypeDetails, drpuserTypeDt, "CodeValue", "" + (lang == "ar" ? "DescA" : "DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);
				}
			}
		});
	}
	function GetCashBox() {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("AccDefBox", "GetAll"),
			data: { compCode: CompCode, BranchCode: BraCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token, ModuleCode: Modules.USERS, FinYear: SysSession.CurrentEnvironment.CurrentYear },
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					CashboxDetails = result.Response as Array<A_RecPay_D_CashBox>;
					DocumentActions.FillComboFirstvalue(CashboxDetails, drpCashBox, "CashBoxID", "" + (lang == "ar" ? "CashBox_DescA" : "CashBox_DescE") + "", "" + (lang == "ar" ? " - اختر -" : " - Choose -") + "", null);

				}
			}
		});
	}
	function GetUSER_Barnch(USER_CODE: string) {
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("G_USERS", "GetBarnchs_byuser"),
			data: {
				USER_CODE: USER_CODE
			},
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					UserBranchDetails = result.Response as Array<GQ_GetUserBarnchAccess>;
				}
			}
		});
	}
	function GetUserRoles(USER_CODE: string) {
		UserRoles = new Array<GQ_GetUserRole>();
		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("G_RoleUsers", "GetUserRoles"),
			data: {
				UserCode: USER_CODE
			},
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					UserRoles = result.Response as Array<GQ_GetUserRole>;
				}
			}
		});
	}
	function BindUserInfoData(UserCode: string) {
		GlobalUserCode = UserCode;
		$('#DivInvoiceDetails').removeClass('display_none');
		userObject = UserDetail.filter(x => x.USER_CODE == UserCode)[0];
		txtUser_Code.value = setVal(userObject.USER_CODE);
		txtPassword.value = setVal(userObject.USER_PASSWORD);
		chkActive.checked = setVal(userObject.USER_ACTIVE);
		txtUser_Name.value = setVal(userObject.USER_NAME);
		txtDepartmentName.value = setVal(userObject.DepartmentName);
		txtJobTitle.value = setVal(userObject.JobTitle);
		txtMobile.value = setVal(userObject.Mobile);
		txtEmail.value = setVal(userObject.Email);
		txtFirstLogin.value = setVal(userObject.FirstLogin);
		txtLastLogin.value = setVal(userObject.LastLogin);
		txtCreatedAt.value = DateTimeFormat(userObject.CreatedAt);
		txtCreatedBy.value = setVal(userObject.CreatedBy);
		txtUpdatedAt.value = DateTimeFormat(userObject.UpdatedAt);
		txtUpdatedBy.value = setVal(userObject.UpdatedBy);
		GetUSER_Barnch(UserCode);
		GetUserRoles(UserCode);
		CountGridRole = 0;
		$('#divGridRoles').html("");
		CountGridBranch = 0;
		$('#divGridBranch').html("");

		for (var i = 0; i < UserRoles.length; i++) {
			BuildControlRoles(i);
			$(`#USER_CODE${i}`).val(setVal(UserRoles[i].USER_CODE));
			$(`#RoleId${i}`).val(setVal(UserRoles[i].RoleId));
			$(`#txtRoleDesc${i}`).val(setVal(UserRoles[i].RoleId));
			$(`#txtRemarks${i}`).val(setVal(UserRoles[i].Remarks));
			$(`#txtActive${i}`).prop('checked', UserRoles[i].ISActive);
			$(`#txtStatusFlag${i}`).val("");
			CountGridRole++;
		}
		for (var i = 0; i < UserBranchDetails.length; i++) {
			BuildControlBranchs(i);
			$(`#USER_CODEBr${i}`).val(setVal(UserBranchDetails[i].USER_CODE));
			$(`#BRA_CODE${i}`).val(setVal(UserBranchDetails[i].BRA_CODE));
			$(`#txtBranch${i}`).val(setVal(UserBranchDetails[i].BRA_CODE));
			$(`#txtEXECUTE${i}`).prop('checked', UserBranchDetails[i].EXECUTE);
			$(`#txtCREATE${i}`).prop('checked', UserBranchDetails[i].CREATE);
			$(`#txtEDIT${i}`).prop('checked', UserBranchDetails[i].EDIT);
			$(`#txtDELETE${i}`).prop('checked', UserBranchDetails[i].DELETE);
			$(`#txtPRINT${i}`).prop('checked', UserBranchDetails[i].PRINT);
			$(`#txtStatusFlagBr${i}`).val("");
			CountGridBranch++;
		}
	}
	/*----------------------------------------------------------------- Action Func ------------------------------------------------------------------ */
	function Permission(Type: number, check: boolean) {

		if (Type == 1) {
			if (check == true) {
				$('.chk').prop('checked', true);

			} else {
				$('.chk').prop('checked', false);
			}
		} else {
			if (check == true) {
				$('.chkBr').prop('checked', true);
			} else {
				$('.chkBr').prop('checked', false);
			}
		}
		let counts = Type == 1 ? CountGridRole : CountGridBranch;
		let stat = Type == 1 ? "txtStatusFlag" : "txtStatusFlagBr";
		for (var i = 0; i < counts; i++) {
			if ($("#" + stat + "" + i).val() != "i") {
				$("#" + stat + "" + i).val("u");
			}
		}

	}
	function drpuserTypeDt_onchange() {
		 
		if (drpuserTypeDt.value == "1") {
			$('.Sls').removeClass("display_none");
			$('.Box').addClass("display_none");
			$('.Sls').removeAttr("disabled");
			$('.Box').attr("disabled", "disabled");
		}
		else if (drpuserTypeDt.value == "2") {
			$('.Sls').addClass("display_none");
			$('.Box').removeClass("display_none");
			$('.Box').removeAttr("disabled");
			$('.Sls').attr("disabled", "disabled");
		}
		else if (drpuserTypeDt.value == "3") {
			$('.Sls').removeClass("display_none");
			$('.Box').removeClass("display_none");
			$('.Sls').removeAttr("disabled");
			$('.Box').removeAttr("disabled");
		} else {
			$('.Sls').addClass("display_none");
			$('.Box').addClass("display_none");
			$('.Box').attr("disabled", "disabled");
			$('.Sls').attr("disabled", "disabled");
		}
	}
	function _SearchBox_Change() {
		 
		$("#divGridDetails").jsGrid("option", "pageIndex", 1);

		if (SearchGridUsers.value != "") {
			let search: string = SearchGridUsers.value.toLowerCase();
			let SearchDetails = UserDetail.filter(x => x.USER_CODE.toLowerCase().search(search) >= 0 || x.USER_NAME.toLowerCase().search(search) >= 0);

			UserGrid.DataSource = SearchDetails;
			UserGrid.Bind();
		} else {
			UserGrid.DataSource = UserDetail;
			UserGrid.Bind();
		}
	}
	function BuildControlBranchs(cnt: number) {
		var html;
		html = `<tr id= "RowBr${cnt}">
                    <td class="btn_minus display_none">
		                <div class="form-group">
			                <span id="btn_minusBr${cnt}"><i class="fas fa-minus-circle btn_minus display_none"></i></span>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="BRA_CODE${cnt}" type="text" class="form-control" name="" disabled />
		                </div>
	                </td>>
	                </td>
                    <td>
		                <div class="form-group">
                             <select id="txtBranch${cnt}" type="text" class="form-control Edit" name="" disabled >
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtEXECUTE${cnt}" type="checkbox" class="form-check-input Edit chkBr" name="" disabled />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtCREATE${cnt}" type="checkbox" class="form-check-input Edit chkBr" name="" disabled />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtEDIT${cnt}" type="checkbox" class="form-check-input Edit chkBr" name="" disabled />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtDELETE${cnt}" type="checkbox" class="form-check-input Edit chkBr" name="" disabled />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtPRINT${cnt}" type="checkbox" class="form-check-input Edit chkBr" name="" disabled />
		                </div>
	                </td>
                   
                    
               <input id="txtStatusFlagBr${cnt}" type="hidden"   />
               <input id="USER_CODEBr${cnt}" type="hidden"   />
                </tr>`;

		$('#divGridBranch').append(html);

		$(`#txtBranch${cnt}`).append(`<option value="Null">اختر الفرع</option>`)
		for (var i = 0; i < BranchDetails.length; i++) {
			$(`#txtBranch${cnt}`).append(`<option value="${BranchDetails[i].BRA_CODE}">${BranchDetails[i].BRA_DESC}</option>`)
		}

		$(`#txtBranch${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");
			ValidateDublicateBranch(cnt);
			$(`#txtPRINT${cnt}`).prop('checked', true);
			$(`#txtDELETE${cnt}`).prop('checked', true);
			$(`#txtEDIT${cnt}`).prop('checked', true);
			$(`#txtCREATE${cnt}`).prop('checked', true);
			$(`#txtEXECUTE${cnt}`).prop('checked', true);
			$(`#BRA_CODE${cnt}`).val($(`#txtBranch${cnt}`).val());

		});
		$(`#txtPRINT${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");

		});
		$(`#txtDELETE${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");

		});
		$(`#txtEDIT${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");

		});
		$(`#txtCREATE${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");

		});
		$(`#txtEXECUTE${cnt}`).on('change', function () {
			if ($("#txtStatusFlagBr" + cnt).val() != "i")
				$("#txtStatusFlagBr" + cnt).val("u");

		});
		$(`#btn_minusBr${cnt}`).on('click', function () {
			DeleteRow(cnt, false);
		});
	}
	function BuildControlRoles(cnt: number) {
		var html;
		html = `<tr id= "Row${cnt}">
                    <td class="btn_minus display_none">
		                <div class="form-group">
			                <span id="btn_minus${cnt}"><i class="fas fa-minus-circle btn_minus display_none"></i></span>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                          <select  id="txtRoleDesc${cnt}" type="text" class="form-control Edit" name="" disabled >
		                </div>
	                </td>>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtRemarks${cnt}" type="text" class="form-control dis"  disabled  />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtActive${cnt}" type="checkbox" class="form-check-input Edit chk"  disabled />
		                </div>
	                </td>
                   
                    
               <input id="txtStatusFlag${cnt}" type="hidden"   />
               <input id="RoleId${cnt}" type="hidden"   />
               <input id="USER_CODE${cnt}" type="hidden"   />
                </tr>`;


		$('#divGridRoles').append(html);
		$(`#txtRoleDesc${cnt}`).append(`<option value="Null">اختر الصلاحية</option>`)
		for (var i = 0; i < RoleDetails.length; i++) {
			$(`#txtRoleDesc${cnt}`).append(`<option value="${RoleDetails[i].RoleId}">${RoleDetails[i].DescA}</option>`)
		}

		$(`#txtRoleDesc${cnt}`).on('change', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
			ValidateDublicateRoles(cnt);
			$(`#txtRemarks${cnt}`).val(RoleDetails.filter(x => x.RoleId == Number($(`#txtRoleDesc${cnt}`).val()))[0].Remarks);
			$(`#txtActive${cnt}`).prop('checked', true);

		});
		$(`#txtRemarks${cnt}`).on('keyup', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#txtActive${cnt}`).on('change', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#btn_minus${cnt}`).on('click', function () {
			DeleteRow(cnt, true);
		});
	}
	function DeleteRow(RecNo: number, IsRole: boolean) {
		if (!SysSession.CurrentPrivileges.Remove) return;
		if (IsRole == true) {
			WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
				$("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
				$("#Row" + RecNo).attr("hidden", "true");
			});
		} else {
			WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
				$("#txtStatusFlagBr" + RecNo).val() == 'i' ? $("#txtStatusFlagBr" + RecNo).val('m') : $("#txtStatusFlagBr" + RecNo).val('d');
				$("#RowBr" + RecNo).attr("hidden", "true");
			});
		}

	}
	function btnAdd_onclick(IsRole: boolean) {			    
		if (IsRole == true) {

			if (RoleDetails.length == CountGridRole) {
				DisplayMassage('عدد الصلاحيات المتاحة لدي الشركة ' + RoleDetails.length + ' صلاحية فقط', 'The number of permissions you have ' + RoleDetails.length + 'permission only', MessageType.Error);
			}
			else {
				BuildControlRoles(CountGridRole);
				$(`.btn_minus`).removeClass('display_none');
				$(`.Edit`).removeAttr('disabled');
				$(`#txtStatusFlag${CountGridRole}`).val("i");
				CountGridRole++;
			}
		} else {
			if (BranchDetails.length == CountGridBranch) {
				DisplayMassage('عدد الفروع المتاحة لدي الشركة ' + BranchDetails.length + ' فرع فقط', 'The number of Branchs you have ' + BranchDetails.length + 'BranchDetail only', MessageType.Error);
			} else {

				BuildControlBranchs(CountGridBranch);
				$(`.btn_minus`).removeClass('display_none');
				$(`#txtStatusFlagBr${CountGridBranch}`).val("i");
				$(`.Edit`).removeAttr('disabled');
				CountGridBranch++;
			}
		}
	}
	function LoadAllRoles() {
		 
		let _RoleDetails = new Array<G_Role>();
		_RoleDetails = RoleDetails;
		 
		for (var i = 0; i < CountGridRole; i++) {
			if ($(`#txtStatusFlag${i}`).val() != "m" && $(`#txtStatusFlag${i}`).val() != "d") {
				_RoleDetails = _RoleDetails.filter(x => x.RoleId != Number($(`#txtRoleDesc${i}`).val()));
			}
			if ($(`#txtStatusFlag${i}`).val() == "i" && $(`#txtRoleDesc${i}`).val() == "Null") {
				$("#Row" + i).attr("hidden", "true");
				$(`#txtStatusFlag${i}`).val("m")
			}
		}

		for (var i = 0; i < _RoleDetails.length; i++) {
			BuildControlRoles(CountGridRole);
			$(`#USER_CODE${CountGridRole}`).val(txtUser_Code.value);    
			$(`#txtStatusFlag${CountGridRole}`).val("i");
			$(`#txtRoleDesc${CountGridRole}`).val(_RoleDetails[i].RoleId);
			$(`#txtRemarks${CountGridRole}`).val(_RoleDetails[i].Remarks);
			CountGridRole++;
		}
		$('.chk').prop('checked', true);
		$(`.Edit`).removeAttr('disabled');
		$(`.btn_minus`).removeClass('display_none');
	}
	function LoadAllBranchs() {
		let _BranchDetails = new Array<G_BRANCH>();
		_BranchDetails = BranchDetails;
		for (var i = 0; i < CountGridBranch; i++) {
			if ($(`#txtStatusFlagBr${i}`).val() != "m" && $(`#txtStatusFlagBr${i}`).val() != "d") {
				_BranchDetails = _BranchDetails.filter(x => x.BRA_CODE != Number($(`#txtBranch${i}`).val()));
			}
			if ($(`#txtStatusFlagBr${i}`).val() == "i" && $(`#txtBranch${i}`).val() == "Null") {
				$("#RowBr" + i).attr("hidden", "true");
				$(`#txtStatusFlagBr${i}`).val("m")
			}
		}
		for (var i = 0; i < _BranchDetails.length; i++) {
			BuildControlBranchs(CountGridBranch);
			$(`#USER_CODEBr${CountGridBranch}`).val(txtUser_Code.value);
			$(`#txtStatusFlagBr${CountGridBranch}`).val("i");
			$(`#txtBranch${CountGridBranch}`).val(_BranchDetails[i].BRA_CODE);
			$(`#BRA_CODE${CountGridBranch}`).val(_BranchDetails[i].BRA_CODE);
			CountGridBranch++;
		}
		$('.chkBr').prop('checked', true);
		$(`.btn_minus`).removeClass('display_none');
		$(`.Edit`).removeAttr('disabled');
	}
	function validiation(): boolean {
		 
		if (txtUser_Code.value.trim() == "") {
			DisplayMassage('يجب إدخال رمز المستخدم', `You must Enter User Code`, MessageType.Error);
			inputError("txtUser_Code");
			return false;
		}
		if (txtPassword.value.trim() == "") {
			DisplayMassage('يجب إدخال كلمة السر', `You must Enter Password`, MessageType.Error);
			inputError("txtPassword");
			return false;
		}
		if (txtUser_Name.value.trim() == "") {
			DisplayMassage('يجب إدخال اسم المستخدم', `You must Enter User Name`, MessageType.Error);
			inputError("txtUser_Name");
			return false;
		}
		if (txtDepartmentName.value.trim() == "") {
			DisplayMassage('يجب إدخال القسم', `You must Enter Department Name`, MessageType.Error);
			inputError("txtDepartmentName");
			return false;
		}
		if (txtJobTitle.value.trim() == "") {
			DisplayMassage('يجب إدخال الوظيفة', `You must Enter Job Title`, MessageType.Error);
			inputError("txtJobTitle");
			return false;
		}
		if (!validate_email() && txtEmail.value.trim() != "") {
			DisplayMassage('البريد الالكتروني غير صحيح', `Email was Wrong`, MessageType.Error);
			inputError(`txtEmail`);
			return false;
		}
		if (CountGridRole == 0) {
			DisplayMassage('يجب ادخال الصلاحيات', `You must Enter Roles`, MessageType.Error);
			inputError(`btnAddRole`);
			return false;
		}
		for (var i = 0; i < CountGridRole; i++) {
			if ($(`#txtRoleDesc${i}`).val() == "Null" && ($(`#txtStatusFlag${i}`).val() != "m" && $(`#txtStatusFlag${i}`).val() != "d")) {
				DisplayMassage('يجب اختيار الصلاحية', `You must Choose Role`, MessageType.Error);
				inputError(`txtRoleDesc${i}`);
				return false;
			}
		}
		if (CountGridBranch == 0) {
			DisplayMassage('يجب ادخال الفروع', `You must Enter Branchs`, MessageType.Error);
			inputError(`btnAddBranch`);
			return false;
		}
		for (var i = 0; i < CountGridBranch; i++) {
			if ($(`#txtBranch${i}`).val() == "Null" && ($(`#txtStatusFlagBr${i}`).val() != "m" && $(`#txtStatusFlagBr${i}`).val() != "d")) {
				DisplayMassage('يجب اختيار الفرع', `You must Choose Branch`, MessageType.Error);
				inputError(`txtBranch${i}`);
				return false;
			}
		}
		return true;
	}
	function validate_email(): boolean {
		 
		const email = txtEmail.value;
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return re.test(email);
	}
	function ValidateDublicateRoles(RecNo: number) {
		for (var i = 0; i < CountGridRole; i++) {
			if (i != RecNo && Number($(`#txtRoleDesc${i}`).val()) == Number($(`#txtRoleDesc${RecNo}`).val())) {
				$(`#txtRoleDesc${RecNo}`).val("Null");
				$(`#txtRemarks${RecNo}`).val("");
				DisplayMassage('لا يمكنك تكرار الصلاحية', 'You cannot duplicate validity', MessageType.Error);
				inputError(`txtRoleDesc${RecNo}`);
			}
		}
	}
	function ValidateDublicateBranch(RecNo: number) {
		for (var i = 0; i < CountGridBranch; i++) {
			if (i != RecNo && Number($(`#txtBranch${i}`).val()) == Number($(`#txtBranch${RecNo}`).val())) {
				$(`#txtBranch${RecNo}`).val("Null");
				DisplayMassage('لا يمكنك تكرار الفرع', 'You cannot duplicate Branch', MessageType.Error);
				inputError(`txtBranch${RecNo}`);
			}
		}
	}
	function USER_CODEFoundBefore() {
		var res: boolean = true;
		var USER_CODE = txtUser_Code.value.toLowerCase();

		Ajax.Callsync({
			type: "Get",
			url: sys.apiUrl("G_USERS", "CodeFounBefore"),
			data: {
				USER_CODE: USER_CODE, compCode: CompCode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
			},
			success: (d) => {
				 
				let result = d as BaseResponse;
				let Res = result.Response as Array<G_USERS>;
				if (Res.length > 0) {
					txtUser_Code.value = "";
					inputError("txtUser_Code");
					DisplayMassage('رمز المسخدم موجود مسبقاً', 'The User code already exists', MessageType.Error);

				}

			}
		});
		return res;
	}
	function showpassword() {	  
		if (showpss == false) {
			$('#txtPassword').attr('type', 'text');
			$('#showpass').removeClass('fa-eye-slash');
			$('#showpass').addClass('fa-eye');
			showpss = true;
		} else {
			$('#txtPassword').attr('type', 'password');
			$('#showpass').addClass('fa-eye-slash');
			$('#showpass').removeClass('fa-eye');
			showpss = false;

		}
	}
	function btnAdd_onClick() {
		IsNew = true;
		CountGridRole = 0;
		CountGridBranch = 0;
		$('#divGridRoles').html('');
		$('#divGridBranch').html('');
		$('#showpass').removeClass('display_none');	   
		$('#DivInvoiceDetails').removeClass('display_none');
		$('#DivInvoiceDetails :input').val('');
		$('#DivInvoiceDetails :input[type="number"]').val("0");
		$('.dis').attr('disabled', 'disabled');
		$('.Edit').removeAttr('disabled');
		$('#cotrolDiv').addClass('disabledDiv');
		$('#divIconbar').addClass('hidden_Control');
		$('#btnAddRole').removeClass('display_none');
		$('#btnAddBranch').removeClass('display_none');
		$('.btnRoles').removeAttr('disabled');
		txtCreatedBy.value = SysSession.CurrentEnvironment.UserCode;
		txtCreatedAt.value = GetDateAndTime();
		drpuserTypeDt.value = "null";
		drpSalesman.value = "null";
		drpCashBox.value = "null";
	}
	function btnSave_onClick() {
		 
		if (!validiation()) {
			return;
		}
		Update();
	}
	function btnEdit_onclick() {
		IsNew = false;
		$('#showpass').removeClass('display_none');	 
		$('.dis').attr('disabled', 'disabled');
		$('#cotrolDiv').addClass('disabledDiv');
		$('#divIconbar').addClass('hidden_Control');
		$('#btnAddRole').removeClass('display_none');
		$('#btnAddBranch').removeClass('display_none');
		$('.btnRoles').removeAttr('disabled');
		$('.btn_minus').removeClass('display_none');
		txtUpdatedBy.value = SysSession.CurrentEnvironment.UserCode;
		txtUpdatedAt.value = GetDateAndTime();
		$('.Edit').removeAttr('disabled');
	}
	function btnBack_onclick() {
		if (IsNew == true) {
			$('#DivInvoiceDetails').addClass('display_none');
		}  
		 sucess();
	}
	function Assign() {
		UserMasterDetail = new ModelUserMasterDetail();
		ModelUser = new G_USERS();
		ModelUserRoles = new Array<G_RoleUsers>();
		ModelUserBranch = new Array<G_USER_BRANCH>();

		ModelUser.LoginUrl = false;
		ModelUser.Email = txtEmail.value;
		ModelUser.FirstLogin = txtFirstLogin.value;
		ModelUser.Remarks = "";
		ModelUser.CreatedAt = txtCreatedAt.value;
		ModelUser.CreatedBy = txtCreatedBy.value;
		ModelUser.UpdatedAt = txtUpdatedAt.value;
		ModelUser.UpdatedBy = txtUpdatedBy.value;
		ModelUser.CashBoxID = drpCashBox.value == "null" ? null : Number(drpCashBox.value);
		ModelUser.SalesManID = drpSalesman.value == "null" ? null : Number(drpSalesman.value);
		ModelUser.USER_CODE = txtUser_Code.value;
		ModelUser.USER_PASSWORD = txtPassword.value;
		ModelUser.USER_ACTIVE = chkActive.checked;
		ModelUser.USER_NAME = txtUser_Name.value;
		ModelUser.CompCode = CompCode;
		ModelUser.GRP_CODE = "";
		ModelUser.REGION_CODE = "";
		ModelUser.USER_PASSWORD2 = "";
		ModelUser.CHANGE_PASS_DATE = "";
		ModelUser.City = "";
		ModelUser.Address = "";
		ModelUser.Tel = "";
		ModelUser.Fax = "";
		ModelUser.Mobile = txtMobile.value;
		ModelUser.DepartmentName = txtDepartmentName.value;
		ModelUser.JobTitle = txtJobTitle.value;
		ModelUser.USER_TYPE = drpuserTypeDt.value == "null" ? null : Number(drpuserTypeDt.value);
		ModelUser.ManagedBy = "";
		ModelUser.SYSTEM_CODE = "I";
		ModelUser.SUB_SYSTEM_CODE = "I";
		ModelUser.Tokenid = "";
		ModelUser.LastLogin = txtLastLogin.value;
		ModelUser.Flag_Mastr = "";
		ModelUser.StoreID = 0;

		for (var i = 0; i < CountGridRole; i++) {
			if ($(`#txtStatusFlag${i}`).val() != 'm' && $(`#txtStatusFlag${i}`).val() != '') {
				singleUserRoles = new G_RoleUsers();
				singleUserRoles.USER_CODE = txtUser_Code.value;
				singleUserRoles.RoleId = Number($(`#txtRoleDesc${i}`).val());
				singleUserRoles.OldID = Number($(`#RoleId${i}`).val());
				singleUserRoles.ISActive = $(`#txtActive${i}`).prop('checked');
				singleUserRoles.StatusFlag = $(`#txtStatusFlag${i}`).val();

				ModelUserRoles.push(singleUserRoles);
			}
		}
		for (var i = 0; i < CountGridBranch; i++) {
			if ($(`#txtStatusFlagBr${i}`).val() != 'm' && $(`#txtStatusFlagBr${i}`).val() != '') {
				SingleUserBranch = new G_USER_BRANCH();
				SingleUserBranch.USER_CODE = txtUser_Code.value;
				SingleUserBranch.COMP_CODE = CompCode;
				SingleUserBranch.BRA_CODE = Number($(`#txtBranch${i}`).val());
				SingleUserBranch.EXECUTE = $(`#txtEXECUTE${i}`).prop('checked');
				SingleUserBranch.CREATE = $(`#txtCREATE${i}`).prop('checked');
				SingleUserBranch.EDIT = $(`#txtEDIT${i}`).prop('checked');
				SingleUserBranch.DELETE = $(`#txtDELETE${i}`).prop('checked');
				SingleUserBranch.PRINT = $(`#txtPRINT${i}`).prop('checked');
				SingleUserBranch.VIEW = true;
				SingleUserBranch.StatusFlag = $(`#txtStatusFlagBr${i}`).val();

				ModelUserBranch.push(SingleUserBranch);
			}
		}
		UserMasterDetail.UserCode = SysSession.CurrentEnvironment.UserCode;
		UserMasterDetail.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
		UserMasterDetail.Comp_Code = SysSession.CurrentEnvironment.CompCode;
		UserMasterDetail.CompName = SysSession.CurrentEnvironment.CompanyName;
		UserMasterDetail.VatNo = SysSession.CurrentEnvironment.VatNo;
		UserMasterDetail.Branch_Code = BraCode.toString();
		UserMasterDetail.sec_FinYear = FinYear.toString();
		UserMasterDetail.MODULE_CODE = Modules.USERS;
		UserMasterDetail.StatusFlag = IsNew == true ? "i" : "u";
		UserMasterDetail.G_USERS = ModelUser;
		UserMasterDetail.G_RoleUsers = ModelUserRoles;
		UserMasterDetail.G_USER_BRANCH = ModelUserBranch;
	}
	function Update() {
		 
		Assign();
		console.log(UserMasterDetail);
		Ajax.Callsync({
			type: "Post",
			url: sys.apiUrl("G_USERS", "UpdateUserMasterDetail"),
			data: JSON.stringify(UserMasterDetail),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess) {
					GlobalUserCode = result.Response;
					DisplayMassage('تم الحفظ بنجاح', `Updated Succesfully`, MessageType.Succeed);
					IsNew = false;
					sucess();
				} else {
					DisplayMassage('خطأ بالبيانات', `Error in Data`, MessageType.Error);
				}
			}
		});
	}
	function sucess() {
		$('#DivInvoiceDetails :input').attr('disabled', 'disabled');
		$('#cotrolDiv').removeClass('disabledDiv');
		$('#divShow').removeClass('disabledDiv');
		$('#divIconbar').removeClass('hidden_Control');
		$('#btnAddRole').addClass('display_none');
		$('#btnAddBranch').addClass('display_none');
		$('.btnRoles').attr('disabled', 'disabled');
		$('.Edit').attr('disabled', 'disabled');
		$('.btn_minus').addClass('display_none');
		$('#showpass').addClass('display_none');
		$('#txtPassword').attr('type', 'password');
		$('#showpass').addClass('fa-eye-slash');
		$('#showpass').removeClass('fa-eye');
		showpss = false;
		if (IsNew == false) {
		Save_Succ_But();
		GetAllUsers();
		BindUserInfoData(GlobalUserCode);
		}
	}
} 