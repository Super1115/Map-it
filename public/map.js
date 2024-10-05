async function findMapByTitle(title){
    const database = firebase.database();
    const mapsRef = database.ref('maps');
    await mapsRef.orderByChild('title').equalTo(title).once('value', (snapshot) => {
  snapshot.forEach(childSnapshot => {
    const mapsRef = childSnapshot.ref; 
    console.log(mapsRef)

    console.log("函式執行完畢")
    return mapsRef
  });
});

}

function newObject(mapData,objectTitle,x,y,fileRefNo,description){
    const database = firebase.database();
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
    database.ref(mapData+'Object/').push(newObject)
    .then(snapshot => {
        console.log('Object added');
        //應導向渲染地圖
    })
    .catch(error => {
        console.error('Error adding object:', error);
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
        x = windowWidth - formWidth - 10;  // 距離邊界10px
    }

    if (y + formHeight > windowHeight) {
        y = windowHeight - formHeight - 10;
    }

    form.style.left = x + 'px';
    form.style.top = y + 'px';

    form.style.display = 'block';  // 顯示表單
});

// 創建 saveMarker() 函數，將表單的輸入保存到 Firebase
async function saveMarker() {
    console.log("請求")
    mapRef = await findMapByTitle("testMap")
    
    var mapInData = mapRef//輸入地圖標題

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var fileInput = document.getElementById('file');

  // 檢查是否取得 fileInput 元素
  console.log("File input element:", fileInput);
  console.log(mapRef);
  
  // 檢查檔案欄位是否存在以及是否選擇了檔案
  var fileRefNo = fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : 'No file uploaded';
  
  console.log("File to upload:", fileRefNo);  // 這行將確認我們是否正確處理檔案

  const user = firebase.auth().currentUser;

  // 檢查 user 是否登入
  console.log("Current user:", user.displayName);

  if (newMarkerLatLng && user) {
      // 調用 newObject 函數，將資料和座標傳遞給它
      newObject(
        mapInData,          // 地圖
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
          File: ${fileRefNo}
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


// 取消標記操作
function cancelMarker() {
    // 隱藏表單
    document.getElementById('markerForm').style.display = 'none';

    // 清空輸入框
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('file').value = '';
}

window.onload = function() {
    const user = firebase.auth().currentUser;
    console.log("Current user:", user);
    //開啟頁面時宣告使用者
};