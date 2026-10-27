import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import SauceDemoPage from '../support/pages/SauceDemoPage';

test.describe('Sauce Demo - Fluxo de Compra E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let sauceDemoPage: SauceDemoPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.sauceDemo')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    sauceDemoPage = new SauceDemoPage(page);
    await page.goto(BASE_URL);
  });

  test('Deve realizar a compra de um produto com sucesso do início ao fim', async () => {
    let nomeProduto = '';
    const nomeComprador = faker.person.firstName();
    const sobrenomeComprador = faker.person.lastName();
    const cepComprador = faker.location.zipCode('#####-###');

    await test.step('1. Fazer login com usuário padrão', async () => {
      await sauceDemoPage.fazerLogin('standard_user', 'secret_sauce');
      await sauceDemoPage.validarCatalogoCarregado();
    });

    await test.step('2. Adicionar produto ao carrinho e verificar badge visual', async () => {
      nomeProduto = await sauceDemoPage.adicionarPrimeiroProdutoAoCarrinho();
      await sauceDemoPage.validarContadorCarrinho('1');
    });

    await test.step('3. Acessar o carrinho e validar item adicionado', async () => {
      await sauceDemoPage.abrirCarrinho();
      await sauceDemoPage.validarProdutoNoCarrinho(nomeProduto);
    });

    await test.step('4. Iniciar checkout e preencher informações de entrega', async () => {
      await sauceDemoPage.iniciarCheckout();
      await sauceDemoPage.preencherDadosEntrega(
        nomeComprador,
        sobrenomeComprador,
        cepComprador
      );
    });

    await test.step('5. Finalizar a compra e validar tela de sucesso', async () => {
      await sauceDemoPage.finalizarCompra();
      await sauceDemoPage.validarCompraComSucesso();
    });
  });
});
