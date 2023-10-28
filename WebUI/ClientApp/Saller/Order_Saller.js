$(document).ready(function () {
    Order_Saller.InitalizeComponent();
});
var Order_Saller;
(function (Order_Saller) {
    var sys = new SystemTools();
    var SysSession = GetSystemSession();
    var Id_Back;
    var Id_Next;
    var Id_Back_Step2;
    var Id_Next_Step2;
    var Id_Finish;
    var Btn_AddItem;
    var Txt_Quantity;
    var Txt_UnitPrice;
    var Txt_NetTotal;
    var CountGrid = 0;
    var NumItems = 0;
    function InitalizeComponent() {
        InitalizeControls();
        InitializeEvents();
        Close_Loder();
    }
    Order_Saller.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        Id_Back = document.getElementById("Id_Back");
        Id_Next = document.getElementById("Id_Next");
        Id_Back_Step2 = document.getElementById("Id_Back_Step2");
        Id_Next_Step2 = document.getElementById("Id_Next_Step2");
        Id_Finish = document.getElementById("Id_Finish");
        Btn_AddItem = document.getElementById("Btn_AddItem");
        Txt_Quantity = document.getElementById("Txt_Quantity");
        Txt_UnitPrice = document.getElementById("Txt_UnitPrice");
        Txt_NetTotal = document.getElementById("Txt_NetTotal");
        $('#Txt_Receive_TrData').val(GetDate());
        $('#Div_ItemsAll').html('');
    }
    function InitializeEvents() {
        Id_Next.onclick = _Next;
        Id_Back.onclick = _Back;
        Id_Back_Step2.onclick = _Back_Step2;
        Id_Next_Step2.onclick = _Next_Step2;
        Id_Finish.onclick = _Finish;
        Btn_AddItem.onclick = AddItemBox;
        Txt_UnitPrice.onkeyup = BoxTotal;
        Txt_Quantity.onkeyup = BoxTotal;
    }
    function _Next() {
        if (!Valid_Header()) {
            return;
        }
        $('#Id_Div_Next').addClass('display_none');
        $('#Id_Div_Back').removeClass('display_none');
        $('#Id_Div_Next_Step2').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Item').removeClass('display_none');
    }
    function _Back() {
        $('#Id_Div_Next').removeClass('display_none');
        $('#Id_Div_Back').addClass('display_none');
        $('#Id_Div_Next_Step2').addClass('display_none');
        $('#Id_Div_Finish').addClass('display_none');
        $('#Id_Div_Back_Step2').addClass('display_none');
        $('#Div_Item').addClass('display_none');
        $('#Div_Review_invoice').addClass('display_none');
        $('#Div_Header').removeClass('display_none');
    }
    function _Back_Step2() {
        $('#Id_Div_Next_Step2').removeClass('display_none');
        $('#Id_Div_Back').removeClass('display_none');
        $('#Id_Div_Back_Step2').addClass('display_none');
        $('#Id_Div_Finish').addClass('display_none');
        $('#Div_Item').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Review_invoice').addClass('display_none');
    }
    function _Next_Step2() {
        if (NumItems == 0) {
            ShowMessage("Please a Enter Your Items 😡");
            return;
        }
        $('#Id_Div_Next_Step2').addClass('display_none');
        $('#Id_Div_Back').addClass('display_none');
        $('#Id_Div_Back_Step2').removeClass('display_none');
        $('#Id_Div_Finish').removeClass('display_none');
        $('#Div_Header').addClass('display_none');
        $('#Div_Item').addClass('display_none');
        $('#Div_Review_invoice').removeClass('display_none');
    }
    function _Finish() {
        alert("Finish");
        _Back();
    }
    //****************************************************** Validtion *****************************************
    function Valid_Header() {
        if (!Valid_Input("Txt_Ref_No", "Please a Enter References Number 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_Name_Cust", "Please a Enter Full Name 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_Phone_Num1", "Please a Enter Phone 1 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_Phone_Num2", "Please a Enter Phone 2 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_Address1", "Please a Enter Address 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_location", "Please a Enter location 😡")) {
            return false;
        }
        return true;
    }
    function Valid_Item() {
        if (!Valid_Input("Txt_Name_Item", "Please a Enter Name Item 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_UnitPrice", "Please a Enter Unit Price 😡")) {
            return false;
        }
        if (!Valid_Input("Txt_Quantity", "Please a Enter Quantity 😡")) {
            return false;
        }
        return true;
    }
    //****************************************************** BuildBox and Add Items *****************************************
    function BuildBox(cnt, Name_Item, NetPrice, Quantity) {
        var html = " <div id=\"Box_No" + cnt + "\" class=\"u-container-align-center u-container-style u-list-item u-repeater-item\">\n                                        <div class=\"u-container-layout u-similar-container u-container-layout-1\">\n                                            <div class=\"u-align-center u-container-style u-products-item u-repeater-item u-white u-repeater-item-1\" data-product-id=\"3\">\n                                                <div class=\"u-container-layout u-similar-container u-container-layout-6\">\n                                                    <!--product_image-->\n                                                    <a class=\"u-product-title-link\" ><img src=\"/NewStyle/images/cd3cd20c1d71f67d069f3f625694f521579f424d9c9e14253f385fe632dc97e67b1375511a8e4e43e62d783be85c11826e4f6431bcc5c074bfeedb_1280.png\" alt=\"\" class=\"u-expanded-width u-image u-image-contain u-image-default u-product-control u-image-6\"></a><!--/product_image--><!--product_title-->\n                                                    <h4 class=\"u-product-control u-text u-text-7\">\n                                                        <a class=\"u-product-title-link\" >" + Name_Item + " ( " + Quantity + " )</a>\n                                                    </h4><!--/product_title--><!--product_price-->\n                                                    <div class=\"u-product-control u-product-price u-product-price-6\">\n                                                        <div class=\"u-price-wrapper u-spacing-10\">\n                                                            <!--product_old_price-->\n                                                            <div class=\"u-hide-price u-old-price\"><!--product_old_price_content-->$25<!--/product_old_price_content--></div><!--/product_old_price--><!--product_regular_price-->\n                                                            <div class=\"u-price u-text-palette-2-base\" style=\"font-size: 1.25rem; font-weight: 700;\">Price : " + NetPrice + "</div><!--/product_regular_price-->\n                                                        </div>\n                                                    </div><!--/product_price--><!--product_button--><!--options_json--><!--{\"clickType\":\"buy-now\",\"content\":\"Buy Now\"}--><!--/options_json-->\n                                                    <a id=\"DeleteBox" + cnt + "\" class=\"u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-btn-7 u-dialog-link u-payment-button\" data-product-button-click-type=\"buy-now\" data-product-id=\"3\" data-product=\"{&quot;id&quot;:&quot;3&quot;,&quot;name&quot;:&quot;leather-gloves&quot;,&quot;title&quot;:&quot;Leather Gloves&quot;,&quot;description&quot;:&quot;Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.&quot;,&quot;price&quot;:&quot;20&quot;,&quot;oldPrice&quot;:&quot;25&quot;,&quot;quantity&quot;:1,&quot;currency&quot;:&quot;USD&quot;,&quot;sku&quot;:&quot;&quot;,&quot;outOfStock&quot;:false,&quot;categories&quot;:[],&quot;images&quot;:[{&quot;url&quot;:&quot;~/NewStyle/images/cd3cd20c1d71f67d069f3f625694f521579f424d9c9e14253f385fe632dc97e67b1375511a8e4e43e62d783be85c11826e4f6431bcc5c074bfeedb_1280.png&quot;}],&quot;created&quot;:1697849530946,&quot;updated&quot;:1698449063177,&quot;isDefault&quot;:true}\"><!--product_button_content-->Delete<!--/product_button_content--></a><!--/product_button-->\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>";
        $('#Div_ItemsAll').append(html);
        debugger;
        BuildAllFild(I_Sls_TR_InvoiceItems, cnt, "Box_No");
        $("#DeleteBox" + cnt).on('click', function () {
            DeleteBox(cnt);
        });
    }
    function AddItemBox() {
        if (!Valid_Item()) {
            return;
        }
        BuildBox(CountGrid, $('#Txt_Name_Item').val(), $('#Txt_NetTotal').val(), $('#Txt_Quantity').val());
        $('#StatusFlag' + CountGrid).val("i");
        CountGrid++;
        NumItems++;
        $("#Tap_Reviews_Items").html("Reviews Items ( " + NumItems + " )");
        $(".Clear_Item ").val("");
        ShowMessage("Add Item ✅");
    }
    function DeleteBox(RecNo) {
        var statusFlag = $("#StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#StatusFlag" + RecNo).val("m");
        else
            $("#StatusFlag" + RecNo).val("d");
        $("#Box_No" + RecNo).addClass("display_none");
        NumItems--;
        if (NumItems == 0) {
            $("#Tap_Reviews_Items").html("Reviews Items");
        }
        else {
            $("#Tap_Reviews_Items").html("Reviews Items ( " + NumItems + " )");
        }
        ShowMessage("Deleted ❌");
    }
    function BoxTotal() {
        Txt_NetTotal.value = (Number(Txt_Quantity.value) * Number(Txt_UnitPrice.value)).toFixed(2);
    }
    function CompletTotal() {
    }
})(Order_Saller || (Order_Saller = {}));
//# sourceMappingURL=Order_Saller.js.map