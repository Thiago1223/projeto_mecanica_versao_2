/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Usuarios
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var usuarioDAO = require('../model/DAO/usuarioDAO.js')

const { request } = require('express')


const inserirUsuario = async function (dadosUsuario) {
    if (dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 100 ||
        dadosUsuario.senha == '' || dadosUsuario.senha == undefined ||
        dadosUsuario.id_tipo_usuario == '' || dadosUsuario.id_tipo_usuario == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosUsuario = await usuarioDAO.insertUsuario(dadosUsuario)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosUsuario) {

            let novoUsuario = await usuarioDAO.selectLastId()

            let dadosUsuariosJSON = {}
            dadosUsuariosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosUsuariosJSON.usuarios = novoUsuario

            return dadosUsuariosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarUsuario = async function (dadosUsuario, idUsuario) {

    if (dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 100 ||
        dadosUsuario.senha == '' || dadosUsuario.senha == undefined ||
        dadosUsuario.id_tipo_usuario == '' || dadosUsuario.id_tipo_usuario == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
        //Validação de id incorreto ou não informado
    } else if (idUsuario == '' || idUsuario == undefined || idUsuario == isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosUsuario.id = idUsuario;

        let statusId = await usuarioDAO.selectLastId();

        if (statusId) {
            //Encaminha os dados para a model do aluno
            let resultDadosUsuario = await usuarioDAO.updateUsuario(dadosUsuario);

            if (resultDadosUsuario) {

                let dadosUsuarioJSON = {}
                dadosUsuarioJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosUsuarioJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosUsuarioJSON.usuario = dadosUsuario
                return dadosUsuarioJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarUsuario = async function (idUsuario) {
    let statusId = await usuarioDAO.selectUsuarioByID(idUsuario);

    if (statusId) {
        if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosUsuario = await usuarioDAO.deleteUsuario(idUsuario)

            if (resultDadosUsuario) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getUsuario = async function () {
    let dadosUsuariosJSON = {};

    //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
    let dadosUsuario = await usuarioDAO.selectAllUsuarios();

    if (dadosUsuario) {

        dadosUsuariosJSON.status = message.SUCESS_REQUEST.status
        dadosUsuariosJSON.message = message.SUCESS_REQUEST.message
        dadosUsuariosJSON.quantidade = dadosUsuario.length;
        dadosUsuariosJSON.usuarios = dadosUsuario
        return dadosUsuariosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getUsuarioPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await usuarioDAO.selectUsuarioByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.usuario = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


const getUsuarioPorEmailSenha = async (email, senha) => {

    if (email == null || email == undefined || email == '' ||
        senha == null || senha == undefined || senha == '') {
        return message.ERROR_INTERNAL_SERVER
    } else {

        let dadosJSON = {}
        let dadosUsuario = await usuarioDAO.selectUsuarioByEmailAndSenha(email,senha)

        if (dadosUsuario) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.usuarios = dadosUsuario

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

const getUsuarioPorEmailSenhaMatricula = async (email, senha) => {

    if (email == null || email == undefined || email == '' ||
        senha == null || senha == undefined || senha == '') {
        return message.ERROR_INTERNAL_SERVER
    } else {

        let dadosJSON = {}
        let dadosUsuario = await usuarioDAO.selectUsuarioByEmailAndSenhaMatricula(email,senha)

        if (dadosUsuario) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.usuarios = dadosUsuario

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}


module.exports = {
    inserirUsuario,
    atualizarUsuario,
    deletarUsuario,
    getUsuario,
    getUsuarioPorID,
    getUsuarioPorEmailSenha,
    getUsuarioPorEmailSenhaMatricula
}