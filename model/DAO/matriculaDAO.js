/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da matricula no banco de dados
 * Data: 04/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

///////////////// Insert ////////////////////
const insertMatricula = async function (dadosMatricula) {
    let sql = `insert into tbl_matricula (
        numero,
        id_aluno,
        id_turma,
        id_usuario
    ) values (
        ${dadosMatricula.numero},
        ${dadosMatricula.id_aluno},
        ${dadosMatricula.id_turma},
        ${dadosMatricula.id_usuario}
    )`
    
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    
    if(resultStatus)
        return true
    else
        return false
}



///////////////// Delete////////////////////
const deleteMatricula = async function(id) {
    let sql = `delete from tbl_matricula where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

///////////////// Update ////////////////////
const updateMatricula = async function(dadosMatricula) {
    let sql = `update tbl_matricula set
                   numero = '${dadosMatricula.numero}',
                   id_aluno = '${dadosMatricula.id_aluno}',
                   id_turma = '${dadosMatricula.id_turma}',
                   id_usuario = '${dadosMatricula.id_usuario}

               where id = ${dadosMatricula.id}    
           `

  //Executa o scrip sql no banco de dados        
  let resultStatus = await prisma.$executeRawUnsafe(sql);
  if (resultStatus) {
      return true;
  } else {
      return false;
  }
}

///////////////// Selects  ////////////////////
const selectAllMatricula = async function () {

    let sql = `select * from tbl_matricula`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

const selectMatriculaByID = async function (id) {

    let sql = `select * from tbl_matricula where id = ${id}`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_matricula order by id desc limit 1;`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false;
    }
}


const selectTurmaMateriaByIDMatricula = async function (idMatricula) {
    let idDaMatricula = idMatricula

    let sql = `
    SELECT tm.id_turma, m.id AS id_materia, m.nome AS nome_materia, m.sigla as sigla_materia
    FROM tbl_turma_materia tm
    INNER JOIN tbl_materia m ON tm.id_materia = m.id
    INNER JOIN tbl_turma t ON tm.id_turma = t.id
    INNER JOIN tbl_matricula mat ON mat.id_turma = t.id
    INNER JOIN tbl_aluno a ON mat.id_aluno = a.id
    WHERE mat.id = ${idDaMatricula};
    `;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }


}

module.exports = {
    insertMatricula,
    deleteMatricula,
    updateMatricula,
    selectAllMatricula,
    selectMatriculaByID,
    selectLastId,
    selectTurmaMateriaByIDMatricula
}