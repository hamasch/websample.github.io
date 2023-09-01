    window.addEventListener('DOMContentLoaded', () => {
      const protectionInStore = localStorage.getItem('cart_protection');
      const currentUrl = window.location.href;
      const isPreviewUrl = currentUrl.includes('nvd-preview=true');
      if(isPreviewUrl) sessionStorage.setItem('ndvPreview',true);
      if (
        protectionInStore != null
        && protectionInStore !== undefined
      ) {
        const variantID = protectionInStore;
    
        const removeRequest = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: String(variantID),
            quantity: 0,
          }),
        };
        fetch('/cart/change.js', removeRequest)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            localStorage.removeItem('nvd_opted_out');
            localStorage.removeItem('reloaded');
            localStorage.removeItem('navidium_variant');
            localStorage.removeItem('cart_protection');
            localStorage.removeItem('protection_price');
            localStorage.removeItem('navidium_reload');
            window.location.reload();
          });
      }
      (function storeCurrency() {
      const currency = Shopify.currency;
       localStorage.setItem('nvdCurrency', JSON.stringify(currency));
    })();
    }); 
