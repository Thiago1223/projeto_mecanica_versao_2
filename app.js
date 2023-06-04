/* ***************************************************************************************************************************************************
 * Objetivo : API para integração entre back e banco de dados (GET,POST,PUT,DELETE)
 * Autor : Caroline Portela
 * Data 22/05
 * Versão : 1.0 
 *************************************************************************************************************************************************** */

//Import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { application } = require('express');

//Import do arquivo de configuração das variaveis,constantes e funcoes globais.
var message = require('./controller/modulo/config.js')

//Cria um objeto conforme a classe do express
const app = express();

app.use((request, response, next) => {
    //Define quem poderá acessar a API()
    response.header('Access-Control-Allow-Origin', '*');

    //Define quais metodos serão utilizados na API
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

    //Atribui as permissões as cors
    app.use(cors());

    next();
})

//Define que os dados que irão chegar no body da requisição será no padrão JSON
const bodyParserJSON = bodyParser.json();

//Import das controllers
var controllerMatricula = require('./controller/controller_matricula.js');
var controllerAluno = require('./controller/controller_aluno.js');
var controllerMateria = require('./controller/controller_materia.js');

///////////////////////////////////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Aluno
* Data : 04/06/2023
********************************/

//EndPoint: Post - Insere um aluno novo 
app.post('/v1/mecanica/aluno', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resulDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resulDadosAluno.status)
        response.json(resulDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Delete - Exclui um aluno existente, filtrando pelo ID
app.delete('/v1/mecanica/aluno/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let controllerAluno = require('./controller/controller_aluno.js')

    let resultDadosAluno = await controllerAluno.deletarAluno(idAluno)

    if (resultDadosAluno) {
        response.json(resultDadosAluno)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});

//EndPoint: Put - Atualiza um aluno existente, filtrando pelo ID
app.put('/v1/mecanica/aluno/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idAluno = request.params.id

        let dadosBody = request.body

        let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody, idAluno)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});

//EndPoint: Retorna o aluno filtrando pelo ID 
app.get('/v1/mecanica/aluno/id/:id', cors(), async function (request, response) {
    let idAluno = request.params.id

    let dadosAluno = await controllerAluno.getAlunoPorID(idAluno)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
});

//EndPoint: Retorna o aluno filtrando pelo nome
app.get('/v1/mecanica/aluno/nome/:nome', cors(), async function (request, response) {

    let nome = request.params.nome;
    let dadosAluno = await controllerAluno.getBuscarAlunoNome(nome);

    if (dadosAluno) {
        response.json(dadosAluno);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Retorna todos os alunos
app.get('/v1/mecanica/aluno', cors(), async function (request, response) {
    let dadosAluno = await controllerAluno.getAlunos();

    response.status(dadosAluno.status)
    response.json(dadosAluno)
});

///////////////////////////////////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Matricula
* Data : 04/06/2023
********************************/

//EndPoint: Post - Insere uma matricula
app.post('/v1/mecanica/matricula', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerMatricula.inserirMatricula(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todas matricula
app.get('/v1/mecanica/matriculas', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerMatricula.getMatricula();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna a matricula pelo id
app.get('/v1/mecanica/matricula/id/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dados = await controllerMatricula.getMatriculaPorId(id)

    response.status(dados.status)
    response.json(dados)
})

//EndPoint: Exclui um usuario existente, filtrando pelo ID
app.delete('/v1/mecanica/matricula/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idMatricula = request.params.id;

    let resultDados = await controllerMatricula.deletarMatricula(idMatricula)

    if (resultDados) {
       response.json(resultDados);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Atualiza matricula pelo id
app.put('/v1/mecanica/matricula/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


   if (String(contentType).toLowerCase() == 'application/json') {

   let idMatricula = request.params.id;

   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDados = await controllerMatricula.atualizarMatricula(dadosBody, idMatricula);

   response.status(resultDados.status)
   response.json(resultDados)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});

///////////////////////////////////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Materia
* Data : 04/06/2023
********************************/

//EndPoint: Post - Insere uma nova materia
app.post('/v1/mecanica/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosMateria = await controllerMateria.inserirMateria(dadosBody);

        response.status(resultDadosMateria.status)
        response.json(resultDadosMateria)
       
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza a materia pelo id
app.put('/v1/mecanica/materia/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

   if (String(contentType).toLowerCase() == 'application/json') {

   let idCurso = request.params.id;

   let dadosBody = request.body;

   //Encaminha os dados para a controller
   let resultDadosMateria = await controllerMateria.atualizarMateria(dadosBody, idCurso);

   response.status(resultDadosMateria.status)
   response.json(resultDadosMateria)

} else {
   response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
   response.json(message.ERROR_INVALID_CONTENT_TYPE)
}

});

//EndPoint: Exclui uma materia existente, filtrando pelo ID
app.delete('/v1/mecanica/materia/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let idMateria = request.params.id;

    //Recebe os dados da materia encaminhado no corpo da requisição 
    let resultDadosMateria = await controllerMateria.deletarMateria(idMateria)

    if (resultDadosMateria) {
       response.json(resultDadosMateria);
       response.status(200);
   } else {
       response.json();
       response.status(404);
   }
});

//EndPoint: Retorna todas materias
app.get('/v1/mecanica/materias', cors(), bodyParserJSON, async function (request, response) {
 
    //Recebe os dados da controller da materia
    let dadosMateria = await controllerMateria.getMaterias()

    response.status(dadosMateria.status)
    response.json(dadosMateria)
});

//EndPoint: Retorna a materia pelo id
app.get('/v1/mecanica/materia/id/:id', cors(), bodyParserJSON, async function(request, response) {

   let id = request.params.id

   let dadosMateria = await controllerMateria.getMateriaPorId(id)

   response.status(dadosMateria.status)
   response.json(dadosMateria)
})