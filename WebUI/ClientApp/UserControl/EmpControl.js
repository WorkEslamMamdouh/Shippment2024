$(document).ready(function () {
    EmpControl.InitalizeComponent();
});
var EmpControl;
(function (EmpControl) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _Grid = new JsGrid();
    var _UsersList = new Array();
    var _Usersnone = new Array();
    var txtSearch;
    var drpActive;
    var Filter_View;
    var btnDelete_Filter;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        InitializeGrid();
        Close_Loder();
    }
    EmpControl.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSearch = document.getElementById('txtSearch');
        Filter_View = document.getElementById('Filter_View');
        btnDelete_Filter = document.getElementById('btnDelete_Filter');
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
        _Grid.OnItemEditing = function () { };
        _Grid.Columns = [
            { title: "User Code", name: "USER_CODE", type: "text", width: "100px" },
            { title: "User Name", name: "USER_NAME", type: "text", width: "100px" },
            { title: "Job Title", name: "DescA", type: "text", width: "100px" },
            {
                title: "Active", css: "ColumPadding", name: "USER_ACTIVE", width: "100px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    if (item.USER_ACTIVE == true) {
                        txt.innerHTML = 'Active ✅';
                    }
                    else {
                        txt.innerHTML = 'Not Active ❌';
                    }
                    return txt;
                }
            },
            {
                title: "Block",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "checkbox";
                    txt.id = "ChkView" + item.USER_CODE;
                    txt.className = "checkbox";
                    txt.checked = !item.USER_ACTIVE;
                    txt.style.width = "50px";
                    txt.style.height = "35px";
                    txt.onclick = function (e) {
                        BlockEmp(item.USER_CODE, txt.checked == true ? 0 : 1);
                    };
                    return txt;
                }
            },
            {
                title: "View",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Edit ⚙️");
                    txt.id = "butView" + item.USER_CODE;
                    txt.className = "Style_Add_Item u-btn u-btn-submit u-input u-input-rectangle";
                    txt.onclick = function (e) {
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
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = _UsersList.filter(function (x) { return x.USER_CODE.toLowerCase().search(search_1) >= 0 || x.USER_NAME.toLowerCase().search(search_1) >= 0 || x.DescA.toLowerCase().search(search_1) >= 0 || x.JobTitle.toLowerCase().search(search_1) >= 0 || x.Mobile.search(search_1) >= 0; });
            _Grid.DataSource = SearchDetails;
            _Grid.Bind();
        }
        else {
            _Grid.DataSource = _UsersList;
            _Grid.Bind();
        }
    }
    function GetData_Users() {
        debugger;
        CleaningList_Table();
        var Con = "";
        if ($('#drpActive').val() != "Null") {
            Con = " and USER_ACTIVE =" + Number($('#drpActive').val());
        }
        if ($('#drpUserType').val() != "Null") {
            Con = Con + " and USER_TYPE =" + Number($('#drpUserType').val());
        }
        var Table;
        Table =
            [
                { NameTable: 'GQ_USERS', Condition: " USER_TYPE not in (1,10) and USER_CODE !='" + SysSession.CurrentEnvironment.UserCode + "' and [USER_NAME] not in ('StockKeeper','SalesMan','StockMan','UserAccount','UserAdministrator') " + Con },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _UsersList = GetDataTable('GQ_USERS');
        _UsersList = _UsersList.sort(dynamicSort("USER_NAME"));
        $('#btnDelete_Filter').removeClass('display_none');
        _Grid.DataSource = _UsersList;
        _Grid.Bind();
    }
    function ViewUser(item) {
        debugger;
        $("#Open").focus();
        localStorage.setItem("TypePage", "UserControl");
        localStorage.setItem("UserControl", item.USER_CODE);
        OpenPagePartial("UserDef", "UserDef 👤", function () { Display_Refrsh(); });
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
            return;
        }
        GetData_Users();
    }
    function BlockEmp(UserCode, Active) {
        Ajax.CallsyncSave({
            type: "Get",
            url: sys.apiUrl("Seller", "Blockseller"),
            data: { CompCode: SysSession.CurrentEnvironment.CompCode, BranchCode: SysSession.CurrentEnvironment.BranchCode, SellerCode: UserCode, USER_CODE: SysSession.CurrentEnvironment.UserCode, Active: Active },
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    GetData_Users();
                    Close_Loder();
                    Active == 0 ? ShowMessage("User Blocked 🤦‍ ") : ShowMessage("User Un Blocked 👍");
                }
                else {
                }
            }
        });
    }
})(EmpControl || (EmpControl = {}));
//# sourceMappingURL=EmpControl.js.map