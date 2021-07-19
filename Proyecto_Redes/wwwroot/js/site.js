// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your JavaScript code.

$(document).ready(function () { //DOM cargado, siempre va 
   
});




function joinFuntion()
{ //Oculta la seccion join
    var obj = document.getElementById("join");
    if (obj.style.display === "none")
        obj.style.display = "block";
    else
        obj.style.display = "none";
    //oculta la seccion choose
    var obj = document.getElementById("choose");
    if (obj.style.display === "none")
        obj.style.display = "block";
    else
        obj.style.display = "none";
    //oculta el boton join
    document.getElementById("btnjoin").style.display = "none";
    document.getElementById("btnback").style.display = "block";
    document.getElementById("url").style.display = "none";
}

function createParty()
{
    var obj = document.getElementById("choose");
    if (obj.style.display === "none")
        obj.style.display = "block";
    else
        obj.style.display = "none";

    var obj1 = document.getElementById("create");
    if (obj1.style.display === "none")
        obj1.style.display = "block";
    else
        obj1.style.display = "none";
    document.getElementById("btnback").style.display = "none";
    document.getElementById("btncreateP").style.display = "block";
    document.getElementById("btnbackchoose").style.display = "block";
    document.getElementById("url").style.display = "none";
}
function BackJoin()
{
    var obj = document.getElementById("join");
    if (obj.style.display === "block")
        obj.style.display = "none";
    else
        obj.style.display = "block";
    //oculta la seccion choose
    var obj = document.getElementById("choose");
    if (obj.style.display === "block")
        obj.style.display = "none";
    else
        obj.style.display = "block";
    //oculta el boton join
    document.getElementById("btnjoin").style.display = "block";
    document.getElementById("btnback").style.display = "none";
    document.getElementById("url").style.display = "block";
}
function BackChoose()
{
    var obj = document.getElementById("choose");
    if (obj.style.display === "block")
        obj.style.display = "none";
    else
        obj.style.display = "block";

    var obj2 = document.getElementById("join");
    if (obj2.style.display === "block")
        obj2.style.display = "none";
    else
        obj2.style.display = "none";

    document.getElementById("create").style.display = "none";

    document.getElementById("table").style.display = "none";
    

    document.getElementById("btnback").style.display = "block";
    document.getElementById("btnbackchoose").style.display = "none";
    document.getElementById("btncreateP").style.display = "none";
    document.getElementById("gamedetails").style.display = "none";
    document.getElementById("btnStartGame").style.display = "none"
    document.getElementById("url").style.display = "none";
}

function ShowGames()
{
    var obj = document.getElementById("table");
    if (obj.style.display === "none")
        obj.style.display = "block";
    else
        obj.style.display = "none";

    var obj1 = document.getElementById("choose");
    if (obj1.style.display === "none")
        obj1.style.display = "block";
    else
        obj1.style.display = "none";

    document.getElementById("create").style.display = "none";
    document.getElementById("url").style.display = "none";

    document.getElementById("btnbackchoose").style.display = "block";
    document.getElementById("btnback").style.display = "none";
    LoadDataNews();
}

