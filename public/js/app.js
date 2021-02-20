//catching the create button
const create = document.querySelector("#create");

//a temporary storage to hold the button's previous innerhtml so when we cancel, we return to previous state
let temp = "";

//a function to create the div that contains the update and creation questions and buttons
function create_card() {

    //the background for the form
    const wrap = document.createElement("div");
    wrap.setAttribute("id", "wrap");

    //creating the label for the name and the name input
    const label_name = document.createElement("label")
    label_name.setAttribute("for", "name");
    label_name.innerText = "Username: ";
    const name = document.createElement("input");
    name.setAttribute("id", "name");
    name.setAttribute("type", "text");
    name.setAttribute("name", "name");
    name.setAttribute("placeholder", "Please enter students username");

    //creating the label fot the id and the id input
    const label_id = document.createElement("label")
    label_id.setAttribute("for", "id");
    label_id.innerText = "Id: ";
    const id = document.createElement("input");
    id.setAttribute("id", "id");
    id.setAttribute("type", "string");
    id.setAttribute("name", "id");
    id.setAttribute("placeholder", "Please enter students id");

    //creating the label for the grade and the grade input
    const label_grade = document.createElement("label")
    label_grade.setAttribute("for", "grade");
    label_grade.innerText = "Grade: ";
    const grade = document.createElement("input")
    grade.setAttribute("id", "grade");
    grade.setAttribute("type", "number");
    grade.setAttribute("name", "grade");
    grade.setAttribute("min", 0);
    grade.setAttribute("placeholder", "Please enter students grade");

    //append all inputs and labels in the order they were created above
    wrap.append(label_name);
    wrap.append(name);
    wrap.append(label_id);
    wrap.append(id);
    wrap.append(label_grade);
    wrap.append(grade);

    //create a div for the button so the buttons in the form can be formatted properly
    const wrap_button = document.createElement("div");
    const cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.setAttribute("type", "button");

    const submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.setAttribute("type", "button");


    //append the buttons into the new button wrap
    wrap_button.append(cancel);
    wrap_button.append(submit);
    wrap_button.setAttribute("id", "flex");

    //now, append the button wrap into the form
    wrap.append(wrap_button);
    return wrap;
}

//this event tells us that the user wants to create a new user, and hence converts the "create new user button" into a form
create.addEventListener("submit", (event) => {
    event.preventDefault();
    //save prev state
    temp = create.innerHTML;

    let wrap = create_card();
    //replace the current innerHTML, but innerHTML as already been saved.
    create.innerHTML = wrap.outerHTML;


});

//invoked when the user wants to cancel the form during the creation
const options = document.querySelector(".options");
options.addEventListener("click", (event) => {
    if (event.target.innerText === "Cancel") {
        console.log(temp);
        create.innerHTML = temp;
    }

});

//checks to see if a string is not empty
function isValid(string) {
    if (!(string === "")) {
        return true;
    }
    return false;
}

//this creates feedback messages and colors the box green or red depending on if the input is valid or not
function invalid(val) {
    //create a feedback div
    const fb = document.createElement("div");
    fb.setAttribute("id", "fb");

    //if the type is a text
    if (val.type === "text") {
        //if the string is invalid
        if (!isValid(val.value)) {
            val.classList.add("red");
            val.classList.remove("green");
            fb.innerText = "-String cannot be empty.";
            fb.classList.add("red_back");

        }
        //if the string is valid
        else {
            val.classList.add("green");
            val.classList.remove("red");
            fb.innerText = "-Looks good!!";
            fb.classList.add("green_back");

        }
    }
    //if it is a number
    if (val.type === "number") {
        //if it is invalid
        if (val.value === undefined) {
            val.classList.add("red");
            val.classList.remove("green");
            fb.innerText = "-Number cannot be undefined";
            fb.classList.add("red_back");
        }
        //if it is valid
        else {
            val.classList.add("green");
            val.classList.remove("red");
            fb.innerText = "-Looks good!!";
            fb.classList.add("green_back");
        }
    }
    //append the feedback
    if (val.nextElementSibling.id === "fb") {
        val.nextElementSibling.remove();
        val.insertAdjacentElement("afterend", fb);
    }
    else {
        val.insertAdjacentElement("afterend", fb);
    }
}

//if the user clicks submit while creating
create.addEventListener("click", (event) => {

    if (event.target.innerText === "Submit") {
        const name = document.querySelector("#name");
        const id = document.querySelector("#id");
        const grade = document.querySelector("#grade");

        username = name.value;
        identification = id.value;
        grades = grade.value;

        //if the values are correct, submit the request
        if ((isValid(username) === true) && (isValid(identification) === true) && (grades != undefined)) {
            event.currentTarget.submit();
        }
        //if the values are incorrect, highlight and send feedback.
        else {
            invalid(name);
            invalid(id);
            invalid(grade);
        }

    }
});


//if the user enters an input, continuously check to see if the value is incorrect or not
create.addEventListener("input", (e) => {
    invalid(e.target);
});



//edit
const edit = document.querySelectorAll(".edit");
for (let i in edit) {
    edit[i].addEventListener("submit", (event) => {
        event.preventDefault();
        //if no edit card as been created for this user
        if (edit[i].parentElement.parentElement.nextElementSibling === null) {
            //then, create one
            wrap = create_card();
            wrap.classList.add("adjust");
            //append it directly under the user
            edit[i].parentElement.parentElement.style.marginBottom = "0";
            edit[i].parentElement.parentElement.insertAdjacentElement("afterend", wrap);
            //when clickced
            wrap.addEventListener("click", (e) => {
                //if cancel, delete the card
                if (e.target.innerText === "Cancel") {
                    edit[i].parentElement.parentElement.nextElementSibling.remove();
                    edit[i].parentElement.parentElement.style.marginBottom = "";
                }
                //else submit, if possible
                else if (e.target.innerText === "Submit") {
                    const curr = edit[i].parentElement.parentElement.nextElementSibling;
                    let name = null;
                    let id = null;
                    let grade = null;

                    for (let j of curr.children) {
                        if (j.id === "name") {
                            name = j;
                        }
                        else if (j.id === "id") {
                            id = j;
                        }
                        else if (j.id === "grade") {
                            grade = j;
                        }
                    }
                    username = name.value;
                    identification = id.value;
                    grades = grade.value;

                    console.log(username);
                    console.log(identification);
                    console.log(grades);
                    //if possible submit
                    if ((isValid(username) === true) && (isValid(identification) === true) && (grades != undefined)) {
                        edit[i].append(name);
                        edit[i].append(id);
                        edit[i].append(grade);
                        event.target.submit();
                    }
                    //else highlight wrongs
                    else {
                        invalid(name);
                        invalid(id);
                        invalid(grade);
                    }
                }
            });
            wrap.addEventListener("input", (e) => {
                invalid(e.target);
            })
        }
    });
}
