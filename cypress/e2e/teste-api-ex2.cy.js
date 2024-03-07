/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
    let token;

    before(() => {
        // Antes de cada teste, fazemos login e obtemos o token de autenticação
        cy.token( 'fulano@qa.com', 'teste').then(tkn => { token = tkn });
    });

    it('Deve listar usuários cadastrados', () => {
        // Fazemos uma requisição para a rota de usuários
        cy.request({
            method: 'GET',
            url: 'usuarios',
            headers: { authorization: token },
        }).then(response => {
            // Verificamos se a resposta tem o status 200
            expect(response.status).to.equal(200);
            // Verificamos se a propriedade "usuarios" é um array
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve validar contrato de usuários - Post', () => {
        // Fazemos uma requisição para a rota de usuários
        cy.request('usuarios').then(response => {
            // Verificamos se a resposta tem o status 200
            expect(response.status).to.equal(200);
            // Verificamos se a propriedade "usuarios" é um array
            expect(response.body.usuarios).to.be.an('array');
            // Adicione outras verificações conforme necessário para validar o contrato de usuários
        });
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        // Execute a função personalizada para cadastrar um usuário
        cy.cadastrarUsuario(token, 'Fulano', 'fulano@qa.com', 'teste');
        
        // Adicione verificações adicionais conforme necessário
    });

    it('Deve validar um usuário com email inválido', () => {
        // Execute a função personalizada para cadastrar um usuário com email inválido
        cy.cadastrarUsuario(token, 'Fulano', 'fulanoqa.com', 'teste');
        // Adicione verificações adicionais conforme necessário
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        // Execute a função personalizada para editar um usuário
        // Exemplo hipotético:
        cy.cadastrarUsuario(token, 'fulano', 'novo_email@example.com', 'nova_senha');
        // Verifique se a edição foi bem-sucedida (por exemplo, verificando o status da resposta)
        // Adicione outras verificações conforme necessário
      });
    
      it('Deve deletar um usuário previamente cadastrado', () => {
        // Execute a função personalizada para deletar um usuário
        // Exemplo hipotético:
        cy.cadastrarUsuario(token, 'Usuário a ser deletado', 'email_para_deletar@example.com', 'senha_para_deletar');
        // Execute a função para deletar o usuário
        // Verifique se a deleção foi bem-sucedida (por exemplo, verificando o status da resposta)
        // Adicione outras verificações conforme necessário
      });
    
});
