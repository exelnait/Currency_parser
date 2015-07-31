var express = require('express'),
	request = require("request"),
    cheerio = require("cheerio");
	
var router = express.Router();
var url = "http://finance.i.ua/";
router.route('/')
.get(function (req, res) {
	var data = {
		date: new Date(),
		usd: {
			blackmarket: {},
			interbank: {},
			nbu: {}
		},
		eur: {
			blackmarket: {},
			interbank: {},
			nbu: {}
		},
		rur: {
			blackmarket: {},
			interbank: {},
			nbu: {}
		},
		fuel: {}
	};
	var result;
	request(url, function (error, response, body) {
		if (!error) {
	    	var $ = cheerio.load(body);
			$(".Left .Right div.block_gamma_dark table td big").each(function (i, elem) {
				var text = Number($(elem).text());
				switch(i) {
					case 0: data.usd.blackmarket.buy = text;break;
					case 1: data.usd.blackmarket.sell = text;break;
					case 2: data.eur.blackmarket.buy = text;break;
					case 3: data.eur.blackmarket.sell = text;break;
					case 4: data.rur.blackmarket.buy = text;break;
					case 5: data.rur.blackmarket.sell = text;break;
					case 6: data.usd.interbank.buy = text;break;
					case 7: data.usd.interbank.sell = text;break;
					case 8: data.usd.nbu.buy = text;break;
					case 9: data.eur.interbank.buy = text;break;
					case 10: data.eur.interbank.sell = text;break;
					case 11: data.eur.nbu.buy = text;break;
					case 12: data.rur.interbank.buy = text;break;
					case 13: data.rur.interbank.sell = text;break;
					case 14: data.rur.nbu.buy = text;break;
					case 15: data.fuel.a80 = text;break;
					case 16: data.fuel.a92 = text;break;
					case 17: data.fuel.a95 = text;break;
					case 18: data.fuel.disel = text;break;
				}
			});
			if (req.query.type) {
				data[req.query.type].date = new Date();
				result = data[req.query.type];
			} else {
				result = data;
			}
	    }
		console.log(result);
		res.json(error ? error.toString() : result);
	});
});

module.exports = router;