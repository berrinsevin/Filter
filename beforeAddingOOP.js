const displaySelection = document.querySelector('.display-selections');
const list = document.querySelector('.filter-area');
const inputBox = document.querySelector('.input-area');
const userInput = document.querySelectorAll('user-input');
const closeIcon = document.getElementById('close-icon');
const saveButton = document.querySelector('.input-save-button');
const items = [
  {
      "id": "1",
      "data": "number",
      "name": "Bitmap"     
  },
  {
      "id": "2",
      "data": "number",
      "name": "Primary account number (PAN)"     
  },
  {
      "id": "3",
      "data": "number",
      "name": "Processing Code"     
  },
  {
      "id": "4",
      "data": "text",
      "name": "Amount Transaction",
      "min": 0,
      "max": 9999999999999
  },
  {
    "id": "934",
    "data": "select",
    "multiple": true,
    "list": [
        [ 90, "Türkiye" ],
        [ 49, "Türkiye" ],
        [ 1, "United Fucl,ingsta amasr" ],
    ]
  },
  {
      "id": "5",
      "data": "number",
      "name": "Amount, settlement"     
  },
  {
      "id": "6",
      "data": "number",
      "name": "Amount, cardholder billing"     
  },
  {
      "id": "7",
      "data": "number",
      "name": "Transmission date & time"     
  },
  {
      "id": "8",
      "data": "number",
      "name": "Amount, cardholder billing fee"     
  },
  {
      "id": "9",
      "data": "number",
      "name": "Conversion rate, settlement"     
  },
  {
      "id": "10",
      "data": "number",
      "name": "Conversion rate, cardholder billing"     
  }    
];

