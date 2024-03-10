/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
    let token

    before(() => {

        cy.token('fabiospzn@outlook.com', 'teste').then(tkn => { token = tkn });
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve validar contrato de usuários - Post', () => {
        cy.request('usuarios').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios).to.be.an('array');

        });
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let usuario = `Usuário EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Fabio de Oliveira",
                "email": "fabiospzn10@qa.com.br",
                "password": "teste",
                "administrador": "true"
              },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Deve validar mensagem de erro ao cadastrar usuário invalido', () => {
        cy.cadastrarUsuario(token, 'Fabio de Oliveira', 'fabiospzn@ebac.com.br', 'teste', 'true')
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal('Este email já está sendo usado');
            });
    });
    

    it ('Deve editar um usuário previamente cadastrado', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios/M3Kf2pvNWvDHhPM7',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('nome', 'Fabio de Oliveira');


        });
    });
    it.only('Deve deletar um usuário previamente cadastrado - DELETE', () => {
        cy.request({
            method: 'DELETE',
            url: 'usuarios/PIfSkyStY7oWn1MZ',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
        });
    });
                        
});
