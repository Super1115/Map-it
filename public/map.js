var map = L.map('map').setView([51.505, -0.09], 13);

// 加入 OpenStreetMap 的圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 用來存儲標記的位置信息和標記引用
var newMarkerLatLng = null;
var currentMarker = null; // 用來存儲當前正在編輯的標記

// 監聽地圖上的點擊事件，並顯示表單
map.on('click', function(e) {
  newMarkerLatLng = e.latlng;  // 儲存點擊的位置

  var form = document.getElementById('markerForm');
  var coordinates = document.getElementById('coordinates');
  var x = e.originalEvent.pageX;
  var y = e.originalEvent.pageY;

  // 顯示座標位置
  coordinates.textContent = "Longitude: " + newMarkerLatLng.lng.toFixed(5) + ", Latitude: " + newMarkerLatLng.lat.toFixed(5);

  // 調整彈窗位置，避免超出邊界
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

// 保存標記點並顯示標題和描述
function saveMarker() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;

  if (newMarkerLatLng) {
    // 如果是新建標記
    if (!currentMarker) {
      var marker = L.marker([newMarkerLatLng.lat, newMarkerLatLng.lng]).addTo(map);
      marker.bindPopup(createPopupContent(title, description, marker)).openPopup();
    } else {
      // 如果是編輯標記
      currentMarker.setPopupContent(createPopupContent(title, description, currentMarker)).openPopup();
      currentMarker = null; // 重置
    }

    // 隱藏表單
    document.getElementById('markerForm').style.display = 'none';

    // 清空輸入框
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  }
}

// 創建包含編輯和刪除按鈕的彈出窗口內容
function createPopupContent(title, description, marker) {
  return `<b>${title}</b><br>${description}<br>
          <button onclick="editMarker('${title}', '${description}', ${marker._leaflet_id})">Edit</button>
          <button onclick="deleteMarker(${marker._leaflet_id})">Delete</button>`;
}

// 編輯標記
function editMarker(title, description, markerId) {
  var marker = map._layers[markerId];
  currentMarker = marker; // 設置當前編輯的標記
  newMarkerLatLng = marker.getLatLng(); // 設置經緯度

  // 將現有的標題和描述放入表單中
  document.getElementById('title').value = title;
  document.getElementById('description').value = description;

  // 顯示表單
  document.getElementById('markerForm').style.display = 'block';
}

// 刪除標記
function deleteMarker(markerId) {
  var marker = map._layers[markerId];
  map.removeLayer(marker); // 從地圖上刪除標記
}

// 取消標記操作
function cancelMarker() {
  document.getElementById('markerForm').style.display = 'none';

  // 清空輸入框
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  currentMarker = null; // 重置編輯狀態
}