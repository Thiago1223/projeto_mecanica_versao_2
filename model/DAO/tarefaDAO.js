/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TAREFAS no Banco de Dados
 * Data: 05/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTarefa = async function (dadosTarefa) {
    let sql = `insert into tbl_tarefa (
        nome,
        numero,
        tempo_previsto,
        id_tipo_tarefa
    ) values (
        '${dadosTarefa.nome}',
        '${dadosTarefa.numero}',
        '${dadosTarefa.tempo_previsto}',
        ${dadosTarefa.id_tipo_tarefa}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTarefa = async function (id) {
    let sql = `delete from tbl_tarefa where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTarefa = async function (dadosTarefa) {
    let sql = `update tbl_tarefa set
                    nome = '${dadosTarefa.nome}',
                    numero = '${dadosTarefa.numero}',
                    tempo_previsto = '${dadosTarefa.tempo_previsto}',
                    id_tipo_tarefa = '${dadosTarefa.id_tipo_tarefa}'
                where id = ${dadosTarefa.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllTarefas = async function () {
    let sql = `select * from tbl_tarefa`

    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    if (rsTarefa.length > 0)
        return rsTarefa
    else
        return false
}

const selectTarefaByID = async function (id) {

    let sql = `select * from tbl_tarefa where id = ${id}`;

    let rsTarefaId = await prisma.$queryRawUnsafe(sql);

    if (rsTarefaId.length > 0) {
        return rsTarefaId;
    }
    else {
        return false;
    }
}


const selectRecordstByIDTarefa = async function (idTarefa) {
    let idDaTarefa = idTarefa

    let sql = `
    select
    tbl_tarefa.id as id_tarefa, tbl_tarefa.nome as nome_tarefa, tbl_tarefa.numero as numero_tarefa,
    tbl_criterio.descricao as descricao_criterio,
    tbl_resultado_obtido.resultado as resultado_obtido,
    tbl_resultado_desejado.resultado as resultado_desejado,
    tbl_margem_erro.id as id_margem_erro, tbl_margem_erro.valor_minimo as valor_minimo, tbl_margem_erro.valor_maximo as valor_maximo,
    tbl_avaliacao_matricula.id_matricula as id_matricula, tbl_avaliacao_matricula.resultado as resultado_matricula,
    tbl_avaliacao_professor.id_professor as id_professor, tbl_avaliacao_professor.resultado as resultado_professor
    from tbl_tarefa
    inner join tbl_criterio
    on tbl_criterio.id_tarefa = tbl_tarefa.id
    inner join tbl_margem_erro
    on tbl_margem_erro.id_criterio = tbl_criterio.id
    inner join tbl_resultado_desejado
    on tbl_resultado_desejado.id_criterio = tbl_criterio.id
    inner join tbl_resultado_obtido
    on tbl_resultado_obtido.id_criterio = tbl_criterio.id
    inner join tbl_avaliacao_professor
    on tbl_avaliacao_professor.id_criterio = tbl_criterio.id
    inner join tbl_avaliacao_matricula
    on tbl_avaliacao_matricula.id_criterio = tbl_criterio.id
    where tbl_tarefa.id = ${idDaTarefa} 
    `;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }


}

const selectLastId = async function () {
    let sql = `select * from tbl_tarefa order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    insertTarefa,
    deleteTarefa,
    updateTarefa,
    selectAllTarefas,
    selectTarefaByID,
    selectLastId,
    selectRecordstByIDTarefa
}