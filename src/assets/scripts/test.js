let n = 10;
let grafo = {};

function insertList(next, d, c){
    if (next == undefined)
        next = null
    let newL = {
        dest : d,
        cost : c,
        next : next
    };
    return newL;
}

function insertEdge(o, d, c){
    if(o > n)
        console.log("Tamanho máximo é " + n);
    else
        grafo[o] = insertList(grafo[o], d, c);
}

function showLine(line){
    let aux = grafo[line];
    console.log(line);
    while(aux != undefined){
        console.log("|"+aux.dest+"|"+aux.cost+"|");
        aux = aux.next;
    }      
}

function showGrafo(){
    for(let i=0; i<=n; i++)
        if(grafo[i] == undefined)
            console.log(i);
        else showLine(i); 
}

console.log("ola");

insertEdge(1,2,3);
insertEdge(2,3,4);
insertEdge(3,4,5);
insertEdge(4,5,6);
insertEdge(1,3,4);
console.log(grafo);
showGrafo();

// aceitar apenas numeros 