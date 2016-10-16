var obj = {"tickets":[
    {"email": "poop@poop.com",
    "description": "poop desc",
    "category": "poop cat",
    "image": "poop img",
    "url": "poop url",
    "timestamp": "poop time",
    "status": "0"},
    {"email": "poop@poop.com",
    "description": "poop desc",
    "category": "poop cat",
    "image": "poop img",
    "url": "poop url",
    "timestamp": "poop time",
    "status": "0"},
    {"email": "poop@poop.com",
    "description": "poop desc",
    "category": "poop cat",
    "image": "poop img",
    "url": "poop url",
    "timestamp": "poop time",
    "status": "0"},
    {"email": "poop@poop.com",
    "description": "poop desc",
    "category": "poop cat",
    "image": "poop img",
    "url": "poop url",
    "timestamp": "poop time",
    "status": "0"}
]};

$(document).ready( function () {
    updateTable();
    $('#dataTable').DataTable();
    addRowHandlers();
} );


function updateTable() {
        for(var ct = 0; ct < obj.tickets.length; ct++){
            var row = document.createElement("tr");
            var email = document.createElement("td");
            email.appendChild(document.createTextNode(obj.tickets[ct].email));
            row.appendChild(email);
            var category = document.createElement("td");
            category.appendChild(document.createTextNode(obj.tickets[ct].category));
            row.appendChild(category);
            var status = document.createElement("td");
            status.appendChild(document.createTextNode(obj.tickets[ct].status));
            row.appendChild(status);
            var time = document.createElement("td");
            time.appendChild(document.createTextNode(obj.tickets[ct].timestamp));
            row.appendChild(time);
            document.getElementById("tableBody").appendChild(row);
    }
}

function addRowHandlers() {
    var table = document.getElementById("dataTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) {
                return function() {
                        document.getElementById("wrapper").style.filter = "blur(20px) brightness(80%)";
                        document.getElementById("modalPane").style.display = "block";
                        //document.getElementById("wrapper").style.transition = "filter 0.3s";
                    };
            };
        currentRow.onclick = createClickHandler(currentRow);
    }
}

function removeBlur() {
    document.getElementById("wrapper").style.filter = "";
    document.getElementById("modalPane").style.display = "none";
}

function statusClick() {
    alert("t");
}

/*var node = document.createElement("LI");
var textnode = document.createTextNode("Water");
node.appendChild(textnode);
document.getElementById("tableBody").appendChild(node);*/