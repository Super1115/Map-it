// 初始化地圖，設定中心點和縮放級別
var map = L.map('map').setView([51.505, -0.09], 13);

// 加入 OpenStreetMap 的圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 監聽地圖上的點擊事件
map.on('click', function(e) {
  var latlng = e.latlng;  // 取得點擊位置的經緯度
  L.marker([latlng.lat, latlng.lng]).addTo(map)  // 在點擊位置新增標記
    .bindPopup("標記的位置：(" + latlng.lat.toFixed(5) + ", " + latlng.lng.toFixed(5) + ")")
    .openPopup();
});