
$(document).ready(() => { 
    Order_Saller.InitalizeComponent();
    
});

namespace Order_Saller {
    var sys: SystemTools = new SystemTools(); 
    var SysSession: SystemSession = GetSystemSession();
     

    var Id_Back: HTMLButtonElement;
    var Id_Next: HTMLButtonElement;
    var Id_Back_Step2: HTMLButtonElement;
    var Id_Next_Step2: HTMLButtonElement;
    var Id_Finish: HTMLButtonElement;

    export function InitalizeComponent() {
    

        InitalizeControls();
        InitializeEvents();
        Close_Loder();
    }
    function InitalizeControls() { 
        Id_Back = document.getElementById("Id_Back") as HTMLButtonElement;
        Id_Next = document.getElementById("Id_Next") as HTMLButtonElement;
        Id_Back_Step2 = document.getElementById("Id_Back_Step2") as HTMLButtonElement;
        Id_Next_Step2 = document.getElementById("Id_Next_Step2") as HTMLButtonElement;
        Id_Finish = document.getElementById("Id_Finish") as HTMLButtonElement;
    }
    function InitializeEvents() {
          
        Id_Next.onclick = _Next;
        Id_Back.onclick = _Back;
        Id_Back_Step2.onclick = _Back_Step2;
        Id_Next_Step2.onclick = _Next_Step2;
        Id_Finish.onclick = _Finish;
        
    }

    function _Next() { 
        $('#Id_Div_Next').addClass('display_none')
        $('#Id_Div_Back').removeClass('display_none')
        $('#Id_Div_Next_Step2').removeClass('display_none')

        $('#Div_Header').addClass('display_none')
        $('#Div_Item').removeClass('display_none')
    }
    function _Back() { 
        $('#Id_Div_Next').removeClass('display_none')
        $('#Id_Div_Back').addClass('display_none')
        $('#Id_Div_Next_Step2').addClass('display_none')
        $('#Id_Div_Finish').addClass('display_none')
        $('#Id_Div_Back_Step2').addClass('display_none')

        $('#Div_Item').addClass('display_none')
        $('#Div_Review_invoice').addClass('display_none')
        $('#Div_Header').removeClass('display_none')
    }

    function _Back_Step2() {
        $('#Id_Div_Next_Step2').removeClass('display_none')
        $('#Id_Div_Back').removeClass('display_none')
        $('#Id_Div_Back_Step2').addClass('display_none')
        $('#Id_Div_Finish').addClass('display_none')

        $('#Div_Item').removeClass('display_none')
        $('#Div_Header').addClass('display_none')
        $('#Div_Review_invoice').addClass('display_none')
    }
    function _Next_Step2() {
        $('#Id_Div_Next_Step2').addClass('display_none')
        $('#Id_Div_Back').addClass('display_none')
        $('#Id_Div_Back_Step2').removeClass('display_none')
        $('#Id_Div_Finish').removeClass('display_none')

        $('#Div_Header').addClass('display_none')
        $('#Div_Item').addClass('display_none')
        $('#Div_Review_invoice').removeClass('display_none')
    }
    function _Finish() {
        alert("Finish")
        _Back();
    }
     
}
