

function addRows() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];



    currentMapTitle = window.localStorage.getItem("currentMapTitle")
    const database = firebase.database();
    const ref = database.ref('/maps/'); // Replace 'your/data/path' with the actual path to your data
    const titleToFind = currentMapTitle; // Replace with the title you're searching for
    tableBody.innerHTML = '';
    ref.orderByChild('title').equalTo(titleToFind).once('value', (snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const ref = childSnapshot.ref; // This is the reference to the data with the matching title
            console.log('Found data with title:', titleToFind, 'at ref:', ref);
            ref.once('value',(snapshot) => {
                let allData = snapshot.val()
                console.log(allData.objects)
                for (let i in allData.objects){
                    let object = allData.objects[i]
                    let newRow = tableBody.insertRow();
                    let img = document.createElement('img');
                    img.src = object.file

                    // Insert cells and set their content
                    const TitleCell = newRow.insertCell(0);
                    TitleCell.textContent = object.title;

                    const DescriptionCell = newRow.insertCell(1);
                    DescriptionCell.textContent = object.description;
                    
                    const ImageCell = newRow.insertCell(2);
                    ImageCell.appendChild(img);

                    const coordinatesCell = newRow.insertCell(3);
                    coordinatesCell.textContent = object.x + " , "+object.y
                    
                    const CreatedByCell = newRow.insertCell(4);
                    CreatedByCell.textContent = object.user;
                
                }
            })

            // You can now access the data using ref.val() or perform other operations
        });
    } else {
        console.log('No data found with title:', titleToFind);
    }})

}
window.onload = function() {
    addRows()
};