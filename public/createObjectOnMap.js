// function newObject(map,objectTitle,x,y,fileRefNo,description){
//     const database = firebase.database();
//     const user = firebase.auth().currentUser;
//     const UID = user.uid;
//     const userName = user.displayName
//     const newObject = {
//         x : x,
//         y : y,
//         user: userName,
//         time : Date.now(),
//         title : objectTitle,
//         file : fileRefNo,
//         description : description,
//         UID: UID

//     };
//     database.ref(`/maps/${mapTitle}/`).push(newObject)
//     .then(snapshot => {
//         console.log('Object added');
//         //應導重新渲染地圖
//     })
//     .catch(error => {
//         console.error('Error adding object:', error);
//     });
// }