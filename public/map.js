// 初始化地圖，設定中心點為 [51.505, -0.09] 和縮放級別 13
var map = L.map('map').setView([51.505, -0.09], 13);

// 添加 OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 定義標記點的位置
var locations = [
  [51.505, -0.09],  // 第一個標記點
  [51.515, -0.1],   // 第二個標記點
  [51.52, -0.12]    // 第三個標記點
];

// 在地圖上增加多個標記點
locations.forEach(function(location) {
  L.marker(location).addTo(map)
    .bindPopup('這是標記點: ' + location.toString())
    .openPopup();
});