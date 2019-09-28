let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e)
{
    e.preventDefault();

    let formData = new FormData(form);

    let Params = {
        headers:
        {
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            phone1: formData.get('phone1'),
            phone2: formData.get('phone2'),
            phone3: formData.get('phone3'),
            ZIpCode: formData.get('ZIpCode'),
            age: formData.get('age')
        }),
        method:"POST"
    }

    fetch('http://localhost:3000/formData', Params)
    .then(response => response.json())
    .then(data => {
        if(data.success === "ok")
        {
            console.log("success");
            return;
        }

        let error = document.querySelector('.error');

        document.querySelector('.errorContainer').style.display = "block";

        error.innerHTML = "";

        data.errors.forEach(function(element) {
            error.innerHTML += `<li>${element.msg}</li>`
        });
        console.log(data);
    })
    .catch(err => console.log(err))
}