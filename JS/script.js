/*
Website Name - Postman-Clone
Name : Vanshul Kesharwani
Date : 05/04/2022
Version : 4.2.1
Email : vkvanshulkesharwani54@gmail.com
Description : This is a Web app which can give us post and get request reply. Working on JavaScript. This project works without refreshing page.
*/

// Utility functions:
// 1. Utility function to get DOM element from string.
function getElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
};


// grabbing parameters box here from ID and hide it initially.
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// If the user clicks on parameters, hide the JSON box.
let customParameter = document.getElementById("customParameter");
customParameter.addEventListener("click", () => {
    document.getElementById("jsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
});

// If the user clicks on JSON, hide the all parameters boxes.
let json = document.getElementById("json");
json.addEventListener("click", () => {
    document.getElementById("jsonBox").style.display = "block";
    document.getElementById("parametersBox").style.display = "none";
    document.getElementById("newParameters").style.display = "none";
});

// Initialize number of parameters.
let parametersCount = 0;
// If the user clicks on + button, add more parameters.
let addParametersBtn = document.getElementById("addParametersBtn");
addParametersBtn.addEventListener("click", () => {
    // Adding new parameters from here.
    let newParameters = document.getElementById("newParameters");
    let stringOfParameters = `  
        <div class="row mb-3">
            <label for="parameterKey${parametersCount + 2}" class="col-sm-2 col-form-label">Parameter ${parametersCount + 2} :</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="parameterKey${parametersCount + 2}" placeholder="Enter parameter ${parametersCount + 2} Key">
            </div>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="parameterValue${parametersCount + 2}" placeholder="Enter parameter ${parametersCount + 2} Value">
            </div>
            <button class="col-sm-1 btn btn-dark deleteParameters"> - </button>
        </div>`;
    parametersCount++;
    // Convert the element string to DOM node.
    let parametersElement = getElementFromString(stringOfParameters);
    // Adding above string into DOM.
    newParameters.appendChild(parametersElement);
    // Adding event listener to removing parameters from minus button.
    let deleteParameters = document.getElementsByClassName("deleteParameters");
    for (let parameter of deleteParameters) {
        parameter.addEventListener("click", (e) => {
            // removing selected parameters from here.
            e.target.parentElement.remove();
        });
    };
});

// If user click on submit button.
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
    // Show "Please Wait" in the response box.
    document.getElementById("responseText").value = "Please wait fetching response...";
    // Fetch all the values that user entered.
    let url = document.getElementById("url").value;
    // Select element by their name. Whatever the element is checked it will give the value of element.
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user select parameters instead of JSON, Collect all parameters in object.
    if (contentType == "customParameter") {
        // Assign empty dataObj.
        let dataObj = {};
        for (let i = 0; i < parametersCount + 1; i++) {
            // Checking for deleted parameters.
            if (document.getElementById("parameterValue" + (i + 1)) != undefined) {
                // taking values by parameters.
                let keyOfParameter = document.getElementById("parameterKey" + (i + 1)).value;
                let valueOfParameter = document.getElementById("parameterValue" + (i + 1)).value;
                // Adding key value pair in our object dataObj.
                dataObj[keyOfParameter] = valueOfParameter;
            };
            // Convert object into string here.
            dataObj = JSON.stringify(dataObj);
        };
    } else {
        dataObj = document.getElementById("jsonText").value;
    };
});