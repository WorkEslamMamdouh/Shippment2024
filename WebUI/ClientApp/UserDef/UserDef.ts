
$(document).ready(() => {
	UserDef.InitalizeComponent();

});

namespace UserDef {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();

	var _USERS: Array<G_USERS> = new Array<G_USERS>();
	var _USER: Array<G_USERS> = new Array<G_USERS>();
	var _G_Code: Array<G_Codes> = new Array<G_Codes>();

	var Submit_Update_Profile: HTMLButtonElement;

	export function InitalizeComponent() {

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
	}
	function InitializeEvents() {

		//Submit_Update_Profile.onclick = SubmitUpdate;

	}
	function Display_Data() {
		debugger
		var Table: Array<Table>;
		Table =
			[
			{ NameTable: 'G_Codes', Condition: "CodeType= 'UserType' and CodeValue not in (1,10)" },
			]

		DataResult(Table);
		//**************************************************************************************************************
		debugger
		_G_Code = GetDataTable('G_Codes');
		FillDropwithAttr(_G_Code, "Usr_UserType", "CodeValue", "DescA", "No", "", "");
		}
	 
 			   
}
