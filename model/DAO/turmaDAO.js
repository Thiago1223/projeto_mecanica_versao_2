/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TURMAS no Banco de Dados
 * Data: 05/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTurma = async function (dadosTurma) {

    let sql = `insert into tbl_turma (
        nome,
        sigla,
        id_curso
    ) values (
        '${dadosTurma.nome}',
        '${dadosTurma.sigla}',
        ${dadosTurma.id_curso}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTurma = async function (id) {
    let sql = `delete from tbl_turma where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTurma = async function (dadosTurma) {

    let sql = `update tbl_turma set
                    nome = '${dadosTurma.nome}',
                    sigla = '${dadosTurma.sigla}',
                    id_curso = '${dadosTurma.id_curso}'
                where id = ${dadosTurma.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false

}

///////////////////////Selects//////////////////////////
const selectAllTurmas = async function () {
    let sql = `select * from tbl_turma`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0)
        return rsTurma
    else
        return false
}

// Retorna  Turma filtrando pelo ID de Curso
const selectTurmaByIDCurso = async function (idCurso) {
    let idTurmaCurso = idCurso

    let sql = `select 
            tbl_turma.id, tbl_turma.nome as nome_turma, tbl_turma.sigla ,tbl_curso.id as id_curso
            from tbl_turma 
            inner join tbl_curso
            on tbl_turma.id_curso = tbl_curso.id
            where tbl_turma.id_curso = ${idTurmaCurso};`;

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        return false;
    }


}


// Retorna os alunos junto da matricula, e materias filtrando pelo ID da turma
const selectAlunosMateriasByIDTurma = async function (idTurma) {
    let idDaTurma = idTurma

    let sql = `
             select
             tbl_turma.nome as nome_turma, tbl_turma.sigla as sigla_turma,
             tbl_aluno.nome as nome_aluno, tbl_aluno.email as email_aluno,
             tbl_materia.nome as nome_materia, tbl_materia.sigla as sigla_materia,
             tbl_matricula.numero as numero_matricula
                from tbl_matricula
            inner join tbl_aluno
                on tbl_aluno.id = tbl_matricula.id_aluno
            inner join tbl_turma
                on tbl_turma.id = tbl_matricula.id_turma
             inner join tbl_turma_materia
                on tbl_turma.id = tbl_turma_materia.id_turma
            inner join tbl_materia
                 on tbl_turma_materia.id_materia = tbl_materia.id
            where tbl_turma.id = ${idDaTurma};
    `;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }


}

const selectLastId = async function () {
    let sql = `select * from tbl_turma order by id desc limit 1;`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0)
        return rsTurma
    else
        return false
}

const selectTurmaByID = async function (id) {

    let sql = `select * from tbl_turma where id = ${id}`;

    let rsTurmaId = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaId.length > 0) {
        return rsTurmaId;
    }
    else {
        return false;
    }
}

//Inserindo a turma com store de procedore
const insertDaTurmaComProcidore = async function (dados) {

    let sql = ` CALL inserir_turma (
            '${dados.nome_turma}',
            '${dados.sigla_turma}',
            '${dados.nome_curso}',
            '${dados.sigla_curso}',
            '${dados.descricao_curso}',
            '${dados.carga_horaria_curso}'
            );`
  
    let rs = await prisma.$queryRawUnsafe(sql);

    if (rs) {
        return true;
    } else {
        return false;
    }
}



module.exports = {
    insertTurma,
    deleteTurma,
    updateTurma,
    selectAllTurmas,
    selectLastId,
    selectTurmaByID,
    selectTurmaByIDCurso,
    selectAlunosMateriasByIDTurma,
    insertDaTurmaComProcidore
}