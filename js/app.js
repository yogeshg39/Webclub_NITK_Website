Array.prototype.next = function() {
    return this[++this.current];
};
Array.prototype.prev = function() {
    return this[--this.current];
};
Array.prototype.current = 0;

function leftArrowPressed() {
    var element = document.getElementById("image1");
    element.style.left = parseInt(element.style.left) - 20 + 'px';
    element.style.transform = "rotate(-7deg)";
}

function rightArrowPressed() {
    var element = document.getElementById("image1");
    element.style.left = parseInt(element.style.left) + 20 + 'px';
    element.style.transform = "rotate(7deg)";
}

function upArrowPressed(evt) {
    evt.preventDefault();
    var prevCmd = cmdHistory.prev();
    if ($("#currCmd").is(":focus") == true && prevCmd) {
        $('#currCmd').text(prevCmd ? prevCmd : '');
        setToLast('currCmd');
    } else cmdHistory.next();

}

function downArrowPressed(evt) {
    evt.preventDefault();
    var nextCmd = cmdHistory.next();
    if ($("#currCmd").is(":focus") == true) {
        $('#currCmd').text(nextCmd ? nextCmd : '');
        if(nextCmd){setToLast('currCmd');}
    } else cmdHistory.prev();
}
var setToLast=function(elName){
    var el=document.getElementById(elName);
    var jEl=$('#'+elName);
    var range = document.createRange();
    var sel = window.getSelection();
    console.log(el.childNodes);
    range.setStart(el.childNodes[0], jEl.text().length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed(evt);
            break;
        case 40:
            downArrowPressed(evt);
            break;
    }
};
var cmdHistory = [];

function docReady() {
    window.addEventListener('keydown', moveSelection);
    var members = '{ "members" : [' +
        '{ "firstName":"Ankit" , "lastName":"Deepak" , "post":"Convenor" },' +
        '{ "firstName":"Yuvraj" , "lastName":"Singh" , "post":"Design Head" },' +
        '{ "firstName":"Yogesh" , "lastName":"Ghaturle" , "post":"Joint-Convenor" } ]}';


    var membersObject = JSON.parse(members);
    var membersArray = membersObject.members;


    $('#currCmd').keydown(function(event) {
        triggerCmd(event, $(this));
    });


    function triggerCmd(event, elem) {
        if (event.which == 13) {
            event.preventDefault();
            var command = elem.text();
            elem.removeAttr('id').removeAttr('contenteditable');
            var response = parseCommand(command);
            if (response) {
                $("#cmd").append('<br/>><div id="response"  class="line">' + response + '</div>');
                $("#cmd").append('<br/>><div id="currCmd" contenteditable="true"  class="line"></div>');
            } else {
                if (command == 'clear')
                    $("#cmd").append('><div id="currCmd" contenteditable="true"  class="line"></div>');
                else { $("#cmd").append('<br/>><div id="currCmd" contenteditable="true"  class="line"></div>'); }
            }
            $('#currCmd').focus();
            $('#currCmd').keydown(function(event) {
                triggerCmd(event, $(this));
            });
        }
    }

    function parseCommand(command) {
        cmdHistory.push(command);
        cmdHistory.next();
        cmdHistory.current = cmdHistory.length;
        if (command == '' || command == null) {
            return 'Please enter a command! For the list of commands, type \'help\'';
        }
        if (command == 'help') {
            return helpResponse;
        }
        if (command == 'about') {
            return aboutResponse;
        }
        if (command == 'member') {
            return memberResponse;
        }
        if (command == 'nitk') {
            nitk();
            return '';
        }
        if (command.split(' ')[0] == 'member') {
            if (command.split(' ')[1] == '-list') {
                return printMemberList();
            } else {
                return getMemberDetail(command.split(' ')[1]);
            }
        }

        if (command == 'clear') {
            document.getElementById('cmd').innerHTML = '';
            return;
        } else {
            return '<p class="text">\'' + command + '\': command not found. <br/>For the list of commands, type \'help\'</p>';
        }
    }

    function printMemberList() {

        var returnValue = '';

        for (i = 0; i < membersArray.length; i++) {

            returnValue += '<p class="text">' + membersArray[i].firstName + " " + membersArray[i].lastName + '</p>';


        }

        return returnValue;
    }


    function getMemberDetail(name) {
        if (name == '' || name == null) {
            return memberResponse;
        } else {
            //insert member fetch code here!
            /*naive implementaion */

            /*Searching for the name traversing the list of name. If full name given then need to implement trie*/

            console.log(name);

            for (i = 0; i < membersArray.length; i++) {

                var nameLC = name.toLowerCase();
                console.log(nameLC);
                var memberLC = membersArray[i].firstName.toLowerCase();

                if (nameLC.indexOf(memberLC) == 0) {

                    return memberDisplayModel(i);

                }
            }


            return "Member not found!";
        }
    }

    function memberDisplayModel(i) {

        $(".memberName").text(membersArray[i].firstName + " " + membersArray[i].lastName);
        $(".post").text(membersArray[i].post);

        $('#myModal').modal('show');

        return "Displayed";

    }


}
