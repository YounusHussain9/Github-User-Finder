export const specUsers =(data)=>{
    
    return{
        type:'specusers',
        payload :{
         data : data
  }
    }
}

export const defaultUser =(data)=>{
    return{
        type:'Default',
        payload :{
            data : data
        }
    }
}