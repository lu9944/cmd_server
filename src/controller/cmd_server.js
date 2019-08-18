const {exec}=require('../db/mysql')
const cmd_post=(cmd,apikey)=>{ 
    const sql=`
    update cmd set cmd_text='${cmd}' where apikey='${apikey}';
    `
    return exec(sql).then(rows=>{
      console.log("rows:",rows)
        if(rows.affectedRows=1){
            console.log("修改成功")
            return true
        }else{
            return false
        }


    })
}

const cmd_new=(cmd,apikey)=>{ 
    const sql=`
    insert into cmd(cmd_text,apikey)value('${cmd}','${apikey}');
    `
    return exec(sql).then(rows=>{
    //  console.log("rows:",rows)
        if(rows.affectedRows=1){
            console.log("新增成功")
            return true
        }else{
            return false
        }
    })
}

const cmd_get=(apikey)=>{ 
    const sql=`
    select * from cmd where apikey='${apikey}';
    `
    return exec(sql).then(rows=>{
    //  console.log("rows:",rows)
    console.log("查询到的数据是:",rows[0])

        if(rows.affectedRows=1){
            return rows[0]
        }else{
            return false
        }
    })
}


const cmd_delete=(apikey)=>{ 
    const sql=`
    delete from users where username='${apikey}';
    `
    return exec(sql).then(rows=>{
    //  console.log("rows:",rows)
        if(rows.affectedRows=1){
            console.log("删除成功")
            return true
        }else{
            return false
        }
    })
}




module.exports={
    cmd_post,cmd_new,cmd_get,cmd_delete
}