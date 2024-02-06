document.querySelector("footer").innerHTML += "<a href='#top'><img id='up' src='../img/ico/up.png'></a>"; // Bouton retour vers le haut
/////// Fonctions de l'index ///////
function datetime() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').innerHTML = today.toLocaleDateString('fr', options);

    var heure = today.getHours();
    var minute = today.getMinutes();
    var seconde = today.getSeconds();
    if (minute < 10) {
        document.getElementById('heure').innerHTML = heure + ":0" + minute + ":" + seconde;
    }
    else if (seconde < 10) {
        document.getElementById('heure').innerHTML = heure + ":" + minute + ":0" + seconde;
    }
    else if (seconde < 10 && minute < 10) {
        document.getElementById('heure').innerHTML = heure + ":0" + minute + ":0" + seconde;
    }
    else {
        document.getElementById('heure').innerHTML = heure + ":" + minute + ":" + seconde;
    }
}
setInterval("datetime()", 50); // Actualisation à intervalle régulier

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.fillStyle = "white";
ctx.lineWidth = 5;
ctx.moveTo(0, 50);
ctx.bezierCurveTo(19, 5, 180, 10, 200, 50);
ctx.moveTo(0, 50);
ctx.bezierCurveTo(19, 100, 180, 100, 200, 50);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.strokeStyle = "skyblue";
ctx.fillStyle = "skyblue"
ctx.moveTo(50, 50);
ctx.bezierCurveTo(55, 25, 165, 30, 150, 52);
ctx.moveTo(50, 50);
ctx.bezierCurveTo(50, 80, 160, 75, 150, 52);
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.moveTo(100, 40);
ctx.bezierCurveTo(60, 85, 160, 65, 100, 43);
ctx.stroke();
ctx.fill();

document.getElementById('sound').volume = 0.2;
/////// Fonctions de la page outils ///////
function mdpAlea() {
    var maj = document.getElementById('maj').checked;
    var num = document.getElementById('num').checked;
    var long = document.getElementById('long').value;
    document.getElementById('long_value').innerHTML = long;
    var mdp = document.getElementById('password');
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charlong = char.length;
    mdp.value = '';
    for (i = 0; i < long; i++) {
        if (maj == true && num == false) {
            mdp.value += char.charAt(Math.floor(Math.random() * (charlong - 10)));
        }
        else if (maj == false && num == true) { //
            mdp.value += char.charAt(Math.floor(Math.random() * (charlong - 26 + 1)) + 26);
        }
        else if (maj == true && num == true) {
            mdp.value += char.charAt(Math.floor(Math.random() * charlong));
        }
        else { //
            mdp.value += char.charAt(Math.floor(Math.random() * ((charlong - 10) - 26)) + 26);
        }
    }
}
function mdpVerif() {
    var mdp = document.getElementById('password2').value;
    var prgs_bar = document.getElementById('prgs_bar');
    var nbr, maj, cs;
    prgs_bar.value = 0;
    if (mdp.length >= 8) {
        prgs_bar.value += 25;
    }
    for (var i = 0; i < mdp.length; i++) {
        if (isNaN(mdp.charAt(i)) == false) {
            nbr = true;
        }
        if (mdp.charCodeAt(i) >= 65 && mdp.charCodeAt(i) <= 90) { // 65=A et 90=Z
            maj = true;
        }
        if (mdp.charCodeAt(i) >= 58 && mdp.charCodeAt(i) <= 64 || mdp.charCodeAt(i) >= 33 && mdp.charCodeAt(i) <= 47) { // 65=A et 90=Z
            cs = true;
        }
    }
    if (nbr) {
        prgs_bar.value += 25;
    }
    if (maj) {
        prgs_bar.value += 25;
    }
    if (cs) {
        prgs_bar.value += 25;
    }
}
function conv() { // Conversion octet
    var octet = document.getElementById('o').value;
    var ko = document.getElementById('ko');
    var mo = document.getElementById('mo');
    var go = document.getElementById('go');
    var to = document.getElementById('TO');
    ko.value = octet * (9.77 * Math.pow(10, -4));
    mo.value = octet * (9.54 * Math.pow(10, -7));
    go.value = octet * (9.31 * Math.pow(10, -10));
    to.value = octet * (9.09 * Math.pow(10, -13));
}
function envoie_msg_Tchat() {
    msg = ""; // Initialisation barre 
    var t = new Date;
    var now = t.toLocaleTimeString();
    var historique = document.getElementById('tchat');
    var user = document.getElementById('user').value;
    user = user.charAt(0).toUpperCase() + user.slice(1); // Mettre première lettre (0) en majuscule et le reste en minuscule
    while (user == "") {
        user = "Invité";
    }
    var msg = document.getElementById('msg');
    historique.innerHTML += "<img src='img/ico/tchat/user.png' width = '23' alt = 'Visage humain'>" +"<span class='user'>"+ user + " - " +""+ msg.value + " (" + now + ")" +"</span>"+ "<br>";
    setTimeout(function () { bot_reponse(user, msg.value, historique, t, now); }, 2000); // Delai avant réponse du bot en milliseconde
    historique.scrollTop = historique.scrollHeight; // Scroll en bas automatique 
}
function bot() {
    return "C3PO";
}
function bot_reponse(user, msg, historique, t, now) {
    var bot_name = bot();
    now = t.toLocaleTimeString();
    if (msg.toUpperCase() == "BONJOUR" || msg.toUpperCase() == "SALUT") {
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name + " - " + "Bonjour " + user + " 👋" + " (" + now + ")</span><br>";
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" c3poChatbot est un chatbot très simple, basé sur le choix, réalisé en 44 lignes de JavaScript" + " (" + now +")"+"<br>";
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+ "Mais vous le saviez probablement de toute façon." + " (" + now +")"+"<br>";
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+ "1.Oui, je le savais!"+"</span>"+"<span class='bot'>"+" 2.Non, c'est nouveau."+"</span>"+"<br>";
    }
    if (msg == "1") {
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" Génial. Ce chat est encore en développement. Bonne visite !" + " (" + now +")"+"<br>";
    }
    if(msg == "2"){
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" Aah, vous ratez quelque chose !" + " (" + now +")" + "<br>";
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" Vous devriez le vérifier sur GitHub" + " (" + now +")" + "<br>";
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" <a href='https://github.com/iNyPix/Chatbot/' target='_blank'>Aller sur GitHub</a>" + " (" + now +")<br>";
    }
    else{
        historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name +" - "+" Désolé, je n'ai pas compris" + " (" + now +")" + "<br>";
    }
}
function iniTchat() {
    var bot_name = bot();
    historique = document.getElementById('tchat');
    historique.innerHTML = "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name+ " - " + "Bienvenue sur ce site internet.</span><br>";
    historique.innerHTML += "<img src='img/ico/tchat/c3po.png' width = '25' alt = 'Visage de C3PO'>"+"<span class='bot'>"+bot_name+ " - " + "Dite 'bonjour' ou 'salut' 🙂</span><br>";
}
/////// Fonctions de la pages contact ///////
function verif() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var mail = document.getElementById('mail').value;
    var phone = document.getElementById('phone').value;
    var sub = document.getElementById('subject').value;
    var msg = document.getElementById('message').value;
    if (firstname == '' || lastname == '' || mail == '' || phone == '' || isNaN(phone) == true || sub == '' || msg == '') {
        alert("Une ou plusieurs information(s) sont incomplète(s)");
        return false;
    } else {
        return true;
    }
}