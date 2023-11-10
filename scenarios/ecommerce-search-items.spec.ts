import test from "@playwright/test";
import DataConstants from "@constants/data-constants";
import SearchSteps from "@steps/ecommerce-steps";
import DataUtil from "@utils/data-utils";

let steps: SearchSteps;
test.beforeEach(async ({ page }) => {
  steps = new SearchSteps(page);
});

const defaults= DataUtil.getData(DataConstants.DATA_SHEET,DataConstants.SCENARIO_1);
console.log("environment variables- scenarioID:"+ process.env.ScenarioID +", Description:"
+process.env.Description +", SearchTerm:"+ process.env.SearchTerm+", ProductCount:"+process.env.LOWEST_PRICE_PRODUCTS_COUNT);

const data={ 
  scenarioID: !!process.env.ScenarioID?process.env.ScenarioID:defaults.ScenarioID, 
  description: !!process.env.Description? process.env.Description:defaults.Description, 
  searchTerm: !!process.env.SearchTerm?process.env.SearchTerm: defaults.SearchTerm,
  productCount: !!process.env.LOWEST_PRICE_PRODUCTS_COUNT? process.env.LOWEST_PRICE_PRODUCTS_COUNT:defaults.ProductCount
};

test(`${data.scenarioID} - ${data.description}`, async () => {
    await steps.launchApplication();
    await steps.searchProduct(data.searchTerm);
    await steps.goAndFetchResults();
    await steps.filterLowestPriceProduct(data.productCount);
    await steps.writeProducts(data.scenarioID);
});