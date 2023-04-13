class filterItem {

    constructor(id, name, data) {
        this.id = id;
        this.name = name;
        this.data = data;
    }

    selectOperatorType(data) {
        switch(data) {
            case "number":
                return [">", "=", "<"];
            case "text":
                return ["contains", "equals"];
            case "connective":
                return ["AND", "OR"]
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

    createOperator(type) {
        const operator = document.createElement("select");
        operator.id = "operator";

        this.selectOperatorType(type)?.forEach(element => {  
            operator.append(this.createSelectOption(element));
        });
        
        return operator;
    }

    createCheckbox() {
        const newFilter = document.createElement("p");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        const label = document.createElement("label");
        label.htmlFor = this.name;
        label.appendChild(document.createTextNode(this.name));

        newFilter.append(checkbox, label);
        
        return checkbox;
    }

    createLink() {
        const newLink = document.createElement("a");
        newLink.className = "input-entry";
        newLink.className = this.name;
        newLink.href = "#";
        newLink.appendChild(document.createTextNode(this.name));

        const br = document.createElement("span");
        br.className = this.name;
        br.innerHTML = "<br/>";

        displaySelection?.append(newLink, br);
    }

    createInput(name, type, list) {
        if(type == "multiple") 
        {
            const select = document.createElement("select");
            select.className = "user-input";
            select.className = name;
            select.id = "input";
            select.appendChild(list.forEach(e => e.createSelectOption(e)));
            return select;
        }
        else
        {
            const input = document.createElement("input");
            input.className = "user-input";
            input.className = name;
            input.id = "input";
            input.type = type;
            input.placeholder = `Type a ${type}`;
            return input;
        }
    }

    createPlusButton() {
        const button = document.createElement("button");
        button.className = "plus-button";
        const buttonIcon = document.createElement("i");
        buttonIcon.className = "fa-duotone fa-plus";
        button.appendChild(buttonIcon);
        return button;
    }

    createResults(data) {
        const result = document.querySelector('.result-list');
        const inputDiv = document.createElement("div");
        inputDiv.className = data;
        inputDiv.style.display = "none";
        const inputName = document.createElement("h5");

        inputName.appendChild(document.createTextNode(this.name + " is:  "));
        inputName.style.fontWeight = "600";

        const selectedInputs = document.createElement("h6");
        selectedInputs.id = data;
        selectedInputs.style.display = "flex";
        selectedInputs.style.flexDirection = "row";
        selectedInputs.style.justifyContent = "space-between";

        inputDiv.append(inputName, selectedInputs)
        result?.appendChild(inputDiv);
                  
        saveButton?.addEventListener('click', function() { 
            inputDiv.style.display = 'flex';   
            inputDiv.style.flexDirection = 'row';      
        }); 
          
        return result;
    }
}


