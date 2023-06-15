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
var controllerTipoUsuario = require('./controller/controller_tipoUsuario.js');
var controllerUsuario = require('./controller/controller_usuario.js');
var controllerMatricula = require('./controller/controller_matricula.js');
var controllerAluno = require('./controller/controller_aluno.js');
var controllerMateria = require('./controller/controller_materia.js');
var controllerCurso = require('./controller/controller_curso.js')
var controllerTurma = require('./controller/controller_turma.js');
var controllerTurmaMateria = require('./controller/controller_turma_materia.js')
var controllerProfessor = require('./controller/controller_professor.js');
var controllerTarefa = require('./controller/controller_tarefa.js');
var controllerTipoTarefa = require('./controller/controller_tipoTarefa.js');
var controllerTipoCriterio = require('./controller/controller_tipoCriterio.js');
var controllerAvaliacaoProfessor = require('./controller/controller_avaliacaoProfessor.js');
var controllerCriterio = require('./controller/controller_criterio.js');
var controllerAvaliacaoMatricula = require('./controller/controller_avaliacaoMatricula.js');
var controllerResultadoObtido = require('./controller/controller_resultadoObtido.js');
var controllerSemestre = require('./controller/controller_semestre.js');
var controllerRegistroTempo = require('./controller/controller_registroTempo.js');
var controllerMargemErro = require('./controller/controller_margem_erro.js');
var controllerResultadoDesejado = require('./controller/controller_resultado_desejado.js');
var controllerCursoMateria = require('./controller/controller_curso_materia.js');
var controllerMateriaTarefa = require('./controller/controller_materia_tarefa.js');
var controllerCursoTurmaProfessor = require('./controller/controller_curso_turma_professor.js');



/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de TIPO_USUARIO
* Data : 25/05/2023
********************************/


