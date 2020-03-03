
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = document.querySelector('input').value;

    // const loader = document.querySelector('.loader');
    // const err = document.querySelector('.error');
    // const weather =document.querySelector('.result');
    
    // err.textContent =  ` 
    //     <div class="load spinner-border text-danger" role="status">
    //         <span class="sr-only">Loading...</span>
    //     </div>
    // `;

    
    

    fetch('http://localhost:4000/weather?address='+location)
    .then((res)=>{
        res.json().then((data)=>{
            if(data.error) {
                console.log(data.error);
                const err = document.querySelector('.error');
                err.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>${data.error}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `
            } else{
                console.log(data);
                const weather =document.querySelector('.result');
                weather.innerHTML = `
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-3">
                                <span>City Name: <span class="text-primary text-uppercase">${data.address}</span></span>
                            </div>
                            <div class="col-md-9">
                                <span>Location: ${data.location}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h4 class= "text-secondary font-weight-bold">WEATHER CONDITION</h4>
                        <p><span class="text-dark">${data.summary}</span</p>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Longitude: <span class="text-danger text-uppercase">${data.longitude}</span></p>
                                <p>Latitude: <span class="text-danger text-uppercase">${data.latitude}</span> </p>
                            </div>
                            <div class="col-md-6 ">
                                <h2>temp</h2>${data.temperature}
                                <span>&deg;c</span>
                            </div>
                        </div>
                    </div>
                `
            }
            location = '';
            
        })
        
    });

});






