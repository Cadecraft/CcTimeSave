// Script for CcTimeSave

// Sys defs
const recentVersion = "0.0.2";
const editDate = "2023/2/17";
const morningStar = "[successful]";

// Defs
var timestamps = [
    {
        name: "Example",
        y: 1984,
        m: 5,
        d: 3,
        hr: 3,
        min: 30,
        sec: 1,
        ms: 201
    },
    {
        name: "Example 2",
        y: 2020,
        m: 1,
        d: 1,
        hr: 12,
        min: 0,
        sec: 0,
        ms: 0
    }
];

// Funcs
function numTo2Dig(innum) {
    var res = ""+innum;
    if(res.length < 2) res = "0" + res;
    return res;
}
function displayTimeStamps() {
    const timestamps_list = document.getElementById("timestamps-list");
    // Clear list
    while(timestamps_list.firstChild) {
        timestamps_list.removeChild(timestamps_list.lastChild);
    }
    // Add each timestamp
    for(let i = timestamps.length-1; i >= 0; i--) {
        // Create element
        var thisTimestamp = timestamps[i];
        var newElem = document.createElement('div');
        newElem.style = "width: 380px; height: 20px; background-color: #222630; margin-top:5px;";
        var time_as_string = thisTimestamp.y
            + '/' + numTo2Dig(thisTimestamp.m)
            + '/' + numTo2Dig(thisTimestamp.d)
            + " - " + numTo2Dig(thisTimestamp.hr)
            + ":" + numTo2Dig(thisTimestamp.min)
            + "." + numTo2Dig(thisTimestamp.sec)
            + "." + thisTimestamp.ms;
        var newElemInner = "<input type=\"text\" id=\"" + "t-" + i + "-name" + "\" placeholder=\"Unnamed\" style=\"width: 100px; height: 12px;\" value=\""+ thisTimestamp.name + "\">";
        newElemInner+="<h2 style=\"font-size:12px; display:inline;\"> : " +time_as_string + "</h2>";
        newElemInner+="<a id=\"" + "t-" + i + "-delete" + "\" title=\"Delete this timestamp\" style=\"float:right;\">&nbsp; X &nbsp;</a>"
        newElem.innerHTML = newElemInner;
        // Add element
        timestamps_list.appendChild(newElem);
        // Set event listeners
        let thisi = i;
        document.getElementById('t-' + thisi + '-name').addEventListener('change', function() {
            // Update name, update save, and display
            timestamps[thisi].name = document.getElementById('t-' + thisi + '-name').value;
            saveTimeStamps();
            displayTimeStamps();
        });
        document.getElementById('t-' + thisi + '-delete').addEventListener('click', function() {
            // Delete from list, update save, and display
            timestamps.splice(thisi, 1);
            saveTimeStamps();
            displayTimeStamps();
        });
    }
}
function saveTimeStamps() {
    chrome.storage.local.set({ savedtimestamps: timestamps }).then(() => {
        // Succeeded
    });
}
function loadTimeStamps() {
    chrome.storage.local.get(["savedtimestamps"]).then((result) => {
        // Load the result
        if(result.savedtimestamps != null) {
            timestamps = JSON.parse(JSON.stringify(result.savedtimestamps));
        }
        // Display the result after load
        displayTimeStamps();
    });
}
function addTimeStamp() {
    var thisDate = new Date();
    var newToAdd = {
        name: "",
        y: thisDate.getFullYear(),
        m: thisDate.getMonth(),
        d: thisDate.getDate(),
        hr: thisDate.getHours(),
        min: thisDate.getMinutes(),
        sec: thisDate.getSeconds(),
        ms: thisDate.getMilliseconds()
    };
    // Add to list, update save, and display
    timestamps.push(newToAdd);
    saveTimeStamps();
    displayTimeStamps();
}
document.getElementById('create-timestamp').addEventListener('click', function() {
    addTimeStamp();
});

// Load time stamps (will display after loaded)
loadTimeStamps();