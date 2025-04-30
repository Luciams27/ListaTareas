//constante para que se guarden las tareas (Array)
let listaDeTareas = [];
let contadorTareas = 0;

//recupero las tareas guardadas en el navegador
listaDeTareas = localStorage.getItem("tareasGuardadas");
//como estan guardadas en formato json le cambio el formato 
listaDeTareas= JSON.parse(listaDeTareas);


listaDeTareas.forEach(element => {
    displayTarea(element);
});


//selecciona el boton de añadir tarea y le crea un evento
//para que cuando se haga clic sobre el boton se ejecute la función de crear tarea
document.getElementById("buttonAdd").addEventListener('click', crearTarea);

function crearTarea(){
    //leer los datos del input
    let textoTarea = document.getElementById("inputTarea").value;
    let tipoTarea = document.getElementById("tipoTarea").value;

    //comprobar que hay datos
    //trim() elimina los espacios del principio y final de un string
    textoTarea = textoTarea.trim();
    //comprueba que textoTarea contenga un string no vacío
    if(textoTarea === ''){
//texto tarea no contiene nada
//mostrar un mensaje
        document.getElementById("error").textContent = "No has introducido ninguna tarea";
        return;

//finaliza la ejecución de la función
    }
//Borrar el mensaje no has introducido ninguna tarea cuando se añada una tarea
document.getElementById("error").textContent="";

//crear objeto para el texto de la tarea y el tipo para guardar tarea
    const tarea = {
        id: contadorTareas,
        texto: textoTarea,
        tipo: tipoTarea,
        tareaRealizada: false
    }
contadorTareas++;

    //añadir la tarea al array
listaDeTareas = [tarea,...listaDeTareas];
//guardar el array de tareas en el navegador
localStorage.setItem("tareasGuardadas", JSON.stringify(listaDeTareas));
console.log(listaDeTareas);

//creo una variable para añadir el cuadradito de colores (icono) dependiendo del tipo de tarea
//se ha borrado toda la función porque se copia abajo, y la llamo para no tener dos repetidas

displayTarea(tarea);

}





// COPIADO DE ANTES:







function displayTarea(tarea){

    let iconoTipo = '&#129001;';
    if (tarea.tipo === 'obligatoria'){
        iconoTipo = '&#128998;';
    }else if(tarea.tipo ==='urgente'){
        iconoTipo = '&#128997;';
    }

//crear un nodo del tipo li (etiqueta de html li) con la tarea y añadirlo al ul
    const li = document.createElement('li');

//añade contenido al nodo li

// dentro del li añadir el check y el span para tacharlo cuando se realice(solo el texto) y el boton eliminar//
// check es una casilla de verificacion

li.innerHTML = `
            <div class="completado" data-id="${tarea.id}">
            <input type="checkbox" class="tareaRealizada">
            ${iconoTipo} 
            <span class="texto-tarea">${tarea.texto}</span>
            </div>
                    <button class="eliminar">🗑️</button>`;


            //color de fondo según tipo de tarea
            // if(tarea.tipo === "obligatoria"){
            //     li.style.backgroundColor = colorObligatoria;
            // }else if(tarea.tipo === "urgente"){
            //     li.style.backgroundColor = colorUrgente;
            // }

//añadir un hijo del elemento UL (html(listaTareas)) sin que se borre el anterior
    document.getElementById("listaTareas").appendChild(li);

//crear un evento escuchador para que el botón eliminar borre la tarea completa
    li.querySelector('.eliminar').addEventListener('click', function(){

        //averiguar que id tiene la tarea
let idTarea = li.querySelector('div').getAttribute('data-id')
//eliminar la tarea del array
listaDeTareas = listaDeTareas.filter(item => item.id  != idTarea);
localStorage.setItem("tareasGuardadas", JSON.stringify(listaDeTareas));
console.log(listaDeTareas);
//borrar la tarea de pantalla
        li.remove();
    })

//crear un evento escuchador al checkbox para que cuando click en el check se cambie la transpariencia y se tache el texto

    li.querySelector('.tareaRealizada').addEventListener('click', function(){
//comprueba si la casilla está seleccionada
        if(li.querySelector('.tareaRealizada').checked == true){
//está seleccionado el check bajo la opacidad
                li.style.opacity = '0.8';
//tacha el texto
                li.querySelector('.texto-tarea').style.textDecoration = "line-through"
//modifica el cobjeto: el valor tarearealizada del obejto a true
                tarea.tareaRealizada = true;
        }else{
//no está selecionado el check sube otra vez la opacidad
        li.style.opacity = '1';
//Destacha el texto 
        li.querySelector('.texto-tarea').style.textDecoration = "none";
//modifica el objeto como tarea no realizada (false)
        tarea.tareaRealizada =false;
                            }
        localStorage.setItem("tareasGuardadas", JSON.stringify(listaDeTareas));
    });

    document.getElementById("inputTarea").value = '';

}