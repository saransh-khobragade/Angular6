exports.GetCollectionAllEntries = async (Collection,...keys) => {

    if(keys.length===0){
        return Collection.find().exec().then(data=>{
            let result=[]
            data.forEach(ele => {
                if(ele!=="_id")
                result.push({name:ele.fname,email:ele.email})
            });
            return result;
        })
        .catch(err=>console.log(err));
    }
    else{
        return Collection.find().select(keys.join(' ')).exec().then(data=>{
            let result=[]
            data.forEach(ele => {
                if(ele!=="_id")
                result.push({name:ele.fname,email:ele.email})
            });
            return result;
        }).catch(err=>console.log(err));
    }
    
}

exports.GetCollectionOneEntry = async (Collection,key) => {
    return Collection.findOne(key).exec().then(data=>{
            return data;
    }).catch(err=>console.log(err));
}
