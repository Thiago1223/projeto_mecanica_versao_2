/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos PROFESSORES no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertProfessor = async function (dadosProfessor) {
    let sql = `insert into tbl_professor (
        nome,
        data_nascimento,
        email,
        nife,
        id_materia,
        id_usuario
    ) values (
        '${dadosProfessor.nome}',
        '${dadosProfessor.data_nascimento}',
        '${dadosProfessor.email}',
        '${dadosProfessor.nife}',
        ${dadosProfessor.id_materia},
        ${dadosProfessor.id_usuario}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteProfessor = async function (id) {
    let sql = `delete from tbl_professor where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

const updateProfessor = async function(dadosProfessor) {
    let sql = `update tbl_professor set
                   nome = '${dadosProfessor.nome}',
                   data_nascimento = '${dadosProfessor.data_nascimento}',
                   email = '${dadosProfessor.email}',
                   nife = '${dadosProfessor.nife}',
                   id_materia = '${dadosProfessor.id_materia}',
                   id_usuario = '${dadosProfessor.id_usuario}'
               where id = ${dadosProfessor.id}    
           `

  //Executa o scrip sql no banco de dados        
  let resultStatus = await prisma.$executeRawUnsafe(sql);
  
  if (resultStatus) {
      return true;
  } else {
      return false;
  }
}

///////////////////////Selects//////////////////////////
const selectProfessorById = async function(id) {

    let sql = `select * from tbl_professor where id = ${id}`

    let rsProfessor = await prisma.$queryRawUnsafe(sql)

    if(rsProfessor.length > 0){
        return rsProfessor
    }else{
        return false
    }      
}

const selectAllProfessores = async function() {
   let sql = `select * from tbl_professor`
   
   let rsProfessor = await prisma.$queryRawUnsafe(sql)

   if(rsProfessor.length > 0)
       return rsProfessor
   else
       return false
}

const selectLastId = async function () {
   let sql = `select * from tbl_professor order by id desc limit 1;`

   let rsProfessor = await prisma.$queryRawUnsafe(sql)

   if (rsProfessor.length > 0) {
       return rsProfessor
   } else {
       return false;
   }
}


const selectAllProfessoresDataFormat = async function() {
    
    let sql = `
        select tbl_professor.nome,
        date_format(tbl_professor.data_nascimento, '%d/%m/%Y')
        as data_nascimento,
        tbl_professor.email,
        tbl_professor.nife,
	    tbl_materia.id,
       tbl_usuario.id
        from tbl_professor
	    inner join tbl_materia
		on tbl_professor.id_materia = tbl_materia.id
	    inner join tbl_usuario
		on tbl_professor.id_usuario = tbl_usuario.id;
    `
    
    let rsProfessor = await prisma.$queryRawUnsafe(sql)
 
    if(rsProfessor.length > 0)
        return rsProfessor
    else
        return false
 }


module.exports = {
   insertProfessor,
   deleteProfessor,
   updateProfessor,
   selectAllProfessores,
   selectProfessorById,
   selectLastId
}