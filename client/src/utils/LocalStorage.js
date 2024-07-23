function addToLocalStorage(key, value) {
    if (typeof value === "object") {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }

}


function getFromLocalStorage(key){
    let value = localStorage.getItem(key);
    if(!value){
        return null;
    }
    try{
        return JSON.parse(value);
    }catch(error){
        return value;
    }

}
function updateFromLocalStorage(key,updatedVal){
    let value = localStorage.getItem(key);
    if(!value){
        return null;
    }
    try{
        localStorage.setItem(key,JSON.stringify(updatedVal));
    }catch(error){
        return value;
    }

}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
    
}

function isDark(){
    const isdark=localStorage.getItem("isDark");
    if(!isdark){
        localStorage.setItem("isDark","bg-slate-800 text-white");
    }else{
        localStorage.removeItem("isDark");
    }
}

const methods={
    addToLocalStorage,
    getFromLocalStorage,
    updateFromLocalStorage,
    removeFromLocalStorage,
    isDark
}

export default methods;