function LoadDataNews() {
    var url = $('#url').val();
    $.ajax({
        url: "/Game/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
           
            'contentType': "application/json",
            'Accept': "application/json"
        },
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.gameId + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td><button onclick= "JoinGame(' + "'" + item.gameId + "'" + ')">Join</button>  <button onclick= "gameInfo(' + "'" + item.gameId + "'" + ')">Info</button>  </td>';
                       
            });
            $('.tbody').html(html);

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function Isready(id) {
    var name = $('#NickName').val();
    var password = $('#PasswordServer').val();

    var gameId = id;

    var url = $('#url').val();

    $.ajax({
        url: "/Game/info/",

        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'name': name,
            'password': password,
            'gameId': gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },

        success: function (result) {
            var myJSON = JSON.parse(result)
           
            $("#id").html("Game Id: " + myJSON.gameId);
            $("#name").html("Name: " + myJSON.name);
            $("#owner").html("Owner: " + myJSON.owner);
            $("#password").html("password: " + myJSON.password);
            $("#players").html("players: " + myJSON.players);
            $("#psychos").html("psychos: " + myJSON.psychos);
            $("#psychoWin").html("psychoWin: " + myJSON.psychoWin);
            $("#status").html("status: " + myJSON.status);
            $("#rounds").html("rounds: " + myJSON.rounds);
            $("#nameG").html("Player Name: " + $('#NickName').val());
            $("#status").html("status: " + myJSON.status);
            var index=0;
            $.each(myJSON.players, function (key, item) {
                index += 1;

            });
            if (index >= 5) {
                
                if (myJSON.owner == name) {
                    startGame(gameId);
                   
                } else {
                    showGame(gameId);

                }

            } else {
                alert("La partida no tiene suficientes jugadores");
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    })
}

function GetGroup(id){
    var name = $('#NickName').val();
    var password = $('#Password').val();
    var url = $('#url').val();
    var gameId = id;
    var val = [];
  
    $(':checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });

    var group = {
        group: val,
    };

    if (val == "") {
        alert("please select players")
        
    } else {
        
        $.ajax({
            url: "/Game/ProposeGroup",
            data: JSON.stringify(group),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            headers: {
                'url': url,
                'name': name,
                'password': password,
                'gameId': gameId,
                'contentType': "application/json",
                'Accept': "application/json"
            },
            success: function (result) {
                InfoGame(gameId);
                
            },
            error: function (errorMessage) {
                alert("no funciona");
            }
        })

    }

}
function Go(id)
{
    var name = $('#NickName').val();
    var password = $('#Password').val();
    var url = $('#url').val();
    var choose
    if (document.getElementById('yes').checked == true) {
        choose = true
    } else { choose = false }
    var gameId = id;
    var group = {
        group: choose,
    };
    $.ajax({
        url: "/Game/Go",
        data: JSON.stringify(group),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'name': name,
            'password': password,
            'gameId': gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },
        success: function (result) {
            alert("Leaving")
            InfoGame(gameId);

        },
        error: function (errorMessage) {
            alert("Wait for others players");
        }
    })
}

function optiongetaway(id) {
    var gameId = id;
    alert("Wait for the leader");
    InfoGame(gameId);

}

function InfoGame(id) {

    var name = $('#NickName').val();
    var password = $('#PasswordServer').val();
    var gameId = id;
    var url = $('#url').val();
    
    document.getElementById("btnbackchoose").style.display = "none";
    
    document.getElementById("readyInGame").style.display = "block";
    
    $.ajax({
        url: "/Game/info/",

        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'name': name,
            'password': password,
            'gameId': gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },

        success: function (result) {
            var myJSON = JSON.parse(result);
            var resulta = "";
            var index = 0;
            $("#nameG").html("Player Name: " + $('#NickName').val());
            $.each(myJSON.rounds, function (key, item) {
                index += 1;
                $("#Roundleader").html("Round leader: " + item.leader);
                $("#roundsG").html("Round: " + (item.id + 1));
                resulta = item.leader;

            });
            if (resulta == name) {
                document.getElementById("group").style.display = "block";
                document.getElementById("readyInGame").setAttribute('onclick', 'GetGroup(' + "'" + gameId + "'" + ')');
            } else {
                document.getElementById("group").style.display = "none";
                document.getElementById("readyInGame").setAttribute('onclick', 'optiongetaway(' + "'" + gameId + "'" + ')');
            }
            $.each(myJSON.psychos, function (key, item) {
                if (item == name) { result = 1;} 
               
            });
            if (result == 1) {
                $("#statusG").html("You are: " + "psycho");
            } else {
                $("#statusG").html("You are: " + "normal");
            }
            
            
            var html = '';
            $.each(myJSON.players, function (key, item) {
                html += '<label id="namePlayer">' + item+'</label>';
                html += '<input type="checkbox" name="selector[]" value="' + item+'"><br>';
                
            });
            $('#group').html(html);

            $.each(myJSON.rounds, function (key, item1) {
                if ((index - 1) == item1.id) {
                    $.each(item1.group, function (key, item2) {
                        if (item2.name == name) {
                            document.getElementById("group").style.display = "none";
                            document.getElementById("question").style.display = "block";
                            document.getElementById("readyInGame").setAttribute('onclick', 'Go(' + "'" + gameId + "'" + ')');

                        }

                    });

                }

            });

        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    })

}
function showGame(id) {

    
    document.getElementById("gamedetails").style.display = "none";
    document.getElementById("btnStartGame").style.display = "none";
    document.getElementById("ready").style.display = "none";
    document.getElementById("game").style.display = "block";
    InfoGame(id);
}

function gameInfo(Id)
{
    var name = $('#NickName').val();
    var password = $('#PasswordServer').val();

    var gameId = Id;
        
    var url = $('#url').val();

   

    $.ajax({
        url: "/Game/info/",
        
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url':url,
            'name': name,
            'password': password,
            'gameId': gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },
        
        success: function (result) {
            var myJSON = JSON.parse(result)
            document.getElementById("table").style.display = "none";
            document.getElementById("gamedetails").style.display = "block"
            $("#id").html("Game Id: " + myJSON.gameId);
            $("#name").html("Name: " + myJSON.name);
            $("#owner").html("Owner: " + myJSON.owner);
            $("#password").html("password: " + myJSON.password);
            $("#players").html("players: " + myJSON.players);
            $("#psychos").html("psychos: " + myJSON.psychos);
            $("#psychoWin").html("psychoWin: " + myJSON.psychoWin);
            $("#status").html("status: " + myJSON.status);
            $.each(myJSON.rounds, function (key, item) {
                $("#rounds").html("rounds: " + item.id);

            });
           
            if (name == myJSON.owner) {
                document.getElementById("btnStartGame").style.display = "block"
                document.getElementById("btnStartGame").setAttribute('onclick', 'Isready(' + "'" + myJSON.gameId + "'" + ')');
            } else {
                document.getElementById("ready").style.display = "block"
                document.getElementById("ready").setAttribute('onclick', 'Isready(' + "'" + myJSON.gameId + "'" + ')');
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    })
}


function CreateNewGame()
{
    var url = $('#url').val();
    var owner = $('#NickName').val();
    var body = {
        name: $('#ServerName').val(),
        password: $('#PasswordServer').val()

    };

    $.ajax({
        url: "/Game/Create",
        data: JSON.stringify(body),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'name': owner,
            'contentType': "application/json",
            'Accept':"application/json"
        },
        success: function (result) {
            
        var myJSON = JSON.parse(result);
            alert("juego creado" );
            document.getElementById("create").style.display = "none"
            document.getElementById("btncreateP").style.display = "none" 
            document.getElementById("gamedetails").style.display = "block"
            $("#id").html("Game Id: " + myJSON.gameId);
            $("#name").html("Name: " + myJSON.name);
            $("#owner").html("Owner: " + myJSON.owner);
            $("#password").html("password: " + myJSON.password);
            $("#players").html("players: " + myJSON.players);
            $("#psychos").html("psychos: " + myJSON.psychos);
            $("#psychoWin").html("psychoWin: " + myJSON.psychoWin);
            $("#status").html("status: " + myJSON.status);
            $("#rounds").html("rounds: " + myJSON.rounds);
            document.getElementById("btnStartGame").style.display = "block"
            document.getElementById("btnStartGame").setAttribute('onclick', 'Isready(' + "'" + myJSON.gameId + "'" + ')');
        },
        error: function (errorMessage) {
            alert("no funciona");
        }
    })

}

function JoinGame( gameId1) {
    var url = $('#url').val();

    var body = {
        gameId: gameId1,
        name: $('#NickName').val(),
        password: $('#PasswordServer').val()

    };

    $.ajax({
        url: "/Game/Join",
        data: JSON.stringify(body),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'contentType': "application/json",
            'Accept': "application/json"
        },
        success: function (result) {
           
            var myJSON = JSON.parse(result);
            
            if (myJSON.message != undefined) {
                alert(myJSON.message);
                gameInfo(gameId1);
            } else {
                if (myJSON.error == "You are already part of this game") {
                    alert(myJSON.error);
                    gameInfo(gameId1);
                } else {
                    isInGroup(gameId1);
                    
                }
            }
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    })

    

}
function isInGroup(id)
{
    var name = $('#NickName').val();
    var password = $('#PasswordServer').val();
    
    var gameId = id;

    var url = $('#url').val();

    $.ajax({
        url: "/Game/info/",

        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url': url,
            'name': name,
            'password': password,
            'gameId': gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },

        success: function (result) {
          
            var myJSON = JSON.parse(result)

            $("#players").html("players: " + myJSON.players);
            
            var index = 0;
            $.each(myJSON.players, function (key, item) {
                
                if (item == name) {
                    index = 1;
                }
            });
            if (index == 1) {
                gameInfo(gameId);
            } else {
                alert("Sorry the game already started");
            }
            
        },
        error: function (errorMessage) {
            alert(errorMessage);
        }
    })
    
}
function ProposeGroup(gameId) {
    var name = $('#NickName').val();
    var password = $('#PasswordUser').val();
    var url = $('#url').val();
    //aqui va el var de jugadores 

    $.ajax({
        url: "/Game/ProposeGroup",
        data: JSON.stringify(body),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url':url,
            'name': name,
            'password': password,
            'idGame':gameId,
            'contentType': "application/json",
            'Accept': "application/json"
        },
        success: function (result) {

           

        },
        error: function (errorMessage) {
            alert("no funciona");
        }
    })

}

function startGame(gameId) {
    
    var url = $('#url').val();
    var name = $('#NickName').val();
    var password = $('#PasswordUser').val();
    var id = gameId;

    $.ajax({
        
       
        url: "/Game/StartGame",
        type: "HEAD",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        headers: {
            'url':url,
            'name': name,
            'password': password,
            'gameId': id,
            'contentType': "application/json",
            'Accept': "application/json"
        },
        success: function (result) {

            alert("Juego iniciado");
            showGame(id);
         
        },
        error: function (errorMessage) {
            alert("No funciona");
        }
    })

}