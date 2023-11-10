
$(document).ready(() => {
	VendorControl.InitalizeComponent();
			 
});

namespace VendorControl {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var _USERS: Array<G_USERS> = new Array<G_USERS>();
	var _USER: Array<G_USERS> = new Array<G_USERS>();
	var _Zones: Array<Zones> = new Array<Zones>();
	var _ZonesObj: Zones = new Zones();
	var _ZonesModel: Array<Zones> = new Array<Zones>();
	var CountGrid = 0;
	var Submit_Update_Profile: HTMLButtonElement;
	var btnAdd: HTMLButtonElement;
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
		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile") as HTMLButtonElement;
	}
	function InitializeEvents() {

		btnAdd.onclick = AddRow;
		Submit_Update_Profile.onclick = SubmitUpdate;
		Submit_Backdown_Profile.onclick = Display_Data;

	}
	  
	function AddRow() {
		BuildGrid(CountGrid);
		$(`#txtStatusFlag${CountGrid}`).val('i');
		CountGrid++;
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
		$('#Zone_Grid').html("");
		CountGrid = 0;
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
		for (var i = 0; i < CountGrid; i++) {
			if ($('#Txt_ZoneCode'+i).val().trim() == "") {
				Errorinput($('#Txt_ZoneCode' + i), "Please a Enter Zone Code 🤨");
				return
			}	 
			if ($('#Txt_DescA' + i).val().trim() == "") {
				Errorinput($('#Txt_DescA' + i), "Please a Enter Zone Describition 🤨");
				return
			}   
		}		
		Assign();
		Ajax.CallsyncSave({
			type: "Post",
			url: sys.apiUrl("SalesMan", "UpdateZones"),
			data: JSON.stringify(_ZonesModel),
			success: (d) => {
				let result = d as BaseResponse;
				if (result.IsSuccess == true) {		
					Display_Data();
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
			'<button  id="btn_minus' + cnt + '"> <i class="fa-solid fa-circle-minus" > </i></button > ' +
			'</td>' +

			'<td class="u-table-cell" > ' +
			'<input type="text" id="Txt_ZoneCode' + cnt + '" maxlength="50" class="Clear_Header  u-input u-input-rectangle">' +
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
		$("#txtStatusFlag" + RecNo).val() == 'i' ? $("#txtStatusFlag" + RecNo).val('m') : $("#txtStatusFlag" + RecNo).val('d');
		$("#Row" + RecNo).attr("hidden", "true");
	}
	function Assign() {
		_ZonesModel = new Array<Zones>();
		for (var i = 0; i < CountGrid; i++) {
			if ($(`#txtStatusFlag${i}`).val() != 'm' && $(`#txtStatusFlag${i}`).val() != '') {
				_ZonesObj = new Zones();
				_ZonesObj.ZoneID = Number($(`#Txt_ZoneID${i}`).val());
				_ZonesObj.ZoneCode = $(`#Txt_ZoneCode${i}`).val();
				_ZonesObj.DescA = $(`#Txt_DescA${i}`).val();
				_ZonesObj.Active = $(`#chk_Active${i}`).is(":checked");
				_ZonesObj.Remarks = $(`#Txt_Remarks${i}`).val();
				_ZonesObj.StatusFlag = $(`#txtStatusFlag${i}`).val();
				_ZonesModel.push(_ZonesObj);
			}
		}
		_ZonesModel[0].UserCode = _USER[0].USER_CODE;
		_ZonesModel[0].Comp_Code = _USER[0].CompCode.toString();
		_ZonesModel[0].Branch_Code = _USER[0].Branch_Code;
	}
}
