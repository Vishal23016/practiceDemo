var Ajv = require('ajv');
var ajv = new Ajv({
   removeAdditional: true
});
//Validate AJV
const allSchemas = require(`./../schemas`)
module.exports = function (params) {
   return function (req, res, next) {
      res.ok = function (obj) {
         let routeName = (req.url.split('/')[1] || "").toLowerCase();
         let methodName = (routeName.split('?')[0]).toLowerCase();

         if (typeof allSchemas[methodName] != "undefined") {
            var requestValidate = ajv.compile(allSchemas[methodName].res);
            if (requestValidate(obj)) {
               return res.json(obj);
            }
            // not valid
            res.json({
               status: false,
               error: requestValidate.errors[0]
            })
         } else {
            res.json({
               status: false,
               message: appMessage.common.error.schemaNotFound,
               error: {}
            })
         }
      };
      next();
   }
}