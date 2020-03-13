var AJV = require("ajv")
var ajv = new AJV({
   allErrors: true,
   $data: true,
})
//Validate AJV
const allSchemas = require(`./../schemas`);
module.exports = function (req, res, next) {
   let routeName = (req.url.split('/')[1] || "").toLowerCase();
   let methodName = (routeName.split('?')[0]).toLowerCase();
   console.log("req.url::", methodName);
   if (typeof allSchemas[methodName] != "undefined") {
      var requestValidate = ajv.compile(allSchemas[methodName].req);
      var finalParams = { ...req.body, ...req.params, ...req.query };
      if (requestValidate(finalParams)) {
         return next()
      }
      res.json({
         status: false,
         error: requestValidate.errors[0]
      })
   } else {
      res.json({
         status: false,
         message: 'something went to wrong',
         error: {}
      })
   }
}