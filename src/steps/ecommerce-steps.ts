import test, { Page} from "@playwright/test";
import {Product} from "@interfaces/product";
import DataUtil from "@utils/data-utils";
import Action from "actions/actions";
import { EcommerceSelectors } from "@selectors/ecommerce-selectors";

const products: Product[] = [];
let filteredProducts: Product[] = [];
let search = '';

export default class SearchSteps {    
 
    private action: Action;
    constructor(private page: Page) {
        this.page=page;
        this.action = new Action();
    }

    /**
     * Launch the Application
     */
    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            const page = this.page!;
            await page.goto('/', { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(20000);
        });
    }

    /**
     * Search the product
     */
    public async searchProduct(searchText: string) {
      await test.step(`Search the for ${searchText}`, async () => {
          search = searchText;
          const page = this.page!;
          await this.action.enterText(page, EcommerceSelectors.SEARCH_TEXTBOX, search);
      });
  }

     /**
     * go and fetch the results
     */
     public async goAndFetchResults() {
        await test.step(`I click Go and fetch results`, async () => {
            const page = this.page!;
            await this.action.clickElement(page, EcommerceSelectors.SEARCH_BUTTON);
            await this.action.clickElement(page, EcommerceSelectors.FILTER_FREE_SHIPPING_CHKBOX);
            await this.action.clickElement(page, EcommerceSelectors.FILTER_UNLOCKED);
            await this.action.clickElement(page, EcommerceSelectors.SORT_DROPDOWN);
            await this.action.clickElement(page, EcommerceSelectors.LOW_TO_HIGH_LBL);
          
            const count = await page.locator(EcommerceSelectors.SEARCH_RESULTS).count();
            const index = '<index>';
            const baseURL= process.env.BASE_URL!;
            console.log('Results count ' + count);
            if (count > 0) {
              for (let i = 1; i <= count; i++) {
                const productName = await this.action.getText(page,EcommerceSelectors.PRODUCT_NAME.replace(index, i.toString()));
                let productPrice = await this.action.getText(page,EcommerceSelectors.PRODUCT_PRICE.replace(index, i.toString()));
                productPrice = productPrice.replace('$', '');
                let productLink = await this.action.getAttributeValue(page,EcommerceSelectors.PRODUCT_LINK.replace(index, i.toString()),'href');
                products.push({ name: productName, price: parseFloat(productPrice), link: baseURL+productLink });
              }
              products.sort((a, b) => a.price - b.price);
            }
          });
    }
      
     /**
     * Filter the lowest price products
     */
     public async filterLowestPriceProduct(count: number) {
        await test.step(`I filter ${count} lowest price product information`, async () => {
            filteredProducts = products.slice(0, count);
        });
    }

    /**
     * Write the results to excel
     */
    public async writeProducts(scenarioID: string) {
        await test.step(`I write the product into csv file`, async () => {
            DataUtil.writeToCSV(
              scenarioID,
                filteredProducts,
                'ScenarioID,SearchTerm,ProductName,Price,ProductLink',
                search
              );
        });
    }
}