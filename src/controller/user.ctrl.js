

const createUser = (req,res)=>{
   console.log('test......createUser API');
   // let response = commonHelpers.returnSuccessOrFailureObject(false, appMessage.master.error.findError, {}, {});
   let response = {
      status: true,
      message: 'done',
      data: { },
      error: null
   }
   console.log('response:::');
   return res.json(response);
}

const login = (req,res)=>{

}

module.exports = {
   createUser,
   login
}