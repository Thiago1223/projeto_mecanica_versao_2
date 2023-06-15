/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das MATERIAS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertMateria = async function (dadosMateria) {
    let sql = `insert into tbl_materia (
        nome,
        sigla
    ) values (
        '${dadosMateria.nome}',
        '${dadosMateria.sigla}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteMateria = async function (id) {
    let sql = `delete from tbl_materia where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateMateria = async function (dadosMateria) {
    let sql = `update tbl_materia set
                    nome = '${dadosMateria.nome}',
                    sigla = '${dadosMateria.sigla}'
                where id = ${dadosMateria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllMaterias = async function () {
    let sql = `select * from tbl_materia`

    let rsMateria = await prisma.$queryRawUnsafe(sql)

    if (rsMateria.length > 0)
        return rsMateria
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_materia order by id desc limit 1;`

    let rsMateria = await prisma.$queryRawUnsafe(sql)

    if (rsMateria.length > 0)
        return rsMateria
    else
        return false
}

const selectMateriaByID = async function (id) {
    let idMateria = id

    let sql = `select * from tbl_materia where id = ${idMateria}`;

    let rsMateriaId = await prisma.$queryRawUnsafe(sql);

    if (rsMateriaId.length > 0) {
        return rsMateriaId;
    }
    else {
        return false;
    }
}

// Retorna a materia da turma especifica
const selectMateriaByIDTurma = async function (idTurma) {
    let idMateriaTurma = idTurma

    let sql = ` select materia.id, materia.nome as nome_materia, 
                    materia.sigla as sigla_materia
                        from tbl_materia as materia
                        inner join tbl_turma_materia 
                            on tbl_turma_materia.id_materia = materia.id
                        inner join tbl_turma as turma
                             on tbl_turma_materia.id_turma = turma.id
                where turma.id = ${idMateriaTurma};`;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }


}


// Retorna as tarefas de uma materia especifica
const selectTarefaByIDMateria = async function (idMateria) {
    let idDaMateria = idMateria

    let sql = ` select
                tbl_materia.nome as nome_materia, tbl_materia.sigla as sigla_materia,
                 tbl_tarefa.nome as nome_tarefa, tbl_tarefa.numero as numero_tarefa,  
                 tbl_tarefa.tempo_previsto as tempo_previsto,
                 tbl_tarefa.id as id_tarefa
                    from tbl_tarefa
                 inner join tbl_materia_tarefa
                    on tbl_materia_tarefa.id_tarefa = tbl_tarefa.id
                inner join tbl_materia
                    on tbl_materia_tarefa.id_materia = tbl_materia.id
                where tbl_materia.id = ${idDaMateria};`;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }
}

module.exports = {
    insertMateria,
    updateMateria,
    deleteMateria,
    selectAllMaterias,
    selectLastId,
    selectMateriaByID,
    selectMateriaByIDTurma,
    selectTarefaByIDMateria
}