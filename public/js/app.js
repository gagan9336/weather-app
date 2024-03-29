console.log("client side server created");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`https://gagan-weather-app.herokuapp.com/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
            //    message1.textContent = data.error;
            console.log(data.error);
            }else{
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
        })
});