document.addEventListener('DOMContentLoaded', function intro() {
var json = JSON.stringify(items); 
var filters = JSON.parse(json);

for(var i = 0; i < filters.length; i++) 
{
    //Create checkbox items form json
    const newFilter = document.createElement("p");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = filters[i].name;
    checkbox.value = filters[i].data;
    const label = document.createElement("label");
    label.for = filters[i].name;
    label.appendChild(document.createTextNode(filters[i].name));
    newFilter.append(checkbox, label);
    list.appendChild(newFilter);

    //Create link list
    const newLink = document.createElement("a");
    newLink.className = "input-entry";
    newLink.id = checkbox.id;
    newLink.href = "#";
    newLink.appendChild(document.createTextNode(checkbox.id));
    const br = document.createElement("span");
    br.innerHTML = "<br/>";
    //document.body.appendChild(br);
    const operator = document.createElement("select");
    operator.id = "operator";
    const _and = document.createElement("option");
    _and.value = "and";
    _and.appendChild(document.createTextNode("AND"));
    const _or = document.createElement("option");
    _or.value = "or";
    _or.appendChild(document.createTextNode("OR"));
    operator.append(_and, _or);
    displaySelection.append(newLink, br, operator);
    newLink.style.display = 'none';
    br.style.display = 'none';
    operator.style.display = 'none';

    //Create a line for the link in the result area
    const result = document.querySelector('.result-list');
    const inputDiv = document.createElement("div");
    inputDiv.style.display = "none";
    const inputName = document.createElement("h5");
    inputName.appendChild(document.createTextNode(checkbox.id + " is:  "));
    inputName.style.fontWeight = 600;
    const selectedInputs = document.createElement("h6");
    selectedInputs.style.display = "flex";
    selectedInputs.style.flexDirection = "row";
    selectedInputs.style.justifyContent = "space-between";
    inputDiv.append(inputName, selectedInputs)
    result.appendChild(inputDiv);
    
    //Add event for checkboxes
    checkbox.addEventListener('change', function() {
    if (checkbox.checked) 
    {
        newLink.style.display = '';
        br.style.display = '';
        operator.style.display = '';
    }
    else 
    {
        newLink.style.display = 'none';
        br.style.display = 'none';
        operator.style.display = 'none';
    }});  

    //Create inputbox and operators for each link
    const link = document.querySelectorAll('.input-entry');
    if(checkbox.value == "text")
    {                        
        const div = document.createElement("div");
        div.className = checkbox.id;
        div.style.display = "none";
        const operator = document.createElement("select");
        operator.id = "operator";
        const contains = document.createElement("option");
        contains.value = "contains";
        contains.appendChild(document.createTextNode("contains"));
        const equal = document.createElement("option");
        equal.value = "equals to";
        equal.appendChild(document.createTextNode("equals"));
        operator.append(contains, equal);
        const input = document.createElement("input");
        input.className = "user-input";
        input.id = "input";
        input.type = "text";
        input.placeholder = "Type a text";
        const button = document.createElement("button");
        button.className = "plus-button";
        const buttonIcon = document.createElement("i");
        buttonIcon.className = "fa-duotone fa-plus";
        button.appendChild(buttonIcon);
        div.append(operator, input, button);
        document.querySelector('.input-list').append(div);
        userInput.type = "text";

        link[i].addEventListener('click', function() {
            inputBox.className = "input-area-display";
            div.style.display = "";
            const wait = setInterval(waitInput, 1000)
            function waitInput() {                    
                saveButton.addEventListener('click', function() { 
                    selectedInputs.innerHTML = '<p style="font-style: italic; font-weight: 500; style="padding-left:5px;"> ' + operator.value + '</p><p style="padding-left:5px;"><u>' + input.value + '</u><p/>';   
                    inputDiv.style.display = 'flex';   
                    inputDiv.style.flexDirection = 'row';      
                }); 
            } 
        });

        closeIcon.addEventListener('click', function() {
            div.style.display = "none";
        });

        button.addEventListener('click', function(){
            const div = document.createElement("div");
            div.className = "input-item";
            div.style.marginBlock = "5px";
            const _operator = document.createElement("select");
            _operator.id = "operator";
            const _and = document.createElement("option");
            _and.value = "AND";
            _and.appendChild(document.createTextNode("AND"));
            const _or = document.createElement("option");
            _or.value = "OR";
            _or.appendChild(document.createTextNode("OR"));
            _operator.append(_and, _or);
            const secondOperator = document.createElement("select");
            secondOperator.id = "operator";
            secondOperator.className = "secondary-input-operator";
            const contains = document.createElement("option");
            contains.value = "contains";
            contains.appendChild(document.createTextNode("contains"));
            const equal = document.createElement("option");
            equal.value = "equals to";
            equal.appendChild(document.createTextNode("equals"));
            secondOperator.append(contains, equal);
            const newInput = document.createElement("input");
            newInput.className = "user-input";
            newInput.type = "text";
            newInput.placeholder = "Type a text";
            div.append(_operator, secondOperator, newInput);
            const newInputLine = document.createElement("h6");
            newInputLine.style.display = "flex";
            newInputLine.style.flexDirection = "row";
            newInputLine.style.justifyContent = "space-between";
            inputDiv.append(newInputLine);
            document.querySelector('.input-list').append(div);

            const wait = setInterval(waitInput, 1000)
            function waitInput() {                    
                saveButton.addEventListener('click', function() { 
                    newInputLine.innerHTML =  '\n <p style="padding-left:10px;"> ' + _operator.value + '</p><p style="font-style: italic; font-weight: 500; padding-left:10px;"> ' + secondOperator.value + '</p><p style="padding-left:5px;"> <u>' + newInput.value + '</p></u>';
                    inputDiv.style.display = 'flex';   
                    inputDiv.style.flexDirection = 'row';   
                }); 
            } 

            closeIcon.addEventListener('click', function() {
                div.style.display = "none";});
        });
    }
    else
    {
        const div = document.createElement("div");
        div.className = checkbox.id;
        div.style.display = "none";
        const operator = document.createElement("select");
        operator.id = "operator";
        operator.className = "secondary-input-operator";
        const greater = document.createElement("option");
        greater.value = "greater than";
        greater.appendChild(document.createTextNode('>'));
        const equal = document.createElement("option");
        equal.value = "equals to";
        equal.appendChild(document.createTextNode("="));
        const less = document.createElement("option");
        less.value = "less than";
        less.appendChild(document.createTextNode('<'));
        operator.append(greater, equal, less);
        const input = document.createElement("input");
        input.className = "user-input";
        input.id = "input";
        input.type = "number";
        input.placeholder = "Enter a number";
        const button = document.createElement("button");
        button.className = "plus-button";
        const buttonIcon = document.createElement("i");
        buttonIcon.className = "fa-duotone fa-plus";
        button.appendChild(buttonIcon);
        div.append(operator, input, button);
        document.querySelector('.input-list').append(div);
        userInput.type = "number";
       
        link[i].addEventListener('click', function() {
            inputBox.className = "input-area-display";
            div.style.display = "";
            const wait = setInterval(waitInput, 1000)
            function waitInput() {                    
                saveButton.addEventListener('click', function() { 
                    selectedInputs.innerHTML =  '<p style="font-style: italic; font-weight: 500; style="padding-left:5px;""> ' + operator.value + '</p><p style="padding-left:5px;"> <u>' + input.value + '</p></u>';   
                    inputDiv.style.display = 'flex';   
                    inputDiv.style.flexDirection = 'row';       
                }); 
            } 
        });

        closeIcon.addEventListener('click', function() {
            div.style.display = "none";
        });
        
        button.addEventListener('click', function(){
            const div = document.createElement("div");
            div.className = "input-item";
            div.style.marginBlock = "5px";
            const _operator = document.createElement("select");
            _operator.id = "operator";
            _operator.className = "input-operator";
            const _and = document.createElement("option");
            _and.value = "AND";
            _and.appendChild(document.createTextNode("AND"));
            const _or = document.createElement("option");
            _or.value = "OR";
            _or.appendChild(document.createTextNode("OR"));
            _operator.append(_and, _or);
            const secondOperator = document.createElement("select");
            secondOperator.id = "operator";
            secondOperator.className = "secondary-input-operator";
            const greater = document.createElement("option");
            greater.value = "greater than";
            greater.appendChild(document.createTextNode('>'));
            const equal = document.createElement("option");
            equal.value = "equals to";
            equal.appendChild(document.createTextNode("="));
            const less = document.createElement("option");
            less.value = "less than";
            less.appendChild(document.createTextNode('<'));
            const newInput = document.createElement("input");
            newInput.className = "user-input";
            newInput.type = "number";
            newInput.placeholder = "Enter a number";
            secondOperator.append(greater, equal, less);
            div.append(_operator, secondOperator, newInput);
            const newInputLine = document.createElement("h6");
            newInputLine.style.display = "flex";
            newInputLine.style.flexDirection = "row";
            inputDiv.append(newInputLine);
            document.querySelector('.input-list').append(div);

            const wait = setInterval(waitInput, 1000)
            function waitInput() {                    
                saveButton.addEventListener('click', function() { 
                    newInputLine.innerHTML =  '\n  ' + '<p style="padding-left:10px;">' + _operator.value + "</p>"+ '&nbsp;&nbsp;<p style="font-style: italic; font-weight: 500; padding-left:5px;"> ' + secondOperator.value + '</p> <p style ="padding-left:5px;"><u>' + newInput.value + '</p></u> ';
                    inputDiv.style.display = 'flex';   
                    inputDiv.style.flexDirection = 'row';       
                }); 
            } 

            closeIcon.addEventListener('click', function() {
                div.style.display = "none";});   
        });
    }
}});

closeIcon.addEventListener('click', function() {
const inputBox = document.querySelector('.input-area-display');
inputBox.className = "input-area";
})
