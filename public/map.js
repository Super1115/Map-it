function newObject(mapTitle,objectTitle,x,y,fileRefNo,description){

    const user = firebase.auth().currentUser;
    const UID = user.uid;
    const userName = user.displayName
    const newObject = {
        x : x,
        y : y,
        user: userName,
        time : Date.now(),
        title : objectTitle,
        file : fileRefNo,
        description : description,
        UID: UID

    };
appendDataByTitle(mapTitle,newObject)
}

function appendDataByTitle(title, newData) {
    const database = firebase.database();
    const ref = database.ref('maps/'); // Replace 'your/data/path' with the actual path to your data
    const titleToFind = title; // Replace with the title you're searching for
    ref.orderByChild('title').equalTo(titleToFind).once('value', (snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const ref = childSnapshot.ref; // This is the reference to the data with the matching title
            console.log('Found data with title:', titleToFind, 'at ref:', ref);
            database.ref(ref).child('objects').push(newData)
            // You can now access the data using ref.val() or perform other operations
        });
    } else {
        console.log('No data found with title:', titleToFind);
    }
});

  }
  

// 初始化地圖
var map = L.map('map').setView([51.505, -0.09], 13);

// 加入 OpenStreetMap 圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// 儲存當前點擊的經緯度
var newMarkerLatLng = null;

// 監聽地圖上的點擊事件，並顯示表單
map.on('click', function(e) {
    newMarkerLatLng = e.latlng;  // 儲存點擊的位置
    
    var form = document.getElementById('markerForm');
    var coordinates = document.getElementById('coordinates');
    var x = e.originalEvent.pageX;
    var y = e.originalEvent.pageY;

    // 顯示座標位置
    coordinates.textContent = "Longitude: " + newMarkerLatLng.lng.toFixed(5) + ", Latitude: " + newMarkerLatLng.lat.toFixed(5);

    // 調整表單位置，避免超出邊界
    var formWidth = form.offsetWidth;
    var formHeight = form.offsetHeight;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    if (x + formWidth > windowWidth) {
        x = windowWidth - formWidth - 30;  // 距離邊界10px
    }

    if (y + formHeight > windowHeight) {
        y = windowHeight - formHeight - 30;
    }

    form.style.left = x + 'px';
    form.style.top = y + 'px';

    form.style.display = 'block';  // 顯示表單
});

// 創建 saveMarker() 函數，將表單的輸入保存到 Firebase
async function saveMarker() {
    const user = firebase.auth().currentUser;
    const storage = firebase.storage()
    console.log(storage)
    console.log("Current user:", user);
    if(!user){
      alert("Please Login")
      window.location.href = "./index.html"
    }

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var fileInput = document.getElementById('file').files[0];
    var fileRefNo = null;

    // 檢查是否取得 fileInput 元素
    console.log("File input element:", fileInput);

  
    // 檢查檔案欄位是否存在以及是否選擇了檔案
    if (fileInput != null){
        
        console.log("File to upload");  // 這行將確認我們是否正確處理檔案
        storage.ref("/image/"+fileInput.name).put(fileInput).then((snapshot) => {
            console.log('Uploaded file successfully!');
            console.log(snapshot)
            snapshot.ref.getDownloadURL().then(url =>{
                fileRefNo = url
                console.log(fileRefNo)
                if (newMarkerLatLng && user) {
                    // 調用 newObject 函數，將資料和座標傳遞給它
                    console.log(fileRefNo)
                    newObject(
                      window.localStorage.getItem("currentMapTitle"),          // 地圖
                        title,             // 標記的標題
                        newMarkerLatLng.lat, // 緯度
                        newMarkerLatLng.lng, // 經度
                        fileRefNo,         // 檔案名
                        description        // 描述
                    );
                    console.log("加入資料庫")
                    // 在地圖上顯示新標記
                    const marker = L.marker([newMarkerLatLng.lat, newMarkerLatLng.lng]).addTo(map);
                    marker.bindPopup(`
                        <b>${title}</b><br>
                        Description: ${description}<br>
                        Image: <img class = "popUpImg"src="${fileRefNo}">
                    `).openPopup();
              
                    // 隱藏表單
                    document.getElementById('markerForm').style.display = 'none';
              
                    // 清空輸入框
                    document.getElementById('title').value = '';
                    document.getElementById('description').value = '';
                    fileInput.value = null;  // 清空檔案上傳欄位
                } else {
                    alert("Please click on the map to add a marker and ensure you're logged in.");
                }
            }).catch((error) => {
                console.error('Error getting URL:', error);
              });

          }).catch((error) => {
            console.error('Error uploading file:', error);
          });
    }else{
        if (newMarkerLatLng && user) {
            // 調用 newObject 函數，將資料和座標傳遞給它
            console.log(fileRefNo)
            newObject(
              window.localStorage.getItem("currentMapTitle"),          // 地圖
                title,             // 標記的標題
                newMarkerLatLng.lat, // 緯度
                newMarkerLatLng.lng, // 經度
                fileRefNo,         // 檔案名
                description        // 描述
            );
            console.log("加入資料庫")
            // 在地圖上顯示新標記
            const marker = L.marker([newMarkerLatLng.lat, newMarkerLatLng.lng]).addTo(map);
            marker.bindPopup(`
                <b>${title}</b><br>
                Description: ${description}<br>
                Image: <img class = "popUpImg"src="${fileRefNo}">
            `).openPopup();
      
            // 隱藏表單
            document.getElementById('markerForm').style.display = 'none';
      
            // 清空輸入框
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            fileInput.value = null;  // 清空檔案上傳欄位
        } else {
            alert("Please click on the map to add a marker and ensure you're logged in.");
        }
    }





  

}


