export function findMapByTitle(title){
    const database = firebase.database();
    const mapsRef = database.ref('maps');

    mapsRef.orderByChild('title').equalTo(title).once('value', (snapshot) => {
    snapshot.forEach(childSnapshot => {
        const mapData = childSnapshot.val();
        console.log(mapData); // Output: Data for users with name "John Doe"
        return mapData
    });
});
}

export function findObjectByTitle(mapTitle,title){
    const database = firebase.database();
    const mapsRef = database.ref('maps');

    mapsRef.orderByChild('title').equalTo(mapTitle).orderByChild("title").equalTo(title).once('value', (snapshot) => {
    snapshot.forEach(childSnapshot => {
        const objectData = childSnapshot.val();
        console.log(objectData); // Output: Data for users with name "John Doe"
        return objectData
    });
});
}