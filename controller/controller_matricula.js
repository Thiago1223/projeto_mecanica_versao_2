 /***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Matricular
 * (GET, POST, PUT, DELETE)
 * Data: 04/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var matriculaDAO = require('../model/DAO/matriculaDAO.js')

const { request } = require('express')


const inserirMatricula = async function (dadosMatricula) {
    if (dadosMatricula.numero == '' || dadosMatricula.numero == undefined || dadosMatricula.numero.length > 20 ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined ||
        dadosMatricula.id_turma == '' || dadosMatricula.id_turma == undefined ||
        dadosMatricula.id_usuario == '' || dadosMatricula.id_usuario == undefined 
       
    ) {
        console.log(dadosMatricula);
        return message.ERROR_REQUIRED_FIELDS
        
    } else {

        let resultDadosMatricula = await matriculaDAO.insertMatricula(dadosMatricula)

        if (resultDadosMatricula) {
            let novaMatricula = await matriculaDAO.selectLastId()

            let dadosMatriculaJSON = {}
            dadosMatriculaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosMatriculaJSON.matricula = novaMatricula

            return dadosMatriculaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}



const atualizarMatricula = async function (dadosMatricula, idMatricula) {

    if (dadosMatricula.numero == '' || dadosMatricula.numero == undefined || dadosMatricula.numero.length > 20 ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined ||
        dadosMatricula.id_turma == '' || dadosMatricula.id_turma == undefined ||
        dadosMatricula.id_usuario == '' || dadosMatricula.id_usuario == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idMatricula == '' || idMatricula == undefined || idMatricula == isNaN(idMatricula)) {
        return message.ERROR_INVALID_ID
    } else {
        dadosMatricula.id = idMatricula

        let statusId = await matriculaDAO.selectMatriculaByID(idMatricula)

        if (statusId) {

            let resultDadosMatricula = await matriculaDAO.updateMatricula(dadosMatricula);

            if (resultDadosMatricula) {

                let dadosMatriculaJSON = {}

                dadosMatriculaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosMatriculaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosMatriculaJSON.dados = resultDadosMatricula
                return dadosMatriculaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarMatricula = async function (idMatricula) {

    let statusId = await matriculaDAO.selectMatriculaByID(idMatricula);

    if (statusId) {

        if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosMatricula = await matriculaDAO.deleteMatricula(idMatricula)

            if (resultDadosMatricula) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getMatricula = async function () {
    let matriculaJSON = {}

    let matriculas = await matriculaDAO.selectAllMatricula()

    if (matriculas) {

        matriculaJSON.status = message.SUCESS_REQUEST.status
        matriculaJSON.message = message.SUCESS_REQUEST.message
        matriculaJSON.quantidade = matriculas.length;
        matriculaJSON.matricula = matriculas

        return matriculaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getTurmaMateriaIDMatricula = async (idMatricula) => {

    if (idMatricula == null || idMatricula == undefined || idMatricula == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosTurmaMateriaDaMatricula = await matriculaDAO.selectTurmaMateriaByIDMatricula(idMatricula)

        if (dadosTurmaMateriaDaMatricula) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.turma_materia_da_matricula = dadosTurmaMateriaDaMatricula

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

const getMatriculaPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosMatriculaJSON = {}

        let dadosMatricula = await matriculaDAO.selectMatriculaByID(id)

        if (dadosMatricula) {
            dadosMatriculaJSON.status = message.SUCESS_REQUEST.status
            dadosMatriculaJSON.message = message.SUCESS_REQUEST.message
            dadosMatriculaJSON.matricula = dadosMatricula
            return dadosMatriculaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirMatricula,
    atualizarMatricula,
    deletarMatricula,
    getMatricula,
    getMatriculaPorId,
    getTurmaMateriaIDMatricula
}