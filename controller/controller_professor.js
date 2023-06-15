/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de PROFESSORES  
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var professorDAO = require('../model/DAO/professorDAO.js')

const { request } = require('express')

const inserirProfessor = async function (dadosProfessor) {
    if (dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 150 ||
        dadosProfessor.data_nascimento == '' || dadosProfessor.data_nascimento == undefined ||
        dadosProfessor.email == '' || dadosProfessor.email == undefined ||
        dadosProfessor.nife == '' || dadosProfessor.nife == undefined ||
        dadosProfessor.id_materia == '' || dadosProfessor.id_materia == undefined ||
        dadosProfessor.id_usuario == '' || dadosProfessor.id_usuario == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDadosProfessor = await professorDAO.insertProfessor(dadosProfessor)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosProfessor) {

            let novoProfessor = await professorDAO.selectLastId()

            let dadosProfessorJSON = {}
            dadosProfessorJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosProfessorJSON.professores = novoProfessor

            return dadosProfessorJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarProfessor = async function (dadosProfessor, idProfessor) {

    if (dadosProfessor.nome == '' || dadosProfessor.nome == undefined || dadosProfessor.nome.length > 150 ||
        dadosProfessor.data_nascimento == '' || dadosProfessor.data_nascimento == undefined ||
        dadosProfessor.email == '' || dadosProfessor.email == undefined ||
        dadosProfessor.nife == '' || dadosProfessor.nife == undefined ||
        dadosProfessor.id_materia == '' || dadosProfessor.id_materia == undefined ||
        dadosProfessor.id_usuario == '' || dadosProfessor.id_usuario == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idProfessor == '' || idProfessor == undefined || idProfessor == isNaN(idProfessor)) {

        return message.ERROR_INVALID_ID

    } else {
        //Adiciona o id do professor no JSON dos dados
        dadosProfessor.id = idProfessor;

        let statusId = await professorDAO.selectProfessorById(idProfessor);

        if (statusId) {
            //Encaminha os dados para a model do professor
            let resultDadosProfessor = await professorDAO.updateProfessor(dadosProfessor)

            if (resultDadosProfessor) {

                let dadosProfessorJSON = {}

                dadosProfessorJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosProfessorJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosProfessorJSON.professor = dadosProfessor

                return dadosProfessorJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const deletarProfessor = async function (idProfessor) {
    let statusId = await professorDAO.selectProfessorById(idProfessor);

    if (statusId) {
        if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosProfessor = await professorDAO.deleteProfessor(idProfessor)

            if (resultDadosProfessor) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}


const getProfessorPorID = async function (idProfessor) {

    if (idProfessor == '' || idProfessor == undefined || isNaN(idProfessor)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosProfessorJSON = {};

        //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
        let dadosProfessor = await professorDAO.selectProfessorById(idProfessor);

        if (dadosProfessor) {

            dadosProfessorJSON.status = message.SUCESS_REQUEST.status
            dadosProfessorJSON.message = message.SUCESS_REQUEST.message
            dadosProfessorJSON.professor = dadosProfessor

            return dadosProfessorJSON

        } else {

            return message.ERROR_NOT_FOUND

        }
    }
}

const getProfessores = async function () {
    let dadosProfessorJSON = {};

    let dadosProfessor = await professorDAO.selectAllProfessores();

    if (dadosProfessor) {
        dadosProfessorJSON.status = message.SUCESS_REQUEST.status
        dadosProfessorJSON.message = message.SUCESS_REQUEST.message
        dadosProfessorJSON.quantidade = dadosProfessor.length;
        dadosProfessorJSON.professor = dadosProfessor
        return dadosProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getProfessoresDataFormat = async function () {
    let dadosProfessorJSON = {};

    let dadosProfessor = await professorDAO.selectAllProfessoresDataFormat();

    if (dadosProfessor) {
        dadosProfessorJSON.status = message.SUCESS_REQUEST.status
        dadosProfessorJSON.message = message.SUCESS_REQUEST.message
        dadosProfessorJSON.quantidade = dadosProfessor.length;
        dadosProfessorJSON.professor = dadosProfessor
        return dadosProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}


module.exports = {
    inserirProfessor,
    deletarProfessor,
    atualizarProfessor,
    getProfessores,
    getProfessorPorID,
    getProfessoresDataFormat
}