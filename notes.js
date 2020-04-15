const fs = require('fs')
const chalk = require('chalk')


const addNotes = (titulo_funct, body_funct) => {
    // cargar notas 
    const notas_cargadas = loadNotes()

    const duplicateNotes = 
        notas_cargadas.find( (inota) => inota.title === titulo_funct )
    
    
        console.log(duplicateNotes)
        console.log(titulo_funct)


    if (!duplicateNotes){
        notas_cargadas.push({
            title: titulo_funct,
            body: body_funct
        })
    
        console.log(notas_cargadas)
        saveNotes(notas_cargadas)
    
    }
    else{
        console.log('Titulo de nota duplicada..')
    }
}

const delNote =  (titToDelete) => {

    const notas_cargadas = loadNotes()

    const notaEncontrada = 
        notas_cargadas.filter(      (inota) =>  !(inota.title === titToDelete)      ) 
                
    if (notaEncontrada.length === notas_cargadas.length ){
        // No se encontro la nota a eliminar
        console.log(chalk.red.inverse('no encontrado...' + titToDelete) )
    }
    else{
        // notaEncontrada se queda con la lista de notas final
        console.log(notaEncontrada)
        fs.unlinkSync('notes.json')
        saveNotes(notaEncontrada)
        console.log(chalk.green.inverse('se ha guardado la nueva lista de notas..') )

    }




}


const loadNotes = () => {
    try{
       const dataBuffer = fs.readFileSync('notes.json')
       const jsonString = dataBuffer.toString()
       return JSON.parse(jsonString)

    }catch (e) {
        return []
    }
} // end of function loadNotes


const saveNotes = (nota) => {
        const dataJson = JSON.stringify(nota)
        fs.writeFileSync('notes.json',dataJson)
}

const listNotas = () => {
    
    const lista = loadNotes ()

    lista.forEach( (element) => {
        console.log(chalk.red.inverse(element.title) +':: ' + chalk.green.inverse(element.body) )
    })

}

const leerNota = (titulo) =>{

    const lista = loadNotes()

    const notaEncontrada = lista.find( (nota) => nota.title ===titulo )
    

    if( notaEncontrada )
    {
        console.log( notaEncontrada )
    }
    else    
    {
        console.log(titulo + '...no encontrada')
    }
}


module.exports = {
    addNotes: addNotes,
    delNote: delNote,
    listNotas: listNotas,
    leerNota: leerNota
}