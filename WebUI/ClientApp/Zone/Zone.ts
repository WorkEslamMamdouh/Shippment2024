﻿
$(document).ready(() => {
	Zone.InitalizeComponent();

});

namespace Zone {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var _USERS: Array<G_USERS> = new Array<G_USERS>();
	var _USER: Array<G_USERS> = new Array<G_USERS>();
	var _FamilyZones: Array<FamilyZone> = new Array<FamilyZone>();
	var _Zones: Array<Zones> = new Array<Zones>();
	var _ZonesObj: Zones = new Zones();
	var _ZonesModel: Array<Zones> = new Array<Zones>();
	var CountGrid = 0;
	var Submit_Update_Profile: HTMLButtonElement;
	var btnAdd: HTMLButtonElement;
	var Submit_Backdown_Profile: HTMLButtonElement;
	var db_FamilyZone: HTMLSelectElement;

	export function InitalizeComponent() {
		debugger
		$('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
		$('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);

		InitalizeControls();
		InitializeEvents();


		_USERS = GetGlopelDataUser()
		_USER = _USERS.filter(x => x.USER_CODE.toLowerCase() == SysSession.CurrentEnvironment.UserCode.toLowerCase())
		Display_Data();
		
		Close_Loder();
	}
	function InitalizeControls() {
		Submit_Update_Profile = document.getElementById("Submit_Update_Profile") as HTMLButtonElement;
		btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
		Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile") as HTMLButtonElement;
		db_FamilyZone = document.getElementById("db_FamilyZone") as HTMLSelectElement;
	}
	function InitializeEvents() {

		btnAdd.onclick = AddRow;
		Submit_Update_Profile.onclick = SubmitUpdate;
		Submit_Backdown_Profile.onclick = Display_Data;
		db_FamilyZone.onchange = FamilyChange; 
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
				{ NameTable: 'FamilyZone', Condition: "" },		  
				{ NameTable: 'Zones', Condition: "" },		  
			]

		DataResult(Table);
		//**************************************************************************************************************
		debugger
		_Zones = GetDataTable('Zones');
		_FamilyZones = GetDataTable('FamilyZone');
		FillDropwithAttr(_FamilyZones, `db_FamilyZone`, "FamilyZoneID", "DescA", "No", "", "");	 
		FamilyChange();
	}
	function FamilyChange() {
		debugger
		let FilteredZones = _Zones.filter(x => x.FamilyZoneID == Number(db_FamilyZone.value));
		$('#Zone_Grid').html("");
		CountGrid = 0;
		for (var i = 0; i < FilteredZones.length; i++) {
			BuildGrid(i);
			$(`#Txt_ZoneID${i}`).val(FilteredZones[i].ZoneID);			   
			$(`#Txt_DescA${i}`).val(FilteredZones[i].DescA);
			$(`#chk_Active${i}`).prop('checked', FilteredZones[i].Active);
			$(`#Txt_Remarks${i}`).val(FilteredZones[i].Remarks);
			$(`#txtStatusFlag${i}`).val('');
			CountGrid++;
		}
	}
	function SubmitUpdate() {
		for (var i = 0; i < CountGrid; i++) {	 
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
					ShowMessage("Done 🤞😉")
				} else {

				}
			}
		});

	}
	function BuildGrid(cnt: number) {
		let html = '<tr id="Row' + cnt + '" style="height: 51px; ">' +
			'<input id="Txt_ZoneID' + cnt + '" type="hidden" class="form-control" disabled /> ' +
			'<input id="txtStatusFlag' + cnt + '" type="hidden" class="form-control" disabled /> ' +
					    
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
		debugger
		$('#Zone_Grid').append(html);

		
		 
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
				_ZonesObj.FamilyZoneID = Number(db_FamilyZone.value);
				_ZonesObj.ZoneID = Number($(`#Txt_ZoneID${i}`).val()); 
				_ZonesObj.ZoneCode = "";
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
