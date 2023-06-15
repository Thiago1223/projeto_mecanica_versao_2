/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TAREFAS
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var tarefaDAO = require('../model/DAO/tarefaDAO.js')
var materiaDAO = require('../model/DAO/materiaDAO.js')
var tipoTarefaDAO = require('../model/DAO/tipoTarefaDAO.js')

const { request } = require('express')

const inserirTarefa = async function (dadosTarefa) {

    if (dadosTarefa.nome == '' || dadosTarefa.nome == undefined || dadosTarefa.nome.length > 150 ||
        dadosTarefa.numero == '' || dadosTarefa.numero == undefined ||
        dadosTarefa.tempo_previsto == '' || dadosTarefa.tempo_previsto == undefined ||
        dadosTarefa.id_tipo_tarefa == '' || dadosTarefa.id_tipo_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let verificacaoTipoTarefa = await tipoTarefaDAO.selectTipoTarefaByID(dadosTarefa.id_tipo_tarefa)

        if (verificacaoTipoTarefa == false) {
            return message.ERROR_INVALID_ID
        }
        else {

            let resultDadosTarefa = await tarefaDAO.insertTarefa(dadosTarefa)

            if (resultDadosTarefa) {
                let novaTarefa = await tarefaDAO.selectLastId()

                let dadosTarefaJSON = {}
                dadosTarefaJSON.status = message.SUCESS_CREATED_ITEM.status
                dadosTarefaJSON.tarefa = novaTarefa

                return dadosTarefaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const atualizarTarefa = async function (dadosTarefa, idTarefa) {

    if (dadosTarefa.nome == '' || dadosTarefa.nome == undefined || dadosTarefa.nome.length > 150 ||
        dadosTarefa.numero == '' || dadosTarefa.numero == undefined ||
        dadosTarefa.tempo_previsto == '' || dadosTarefa.tempo_previsto == undefined ||
        dadosTarefa.id_tipo_tarefa == '' || dadosTarefa.id_tipo_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idTarefa == '' || idTarefa == undefined || idTarefa == isNaN(idTarefa)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosTarefa.id = idTarefa;

        let statusId = await tarefaDAO.selectTarefaByID(idTarefa)

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosTarefa = await tarefaDAO.updateTarefa(dadosTarefa);

            if (resultDadosTarefa) {

                let dadosTarefaJSON = {}

                dadosTarefaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTarefaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTarefaJSON.cursos = dadosTarefa
                return dadosTarefaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarTarefa = async function (idTarefa) {

    let statusId = await tarefaDAO.selectTarefaByID(idTarefa);

    if (statusId) {

        if (idTarefa == '' || idTarefa == undefined || isNaN(idTarefa)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosTarefa = await tarefaDAO.deleteTarefa(idTarefa)

            if (resultDadosTarefa) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTarefas = async function () {
    let tarefasJSON = {}

    let tarefas = await tarefaDAO.selectAllTarefas()

    if (tarefas) {

        tarefasJSON.status = message.SUCESS_REQUEST.status
        tarefasJSON.message = message.SUCESS_REQUEST.message
        tarefasJSON.quantidade = tarefas.length;
        tarefasJSON.tarefa = tarefas

        return tarefasJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getTarefaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTarefaJSON = {}

        let dadosTarefa = await tarefaDAO.selectTarefaByID(id)

        if (dadosTarefa) {
            dadosTarefaJSON.status = message.SUCESS_REQUEST.status
            dadosTarefaJSON.message = message.SUCESS_REQUEST.message
            dadosTarefaJSON.tarefa = dadosTarefa
            return dadosTarefaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getRegistrosTarefaIDTarefa = async (idTarefa) => {

    if (idTarefa == null || idTarefa == undefined || idTarefa == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosRegistrosTarefa = await tarefaDAO.selectRecordstByIDTarefa(idTarefa)

        if (dadosRegistrosTarefa) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.detalhes_da_tarefa = dadosRegistrosTarefa

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

module.exports = {
    inserirTarefa,
    atualizarTarefa,
    deletarTarefa,
    getTarefas,
    getTarefaPorID,
    getRegistrosTarefaIDTarefa
}