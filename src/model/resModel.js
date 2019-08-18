class BaseModel{
    constructor(data,message){
        if(typeof(data)==='string'){
            this.message=data
            data=null
            message=null
        }

        if(data){
            this.data=data
        }
        if(message){
            this.message=message
        }
    }
}

class SuccessMode extends BaseModel{
    constructor(data,message){
    super(data,message) //super执行父类的构造函数
    this.errNum=0
    }
}

class ErrorModel extends BaseModel{
    constructor(data,message){
    super(data,message) //super执行父类的构造函数
    this.errNum=-1
    }
}

module.exports={
    SuccessMode,
    ErrorModel
}