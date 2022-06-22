let words=['yash','bell','live','life','old','new']
let res=words.filter((e)=>{
    return e[0]=='y';
})
console.log(res);


let searchtext='yash'
let rows=['yash','garg','yasshss','yyaasshh']
let result = rows.filter.map((e)=>{
    return e.first_name[0]&&e.first_name[1]==searchtext

})
console.log(result)