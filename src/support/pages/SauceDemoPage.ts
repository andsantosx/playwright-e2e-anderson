import { Page, expect } from '@playwright/test';
import SauceDemoElements from '../elements/SauceDemoElements';
import BasePage from './BasePage';

export default class SauceDemoPage extends BasePage {
  readonly elements: SauceDemoElements;

  constructor(readonly page: Page) {
    super(page);
    this.elements = new SauceDemoElements(page);
  }

  async fazerLogin(
    usuario = 'standard_user',
    senha = 'secret_sauce'
  ): Promise<void> {
    await this.elements.getUsernameInput().fill(usuario);
    await this.elements.getPasswordInput().fill(senha);
    await this.elements.getLoginButton().click();
  }

  async validarCatalogoCarregado(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.elements.getInventoryContainer()).toBeVisible();
    await expect(this.elements.getFirstProductCard()).toBeVisible();
  }

  async adicionarPrimeiroProdutoAoCarrinho(): Promise<string> {
    const nomeProduto = await this.elements.getFirstProductName().innerText();
    await this.elements.getFirstProductAddToCartButton().click();
    return nomeProduto;
  }

  async validarContadorCarrinho(quantidadeEsperada: string): Promise<void> {
    await expect(this.elements.getCartBadge()).toBeVisible();
    await expect(this.elements.getCartBadge()).toHaveText(quantidadeEsperada);
  }

  async abrirCarrinho(): Promise<void> {
    await this.elements.getCartLink().click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async validarProdutoNoCarrinho(nomeProdutoEsperado?: string): Promise<void> {
    await expect(this.elements.getCartItem()).toBeVisible();
    if (nomeProdutoEsperado) {
      await expect(this.elements.getCartItemName()).toHaveText(
        nomeProdutoEsperado
      );
    }
  }

  async iniciarCheckout(): Promise<void> {
    await this.elements.getCheckoutButton().click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  async preencherDadosEntrega(
    nome: string,
    sobrenome: string,
    cep: string
  ): Promise<void> {
    await this.elements.getFirstNameInput().fill(nome);
    await this.elements.getLastNameInput().fill(sobrenome);
    await this.elements.getPostalCodeInput().fill(cep);
    await this.elements.getContinueButton().click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async finalizarCompra(): Promise<void> {
    await this.elements.getFinishButton().click();
  }

  async validarCompraComSucesso(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.elements.getCompleteHeader()).toBeVisible();
    await expect(this.elements.getCompleteHeader()).toHaveText(
      'Thank you for your order!'
    );
    await expect(this.elements.getBackToProductsButton()).toBeVisible();
  }
}
