const displaySelection = document.querySelector('.display-selections');
const list = document.querySelector('.filter-area');
const inputBox = document.querySelector('.input-area');
const userInput = document.querySelectorAll('user-input');
const closeIcon = document.getElementById('close-icon');
const saveButton = document.querySelector('.save-button');
const addButton = document.querySelector('.plus-button');

class filterItem {

    constructor(id, name, data, options) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.options = options;
    }

    createCheckbox() {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        return checkbox;
    }

    createLabel() {
        const label = document.createElement("label");
        label.htmlFor = this.name;
        label.appendChild(document.createTextNode(this.name));

        return label;
    }

    createLink() {
        const newLink = document.createElement("a");
        newLink.classList.add(this.name, "link");
        newLink.href = "#";
        newLink.appendChild(document.createTextNode(this.name));

        const br = document.createElement("span");
        br.className = this.name;
        br.innerHTML = "<br/>";

        displaySelection.append(newLink, br);
        return newLink;
    }

    selectOperatorType(data) {
        switch(data) {
            case "number":
                return [">", "=", "<"];
            case "text":
                return ["contains", "equals"];
            case "connective":
                return ["AND", "OR"]
            case "multiple":
                return ["includes"]
        }
    }

    createSelectOption(option) {
        const selectOption = document.createElement("option");
        if(option == "equals")
        {
            selectOption.value = "equals to";
        }
        else
        {
            selectOption.value = option;
        }

        selectOption.appendChild(document.createTextNode(option));

        return selectOption;
    }

    createOperator(type, name) {
        const operator = document.createElement("select");
        operator.id = "operator";
        operator.className = name;

        this.selectOperatorType(type).forEach(element => {  
            operator.append(this.createSelectOption(element));
        });
        
        return operator;
    }

    createInput(name, type) {
        if(type == "multiple") 
        {
            const select = document.createElement("select");
            select.classList.add(name, "user-input");
            select.id = "input";
            for (const element of this.options) { 
                select.appendChild(this.createSelectOption(element));
            }

            return select;
        }
        else
        {
            const input = document.createElement("input");
            input.classList.add(name, "user-input");
            input.id = "input";
            input.type = type;
            input.placeholder = `Type a ${type}`;

            return input;
        }
    }

    createInputArea() {
        const inputArea = document.createElement("div");
        inputArea.className = "input-item";
        inputArea.style.marginBlock = "5px";

        return inputArea;
    }

    createDeleteButton() {
        const button = document.createElement("button");
        button.className = "delete-button";
        const buttonIcon = document.createElement("i");
        buttonIcon.className = "fa fa-trash fa-sm";
        button.appendChild(buttonIcon);
        
        return button;
    }

    createResults(data) {
        const result = document.querySelector('.result-list');

        if(document.querySelector(`div.${data}`) != null)
        {
            return;
        }

        const inputDiv = document.createElement("div");
        inputDiv.className = data;
        inputDiv.style.display = "none";
        const inputName = document.createElement("h5");

        inputName.appendChild(document.createTextNode(this.name + " is:  "));
        inputName.style.fontWeight = "600";

        const selectedInputs = document.createElement("h6");
        selectedInputs.className = data;
        selectedInputs.style.display = "flex";
        selectedInputs.style.flexDirection = "row";
        selectedInputs.style.justifyContent = "space-between";

        inputDiv.append(inputName, selectedInputs);
        result.appendChild(inputDiv);
                
        saveButton.addEventListener('click', function() { 
            inputDiv.style.display = 'flex';   
            inputDiv.style.flexDirection = 'row';      
        }); 
        
        return selectedInputs;
    }
};

document.addEventListener('DOMContentLoaded', function intro() 
{
    const filters = [ new filterItem(1, "Bitmap", "number"), new filterItem(1, "Amount Transaction", "number"), new filterItem(1, "Processing Code", "text"), new filterItem(1, "City", "multiple", [ "İstanbul", "Ankara", "Adana"])];

    filters.forEach(filter => {
        if(filter.name.indexOf(' ') !== -1)
        {
            filter.name = filter.name.replace(/\s+/g, '');
        }
        const newFilter = document.createElement("p");
        var checkbox = filter.createCheckbox();
        newFilter.append(checkbox, filter.createLabel());
        list.appendChild(newFilter);
        
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) 
            {
                if(displaySelection.getElementsByTagName('*').length !=  0)
                {
                    var operator = filter.createOperator("connective");
                    operator.id = filter.name;
                    displaySelection.append(operator);
                }

                var link = filter.createLink();
                
                link.addEventListener('click', function() {
                    inputBox.className = "input-area-display";
                    filter.createResults(filter.name);
                
                    if(document.querySelector(`div#${filter.name}`) === null) 
                    {
                        const div = document.createElement("div");
                        div.id = filter.name;
                        div.style.position = "relative";
                        document.querySelector('.input-list').append(div);
                    
                        addButton.addEventListener('click', function(){
                            const inputArea = filter.createInputArea();

                            const firstOperator = filter.createOperator("connective", filter.name);
                            const secondOperator = filter.createOperator(filter.data, filter.name);
                            const input = filter.createInput(filter.name, filter.data);
                            const deleteButton = filter.createDeleteButton();

                            deleteButton.addEventListener('click', function() {
                                inputArea.remove();
                            });
                            
                            inputArea.append(firstOperator, secondOperator, input, deleteButton);                
                            div.append(inputArea);
                        });
                    
                        div.append(
                            filter.createOperator(filter.data, filter.name),
                            filter.createInput(filter.name, filter.data), 
                            filter.createDeleteButton());
                    
                        document.querySelector('.input-list').append(div);

                        closeIcon.addEventListener('click', function() {
                            div.style.display = "none";
                        });
                    }
                    else
                    {
                        document.querySelector(`div#${filter.name}`).style.display = "";
                    }
                });
            }
            else 
            {
                var items = document.getElementsByClassName(`${filter.name}`);
                Array.from(items).forEach(function (child) {
                    child.remove();
                });

                var _items = document.querySelectorAll(`#${filter.name}`);
                Array.from(_items).forEach(function (child) {
                    child.remove();
                });
                
                var buttons = document.getElementsByClassName("plus-button");
                Array.from(buttons).forEach(function (child) {
                    child.remove();
                });
            }
        });
        
        setTimeout(function () { 
            saveButton.addEventListener('click', function(){
                var inputs = document.querySelectorAll(`.${filter.name}.user-input`);
                var operators = document.querySelectorAll(`#operator.${filter.name}`);
                var resultLine = document.querySelector(`h6.${filter.name}`);

                if(resultLine != null)
                {
                    resultLine.innerHTML = "";
                    resultLine.innerHTML += '\n <p style="padding-left:10px;">' + operators[0].value + '</p><p style="padding-left:5px;"> <u>' + inputs[0].value + '</p></u>';

                    for(i = 1; i <= operators.length/2; i++) 
                    {
                        resultLine.innerHTML += '\n <p style="padding-left:10px;">' + operators[2*i-1].value + '</p><p style="font-style: italic; font-weight: 500; padding-left:10px;"> ' + operators[2*i].value + '</p><p style="padding-left:5px;"> <u>' + inputs[i].value + '</p></u>';
                    }
                }
            });}, 1000);
        
        closeIcon.addEventListener('click', function() {
            inputBox.className = "input-area";
        });
    });
});
