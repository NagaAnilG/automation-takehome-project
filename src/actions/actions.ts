import { Page } from '@playwright/test';

export default class Actions {

  public async clickElement(page: Page, locator: string): Promise<void> {
    const element = page.locator(locator);
    try {
      if (element) {
        await element.click();
        await page.waitForLoadState('domcontentloaded');
      } else {
        throw new Error(`Element with locator '${locator}' not found.`);
      }
    }
    catch (e: any) {
      console.log("Element not found : "+e.message);
    }
  }

  public async enterText(page: Page, locator: string, text: string): Promise<void> {
    const element = page.locator(locator);
    if (element) {
      await element.fill(text);
    } else {
      throw new Error(`Element with locator '${locator}' not found.`);
    }
  }

  public async getText(page: Page, locator: string): Promise<string> {
    const element = page.locator(locator);
    let text = 'No Text Available';
    try {
      if (element) {
        text = await element.innerText();
      } else {
        throw new Error(`Element with locator '${locator}' not found.`);
      }
    }
    catch (e: any) {
      console.log("Element not found : "+e.message);
    }
    return text;
  }

  public async getAttributeValue(page: Page, locator: string, attribute: string): Promise<string> {
    const element = page.locator(locator);
    let text = null;
    try {
      if (element) {
        text = await element.getAttribute(attribute);
      } else {
        throw new Error(`Element with locator '${locator}' not found.`);
      }
    }
    catch (e: any) {
      console.log("Element not found : "+e.message);
    }
    if (text == null) {
      text = 'No Attribute Value Available'
    }
    return text;
  }
}