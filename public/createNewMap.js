function newMapTestButton(){
    let titleForTest = prompt("Title");
    newMap(titleForTest)
}

function showCreateNewMapPrompt() {
    var userInput = prompt("Input map Title：", "Input here...");
    if (userInput != null) {
        newMap(userInput)
    }
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
        time: Date.now() 
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

