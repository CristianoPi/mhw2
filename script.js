/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
// VARIABILI GLOBALI
let prima = null;
let seconda = null;
let terza = null;
//__________________

function changeCheck(spazio, spunta){
    //sostituisco casella vuota con casella piena (utilizzo replaceChild: https://www.html.it/pag/48891/dom-aggiungere-e-rimuovere-elementi/)
    spazio.removeChild(spazio.lastElementChild); //tolgo la vecchia img di casella non spuntata
    const img = document.createElement("img"); //creo il nuovo elemeto
    const srcAttr = document.createAttribute("src");
    if(spunta)
        srcAttr.value = "images/checked.png";
    else
        srcAttr.value = "images/unchecked.png";
    img.setAttributeNode(srcAttr);
    img.classList.add("checkbox");//gli do la classe dei checkbox
    spazio.appendChild(img);//l' appendo
    //__________________________________________
}

function risultato(d_1, d_2, d_3){
    //capisco qual è il risultato del quiz
    let ris = null;
    if(d_1 === d_2 || d_2 === d_3)
        ris = d_2;
    else
        if(d_1 === d_3)
            ris = d_1;
        else
            ris = d_1;
    //______________________________________

    //appendo il risultato in fondo la pagina
    const articolo= document.querySelector("article");
    const div= document.createElement("div");
    div.classList.add("risposta");
    const h1=document.createElement("h1");
    h1.textContent = RESULTS_MAP[ris]['title'];
    const p=document.createElement("p");
    p.textContent = RESULTS_MAP[ris]['contents'];
    const a= document.createElement("a");
    a.textContent="Ricomincia il quiz";
    const id=document.createAttribute("id");
    id.value = "bottone";
    a.setAttributeNode(id);
    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(a);
    articolo.appendChild(div);
    //_______________________________________

    //tolgo tutti i listener
    const rs = document.querySelectorAll(".choice-grid div");
    for (const r of rs) {
        r.removeEventListener('click', risposta);  
    }
    //______________________

    //attivo listener per bottone
    const b = document.querySelector("#bottone");
    b.addEventListener('click', ricarica);
    //______________
}


function risposta(event){   
    const spazio = event.currentTarget; //spazio --> choice--grid div
    const indice = spazio.dataset.questionId;

    switch(indice){
        case "one":
            prima=spazio.dataset.choiceId;
            console.log("scelta: "+prima);
            break;
        case "two":
            seconda=spazio.dataset.choiceId;
            console.log("scelta: "+seconda);
            break;
        case "three":
            terza=spazio.dataset.choiceId;
            console.log("scelta: "+terza);
            break;        
    }

    const os = document.querySelectorAll('[data-question-id='+indice+']');
    for (const o of os) {
        changeCheck(o, false);
        o.classList.remove("selezionato");
        o.classList.add("opaco");
    }
    changeCheck(spazio, true);
    spazio.classList.remove("opaco");
    spazio.classList.add("selezionato");
    

    if(prima!=null && seconda!=null && terza!=null){
        risultato(prima, seconda, terza);
    }
}

function ricarica(event){
    const articolo= document.querySelector("article");
    articolo.removeChild(articolo.lastChild);
    const rs = document.querySelectorAll(".choice-grid div");
    for (const r of rs) {
        r.classList.remove("selezionato");
        r.classList.remove("opaco");
        changeCheck(r, false);
        r.addEventListener('click', risposta);
    }
    prima = null;
    seconda = null;
    terza = null;
    const scrollStep = -window.scrollY / 40;
    const scrollInterval = setInterval(() => {  
        if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        } else {
        clearInterval(scrollInterval);
        }
    }, 15);
}

//MAIN
const blocchi = document.querySelectorAll(".choice-grid div");
for (const blocco of blocchi) {
    blocco.addEventListener('click', risposta);
}
//____

