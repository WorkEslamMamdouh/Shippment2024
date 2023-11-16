
$(document).ready(() => {
	EmpControl.InitalizeComponent();

});

namespace EmpControl {
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession();
    var _Grid: JsGrid = new JsGrid();

    var _UsersList: Array<GQ_USERS> = new Array<GQ_USERS>();  
    var _Usersnone: Array<GQ_USERS> = new Array<GQ_USERS>();  

    var txtSearch: HTMLInputElement;              
    var drpActive: HTMLSelectElement;              
    var Filter_View: HTMLButtonElement;
    var btnDelete_Filter: HTMLButtonElement;

    export function InitalizeComponent() {


        InitalizeControls();
        InitializeEvents();  
        InitializeGrid();
        Close_Loder();
    }
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch') as HTMLInputElement;                             
        Filter_View = document.getElementById('Filter_View') as HTMLButtonElement;
        btnDelete_Filter = document.getElementById('btnDelete_Filter') as HTMLButtonElement;
    }
    function InitializeEvents() {

        txtSearch.onkeyup = _SearchBox_Change;                          
        Filter_View.onclick = GetData_Users;
        btnDelete_Filter.onclick = Clear;
    }
    function InitializeGrid() {
        _Grid.ElementName = "_Grid";
        //_Grid.OnRowDoubleClicked = GridDoubleClick;
        _Grid.PrimaryKey = "USER_CODE";
        _Grid.Paging = true;
        _Grid.PageSize = 15;
        _Grid.Sorting = true;
        _Grid.InsertionMode = JsGridInsertionMode.Binding;
        _Grid.Editing = false;
        _Grid.Inserting = false;
        _Grid.SelectedIndex = 1;   
        _Grid.OnItemEditing = () => { };
        _Grid.Columns = [
            { title: "User Code", name: "USER_CODE", type: "text", width: "100px" },
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },  
            {
                title: "USER_ACTIVE", css: "ColumPadding", name: "USER_ACTIVE", width: "100px",
                itemTemplate: (s: string, item: GQ_USERS): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");
                    if (item.USER_ACTIVE == true) {
                        txt.innerHTML = 'Active ✅'
					} else {
                        txt.innerHTML = 'Not Active ❌'
					}       
                    return txt;
                }
            },
            { title: "Job Title", name: "DescA", type: "text", width: "100px" },    
            {
                title: "View",
                itemTemplate: (s: string, item: GQ_USERS): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("View Control ⚙️");
                    txt.id = "butView" + item.USER_CODE;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";

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
            let SearchDetails = _UsersList.filter(x => x.USER_CODE.toLowerCase().search(search) >= 0 || x.USER_NAME.toLowerCase().search(search) >= 0 || x.DescA.toLowerCase().search(search) >= 0 || x.JobTitle.toLowerCase().search(search) >= 0 || x.Mobile.search(search) >= 0);

            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        } else {
            _Grid.DataSource = _UsersList;
            _Grid.Bind();
        }
    }
    function GetData_Users() {
        debugger
        CleaningList_Table();     
        let Con = "";
        if ($('#drpActive').val() != "Null") {
            Con = " and USER_ACTIVE =" +Number($('#drpActive').val());
        }
        if ($('#drpUserType').val() != "Null") {
            Con = " and USER_TYPE =" + Number($('#drpUserType').val());
        }         
        var Table: Array<Table>;
        Table =
            [
                { NameTable: 'GQ_USERS', Condition: " USER_TYPE not in (1,10) and USER_CODE !='" + SysSession.CurrentEnvironment.UserCode + "' and [USER_NAME] not in ('StockKeeper','SalesMan','StockMan','UserAccount','UserAdministrator') " + Con },

            ]       
        DataResult(Table);
        //**************************************************************************************************************
        debugger
        _UsersList = GetDataTable('GQ_USERS');    
        _UsersList = _UsersList.sort(dynamicSort("USER_NAME"));           
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _UsersList;
        _Grid.Bind();
    }          
    function ViewUser(item: GQ_USERS) {

        SetGlobalDataUser(item);
        localStorage.setItem("TypePage", "Vendor");
        OpenPagePartial("Profile", "Profile 👤", () => { Display_Refrsh() });            

    }
    function Clear() {
        $('#drpActive').val("Null");
        $('#drpUserType').val("Null");
        $('#btnDelete_Filter').addClass('display_none');
        CleaningList_Table();
        _Grid.DataSource = _Usersnone;
        _Grid.Bind();
    }

    var Run_Fun = false;
    function Display_Refrsh() {
        if (!Run_Fun) {
            Run_Fun = true;
            return
        }
        GetData_Users();
    }
}
