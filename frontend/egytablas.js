//http://localhost/APIegytablasok/backend/index.php?versenyzok
document.addEventListener("DOMContentLoaded", function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const selectButton = document.getElementById("select");

    createButton.addEventListener("click", async function () {
        let autoversenyzid = document.createElement("nev").value;
        const baseUrl ="http://localhost/APIegytablasok/backend/index.php?versenyzok/" + autoversenyzid;
        const formdata = new FormData(document.getElementById("dolgozoForm"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés");
        }else{
            console.error("Sikertelen feltöltés");
        }
        return response;
    });

    readButton.addEventListener("click", async function(){
        const baseUrl ="http://localhost/APIegytablasok/backend/index.php?versenyzok";
        let options = {
            method: "GET",
            mode: "cors"
        }
        let response = await fetch(baseUrl, options);
        if(response.ok){
            let data = await response.json();
            egytablaListazas(data);
        }else{
            console.error("Hiba a szerver válaszában");
        }

    });

    function egytablaListazas(egytablasok){
        let egytablaDiv = document.getElementById("egytablaslista");
        let tablazat = egytablaFejlec();
        for(let egytabla of egytablasok){
            tablazat += egytablaSor(egytabla);
        }
        egytablaDiv.innerHTML = tablazat + "</tbody></tbody>";
        return egytablaDiv;
    };

    function egytablaSor(egytabla){
        let sor = `<tr>
        <td>${egytabla.autoversenyzid}</td>
        <td>${egytabla.csapat}</td>
        <td>${egytabla.versenyzo}</td>
        <td>${egytabla.eletkor}</td>
        <td>${egytabla.palya}</td>
        <td>${egytabla.koridoS}</td>
        <td>${egytabla.kor}</td>
        <td>${egytabla.koridoN}</td>
        <td>
            <button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes('${egytabla.autoversenyzid}', '${egytabla.csapat}', '${egytabla.versenyzo}', '${egytabla.eletkor}', '${egytabla.palya}', '${egytabla.koridoS}', '${egytabla.kor}', '${egytabla.koridoN}')"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>            
        </td>
        </tr>`;
        return sor;
    };

    function egytablaFejlec(){
        let fejlec = `<table class="table table-striped">
        <thead>
            <tr>
                <th>AutoversenyzőId: </th>
                <th>Csapat: </th>
                <th>Versenyzők: </th>
                <th>Életkor: </th>
                <th>Pálya: </th>
                <th>KöridőS: </th>
                <th>Kör: </th>
                <th>KöridőN: </th>
                <th>Művelet: </th>
            </tr>
        </thead>
        <tbody>`;
        return fejlec;
    };
    
});

function adatBetoltes(autoversenyzid, csapat, versenyzo, eletkor, palya, koridoS, kor, koridoN){
    let baseUrl="http://localhost/APIegytablasok/backend/index.php?versenyzok/" + autoversenyzid;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options)
    document.getElementById("autoversenyzid").value=autoversenyzid;
    document.getElementById("csapat").value=csapat;
    document.getElementById("versenyzo").value=versenyzo;
    document.getElementById("eletkor").value=eletkor;
    document.getElementById("palya").value=palya;
    document.getElementById("koridoS").value=koridoS;
    document.getElementById("kor").value=kor;
    document.getElementById("koridoN").value=koridoN;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }else{
            console.error("Hiba a szerverben!");
        }
    });
}
