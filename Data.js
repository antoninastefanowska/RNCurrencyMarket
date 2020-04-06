const URL_LOAD_ALL_DATA = "http://api.nbp.pl/api/exchangerates/tables/C/last/2?format=json";
const URL_LOAD_CURRENCY_DATA = "http://api.nbp.pl/api/exchangerates/rates/C/";

class Data {
    constructor() {
        this.tableData = [];
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new Data();
        return this.instance;
    }

    async loadTableData(callback) {
        if (this.tableData.length == 0) {
            try {
                let response = await fetch(URL_LOAD_ALL_DATA);
                let responseJson = await response.json();
    
                let yesterday = responseJson[0];
                let today = responseJson[1];
    
                for (let i = 0; i < today.rates.length; i++) {
                    today.rates[i].askIncrease = today.rates[i].ask > yesterday.rates[i].ask;
                    today.rates[i].bidIncrease = today.rates[i].bid > yesterday.rates[i].bid;
    
                    today.rates[i].askDecrease = today.rates[i].ask < yesterday.rates[i].ask;
                    today.rates[i].bidDecrease = today.rates[i].bid < yesterday.rates[i].bid;
                }
                this.tableData = today.rates;

                if (callback != null)
                    callback(today.rates);
            } catch (error) {
                callback(error);
                console.error(error);
            }
        } else {
            if (callback != null)
                callback(this.tableData);
        }
    }

    async loadCurrencyData(code, startDate, endDate, callback) {
        let url = URL_LOAD_CURRENCY_DATA + code + "/" + startDate + "/" + endDate + "?format=json";
        try {
            let response = await fetch(url);
            let responseJson = await response.json();

            callback(responseJson.rates);
        } catch (error) {
            callback(error);
            console.error(error);
        }
    }
}

export default Data;