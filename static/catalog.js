


function submitBtn() {
    console.log("In the function bmi");

    var head1 = document.getElementById("whenLabel");
    head1.innerHTML = "<h1>The following record has been entered</h1>"
    document.getElementById("whenLabel").style.textAlign = "center";
    document.getElementById("whenLabel").style.fontSize = "medium";

    //get the value for when
    var when = document.getElementsByClassName("when_input")[0].value;

    //get value for who
    var who = document.getElementsByClassName("who_input")[0].value;

    //get value for comment
    var comment = document.getElementsByClassName("comment_input")[0].value;

    //get value for about
    var about = document.getElementsByClassName("about_input")[0].value;
    
    //get value for media
    var media = document.getElementsByClassName("media_input")[0].value;
    //get value for what
    var what = document.getElementsByClassName("what_input")[0].value;

    //get value for whom
    var whom = document.getElementsByClassName("whom_input")[0].value;

    //get value for ref
    var refId = document.getElementsByClassName("ref_input")[0].value;

    $.ajax({
        url: '/catalog',
        type: "POST",
        data: {when: when, who: who, comment: comment, about:about, media:media,what: what,whom:whom,ref:refId},
        success: function(data) {
        submitBtn();
        },
        error: function() {
            alert("Error");
        }
    });

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.id = "table"
    thead.id ="thead"
    tbody.id = "tbody"

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('container1').appendChild(table);

    let row1 = document.createElement('tr');
    let heading1 = document.createElement('th');
    heading1.innerHTML = "Attribute";
    let heading2 = document.createElement('th');
    heading2.innerHTML = "Value";


    row1.appendChild(heading1);
    row1.appendChild(heading2);
    thead.appendChild(row1);


    // Creating and adding data to second row of the table
    let row2 = document.createElement('tr');
    let data_1 = document.createElement('td');
    data_1.innerHTML = "When";
    let data_2 = document.createElement('td');
    data_2.innerHTML = when;

    row2.appendChild(data_1);
    row2.appendChild(data_2);
    tbody.appendChild(row2);


    // Creating and adding data to third row of the table
    let row3 = document.createElement('tr');
    let data3 = document.createElement('td');
    data3.innerHTML = "Who";
    let data4 = document.createElement('td');
    data4.innerHTML = who;

    row3.appendChild(data3);
    row3.appendChild(data4)
    tbody.appendChild(row3);
    
    // Creating and adding data to third row of the table
    let row4 = document.createElement('tr');
    let data_5 = document.createElement('td');
    data_5.innerHTML = "Comment";
    let data_6 = document.createElement('td');
    data_6.innerHTML = comment;

    row4.appendChild(data_5);
    row4.appendChild(data_6)
    tbody.appendChild(row4);

    // Creating and adding data to third row of the table
    let row5 = document.createElement('tr');
    let data_7 = document.createElement('td');
    data_7.innerHTML = "About";
    let data_8 = document.createElement('td');
    data_8.innerHTML = about;

    row5.appendChild(data_7);
    row5.appendChild(data_8)
    tbody.appendChild(row5);

    // Creating and adding data to third row of the table
    let row6 = document.createElement('tr');
    let data_9 = document.createElement('td');
    data_9.innerHTML = "Media";
    let data_10 = document.createElement('td');
    data_10.innerHTML = media;

    row6.appendChild(data_9);
    row6.appendChild(data_10)
    tbody.appendChild(row6);

    // Creating and adding data to third row of the table
    let row7 = document.createElement('tr');
    let data_11 = document.createElement('td');
    data_11.innerHTML = "What";
    let data_12 = document.createElement('td');
    data_12.innerHTML = what;

    row7.appendChild(data_11);
    row7.appendChild(data_12)
    tbody.appendChild(row7);


    // Creating and adding data to third row of the table
    let row8 = document.createElement('tr');
    let data_13 = document.createElement('td');
    data_13.innerHTML = "Whom";
    let data_14 = document.createElement('td');
    data_14.innerHTML = whom;

    row8.appendChild(data_13);
    row8.appendChild(data_14)
    tbody.appendChild(row8);

    // Creating and adding data to third row of the table
    let row9 = document.createElement('tr');
    let data_15 = document.createElement('td');
    data_15.innerHTML = "Reference ID";
    let data_16 = document.createElement('td');
    data_16.innerHTML = refId;

    row9.appendChild(data_15);
    row9.appendChild(data_16)
    tbody.appendChild(row9);

    //removing of the current labels and input boxes
    document.getElementById("table").border="1";
    var whenInput = document.getElementById("whenInput");
    whenInput.remove();
    var whoLabel = document.getElementById("whoLabel");
    whoLabel.remove();
    var whoInput = document.getElementById("whoInput");
    whoInput.remove();
    var commentLabel = document.getElementById("commentLabel");
    commentLabel.remove();
    var commentInput = document.getElementById("commentInput");
    commentInput.remove();
    var aboutLabel = document.getElementById("aboutLabel");
    aboutLabel.remove();
    var aboutInput = document.getElementById("aboutInput");
    aboutInput.remove();
    var mediaLabel = document.getElementById("mediaLabel");
    mediaLabel.remove();
    var mediaInput = document.getElementById("mediaInput");
    mediaInput.remove();
    var whatLabel = document.getElementById("whatLabel");
    whatLabel.remove();
    var whatInput = document.getElementById("whatInput");
    whatInput.remove();
    var whomLabel = document.getElementById("whomLabel");
    whomLabel.remove();
    var whomInput = document.getElementById("whomInput");
    whomInput.remove();
    // var refLabel = document.getElementById("refLabel");
    // refLabel.remove();
    var refInput = document.getElementById("refInput");
    refInput.remove();
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.remove();

    var head2 = document.getElementById("refLabel");


    const s = when;
    const d = new Date(s);
    const year = d.getFullYear();


    head2.innerHTML = "<h2>The Total Count of Tweet for year" + ' ' + year +' is' + "</h2>"
    document.getElementById("refLabel").style.textAlign = "center";
    document.getElementById("refLabel").style.fontSize = "small";
    document.getElementById("refLabel").style.gridRowStart = "3";
    //editing the table style to fit the container

    table.style.gridColumnStart="3"
    table.style.gridColumnEnd="9"

    var container1 = document.getElementById('container1')
    container1.style.gridTemplateRows="repeat(3, 0.3fr)"
    
    
}



document.querySelector('#submitBtn').addEventListener("click", submitBtn);

