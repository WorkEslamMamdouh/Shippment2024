
$(document).ready(() => {
	Zone.InitalizeComponent();

});

namespace Zone {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var _USERS: Array<G_USERS> = new Array<G_USERS>();
	var _USER: Array<G_USERS> = new Array<G_USERS>();
	var _Zones: Array<Zones> = new Array<Zones>();
	var CountGrid = 0;
	var Submit_Update_Profile: HTMLButtonElement;
	var Submit_Backdown_Profile: HTMLButtonElement;

	export function InitalizeComponent() {
		debugger
		$('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
		$('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);

		InitalizeControls();
		InitializeEvents();


		_USERS = GetGlopelDataUser()
		_USER = _USERS.filter(x => x.USER_CODE == SysSession.CurrentEnvironment.UserCode)
		Display_Data();

		Close_Loder();
	}
	function InitalizeControls() {
		Submit_Update_Profile = document.getElementById("Submit_Update_Profile") as HTMLButtonElement;
		Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile") as HTMLButtonElement;
	}
	function InitializeEvents() {

		Submit_Update_Profile.onclick = SubmitUpdate;
		Submit_Backdown_Profile.onclick = BackeDown;

	}
	function BackeDown() {
		WorningMessage("هل انت متأكد من التراجع عن التعديلات ؟", "Are you sure for undoing the modifications?", "تحذير", "worning", () => {
			$('#Zone_Grid').html("");
			CountGrid = 0;
			Display_Data();
		});		   
	}

	function Display_Data() {
		debugger		 
		var Table: Array<Table>;
		Table =
			[
			{ NameTable: 'Zones', Condition: "" },
			 	]

		DataResult(Table);
		//**************************************************************************************************************
		debugger
		_Zones = GetDataTable('Zones');	  
		for (var i = 0; i < _Zones.length; i++) {
			BuildGrid(i);
			$(`#Txt_ZoneID${i}`).val(_Zones[i].ZoneID);
			$(`#Txt_ZoneCode${i}`).val(_Zones[i].ZoneCode);
			$(`#Txt_DescA${i}`).val(_Zones[i].DescA);
			$(`#chk_Active${i}`).prop('checked', _Zones[i].Active);
			$(`#Txt_Remarks${i}`).val(_Zones[i].Remarks);
			$(`#txtStatusFlag${i}`).val(''); 
			CountGrid++;
		}
	}
	function SubmitUpdate() {

		if ($('#Reg_Comp_Name').val().trim() == "" && _USER[0].USER_TYPE == 10) {
			Errorinput($('#Reg_Comp_Name'), "Please a Enter Company Name 🤨");
			return
		}
		if ($('#Reg_Full_Name').val().trim() == "") {
			Errorinput($('#Reg_Full_Name'), "Please a Enter Full Name 🤨");
			return
		}
		else if ($('#Reg_Address').val().trim() == "") {
			Errorinput($('#Reg_Address'), "Please a Enter Address 🤨");
			return
		}
		else if ($('#Reg_Mobile').val().trim() == "") {
			Errorinput($('#Reg_Mobile'), "Please a Enter Mobile 😏");
			return
		}
		else if ($('#Reg_ID_Num').val().trim() == "") {
			Errorinput($('#Reg_ID_Num'), "Please a Enter ID Number 😡");
			return
		}
		let USERID_Num = _USERS.filter(x => x.Fax == $('#Reg_ID_Num').val().trim() && x.USER_CODE != _USER[0].USER_CODE)
		if (USERID_Num.length > 0) {
			Errorinput($('#Reg_ID_Num'), "This ID Number is already used 🤣");
			return
		}
		else if ($('#Reg_Mail').val().trim() == "") {
			Errorinput($('#Reg_Mail'), "Please a Enter Mail 😡");
			return
		}

		else if ($('#Reg_Password').val().trim() == "") {
			Errorinput($('#Reg_Password'), "Please a Enter Password 😡");
			return
		}
		debugger
		let Name = $('#Reg_Full_Name').val().trim();
		let CompName = $('#Reg_Comp_Name').val().trim();
		let address = $('#Reg_Address').val().trim();
		let Mobile = $('#Reg_Mobile').val().trim();
		let IDNO = $('#Reg_ID_Num').val().trim();
		let Email = $('#Reg_Mail').val().trim();
		let UserName = SysSession.CurrentEnvironment.UserCode;
		let Password = $('#Reg_Password').val().trim();
		let Idven = Number(_USER[0].SalesManID);

		let NameFun = _USER[0].USER_TYPE == 10 ? "UpdateSeller" : "UpdateProfile"

		Ajax.CallsyncSave({
			type: "Get",
			url: sys.apiUrl("Seller", NameFun),
			data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, Name: Name, address: address, Mobile: Mobile, IDNO: IDNO, Email: Email, UserName: UserName, Password: Password, VendorId: Idven, CompName: CompName },
			success: (d) => {//int CompCode,int BranchCode,string Name,string address , string Mobile ,string IDNO,string Email,string UserName,string Password,string UserCode,string Token
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {
					//GetUSERSByCodeUser(UserName);

					Close_Loder();
				} else {

				}
			}
		});

	}

	function BuildGrid(cnt: number) {
		let html = '<tr id="Row' + cnt + '" style="height: 51px; ">' +
			'<input id="Txt_ZoneID' + cnt + '" type="hidden" class="form-control" disabled /> ' +
			'<input id="txtStatusFlag' + cnt + '" type="hidden" class="form-control" disabled /> ' +

			'<td class="btn_minus" style = "width: 2%;" > ' +
			'<button  id="btn_minus'+cnt+'"> <i class="fa-solid fa-circle-minus" > </i></button > '+ 
			'</td>' +

			'<td class="u-table-cell" > ' +
			'<input type="text" id="Txt_ZoneCode' + cnt +'" maxlength="50" class="Clear_Header  u-input u-input-rectangle">'+
			'</td>' +

			'<td class="u-table-cell" > ' +
			'<input type="text" id="Txt_DescA' + cnt + '" maxlength="200" class="Clear_Header  u-input u-input-rectangle">' +
			'</td>' +

			'<td class="u-table-cell" > ' +
			'<input type="checkbox" id="chk_Active' + cnt + '" class="checkbox">' +
			'</td>' +

			'<td class="u-table-cell" > ' +
			'<input type="text" id="Txt_Remarks' + cnt + '" maxlength="500" class="Clear_Header  u-input u-input-rectangle">' +
			'</td>' +

			'</tr>';
		$('#Zone_Grid').append(html);

		$(`#Txt_ZoneCode${cnt}`).on('change', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#Txt_DescA${cnt}`).on('change', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#Txt_Remarks${cnt}`).on('change', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#chk_Active${cnt}`).on('click', function () {
			if ($("#txtStatusFlag" + cnt).val() != "i")
				$("#txtStatusFlag" + cnt).val("u");
		});
		$(`#btn_minus${cnt}`).on('click', function () {
			DeleteRow(cnt);
		});


	}	 
	function DeleteRow(RecNo: number) {
		debugger
		WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
			$("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
			$("#Row" + RecNo).attr("hidden", "true"); 
		});
	}
}
