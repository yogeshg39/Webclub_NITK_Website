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

function upArrowPressed() {
var element = document.getElementById("image1");
element.style.top = parseInt(element.style.top) - 20 + 'px';
}

function downArrowPressed() {
var element = document.getElementById("image1");
element.style.top = parseInt(element.style.top) + 20 + 'px';
}

function moveSelection(evt) {
    switch (evt.keyCode) {
         case 37:
          leftArrowPressed();
          break;
        case 39:
            rightArrowPressed();
            break;
       /* case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;*/
        }
};

function docReady()
{    
    window.addEventListener('keydown', moveSelection);

    var helpResponse = "<p class='text'>###Commands###<br/>about ..........Get to know about us!<br/>news ...........Latest updates from web club.<br/>member -list ...Get the full list of members.<br/>member [name] ..Details about our members</p>";
    
    var aboutResponse = "<p class='text'>We are a group of computer science enthusiasts at National Institute of Technology karnataka, Surathkal. From core computing to web development, we have a diverse set of interests.<br/> We conduct many activities to promote dissemination of computer science knowledge among students of all branches. Some of these include:<p class='text marginLeft10'>-Talks<br/>-OPCs(Online Programming competitions)<br/>-Software Freedom Week<br/>-Leading college fest website development</p></p>";
    
    var memberResponse = "<p class='text'>----Flags----<br/><p class='text marginLeft10'>-list ..........Get the full list of members.</p></p><p class='text'>---Options---<br/><p class='text marginLeft10'>[name] .........Get details about a member.</p></p>";


    var members  = '{ "members" : [' +
                '{ "firstName":"Ankit" , "lastName":"Deepak" , "post":"Convenor" },' +
                '{ "firstName":"Yuvraj" , "lastName":"Singh" , "post":"Design Head" },' +
                '{ "firstName":"Yogesh" , "lastName":"Ghaturle" , "post":"Joint-Convenor" } ]}';


    var membersObject = JSON.parse(members);
    var membersArray = membersObject.members;


    $('#currCmd').keydown(function (event) {
        triggerCmd(event, $(this));
    });


    function triggerCmd(event, elem) {
        if (event.which == 13) {
            event.preventDefault();
            var command = elem.text();
            elem.removeAttr('id').removeAttr('contenteditable');
            $("#cmd").append('<br/>><div id="response"  class="line">' + parseCommand(command) + '</div>');

            $("#cmd").append('<br/>><div id="currCmd" contenteditable="true"  class="line"></div>');
            $('#currCmd').focus();
            $('#currCmd').keydown(function (event) {
                triggerCmd(event, $(this));
            });
        }
    }

    function parseCommand(command) {
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

        if (command.split(' ')[0] == 'member') {
            if (command.split(' ')[1] == '-list') {
                return printMemberList();
            }
            else {
                return getMemberDetail(command.split(' ')[1]);
            }
        }
        else {
            return '<p class="text">\'' + command + '\': command not found. <br/>For the list of commands, type \'help\'</p>';
        }
    }

    function printMemberList() {

        var returnValue='';
        
        for (i = 0; i<membersArray.length; i++) {

            returnValue+= '<p class="text">' + membersArray[i].firstName + " " + membersArray[i].lastName + '</p>';

            
        }

        return returnValue;
    }


    function getMemberDetail(name) {
        if (name == '' || name == null) {
            return memberResponse;
        }
        else {
            //insert member fetch code here!
            /*naive implementaion */

            /*Searching for the name traversing the list of name. If full name given then need to implement trie*/

            console.log(name);
           
            for (i = 0; i < membersArray.length; i++) {

                var nameLC = name.toLowerCase();
                console.log(nameLC);
                var memberLC=membersArray[i].firstName.toLowerCase();

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