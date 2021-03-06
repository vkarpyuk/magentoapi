'use strict'

var Magento = require('../magento');

if (!process.env.MAGENTO_HOST) throw new Error('Host not present in environment variable MAGENTO_HOST');
if (!process.env.MAGENTO_USER) throw new Error('Username not present in environment variable MAGENTO_USER');
if (!process.env.MAGENTO_PASS) throw new Error('Password not present in environment variable MAGENTO_PASS');

const magento = new Magento({
  host: process.env.MAGENTO_HOST,
  port: 80,
  path: '/api/xmlrpc/',
  login: process.env.MAGENTO_USER,
  pass: process.env.MAGENTO_PASS
});

function main(){
  login(function(err, data){
    paymentPlanSchedule(cbPaymentPlanSchedule)
  })
}

main()

function login(cb) {
  magento.login(function(err, sessId) {
    if(err) return cb(err);
    cb(null, sessId);
  });
};

function paymentPlanSchedule (cb){
  magento.bighippoPaymentplanSchedule.list({}, function(err,paymentplan){
    return cb(null, paymentplan)
  })
}

function cbPaymentPlanSchedule (err, data){
  let paymentPlanSchedule = data.filter(function(objpaymentPlanSchedule){
    return process.argv[2] ? objpaymentPlanSchedule.paymentplan_id === process.argv[2] : objpaymentPlanSchedule
  })
  console.log('data', paymentPlanSchedule)
  return paymentPlanSchedule
}