/* Generar una página web dónde se introduzca los parámetros que nos permita una API(la que queráis) para mostrar por pantalla
una imágen o un vídeo */
window.addEventListener("load",function(){
    var select = document.getElementById("perros");
    var img = document.getElementById("img");
    listadoPerros();

    select.addEventListener("change", async function(){
        var razaValue = select.options[select.selectedIndex].value;
        var url = "https://dog.ceo/api/breed/" + razaValue + "/images/random";
        var info = await fetch(url);
        var objeto = await info.json();
        var urlFoto = objeto["message"];
        img.src = urlFoto;
    });

    async function listadoPerros(){
    var urlListado = "https://dog.ceo/api/breeds/list/all";
    var listadoPerros = await fetch(urlListado);
    var lista = await listadoPerros.json();
    var elementosLista = lista["message"];

    for (const [raza, tipo] of Object.entries(elementosLista)) {
        let perro = new Perro(raza, tipo);
        var newElement = document.createElement("option");
        newElement.value = perro.raza;
        newElement.textContent = perro.raza;
        select.appendChild(newElement);
        for(let i = 0; i < perro.tipo.length; i++){
            var newElement = document.createElement("option");
            newElement.value = perro.raza + "/" + perro.tipo[i];
            newElement.textContent = perro.raza + "-" + perro.tipo[i];
            select.appendChild(newElement);
        }
      }
    }
});

class Perro {
    constructor(raza, tipo){
        this.raza = raza;
        this.tipo = tipo;
    }
}