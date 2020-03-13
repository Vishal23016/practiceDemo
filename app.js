function getArgs() {
   const args = {}
   process.argv
      .slice(2, process.argv.length)
      .forEach(arg => {
         if (arg.slice(0, 2) === '--') {
            const longArg = arg.split('=')
            args[longArg[0].slice(2, longArg[0].length)] = longArg[1]
         }
         else if (arg[0] === '-') {
            const flags = arg.slice(1, arg.length).split('')
            flags.forEach(flag => {
               args[flag] = true
            })
         }
      })
   return args
}
const args = getArgs();
var envFileName = (args.env || "local");
require('dotenv').config({ path: `src/config/.env.${envFileName}` });

const express = require('express')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
global.router = express.Router();
const url = `mongodb://${process.env.MONGOHOST}/${process.env.MONGODB}`;
mongoose.connect(url, { useNewUrlParser: true }).then(() => { 
   console.log('connection success');

   app.use('/api/v1', require('./src/config/routes'));

   const responseOk = require(`./src/middleware/ok`);
   app.use(responseOk('on')); 

   app.listen(port, () => console.log(`Admin app listening on port ${process.env.port}!`));

}).catch(err => {
   console.error('App starting error:', err.stack);
   process.exit(1);
});
/* 
* @mongo atlas url
* url = `mongodb+srv://test:test@cluster0-xhsm4.mongodb.net/test?retryWrites=true&w=majority`
 */;

