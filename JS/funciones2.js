
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
        texto: textoTarea,
        tipo: tipoTarea,
        realizada: false
    }

//creo una variable para añadir el cuadradito de colores (icono) dependiendo del tipo de tarea

    let iconoTipo = '&#129001;';
    if (tarea.tipo === 'obligatoria'){
        iconoTipo = '&#128998;';
    }else if(tarea.tipo ==='urgente'){
        iconoTipo = '&#128997;';
    }

//crear un nodo del tipo li (etiqueta de html li) con la tarea y añadirlo al ul
    const li = document.createElement('li');

//añade contenido al nodo li
            li.innerHTML = `
//*dentro del li añadir el check y el span para tacharlo cuando se realice(solo el texto) y el boton eliminar//
//*check es una casilla de verificacion
            <div class=completado>
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
        li.remove();
    })

//crear un evento escuchador al checkbox para que cuando click en el check se cambie la transpariencia y se tache el texto

    li.querySelector('.tareaRealizada').addEventListener('click', function() {
//comprueba si la casilla está seleccionada
        if(li.querySelector('.tareaRealizada').checked == true){
//está seleccionado el check bajo la opacidad
                li.style.opacity = '0.5';
//tacha el texto
                li.querySelector('.texto-tarea').style.textDecoration = "line-through"
//modifica el cobjeto: el valor tarearealizada del obejto a true
                tarea.realizada = false;
        }else{
//no está selecionado el check sube otra vez la opacidad
        li.style.opacity = '1';
//Destacha el texto 
        li.querySelector('.texto-tarea').style.textDecoration = "none";
//modifica el objeto como tarea no realizada (false)
        tarea.realizada =true;
                            }
                          });

    document.getElementById("inputTarea").value = '';
}