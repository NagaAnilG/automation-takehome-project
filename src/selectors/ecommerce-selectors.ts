export const EcommerceSelectors = {
    SEARCH_TEXTBOX: 'input[name="field-keywords"]',
    SEARCH_BUTTON: 'input[id="nav-search-submit-button"]',
    SORT_DROPDOWN: '.a-dropdown-label',
    FILTER_UNLOCKED:'//*[@aria-label="Unlocked"]',
    FILTER_FREE_SHIPPING_CHKBOX: '//li[@aria-label="Free Shipping by Amazon"]//a',
    LOW_TO_HIGH_LBL: '#s-result-sort-select_1',
    SEARCH_RESULTS:
      '//span[@data-component-type="s-search-results"]//div[@data-component-type="s-search-result"]',
    PRODUCT_NAME:
      '(//div[@data-component-type="s-search-result"]//*[contains(@class,"s-title-instructions-style")])[<index>]',
    PRODUCT_PRICE:
      '(//div[@data-component-type="s-search-result"]//*[contains(@class,"s-price-instructions-style")])[<index>]',
    PRODUCT_LINK:
      '(//div[@data-component-type="s-search-result"]//*[contains(@class,"s-title-instructions-style")])[<index>]//a',
  };