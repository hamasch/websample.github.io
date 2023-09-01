/** Shopify CDN: Minification failed

Line 31:2 Transforming let to the configured target environment ("es5") is not supported yet
Line 52:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 62:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 65:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 86:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 104:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 105:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 135:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 140:8 Transforming const to the configured target environment ("es5") is not supported yet

**/
(function (algolia) {
  ('use strict');
  //var aa = algolia.externals.aa;

  var enabled = algolia.config.analytics_enabled;
  if (!enabled) return;

//   aa.init({
//     appId: algolia.config.app_id,
//     apiKey: algolia.config.search_api_key,
//   });
  
  window.aa('init', {
    appId: algolia.config.app_id,
    apiKey: algolia.config.search_api_key,
  });
  
  let userToken;

  window.aa('getUserToken', null, (err, newUserToken) => {
    if (err) {
      console.error(err);
      return;
    }
    userToken = newUserToken;
    
    
    console.log(newUserToken);
    console.log(userToken);
    
    
  });
  
  

  // Uncomment the following line and replace `yourUniqueUserToken` with a unique userToken to link events to a user.
  window.aa('setUserToken', userToken);

  const localStorageKey = 'algolia_analytics_clicked_objects';

  /**
 * Try to get the details from local storage for conversion tracking.
 * We're using a try...catch here to handle any possible exceptions resulting
 * from local storage or JSON parsing.
 */
  function trackConversion() {
    try {
      // Get any previously stored data.
      const previousClickItemsString = localStorage.getItem(localStorageKey)
      // If data was found, send a conversion event for those products.
      if (!!previousClickItemsString) {
        const previousClickItems = JSON.parse(previousClickItemsString)
        previousClickItems.forEach((data) => {
          window.aa('convertedObjectIDsAfterSearch', data);
        })
      }
    } catch (error) {
      // No need to do anything in this scenario.
    }

    // Try to remove the items from local storage.
    try {
      localStorage.removeItem(localStorageKey)
    } catch (error) {
      // No need to do anything in this scenario.
    }
  }

  
  
  // Track a conversion event when clicking the 'add to cart' button.
  // Change the query selector to be the correct one for your theme.
  const addToCartBtn = document.querySelector('#add-to-cart')
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function (e) {
      trackConversion()
    })
  }
  

  /**
   * Saves details in local storage for conversion tracking
   */
  algolia.saveForConversionTracking = function (data) {
    /**
     * We're using a try, catch here to handle any possible exceptions
     * resulting from local storage or JSON parsing.
     */
    try {
      // Get any data previously stored
      const previousClickItemsString = localStorage.getItem(localStorageKey) || '[]';
      const previousClickItems = JSON.parse(previousClickItemsString);

      var conversionData = data;

      // Changing the event to 'convert' from 'click'
      conversionData.eventName = 'click';
      // Removing the `positions` property
      delete conversionData.positions;

      // Add the current products data to local storage
      previousClickItems.push(conversionData)
      localStorage.setItem(localStorageKey, JSON.stringify(previousClickItems))
    } catch (error) {
      // No need to do anything in this scenario
    }
  };

  /**
   * Tracks conversion for products
   * (Please call this function after checkout has been completed to track
   * conversion)
   */
  algolia.trackConversion = function () {
    /**
     * Try to get the details from local storage for conversion tracking.
     * We're using a try, catch here to handle any possible exceptions resulting
     * from local storage or JSON parsing.
     */
    try {
      // Get any previously stored data
      const previousClickItemsString =
        localStorage.getItem(localStorageKey);

      // If data was found, track conversion on all those products
      if (!!previousClickItemsString) {
        const previousClickItems = JSON.parse(
          previousClickItemsString
        );
        previousClickItems.forEach((data) => {
          //aa.convertedObjectIDsAfterSearch(data);
          window.aa('convertedObjectIDsAfterSearch', data);
        });
      }
    } catch (error) {
      // No need to do anything in this scenario
    }

    // Try to remove the items from local storage.
    try {
      localStorage.removeItem(localStorageKey);
    } catch (error) {
      // No need to do anything in this scenario
    }
  };
})(window.algoliaShopify);