//EndPoint: Post - Insere um TIPO de usuario
app.post('/v1/mecanica/tipo/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoUsuario.inserirTipoUsuario(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Get - Retorna todos os tipos de usuario
app.get('/v1/mecanica/tipos', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoUsuario.getTipoUsuario();

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Retorna o tipo usuario filtrando pelo ID 
app.get('/v1/mecanica/tipo/usuario/id/:id', cors(), async function (request, response) {
    let idTipoUsuario = request.params.id

    let dadosTipoUsuario = await controllerTipoUsuario.getTipoUsuarioID(idTipoUsuario)

    response.status(dadosTipoUsuario.status)
    response.json(dadosTipoUsuario)
});

//EndPoint: Exclui um tipo usuario pelo id
app.delete('/v1/mecanica/tipo/usuario/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTipoUsuario = request.params.id;

    let resultDadosTipoUsuario = await controllerTipoUsuario.deletarTipoUsuario(idTipoUsuario)

    if (resultDadosTipoUsuario) {
        response.json(resultDadosTipoUsuario);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});



/////////////////////////////////////////Usuario//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Usuario
* Data : 04/06/2023
********************************/
//EndPoint: Post - Insere um  usuario
app.post('/v1/mecanica/usuario', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerUsuario.inserirUsuario(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os usuario
app.get('/v1/mecanica/usuarios', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerUsuario.getUsuario()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um usuario existente, filtrando pelo ID
app.delete('/v1/mecanica/usuario/:id', cors(), bodyParserJSON, async function (request, response) {

    let idUsuario = request.params.id;

    let resultDadosUsuario = await controllerUsuario.deletarUsuario(idUsuario)

    if (resultDadosUsuario) {
        response.json(resultDadosUsuario);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Atualiza usuario pelo id
app.put('/v1/mecanica/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idUsuario = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosUsuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario);

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Retorna o usuario pelo id
app.get('/v1/mecanica/usuario/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerUsuario.getUsuarioPorID(id)

    response.status(dados.status)
    response.json(dados)
})


//EndPoint: Retorna o usuario por email e senha junto com seu tipo usuario
app.get('/v1/mecanica/usuario/email/:email/senha/:senha', cors(), bodyParserJSON, async function (request, response) {


    let emailUsuario = request.params.email
    let senhaUsuario = request.params.senha

    //Recebe os dados da controller da turma_materia
    let dados = await controllerUsuario.getUsuarioPorEmailSenha(emailUsuario,senhaUsuario)

    response.status(dados.status)
    response.json(dados)

});


/////////////////////////////////////// Aluno ////////////////////////////////////////////

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

        let resultDadosAluno = await controllerAluno.atualizarAluno(dadosBody, idAluno)

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



/////////////////////////////////////Matricula//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Matricula
* Data : 04/06/2023
********************************/
//Insere nova matricula 
app.post('/v1/mecanica/matricula', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosMatricula = await controllerMatricula.inserirMatricula(dadosBody);

        response.status(resultDadosMatricula.status)
        response.json(resultDadosMatricula)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});
//EndPoint: Get - Retorna todas matricula - ESSE FUNCIONA
app.get('/v1/mecanica/matriculas', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerMatricula.getMatricula();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna a matricula pelo id - ESSE FUNCIONA
app.get('/v1/mecanica/matricula/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerMatricula.getMatriculaPorId(id)

    response.status(dados.status)
    response.json(dados)
})

//EndPoint: Exclui um usuario existente, filtrando pelo ID - ESSE FUNCIONA
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

//EndPoint: Atualiza matricula pelo id - NAO FUNCIONA
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
app.get('/v1/mecanica/materia/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosMateria = await controllerMateria.getMateriaPorId(id)

    response.status(dadosMateria.status)
    response.json(dadosMateria)
})

///////////////////////////////////////Curso//////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de CURSO
* Data : 05/06/2023
********************************/

//EndPoint: Post - Insere um novo curso
app.post('/v1/mecanica/curso', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCurso = await controllerCurso.inserirCurso(dadosBody);

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza curso pelo id
app.put('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o id do curso pelo parametro
        let idCurso = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosCurso = await controllerCurso.atualizarCurso(dadosBody, idCurso);

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui um curso existente, filtrando pelo ID
app.delete('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCurso = request.params.id;

    //Recebe os dados do curso encaminhado no corpo da requisição 
    let resultDadosCurso = await controllerCurso.deletarCurso(idCurso)

    if (resultDadosCurso) {
        response.json(resultDadosCurso);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Retorna todos os cursos
app.get('/v1/mecanica/cursos', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados da controller do curso
    let dadosCurso = await controllerCurso.getCursos()

    response.status(dadosCurso.status)
    response.json(dadosCurso)
});




//EndPoint: Retorna o curso pelo id
app.get('/v1/mecanica/curso/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosCurso = await controllerCurso.getCursoPorID(id)

    response.status(dadosCurso.status)
    response.json(dadosCurso)
})





/////////////////////////////////////////Turma/////////////////////////////////////////////

/********************************
* Objetivo : API de controle de TURMA
* Data : 05/06/2023
********************************/

//EndPoint: Post - Insere uma nova turma
app.post('/v1/mecanica/turma', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTurma = await controllerTurma.inserirTurma(dadosBody);

        response.status(resultDadosTurma.status)
        response.json(resultDadosTurma)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Put -  Atualiza turma pelo id
app.put('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o id da turma pelo parametro
        let idTurma = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTurma = await controllerTurma.atualizarTurma(dadosBody, idTurma);

        response.status(resultDadosTurma.status)
        response.json(resultDadosTurma)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui uma turma existente, filtrando pelo ID
app.delete('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTurma = request.params.id;

    let resultDadosTurma = await controllerTurma.deletarTurma(idTurma)

    if (resultDadosTurma) {
        response.json(resultDadosTurma);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Retorna todas as turmas
app.get('/v1/mecanica/turmas', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados da controller da turma
    let dadosTurma = await controllerTurma.getTurmas()

    response.status(dadosTurma.status)
    response.json(dadosTurma)
});

//EndPoint: Retorna a turma pelo id
app.get('/v1/mecanica/turma/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerTurma.getTurmaPorID(id)

    response.status(dados.status)
    response.json(dados)
});


/////////////////////////////////////////Turma_Materia//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de turma_materia
* Data : 05/06/2023
********************************/

//EndPoint: Post
app.post('/v1/mecanica/turma/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTurmaMateria = await controllerTurmaMateria.inserirTurmaMateria(dadosBody);

        response.status(resultDadosTurmaMateria.status)
        response.json(resultDadosTurmaMateria)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Retorna todos id turmas_materias
app.get('/v1/mecanica/turmas/materias', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados da controller da turma_materia
    let dadosMateria = await controllerTurmaMateria.getTurmaMateria()

    response.status(dadosMateria.status)
    response.json(dadosMateria)
});

//EndPoint: Retorna a materia pelo id
app.get('/v1/mecanica/turmas/materias/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosTurmaMateria = await controllerTurmaMateria.getTurmaMateriaID(id)

    response.status(dadosTurmaMateria.status)
    response.json(dadosTurmaMateria)
})

//EndPoint: Atualiza 
app.put('/v1/mecanica/turma/materia/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let idTurmaMateria = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTurmaMateria = await controllerTurmaMateria.atualizarTurmaMateria(dadosBody, idTurmaMateria);

        response.status(resultDadosTurmaMateria.status)
        response.json(resultDadosTurmaMateria)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui 
app.delete('/v1/mecanica/turma/materia/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTurmaMateria = request.params.id;

    let resultDadosTurmaMateria = await controllerTurmaMateria.deletarTurmaMateria(idTurmaMateria)

    if (resultDadosTurmaMateria) {
        response.json(resultDadosTurmaMateria);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


///////////////////////////////////////Professor///////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de PROFESSOR
* Data : 22/05/2023
********************************/

//EndPoint: Post - INSERE um professor novo 
app.post('/v1/mecanica/professor', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDadosProfessor = await controllerProfessor.inserirProfessor(dadosBody)

        response.status(resultDadosProfessor.status)
        response.json(resultDadosProfessor)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
});

//EndPoint: Delete - EXCLUIR um professor existente filtrado pelo ID.
app.delete('/v1/mecanica/professor/:id', cors(), bodyParserJSON, async function (request, response) {
    let idProfessor = request.params.id

    let resultDadosProfessor = await controllerProfessor.deletarProfessor(idProfessor)

    if (resultDadosProfessor) {
        response.json(resultDadosProfessor)
        response.status(200)
    } else {
        response.json()
        response.status(404)
    }
});

//EndPoint: Put - ATUALIZA um professor existente, filtrando pelo ID.
app.put('/v1/mecanica/professor/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idProfessor = request.params.id

        let dadosBody = request.body

        let resultDadosProfessor = await controllerProfessor.atualizarProfessor(dadosBody, idProfessor)

        response.status(resultDadosProfessor.status)
        response.json(resultDadosProfessor)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Retorna o professor filtrando pelo ID 
app.get('/v1/mecanica/professor/id/:id', cors(), async function (request, response) {
    let idProfessor = request.params.id

    let dadosProfessor = await controllerProfessor.getProfessorPorID(idProfessor)

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)
});

//EndPoint: Retorna todos os professores
app.get('/v1/mecanica/professor', cors(), async function (request, response) {
    let dadosProfessor = await controllerProfessor.getProfessores()

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)
});


/////////////////////////////////////////Tipo Tarefas//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de tipos tarefas
* Data : 27/05/2023
********************************/


//EndPoint: Post - Insere um tipo de TAREFA
app.post('/v1/mecanica/tipo/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoTarefa.inserirTipoTarefa(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os tipos de TAREFAS
app.get('/v1/mecanica/tipos/tarefas', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoTarefa.getTipoTarefa()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um tipo de tarefa existente, filtrando pelo ID
app.delete('/v1/mecanica/tipo/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTipoTarefa = request.params.id;

    let resultDadosTipoTarefa = await controllerTipoTarefa.deletarTipoTarefa(idTipoTarefa)

    if (resultDadosTipoTarefa) {
        response.json(resultDadosTipoTarefa);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Atualiza um tipo de tarefa pelo id
app.put('/v1/mecanica/tipo/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {


        let idTipoTarefa = request.params.id;

        //Recebe os dados do tipo criterio  encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTipoTarefa = await controllerTipoTarefa.atualizarTipoTarefa(dadosBody, idTipoTarefa);

        response.status(resultDadosTipoTarefa.status)
        response.json(resultDadosTipoTarefa)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


/////////////////////////////////////////Tarefa//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de tarefas
* Data : 27/05/2023
********************************/


//EndPoint: Post - Insere uma nova tarefa
app.post('/v1/mecanica/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTarefa = await controllerTarefa.inserirTarefa(dadosBody);

        response.status(resultDadosTarefa.status)
        response.json(resultDadosTarefa)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza tarefa por id
app.put('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let idTarefa = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTarefa = await controllerTarefa.atualizarTarefa(dadosBody, idTarefa);

        response.status(resultDadosTarefa.status)
        response.json(resultDadosTarefa)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui uma tarefa existente, filtrando pelo ID
app.delete('/v1/mecanica/tarefa/:id', cors(), bodyParserJSON, async function (request, response) {

    let idTarefa = request.params.id;

    //Recebe os dados da tarefa encaminhado no corpo da requisição 
    let resultDadosTarefa = await controllerTarefa.deletarTarefa(idTarefa)

    if (resultDadosTarefa) {
        response.json(resultDadosTarefa);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Retorna todas tarefas
app.get('/v1/mecanica/tarefas', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados da controller do curso
    let dados = await controllerTarefa.getTarefas()

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: Retorna a tarefa por id
app.get('/v1/mecanica/tarefa/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosTarefa = await controllerTarefa.getTarefaPorID(id)

    response.status(dadosTarefa.status)
    response.json(dadosTarefa)
})

/********************************
* Objetivo : API de controle de tipo criterio
* Data : 27/05/2023
********************************/

//EndPoint: Post - Insere um tipo de CRITERIO
app.post('/v1/mecanica/tipo/criterio', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTipoCriterio.inserirTipoCriterio(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Get - Retorna todos os tipos de CRITERIOS
app.get('/v1/mecanica/tipos/criterios', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerTipoCriterio.getTipoCriterio();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Exclui um tipo de criterio existente, filtrando pelo ID
app.delete('/v1/mecanica/tipo/criterio/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCriterio = request.params.id;

    //Recebe os dados do tipo criterio encaminhado no corpo da requisição 
    let resultDadosTipoCriterio = await controllerTipoCriterio.deletarTipoCriterio(idCriterio)

    if (resultDadosTipoCriterio) {
        response.json(resultDadosTipoCriterio);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});


//EndPoint: Atualiza um tipo de criterio pelo id
app.put('/v1/mecanica/tipo/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    //recebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //Recebe o id do tipo criterio pelo parametro
        let idCriterio = request.params.id;

        //Recebe os dados do tipo criterio  encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosTipoCriterio = await controllerTipoCriterio.atualizarTipoCriterio(dadosBody, idCriterio);

        response.status(resultDadosTipoCriterio.status)
        response.json(resultDadosTipoCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});







/////////////////////////////////////////Avaliacao Professor//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Avaliacao Professor
* Data : 29/05/2023
********************************/

//EndPoint: Post - Insere uma nova avaliacao do Professor
app.post('/v1/mecanica/avaliacao/professor', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.inserirAvaliacaoProfessor(dadosBody);

        response.status(resultDadosAvaliacaoProfessor.status)
        response.json(resultDadosAvaliacaoProfessor)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza a avaliacao professor pelo id
app.put('/v1/mecanica/avaliacao/professor/:id', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        let idAvaliacaoProfessor = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.atualizarAvaliacaoProfessor(dadosBody, idAvaliacaoProfessor);

        response.status(resultDadosAvaliacaoProfessor.status)
        response.json(resultDadosAvaliacaoProfessor)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Exclui uma avaliacao do professor existente, filtrando pelo ID
app.delete('/v1/mecanica/avaliacao/professor/:id', cors(), bodyParserJSON, async function (request, response) {

    let idAvaliacaoProfessor = request.params.id;

    let resultDadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.deletarAvaliacaoProfessor(idAvaliacaoProfessor)

    if (resultDadosAvaliacaoProfessor) {
        response.json(resultDadosAvaliacaoProfessor);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Retorna todas as avaliacoes professor
app.get('/v1/mecanica/avaliacao/professor', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados da controller 
    let dadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.getAvaliacaoProfessor()

    response.status(dadosAvaliacaoProfessor.status)
    response.json(dadosAvaliacaoProfessor)
});

//EndPoint: Retorna a avaliacao professor pelo id
app.get('/v1/mecanica/avaliacao/professor/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosAvaliacaoProfessor = await controllerAvaliacaoProfessor.getAvaliacaoProfessorPorId(id)

    response.status(dadosAvaliacaoProfessor.status)
    response.json(dadosAvaliacaoProfessor)
})



/////////////////////////////////////////Avaliacao Aluno//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Avaliacao Aluno pela Matricula
* Data : 06/06/2023
********************************/

//EndPoint: Post - Insere uma nova avaliacao pela matricula
app.post('/v1/mecanica/avaliacao/matricula', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosAvaliacao = await controllerAvaliacaoMatricula.inserirAvaliacaoAlunoPelaMatricula(dadosBody);

        response.status(resultDadosAvaliacao.status)
        response.json(resultDadosAvaliacao)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza uma avaliacao pelo id
app.put('/v1/mecanica/avaliacao/matricula/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];


    if (String(contentType).toLowerCase() == 'application/json') {

        let idAvaliacaoMatricula = request.params.id;

        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDados = await controllerAvaliacaoMatricula.atualzarAvaliacaoAluno(dadosBody, idAvaliacaoMatricula);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui uma avaliacao  existente, filtrando pelo ID
app.delete('/v1/mecanica/avaliacao/matricula/:id', cors(), bodyParserJSON, async function (request, response) {

    let idAvaliacao = request.params.id;

    let resultDadosAvaliacaoMatricula = await controllerAvaliacaoMatricula.deletarAvaliacaoAluno(idAvaliacao)

    if (resultDadosAvaliacaoMatricula) {
        response.json(resultDadosAvaliacaoMatricula)
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Get - Retorna todas avaliacoes
app.get('/v1/mecanica/avaliacoes', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerAvaliacaoMatricula.getAvaliacoes();

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna a avaliacao  pelo id
app.get('/v1/mecanica/avaliacao/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosAvaliacaoAluno = await controllerAvaliacaoMatricula.getAvaliacaoAlunoPorId(id)

    response.status(dadosAvaliacaoAluno.status)
    response.json(dadosAvaliacaoAluno)
})




/////////////////////////////////////////Criterio//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Criterio
* Data : 06/06/2023
********************************/

//EndPoint: Post - Insere um novo criterio
app.post('/v1/mecanica/criterio', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCriterio = await controllerCriterio.inserirCriterio(dadosBody);

        response.status(resultDadosCriterio.status)
        response.json(resultDadosCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Atualiza criterio pelo id
app.put('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function (request, response) {
    //reccebe o content-type da requisicao
    let contentType = request.headers['content-type'];

    //Validacao para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        let idCriterio = request.params.id;

        //Recebe os dados do curso encaminhado no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosCriterio = await controllerCriterio.atualizarCriterio(dadosBody, idCriterio);

        response.status(resultDadosCriterio.status)
        response.json(resultDadosCriterio)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Exclui um criterio existente, filtrando pelo ID
app.delete('/v1/mecanica/criterio/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let idCriterio = request.params.id;

    let resultDadosCriterio = await controllerCriterio.deletarCriterio(idCriterio)

    if (resultDadosCriterio) {
        response.json(resultDadosCriterio);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});

//EndPoint: Get - Retorna todos criterio
app.get('/v1/mecanica/criterios', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerCriterio.getCriterio()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna o criterio pelo id
app.get('/v1/mecanica/criterio/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosCriterio = await controllerCriterio.getCriterioPorId(id)

    response.status(dadosCriterio.status)
    response.json(dadosCriterio)
})


/////////////////////////////////////////Resultado Obtido//////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Resultado Obtido
* Data : 30/05/2023
********************************/

//EndPoint: Post - Insere um resultado obtido
app.post('/v1/mecanica/resultado', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosResultado = await controllerResultadoObtido.inserirResultadoObtido(dadosBody);

        response.status(resultDadosResultado.status)
        response.json(resultDadosResultado)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Put - Atualiza um resultado obtido
app.put('/v1/mecanica/resultado/obtido/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idResultado = request.params.id

        let dadosBody = request.body

        let resultDadosResultadoObtido = await controllerResultadoObtido.atualizarResultadoObtido(dadosBody, idResultado)

        response.status(resultDadosResultadoObtido.status)
        response.json(resultDadosResultadoObtido)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});

//EndPoint: Get - Retorna todos resultados obtidos
app.get('/v1/mecanica/resultados/obtidos', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerResultadoObtido.getResultadosObtidos()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna o resultado obtido pelo id
app.get('/v1/mecanica/resultado/obtido/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dadosResultado = await controllerResultadoObtido.getResultadoPorID(id)

    response.status(dadosResultado.status)
    response.json(dadosResultado)
})


//EndPoint: Exclui um semestre
app.delete('/v1/mecanica/resultado/obtido/:id', cors(), bodyParserJSON, async function (request, response) {

    let idResultado = request.params.id;

    let resultDados = await controllerResultadoObtido.deletarResultadoObtido(idResultado)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});



/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Semestre
* Data : 06/062023
********************************/


//EndPoint: Post - Insere um semestre
app.post('/v1/mecanica/semestre', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerSemestre.inserirSemestre(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});

//EndPoint: Put - Atualiza um semestre, filtrando pelo ID
app.put('/v1/mecanica/semestre/editando/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idSemestre = request.params.id

        let dadosBody = request.body

        let resultDadosSemestre = await controllerSemestre.atualizarSemestre(dadosBody, idSemestre)

        response.status(resultDadosSemestre.status)
        response.json(resultDadosSemestre)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todos semestres
app.get('/v1/mecanica/semestre', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerSemestre.getSemestre()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna o semestre pelo id
app.get('/v1/mecanica/semestre/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerSemestre.getSemestrePorID(id)

    response.status(dados.status)
    response.json(dados)
})

//EndPoint: Exclui um semestre
app.delete('/v1/mecanica/semestre/:id', cors(), bodyParserJSON, async function (request, response) {

    let idSemestre = request.params.id;

    let resultDados = await controllerSemestre.deletarSemestre(idSemestre)

    if (resultDados) {
        response.json(resultDados);
        response.status(200);
    } else {
        response.json();
        response.status(404);
    }
});



/////////////////////////////////////////Tipo_Usuario//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Registro Tempo
* Data : 06/062023
********************************/


//EndPoint: Post - Insere um registro tempo
app.post('/v1/mecanica/registro/tempo', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerRegistroTempo.inserirRegistroTempo(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Put - Atualiza um registro tempo
app.put('/v1/mecanica/registro/tempo/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idRegistroTempo = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerRegistroTempo.atualizarRegistroTempo(dadosBody, idRegistroTempo)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});

//EndPoint: Get - Retorna todos registros de tempo
app.get('/v1/mecanica/registro/tempo', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerRegistroTempo.getRegistroTempo()

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Retorna o registro pelo id
app.get('/v1/mecanica/registro/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerRegistroTempo.getRegistroTempoPorID(id)

    response.status(dados.status)
    response.json(dados)
})


//EndPoint: Delete - Exclui um registro tempo pelo id
app.delete('/v1/mecanica/registro/tempo/:id', cors(), async function (request, response) {
    let idRegistro = request.params.id

    let resultDados = await controllerRegistroTempo.deletarRegistroTempo(idRegistro)

    if (resultDados) {
        response.json(resultDados)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});

///////////////////////////////////////// Margem Erro //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de margem erro
* Data : 06/062023
********************************/


//EndPoint: Post - Insere margem erro
app.post('/v1/margem/erro', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerMargemErro.inserirMargemErro(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Put - Atualiza uma margem de erro
app.put('/v1/margem/erro/id/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idMargemErro = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerMargemErro.atualizarMargemDeErro(dadosBody, idMargemErro)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todas margens erro
app.get('/v1/mecanica/margem/erro', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerMargemErro.getMargemErro()

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Retorna a margem de erro pelo id
app.get('/v1/mecanica/margem/erro/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerMargemErro.getMargemErroPorID(id)

    response.status(dados.status)
    response.json(dados)
});

//EndPoint: Delete - Exclui uma margem de erro
app.delete('/v1/mecanica/margem/erro/id/:id', cors(), async function (request, response) {
    let idMargemErro = request.params.id

    let resultDados = await controllerMargemErro.deletarMargemErro(idMargemErro)

    if (resultDados) {
        response.json(resultDados)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});


///////////////////////////////////////// Resultado Desejado //////////////////////////////////////////////


/********************************
* Objetivo : API de controle de resultado desejado
* Data : 07/06//2023
********************************/

//EndPoint: Post - Insere um resultado desejado
app.post('/v1/mecanica/resultado/desejado', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerResultadoDesejado.inserirResultadoDesjeado(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});;


//EndPoint: Put - Atualiza um resultado desejado
app.put('/v1/mecanica/resultado/desejado/id/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idResultadoDesejado = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerResultadoDesejado.atualizarResultadoDesejado(dadosBody, idResultadoDesejado)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todos resultados desejados
app.get('/v1/mecanica/resultado/desejado', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerResultadoDesejado.getResultadosDesejados()

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Retorna o resultado desejado  pelo id
app.get('/v1/mecanica/resultado/desejado/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerResultadoDesejado.getResultadoDesejadoPorID(id)

    response.status(dados.status)
    response.json(dados)
})


//EndPoint: Delete - Exclui um resultado desejado
app.delete('/v1/mecanica/resultado/desejado/id/:id', cors(), async function (request, response) {
    let idResultadoDesejado = request.params.id

    let resultDados = await controllerResultadoDesejado.deletarResultadoDesejado(idResultadoDesejado)

    if (resultDados) {
        response.json(resultDados)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});

/////////////////////////////////////////Curso e Materia Intermediaria//////////////////////////////////////////////


/********************************
* Objetivo : API de controle de Curso_Materia
* Data : 25/05/2023
********************************/


//EndPoint: Post - Insere id de curso e materia
app.post('/v1/mecanica/curso/materia', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCursoMateria.inserirCursoMateria(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});;


//EndPoint: Put - Atualiza id de curso e materia
app.put('/v1/mecanica/curso/materia/id/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idCursoMateria = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerCursoMateria.atualizarCursoMateria(dadosBody, idCursoMateria)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todos id de curso e materia
app.get('/v1/mecanica/curso/materia', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerCursoMateria.getCursoMateria()

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Delete - Exclui um resultado desejado
app.delete('/v1/mecanica/curso/materia/id/:id', cors(), async function (request, response) {
    let idCursoMateria = request.params.id

    let resultDados = await controllerCursoMateria.deletarCursoMateria(idCursoMateria)

    if (resultDados) {
        response.json(resultDados)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});


///////////////////////////////////////////////////////////////////////////////////

/********************************
* Objetivo : API de controle de Materia Tarefa
* Data : 04/06/2023
********************************/

//EndPoint: Post - Insere id de materia e tarefa
app.post('/v1/mecanica/materia/tarefa', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDados = await controllerMateriaTarefa.inserirMateriaTarefa(dadosBody);

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Put - Atualiza id materia tarefa
app.put('/v1/mecanica/materia/tarefa/id/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idMateriaTarefa = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerMateriaTarefa.atualizarMateriaTarefa(dadosBody, idMateriaTarefa)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todos
app.get('/v1/mecanica/materia/tarefa', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerMateriaTarefa.getMateriaTarefa()

    response.status(dados.status)
    response.json(dados)

});



//EndPoint: Delete - Exclui um resultado desejado
app.delete('/v1/mecanica/materia/tarefa/id/:id', cors(), async function (request, response) {
    let idMateriaTarefa = request.params.id

    let resultDados = await controllerMateriaTarefa.deletarMateriaTarefa(idMateriaTarefa)

    if (resultDados) {
        response.json(resultDados)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});


/********************************
* Objetivo : API de controle da tabela intermedia Curso_Turma_Professor
* Data : 10/06/2023
********************************/


//EndPoint: Post - Insere id do curso e do professor
app.post('/v1/mecanica/curso/turma/professor', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerCursoTurmaProfessor.inserirCursoTurmaProfessor(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


//EndPoint: Put - Atualiza id do curso/turma e do professor pelo id
app.put('/v1/mecanica/curso/turma/professor/id/:id', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let idCursoTurmaProfessor = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerCursoTurmaProfessor.atualizarCursoTurmaDoProfessor(dadosBody, idCursoTurmaProfessor)

        response.status(resultDados.status)
        response.json(resultDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }


});


//EndPoint: Get - Retorna todos
app.get('/v1/mecanica/curso/turma/professor', cors(), async function (request, response) {

    //Recebe os dados da controller
    let dados = await controllerCursoTurmaProfessor.getCursoTurmaProfessor()

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Retorna pelo id
app.get('/v1/mecanica/curso/turma/professor/id/:id', cors(), bodyParserJSON, async function (request, response) {

    let id = request.params.id

    let dados = await controllerCursoTurmaProfessor.getCursoTurmaProfessorID(id)

    response.status(dados.status)
    response.json(dados)
})


//EndPoint: Delete - Exclui pelo id
app.delete('/v1/mecanica/curso/turma/professor/:id', cors(), async function (request, response) {

    let idCursoTurmaProfessor = request.params.id

    let resultDadosCursoTurmaProfessor = await controllerCursoTurmaProfessor.deletarCursoTurmaProfessor(idCursoTurmaProfessor)

    if (resultDadosCursoTurmaProfessor) {
        response.json(resultDadosCursoTurmaProfessor)
        response.status(message.SUCESS_DELETED_ITEM.status)
    } else {
        response.json()
        response.status(message.ERROR_NOT_FOUND.status)
    }

});




/////////////////////////////////////////////////////////////////////////////////////////////////////

                                /***************************************
                                * APIS responsáveis por filtragens
                                * Data : 13/06/2023
                                **************************************** */

//EndPoint: Filtragem das turmas pelo curso
app.get('/v1/mecanica/turma/idCurso/:idCurso', cors(), bodyParserJSON, async function (request, response) {

    let idCurso = request.params.idCurso

    //Recebe os dados da controller da turma_materia
    let dados = await controllerTurma.getTurmasIDCurso(idCurso)

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Filtragem das materia pela turma
app.get('/v1/mecanica/materia/idTurma/:idTurma', cors(), bodyParserJSON, async function (request, response) {

    let idTurma = request.params.idTurma

    let dados = await controllerMateria.getMateriaIDTurma(idTurma)

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Filtragem que retorna os alunos de uma turma especifica
app.get('/v1/mecanica/alunos/turma/idTurma/:idTurma', cors(), bodyParserJSON, async function (request, response) {


    let idTurma = request.params.idTurma

    let dados = await controllerAluno.getAlunosIDTurma(idTurma)

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Filtragem que retorna os alunos pela turma junto das materias da turma.
//Preciso arrumar essa funcao com for each por causa das materias se repetindo
app.get('/v1/mecanica/alunos/materia/idTurma/:idTurma', cors(), bodyParserJSON, async function (request, response) {

    let idTurma = request.params.idTurma

    let dados = await controllerTurma.getAlunosMateriasIDTurma(idTurma)

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Filtragem dos cursos,turmas e materias daquele professor
//Arrumar essa funcao tbm com for each por causa das materias se repetindo
app.get('/v1/mecanica/curso/turma/materia/idProfessor/:idProfessor', cors(), bodyParserJSON, async function (request, response) {


    let idProfessor = request.params.idProfessor

    let dados = await controllerCursoTurmaProfessor.getCursosTurmasMateriasIDProfessor(idProfessor)

    response.status(dados.status)
    response.json(dados)

});


//EndPoint: Filtragem que retorna as tarefas de uma materia especifica.
app.get('/v1/mecanica/tarefa/materia/idMateria/:idMateria', cors(), bodyParserJSON, async function (request, response) {

    let idMateria= request.params.idMateria

    let dados = await controllerMateria.getTarefaIDMateria(idMateria)

    response.status(dados.status)
    response.json(dados)

});

//EndPoint: Filtragem que retorna todos os registros de tempo de uma tarefa
app.get('/v1/mecanica/registro/tempo/tarefa/idTarefa/:idTarefa', cors(), bodyParserJSON, async function (request, response) {

    let idTarefa = request.params.idTarefa

    let dados = await controllerRegistroTempo.getRegistrosTempoIDTarefa(idTarefa)

    response.status(dados.status)
    response.json(dados)

});

//////////////////////////Procidore //////////////////////////////

//EndPoint: Post - Insere a turma com  o metodo procidore
app.post('/v1/mecanica/turma/procidore', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dadosBody = request.body

        let resulDados = await controllerTurma.inserirDadosProcidore(dadosBody)

        response.status(resulDados.status)
        response.json(resulDados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

});


app.listen(8080, function () {
    console.log('Servidor aguardando requisição na porta 8080')
})