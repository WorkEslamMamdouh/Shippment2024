$(document).ready(function () {
    Store.InitalizeComponent();
});
var Store;
(function (Store) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var _USERS = new Array();
    var _USER = new Array();
    var _STORE = new Array();
    var _STOREObj = new G_STORE();
    var _STOREModel = new Array();
    var CountGrid = 0;
    var Submit_Update_Profile;
    var btnAdd;
    var Submit_Backdown_Profile;
    function InitalizeComponent() {
        debugger;
        $('#Profile_UserName').html(SysSession.CurrentEnvironment.UserCode);
        $('#Profile_JobTitle').html(SysSession.CurrentEnvironment.JobTitle);
        InitalizeControls();
        InitializeEvents();
        _USERS = GetGlopelDataUser();
        _USER = _USERS.filter(function (x) { return x.USER_CODE == SysSession.CurrentEnvironment.UserCode; });
        Display_Data();
        Close_Loder();
    }
    Store.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Submit_Update_Profile = document.getElementById("Submit_Update_Profile");
        btnAdd = document.getElementById("btnAdd");
        Submit_Backdown_Profile = document.getElementById("Submit_Backdown_Profile");
    }
    function InitializeEvents() {
        btnAdd.onclick = AddRow;
        Submit_Update_Profile.onclick = SubmitUpdate;
        Submit_Backdown_Profile.onclick = Display_Data;
    }
    function AddRow() {
        BuildGrid(CountGrid);
        $("#txtStatusFlag" + CountGrid).val('i');
        CountGrid++;
    }
    function Display_Data() {
        debugger;
        var Table;
        Table =
            [
                { NameTable: 'G_STORE', Condition: "" },
            ];
        DataResult(Table);
        //**************************************************************************************************************
        debugger;
        _STORE = GetDataTable('G_STORE');
        $('#Zone_Grid').html("");
        CountGrid = 0;
        for (var i = 0; i < _STORE.length; i++) {
            BuildGrid(i);
            $("#Txt_StoreID" + i).val(_STORE[i].StoreId);
            $("#Txt_StoreCode" + i).val(_STORE[i].STORE_CODE);
            $("#Txt_DescA" + i).val(_STORE[i].DescA);
            $("#chk_Active" + i).prop('checked', _STORE[i].IsActive);
            $("#Txt_Remarks" + i).val(_STORE[i].Remarks);
            $("#txtStatusFlag" + i).val('');
            CountGrid++;
        }
    }
    function SubmitUpdate() {
        for (var i = 0; i < CountGrid; i++) {
            if ($('#Txt_StoreCode' + i).val().trim() == "") {
                Errorinput($('#Txt_StoreCode' + i), "Please a Enter Store Code 🤨");
                return;
            }
            if ($('#Txt_DescA' + i).val().trim() == "") {
                Errorinput($('#Txt_DescA' + i), "Please a Enter Store Describition 🤨");
                return;
            }
        }
        Assign();
        Ajax.CallsyncSave({
            type: "Post",
            url: sys.apiUrl("SalesMan", "UpdateStores"),
            data: JSON.stringify(_STOREModel),
            success: function (d) {
                var result = d;
                if (result.IsSuccess == true) {
                    Display_Data();
                    Close_Loder();
                }
                else {
                }
            }
        });
    }
    function BuildGrid(cnt) {
        var html = '<tr id="Row' + cnt + '" style="height: 51px; ">' +
            '<input id="Txt_StoreID' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<input id="txtStatusFlag' + cnt + '" type="hidden" class="form-control" disabled /> ' +
            '<td class="u-table-cell" > ' +
            '<input type="text" id="Txt_StoreCode' + cnt + '" maxlength="50" class="Clear_Header  u-input u-input-rectangle">' +
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
        $("#Txt_StoreCode" + cnt).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#Txt_DescA" + cnt).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#Txt_Remarks" + cnt).on('change', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
        $("#chk_Active" + cnt).on('click', function () {
            if ($("#txtStatusFlag" + cnt).val() != "i")
                $("#txtStatusFlag" + cnt).val("u");
        });
    }
    function Assign() {
        _STOREModel = new Array();
        for (var i = 0; i < CountGrid; i++) {
            if ($("#txtStatusFlag" + i).val() != 'm' && $("#txtStatusFlag" + i).val() != '') {
                _STOREObj = new G_STORE();
                _STOREObj.StoreId = Number($("#Txt_StoreID" + i).val());
                _STOREObj.STORE_CODE = $("#Txt_StoreCode" + i).val();
                _STOREObj.DescA = $("#Txt_DescA" + i).val();
                _STOREObj.IsActive = $("#chk_Active" + i).is(":checked");
                _STOREObj.Remarks = $("#Txt_Remarks" + i).val();
                _STOREObj.StatusFlag = $("#txtStatusFlag" + i).val();
                _STOREModel.push(_STOREObj);
            }
        }
        _STOREModel[0].UserCode = _USER[0].USER_CODE;
        _STOREModel[0].Comp_Code = _USER[0].CompCode.toString();
        _STOREModel[0].Branch_Code = _USER[0].Branch_Code;
    }
})(Store || (Store = {}));
//# sourceMappingURL=Store.js.map