function signInWithGoogle(){
        const signOutDiv = document.getElementById("signOut")
        const signOutDivUserName = document.getElementById("signOutDivUserName")  
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result =>{
                var user = result.user
                console.log(`User login ${user.displayName} Email ${user.email}`)
                signOutDiv.style.display = 'block'
                signOutDivUserName.textContent = `Signed-In as ${user.displayName} (click to Sign-out)`
            })
    }

function signOut(){
    const signOutDiv = document.getElementById("signOut")
    const auth = firebase.auth();
    console.log(auth)
        auth.signOut().then(() => {
          // Sign-out successful.
          console.log("signed-out")
          signOutDiv.style.display = 'none'
        }).catch((error) => {
          // An error happened.
        });
}
