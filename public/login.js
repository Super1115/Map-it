function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider)
            .then(result =>{
                var user = result.user
                console.log(`User login ${user.displayName} Email ${user.email}`
                )
            })
    }

function signOut(){
    const auth = firebase.auth();
    console.log(auth)
        auth.signOut().then(() => {
          // Sign-out successful.
          console.log("signed-out")
        }).catch((error) => {
          // An error happened.
        });
}