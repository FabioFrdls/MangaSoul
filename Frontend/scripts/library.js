
    document.addEventListener("DOMContentLoaded", function findAll(){
            fetch(`http://localhost:8080/api/library`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("access-token")
                }
                
            })
                .then((response) =>{
                    if (!response.ok) {
                        throw new Error("Errore nella richiesta: " + response.status);
                    }
                    return response.json();
                })
                .then((data) =>{
                    const result = document.getElementById('list');
                    if(data.length == 0){
                        console.log("Your library is empty");
                        const li = document.createElement('li');
                        li.textContent =  'Your library is empty';
                        result.appendChild(li);
                        return;
                    }
                    const list = data;  
                    for (let i = 0; i < list.length; i++) {
                        const li = document.createElement('li');
                        li.textContent = ` 
                            ${list[i].title} 
                            ${list[i].year} 
                            ${list[i].volumes} 
                            ${list[i].score} 
                            ${list[i].status}`;
                        result.appendChild(li);
                    }
                    console.log(list);
                    
                })
                .catch((err) => {
                    console.log(err);
                })
        })
