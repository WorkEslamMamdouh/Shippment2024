
$(document).ready(() => {
	Valid_Code.InitalizeComponent();

});

namespace Valid_Code {
	var sys: SystemTools = new SystemTools();
	var SysSession: SystemSession = GetSystemSession();
	var _Grid: JsGrid = new JsGrid();

	var _UsersList: Array<G_USERS> = new Array<G_USERS>();
	var _Usersnone: Array<G_USERS> = new Array<G_USERS>();

	var txtSearch: HTMLInputElement;    
	var Filter_View: HTMLButtonElement;
	var btnDelete_Filter: HTMLButtonElement;

	export function InitalizeComponent() {

		GetCode()
		Close_Loder();
	}
  
	function GetCode() {
		debugger
		 
		var Table: Array<Table>;
		Table =
			[
			{ NameTable: 'I_Control', Condition: " CompCode = 1 "  },

			]
		DataResult(Table);
		//**************************************************************************************************************
		debugger
		let list = GetDataTable('I_Control');

		$("#IDVaild_Code").html(list[0].InvoiceTransCode)
		
	}
 
}
