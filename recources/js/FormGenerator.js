

const FourOFourButtonHome = document.getElementById('ToHome')
const FourOFourButtonPrevPage = document.getElementById('PrevPage')

const ReportButton = document.getElementById('Report')

const ResetButton = document.getElementById('ResetForm')
const SubmitForm = document.getElementById('SubmitForm')

const AllButtons = document.querySelectorAll('.Form-Buttons-Button')

const IsFormEnabledP = document.getElementById('FormEnabledTxt')

const FormTitle = document.getElementById('FormTitle')
const FormDesc = document.getElementById('FormDesc')

function HideAllButtons(){
    AllButtons.forEach(Button => {
         Button.style.display = "none"  
    }); 
}

function FourOFourError(){
    HideAllButtons()

    FourOFourButtonHome.style.display = "inline"
    FourOFourButtonPrevPage.style.display = "inline"

    IsFormEnabledP.style.display = "none"

    FormTitle.innerHTML = `<span>404</span> form not found`
    FormDesc.innerHTML = `uh.. oh we couldnt find the from you are looking for <ul><li>the form eiter doesnt exist</li><li>the id found in the url isnt provided</li><li>you can go to the previous page or to the home page for now</li></ul>`
}

function getParamsFromHash() {
    const hash = window.location.hash; 

    const queryIndex = hash.indexOf('?');

    
    if (queryIndex === -1) {
        return null;
    }

    const queryString = hash.substring(queryIndex + 1);
    return new URLSearchParams(queryString);
}


const params = getParamsFromHash();

if (!params) {
    FourOFourError();
}

const id = params.get('FormID');

if (!id) {
    FourOFourError();
} else {
    const FormID = id;
    console.log(FormID);

    HideAllButtons()

    ResetButton.style.display = "inline"
    SubmitForm.style.display = "inline"

    var FormConfig = "../recources/apis/Forms/" + FormID + ".json"

    fetch(FormConfig)
    .then(response => response.json())
    .then(data => {
        FormTitle.innerHTML = data.General.Title
        FormDesc.innerHTML = data.General.Desc

        if (data.General.Enabled){
            IsFormEnabledP.style.display = "none"

           for (let i = 0; i < data.Elements.length; i++) {
              var ElementData = data.Elements[i]

              console.log(ElementData)

              function ChangeState(){

              }

              function CloneFormElement(ReturnIt){
                if (ElementData.Type == "DropDown"){
                    var template = document.getElementById('DropDTemp');
                    var clone = template.content.cloneNode(true);

                    var FieldSet = clone.querySelector('fieldset')
                    var select = FieldSet.querySelector('select')
                    select.id = ElementData.Id

                    var label = clone.querySelector('label')

                    label.innerHTML = ElementData.Desc
                    label.setAttribute('for', ElementData.Id)

                    for (let i = 0; i < ElementData.Config.Options.length; i++){
                        var OptionsData = ElementData.Config.Options[i]

                        var NewOption = document.createElement('option')
                        NewOption.innerHTML = OptionsData.Option

                        select.appendChild(NewOption);
                    }

                    document.body.appendChild(clone); 

                    if (ElementData.Dynamic){
                        ChangeState()
                    }

                    if (ReturnIt){
                        return Document.getElementById(ElementData.Id)
                    }
                }
              }

              function ChangeElementState(elem, data){
                elem.setAttribute("disabled", !data.Enabled)
              }

              if (ElementData.Dynamic){
                console.log("dynamic use")
                for (let d = 0; d < ElementData.DynamicFrom.length; d++){
                    var DynamicData = ElementData.DynamicFrom[d]
                    console.log(DynamicData)
                    var From = document.getElementById(DynamicData.ID)  
                    console.log(From)

                    var CurElement = CloneFormElement(true)
                    if (DynamicData.Type == "DropDown"){
                        console.log("true")
                        if (From && From.tagName === 'SELECT' && From.value) {

                            console.log(`Selected value from ${DynamicData.ID}: ${From.value}`);
                            if (From.value == DynamicData.Option){
                               ChangeElementState(CurElement, DynamicData) 
                               // check and add new element
                            }
                        };

                        select.addEventListener('change', function () {
                            console.log('Selected value:', this.value);
                            if (this.value == DynamicData.Option){
                               ChangeElementState(CurElement, DynamicData) 
                            }
                            
                        });
                    }
                    
                }
              }else{
                console.log("normal use")
                if (ElementData.Enabled){
                    CloneFormElement(false)
                }
              }
           }
        }else{
            IsFormEnabledP.style.display = "inline"
            HideAllButtons()
            FourOFourButtonHome.style.display = "inline"
            FourOFourButtonPrevPage.style.display = "inline"
        }
    });
}


