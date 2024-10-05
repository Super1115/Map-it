export function isLoggedIn(){
    const user = firebase.auth().currentUser;
    if(user){
        return true
    }
    else{
        return false
    }
}