// 取消標記操作
function cancelMarker() {
    // 隱藏表單
    document.getElementById('markerForm').style.display = 'none';

    // 清空輸入框
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('file').value = '';
}

function showOpenMapPrompt(){
    const user = firebase.auth().currentUser;
    if(user){
        var userInput = prompt("Map Title");
         
        checkMapTitleExists(userInput).then(exists => {
        if (exists) {
            console.log("map exists in the database.");
            window.localStorage.setItem("currentMapTitle",userInput)
            window.location.href='map.html'
        } else {
            alert(`${userInput} does NOT exist! Please Create Map`)
            
        }
        })
        .catch(error => {
            console.error("Error checking name:", error);
    });
        
    }
    else{
        alert("You Must Login To View Map")
    }
}

function checkMapTitleExists(title) {
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

function renderCurrentMap(){
    console.log("rendering Map")
    currentMapTitle = window.localStorage.getItem("currentMapTitle")
    const database = firebase.database();
    const ref = database.ref('maps/'); // Replace 'your/data/path' with the actual path to your data
    const titleToFind = currentMapTitle; // Replace with the title you're searching for
    ref.orderByChild('title').equalTo(titleToFind).once('value', (snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const ref = childSnapshot.ref; // This is the reference to the data with the matching title
            console.log('Found data with title:', titleToFind, 'at ref:', ref);
            ref.once('value',(snapshot) => {
                renderObjFromDBToMap(snapshot.val())
              })

            // You can now access the data using ref.val() or perform other operations
        });
    } else {
        console.log('No data found with title:', titleToFind);
    }})
}
function deleteMap(mapTitleToDelete){
    const database = firebase.database();
    const mapsRef = database.ref('/maps/');
    const user = firebase.auth().currentUser;
    const UID = user.uid;
    mapsRef.orderByChild('title').equalTo(mapTitleToDelete).once('value', (snapshot) => {
        console.log(snapshot)

        if(snapshot.UID==UID){
            if (confirm(`Are You Sure?`)) {
                snapshot.ref().delete()
              }
        }
        else{
            alert("You Are Not The Creator Of This Map!")
        }
      });
    };
  



function renderObjFromDBToMap(mapData){ //請提供整當地圖的資料
    console.log(mapData.objects)
    for (let i in mapData.objects){
        const object = mapData.objects[i]
        drawObjToMap(object.x,object.y,object.title,object.file,object.description,object.UID,object.user)
    }

    
}

function drawObjToMap(x,y,title,file,description,UID,user){
    const marker = L.marker([x, y]).addTo(map);
      marker.bindPopup(`
          <b>${title}</b><br>
          Description: ${description}<br>
          Image: <img class = "popUpImg"src="${file}">
      `).openPopup();
}

window.onload = function() {
    const user = firebase.auth().currentUser;
    console.log("Current user:", user);
    //開啟頁面時宣告使用者
};