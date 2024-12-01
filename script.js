import {city} from "./City.js";
const cityObj = city();
const select = document.querySelector("#city");
const currTemp = document.querySelector(".now");
const list = document.querySelector(".allTempList");
const referImage = document.querySelector(".referance");


for (const property in cityObj) {
    let option = document.createElement("option");
    option.text = property;
    option.value = property;
    select.add(option);
}

select.onchange = function() {
    let tempVal = this.value;
    API(tempVal);
};



function API(tempVal){
    const time = new Date();
    const hrs = time.getHours();

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityObj[tempVal][0]}&longitude=${cityObj[tempVal][1]}&hourly=temperature_2m`)
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        return data.hourly;
    })
    .then((data) => {
        if(data.temperature_2m[hrs] < 15){
            referImage.src="./src/cold.gif";
        } else if(data.temperature_2m[hrs] >= 15 && data.temperature_2m[hrs] < 40){
            referImage.src="./src/Spring.gif";
        } else {
            referImage.src="./src/Hot.gif";
        }

        currTemp.innerHTML = `${data.time[hrs].slice(11)}  ${data.temperature_2m[hrs]}°C`;

        for(let i=0 ; i<(data.time).length ; i++){
            let li = document.createElement("li");
            li.innerText = `${data.time[i]} ${data.temperature_2m[i]}°C`;
            list.appendChild(li);
        }
    })
    .catch((error) => {
    })
}
