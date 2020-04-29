
const argumentos = require('yargs')
const notesFunction = require('./notes')

argumentos.version('1.0.0')

// Commandos a crear
//add 
argumentos.command(    {
        command:'add',
        describe:'agrega una nueva nota',
        builder:{
            title:{
                describe:'Titulo de nota',
                demandOption: true,
                type: 'string'
            },
            body:{
                describe:'Cuerpo de la nota..',
                demandOption:true,
                type:'string'
            }

        },
        handler:function (argv){
            notesFunction.addNotes(argv.title,argv.body)
        }

    } )


//read 
argumentos.command(    {
    command:'read',
    describe:'lee una nota existente' ,
    builder:{
        title:{
            describe:'Titulo de nota a buscar',
            demandOption: true,
            type: 'string'
        }
    },
    handler:function (argv){
        notesFunction.leerNota(argv.title)
    }

} )

//list 
argumentos.command(    {
    command:'list',
    describe:'Lista todas las notas..',
    handler:function (){
        console.log('Listado de notas:\n')
        notesFunction.listNotas()
    }

} )

//delete 
argumentos.command(    {
    command:'del',
    describe:'eliminar nota..',
    builder:{
        title:{
            describe:'Titulo de la nota que desea eliminar..',
            demandOption:true,
            type: 'string'
        }

    },
    handler:function (argv){
        notesFunction.delNote( argv.title )
    }

} )



argumentos.parse()



