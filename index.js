//init
document.querySelector('#result').hidden = true;
document.querySelector('#error').hidden = true;
//chargement des données météo depuis le fichier json
async function chargementMeteo(){
    try{
        const data = await fetch('meteo_api.json');
        if (!data.ok) {
            throw new Error('Impossible de charger les données météo.');
        } 
        return await data.json();
    }catch(error){
        document.querySelector('#error').hidden = false;
        console.error(error);
        document.querySelector('#error').textContent = `Erreur : ${error.message}`
        document.querySelector('#error').style.color = "red";
        document.querySelector('#error').style.backgroundColor = "white";
        document.querySelector('#error').style.padding = "20px";
    }
}

//recherche météo par ville
async function rechercheMeteo() {
    let villeInput = document.querySelector('#villeInput').value.trim().toCapital();

    if(!villeInput){
        document.querySelector('#result').hidden = true;
        document.querySelector('#error').hidden = false;
        document.querySelector('#error').textContent = "Veillez entrer le nom d'une ville pour voir sa Météo."
        document.querySelector('#error').style.color = "white";
        document.querySelector('#error').style.padding = "20px";
        return;
    }

    // Chargement des données météo
    const donneesMEteo = await chargementMeteo();
    console.log(donneesMEteo);
    
    if (!donneesMEteo) return;

    // Recherche de la ville dans les données
    const meteo = donneesMEteo[villeInput];
    
    console.log(villeInput);
    console.log(meteo);
    if (meteo) {
        let img = meteo.condition.toLowerCase();
        console.log(img);
        document.querySelector('#result').hidden = false;
        document.querySelector('#error').hidden = true;
        document.querySelector('#villeOutput').textContent = `${villeInput}`;
        document.querySelector('#vent').textContent = `${meteo.wind_speed}`;
        document.querySelector('#humidite').textContent = `${meteo.humidity}`;
        document.querySelector('#condition').textContent = `${meteo.condition}`;
        document.querySelector('#temperature').textContent = `${meteo.temperature}`;
        document.querySelector('#description').textContent = `${meteo.description}`;
        document.querySelector('#sunrise').textContent = `${meteo.sunrise}`;
        document.querySelector('#sunset').textContent = `${meteo.sunset}`;
        document.querySelector('#image').src = `img/${img}.png`;
        
    } else {
        document.querySelector('#result').hidden = true;
        document.querySelector('#error').hidden = false;
        document.querySelector('#error').textContent = `Ville non trouvée. Vérifiez l'orthographe.`;
        document.querySelector('#error').style.color = "white";
        document.querySelector('#error').style.padding = "20px";
    }
}



//gestion de l'evenement au clique

document.querySelector('#btnSubmit').addEventListener('click', rechercheMeteo);


//fonction utilitaire
String.prototype.toCapital = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}