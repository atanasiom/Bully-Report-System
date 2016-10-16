var obj = {"tickets":[
    {"email": "poop@poop.com1",
    "description": "poop desc1",
    "category": "poop cat1",
    "image": "poop img1",
    "url": "poop url1",
    "timestamp": 1476610889008,
    "status": 1},
    {"email": "poop@poop.com2",
    "description": "poop desc2",
    "category": "poop cat2",
    "image": "poop img2",
    "url": "poop url2",
    "timestamp": 1476610903695,
    "status": 2},
    {"email": "poop@poop.com3",
    "description": "poop desc3",
    "category": "poop cat3",
    "image": "poop img3",
    "url": "poop url3",
    "timestamp": 1476610915238,
    "status": 3},
    {"email": "poop@poop.com4",
    "description": "poop desc4",
    "category": "poop cat4",
    "image": "poop img4",
    "url": "poop url4",
    "timestamp": 1476610927056,
    "status": 0}
]};

$(document).ready( function () {
    $.get( "http://bully-report-system.azurewebsites.net/api/ticket/submit", function( data ) {
        $(obj).html(data);
    }).fail(function() {
        alert( "error" );
    });
    updateTable(obj);
    $(document.getElementsByClassName("brt_sidebarButton")[0]).addClass("brt_sidebarButtonSelected");
} );


function updateTable(obj) {
    setTimeout(function(){for(var ct = 0; ct < obj.tickets.length; ct++){
            var row = document.createElement("tr");
            var email = document.createElement("td");
            email.appendChild(document.createTextNode(obj.tickets[ct].email));
            row.appendChild(email);
            var category = document.createElement("td");
            category.appendChild(document.createTextNode(obj.tickets[ct].category));
            row.appendChild(category);
            var status = document.createElement("td");
        
            var goodStatus;
            switch (obj.tickets[ct].status) {
                case 0:
                    goodStatus = "Unread";
                    break;
                case 1:
                    goodStatus = "Needs Attention";
                    break;
                case 2:
                    goodStatus = "Ongoing";
                    break;
                case 3:
                    goodStatus = "Resolved";
                    break;
            }
        
            status.appendChild(document.createTextNode(goodStatus));
            row.appendChild(status);
            var time = document.createElement("td");
            time.appendChild(document.createTextNode(obj.tickets[ct].timestamp));
            row.appendChild(time);
            document.getElementById("brt_tableBody").appendChild(row);
    }
    $('#brt_dataTable').DataTable();
    document.getElementById("brt_tableDiv").style.visibility = "visible";
    document.getElementById("brt_tableDiv").style.opacity = "1";
    document.getElementById("brt_loadingDiv").style.display = "none";
    addRowHandlers();
    }, 0);
}

$(document).keyup(function(e) {
  if (e.keyCode === 27) $('#brt_modalPane').click();   // esc
});

function addRowHandlers() {
    var rows = getTableRows();
    
    for (i = 1; i < rows.length; i++) {
        var currentRow = rows[i];
        var timeCol = currentRow.getElementsByTagName("td")[3];
        var time = timeCol.innerHTML;
        
        var createClickHandler = function(time) {
            return function() {
                addBlur();
                createModal(time);
            };
        };
        currentRow.onclick = createClickHandler(time);
    }
}

function getTableRows() {
    var table = document.getElementById("brt_dataTable");
    return table.getElementsByTagName("tr");
}

function createModal(clickedTime) {
    var dropDiv = document.getElementById("brt_selectDiv");
    var dropMenu = dropDiv.getElementsByTagName("select")[0];
    var optionArr = dropMenu.getElementsByTagName("option");
    
    for (i = 0; i < obj.tickets.length; i++) {
        if (obj.tickets[i].timestamp == clickedTime) {
            var status;
            var unread = "<option>Unread</option>"
            var needsAttention = "<option>Needs Attention</option>"
            var ongoing = "<option>Ongoing</option>"
            var resolved = "<option>Resolved</option>"
            
            switch (obj.tickets[i].status) {
                case 0:
                    status = "Unread";
                    unread = "<option selected=\"selected\">Unread</option>"
                    break;
                case 1:
                    status = "Needs Attention";
                    needsAttention = "<option selected=\"selected\">Needs Attention</option>"
                    break;
                case 2:
                    status = "Ongoing";
                    ongoing = "<option selected=\"selected\">Ongoing</option>"
                    break;
                case 3:
                    status = "Resolved";
                    resolved = "<option selected=\"selected\">Resolved</option>"
                    break;
            }
            
            dropMenu.innerHTML = unread + needsAttention + ongoing + resolved;
            
            document.getElementById("brt_email").innerHTML = "Submitted by <a href=\"mailto:" + obj.tickets[i].email + "\">" + obj.tickets[i].email + "</a>";
            var d = new Date(obj.tickets[i].timestamp);
            var dateString = (d.getMonth()+1) + "/" +  d.getDate() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + " " + (d.getHours() >= 12 ? "PM" : "AM");
            document.getElementById("brt_time").innerHTML = dateString;
            document.getElementById("brt_url").innerHTML = "<a href=" + obj.tickets[i].url + "\">" + obj.tickets[i].url + "</a>";
            document.getElementById("brt_category").innerHTML = obj.tickets[i].category;
            document.getElementById("brt_description").innerHTML = obj.tickets[i].description;
            return;
        }
    }
}

function addBlur() {
    document.getElementById("brt_wrapper").style.filter = "blur(1px) brightness(75%)";
    document.getElementById("brt_modalPane").style.visibility = "visible";
    document.getElementById("brt_modal").style.opacity = "1";
    document.getElementById("brt_modal").style.visibility = "visible";
}

function removeBlur() {
    document.getElementById("brt_wrapper").style.filter = "";
    document.getElementById("brt_modalPane").style.visibility = "hidden";
    document.getElementById("brt_modal").style.visibility = "hidden";
    document.getElementById("brt_modal").style.opacity = "0";
}

function modalClick(event){
    event.stopPropagation();
}

function statusClick(status) {
    selectSidebarItem(status);
    
    if (status == -1) {
        $("#brt_tableBody tr").remove();
        updateTable(obj);
        return;
    }
    
    var filteredObj = {"tickets":[]};
    
    for (var i = 0; i < obj.tickets.length; i++) {
        if (obj.tickets[i].status == status) {
            filteredObj.tickets.push(obj.tickets[i]);
        }
    }
    
    $("#brt_tableBody tr").remove();
    updateTable(filteredObj);
}

function selectSidebarItem(status) {
    var sidebarButtons = document.getElementsByClassName("brt_sidebarButton");
    
    for (var i = 0; i < sidebarButtons.length; i++) {
        if (status + 1 == i) {
            $(sidebarButtons[i]).addClass("brt_sidebarButtonSelected");
        } else {
            $(sidebarButtons[i]).removeClass("brt_sidebarButtonSelected");
        }
    }
}

/*#brt_category,*/