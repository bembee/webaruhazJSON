$(function () {
    tablazatLetrehoz();
    clickEvent();
    $("#ok").click(ujTermekek);
    $("#ajax").click(ajax);
    $("article").on("click", "th", rendez);
});

var csokkeno = false;
var index = 0;
var termekek = [
    {
        termeknev: "CANDY Mosó- és szárítógép ",
        leiras: "Mosási hatékonyság: 'A' Szárítási hatékonyság: 'A' Energiafogyasztás (mosás-szárítás): 5,44 kW/ciklus ",
        keszlet: 6,
        ar: "120000"
    },
    {
        termeknev: "LG Alulfagyasztós hűtő",
        leiras: "Az LG Inverter lineáris kompresszora forradalmasította a hűtőszekrények lényegét az akár 32% energiamegtakarítással.",
        keszlet: 3,
        ar: "150000"
    },
    {
        termeknev: "Electrolux AutoSense felültöltős mosógép",
        leiras: "A kompakt Electrolux FlexCare mosógép minden mosásnál automatikusan beállítja a programidőt.",
        keszlet: 8,
        ar: "101900"
    }
];

var szovegJSON = '{"termeknev":"CANDY Mosó- és szárítógép,"leiras":"Mosási hatékonyság:A Szárítási hatékonyság: A Energiafogyasztás (mosás-szárítás): 5,44 kW/ciklus", "keszlet": "6", "ar":"120000"},{"termeknev":"LG Alulfagyasztós hűtő","leiras": "Az LG Inverter lineáris kompresszora forradalmasította a hűtőszekrények lényegét az akár 32% energiamegtakarítással.","keszlet":3,"ar":"150000"},termeknev: "Electrolux AutoSense felültöltős mosógép",{"leiras":"A kompakt Electrolux FlexCare mosógép minden mosásnál automatikusan beállítja a programidőt.","keszlet":"8","ar":"101900"}';

function json_Atalakitas() {
    var JSONTomb = JSON.parse(szovegJSON);
    return JSONTomb;
}

function tablazatLetrehoz() {
    $("#tablazat").empty();
    $("#tablazat").append("<table>");
    $("#tablazat table").append("<tr><th id = 'termeknev'>Megnevezés</th><th id = 'leiras'>Leírás</th><th id = 'keszlet'>Készleten</th><th id = 'ar'>Ár</th>");

    for (var i = 0; i < termekek.length; i++) {
        $("#tablazat table").append("<tr>");
        for (var item in termekek[i]) {
            if (item === "ar") {
                $("#tablazat table tr").eq(i + 1).append("<td>" + termekek[i][item] + " Ft</td>");
            } else {
                $("#tablazat table tr").eq(i + 1).append("<td>" + termekek[i][item] + "</td>");
            }
        }
        kiir(); //töröl gomb
        index++;
    }

}
function ujTermekek() {
//    if (validalas()) {
    var ujTermek = {};
    ujTermek.termeknev = $("#termeknev").val();
    ujTermek.leiras = $("#leiras").val();
    ujTermek.keszlet = $("#keszlet").val();
    ujTermek.ar = $("#ar").val();
    console.log($("#termeknev").val());
    console.log(ujTermek);
    termekek.push(ujTermek);
    tablaBeallit();
//    }
}


//function validalas() {
//    var arCode = document.getElementById('ar').value;
//    var arRGEX = /^[0-9]+$/;
//    var arResult = arRGEX.test(arCode);
//    if (arResult === false)
//    {
//        alert('Kérlek csak számot adj meg');
//        return false;
//    }
//    return true;
//
//}

function torles() {
    var id = $(this).attr("id");
    termekek.splice(id, 1);
    console.log(termekek);
    console.log(id);
    tablaBeallit();
}


function rendez() {
    var id = $(this).attr("id");
    termekek.sort(function (a, b) {
        if (id === "ar" || id === "keszlet") {
            if (!csokkeno) {
                return a[id] - b[id];
            } else if (csokkeno) {
                return b[id] - a[id];
            }
        } else {
            if (!csokkeno) {
                return Number(a[id] > b[id]) - 0.5;
            } else if (csokkeno) {
                return Number(b[id] > a[id]) - 0.5;
            }
        }
    });
    csokkeno = !csokkeno;
    tablaBeallit();
}


function kiir() {
    $("#tablazat table tr").eq(index + 1).append("<td><input type='button' class='torlesgomb' id='" + index + "' value='Törlés'></td>");
    $(".torlesgomb").click(torles);
}

function clickEvent() {
    $("article table th").eq(0).click(rendez);
    $("article table th").eq(1).click(rendez);
    $("article table th").eq(2).click(rendez);
    $("article table th").eq(3).click(rendez);
}

function tablaBeallit() {
    index = 0;
    tablazatLetrehoz();
    clickEvent();
}



function ajax() {
    $.ajax(
            {
                url: "jsontermekek.json",
                success: function (result) {
                    var termekTomb = result;
                    ajaxtablazat(termekTomb);
                }
            }
    );
}

function ajaxtablazat(tablazat) {
    $("#tablazatajax").append("<table>");
    $("#tablazatajax table").append();

    for (var i = 0; i < tablazat.length; i++) {
        $("#tablazatajax table").append("<tr>");
        for (var item in tablazat[i]) {
            if (item === "ar") {
                $("#tablazatajax table tr").eq(i + 1).append("<td>" + tablazat[i][item] + " Ft</td>");
            } else {
                $("#tablazatajax table tr").eq(i + 1).append("<td>" + tablazat[i][item] + "</td>");
            }
        }
        kiir(); //töröl gomb
        index++;
    }
}