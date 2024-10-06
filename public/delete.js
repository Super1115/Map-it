function deleteObject(mapTitle,objectTitleToDelete){
    const database = firebase.database();
    const mapsRef = database.ref('/maps/');
    const user = firebase.auth().currentUser;
    const UID = user.uid;
    let objectToDeleteData = findObjectByTitle(mapTitle,objectTitleToDelete)
    if(objectToDeleteData.UID==UID){
        if (confirm(`Are You Sure?`)) {
            mapsRef.orderByChild('title').equalTo(mapTitle).orderByChild("title").equalTo(title).delete()
          }
    }
    else{
        alert("You Are Not The Creator Of This Object!")
    }


}