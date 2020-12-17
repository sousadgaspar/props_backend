const paymentGatewayController = require("../controllers/PaymentGatewayController");
const paymentGatewayRoutes = require('express').Router();

paymentGatewayRoutes.get('/api/paymentgateway/emis/generatepaymentreference', paymentGatewayController.generatePaymentReference);
module.exports.paymentGatewayRoutes = paymentGatewayRoutes;