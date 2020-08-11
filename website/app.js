/* Global Variables */
document.addEventListener("DOMContentLoaded", () => {


    document.getElementById('generate').addEventListener("click", performAction);


    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    let apiKey = `5b9dab0a85f62d3aeb36bb7a1a6a2ceb`;

    function performAction() {
        getAPIData().then(function (data) {
            const feeling = document.getElementById("feelings").value;
            postData('/addData', {date: newDate, temp:data.main.temp, content: feeling})
        }).then(function() {
            retrieveData();
        });
    }
    const retrieveData = async () => {
        const allData = await getData('/all');
        document.getElementById('date').innerHTML = `Today date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature now : ${(allData.temp - 273.15).toFixed(2)} &#8451;`;
        document.getElementById('content').innerHTML = `You are feeling : ${allData.content}`;
    }
    const getAPIData = async () => {
        let zip = document.getElementById('zip').value;   //'94040';
        let countryCode = document.getElementById('code').value;   //'94040';
        let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&APPID=${apiKey}`;

        const request = await fetch(url);
        try {
            const newData = await request.json();
            // console.log(newData);
            return newData;
        } catch (err) {
            console.log('error', err);
        }
    }

    const postData = async (url = '', data = {}) => {
        // console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            // console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }


    const getData = async (url = '') => {
        const request = await fetch(url);
        try {
            const Data = await request.json();
            return Data;
        } catch (err) {
            console.log('error', err);
        }
    }


});