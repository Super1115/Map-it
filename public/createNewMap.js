function showCreateNewMapPrompt() {
    const user = firebase.auth().currentUser;
    if(user){
        var userInput = prompt("Input map Title：", "Input here...");
         
        checkTitleExists(userInput).then(exists => {
        if (exists) {
            console.log("title already exists in the database.");
            alert(`${userInput} is not available!`)
        } else {
            console.log("title is available.");
            newMap(userInput)
        }
        })
        .catch(error => {
            console.error("Error checking name:", error);
    });
        
    }
    else{
        alert("You Must Login To Create Map")
    }
}
function checkTitleExists(title) {
    const database = firebase.database();
    const mapsRef = database.ref('/maps/');
    return new Promise((resolve, reject) => {
      mapsRef.orderByChild('title').equalTo(title).once('value', (snapshot) => {
        if (snapshot.exists()) {
          resolve(true); // Name exists
        } else {
          resolve(false); // Name does not exist
        }
      });
    });
  }

function newMap(title){
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    const UID = user.uid;
    const userName = user.displayName
    const newMap = {
        title: title,
        user: userName,
        UID: UID,
        time: Date.now(),
        object : {}
    };
    database.ref('/maps/').push(newMap)
    .then(snapshot => {
        console.log('Map added');
        //應導向渲染地圖
    })
    .catch(error => {
        console.error('Error adding object:', error);
    });
}

