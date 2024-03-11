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
                "email": "fabiospsp@qa.com.br",
                "password": "teste",
                "administrador": "true"
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Deve validar mensagem de erro ao cadastrar usuário inválido', () => {
        const usuario = 'Fabio de Oliveira'; 
        const email = 'fabiospzn@ebac.com.br'; 
       cy.cadastrarUsuario(token, usuario, email, 'teste', 'true').then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Este email já está sendo usado');
        });
    });


    it('Deve editar um usuário previamente cadastrado', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios/M3Kf2pvNWvDHhPM7',
            headers: { authorization: token },
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('nome', 'Fabio de Oliveira');


        });
    });


    it('Deve deletar um usuário previamente cadastrado', () => {

        const usuario = `Usuário EBAC ${Math.floor(Math.random() * 100000000)}`;
        cy.cadastrarUsuario(token, usuario, 'fabiospzn13@qa.com.br', 'teste', 'true').then(response => {
            const id = response.body._id;

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,
                headers: { authorization: token }
            }).then(response => {
                expect(response.body.message).to.equal('Registro excluído com sucesso');
                expect(response.status).to.equal(200);
            });
        });
    });

});