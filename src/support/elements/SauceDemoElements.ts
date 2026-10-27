import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class SauceDemoElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
  }

  getUsernameInput(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  getPasswordInput(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  getLoginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  getInventoryContainer(): Locator {
    return this.page.locator('[data-test="inventory-container"]');
  }

  getFirstProductCard(): Locator {
    return this.page.locator('[data-test="inventory-item"]').first();
  }

  getFirstProductAddToCartButton(): Locator {
    return this.getFirstProductCard().locator(
      'button[data-test^="add-to-cart"]'
    );
  }

  getFirstProductName(): Locator {
    return this.getFirstProductCard().locator(
      '[data-test="inventory-item-name"]'
    );
  }

  getFirstProductPrice(): Locator {
    return this.getFirstProductCard().locator(
      '[data-test="inventory-item-price"]'
    );
  }

  getCartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  getCartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  getCartList(): Locator {
    return this.page.locator('[data-test="cart-list"]');
  }

  getCartItem(): Locator {
    return this.getCartList().locator('[data-test="inventory-item"]').first();
  }

  getCartItemName(): Locator {
    return this.getCartItem().locator('[data-test="inventory-item-name"]');
  }

  getCheckoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  getFirstNameInput(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  getLastNameInput(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  getPostalCodeInput(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  getContinueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  getFinishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  getCompleteHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  getCompleteText(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }

  getBackToProductsButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }
}
