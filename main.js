
let item=document.getElementById("item");
item.addEventListener('submit',onsubmit);
// making function
function onsubmit(e){
        e.preventDefault();
        let name=e.target.username.value;  
        let email=e.target.emailId.value;
        let phoneNumber=e.target.phoneNumber.value;
//create new variable for creating string like stru
        let myObj={
            name,
            email, 
            phoneNumber
        };
        // let x=JSON.stringify(myObj);
        // localStorage.setItem(myObj.name,x); 
        // showOnUserScreen(myObj);

        //online data
        axios.post("https://crudcrud.com/api/49311c9df0914813966244ac22080cfe/appInfo",myObj)
        .then((response)=>{
            
            showOnUserScreen(response.data)
            console.log(response)
        })
        .catch((error)=>{
            document.body.innerHTML=document.body.innerHTML+"<h1>Something wrong<h2>"
            console.log(error)
        })
}


async function showOnUserScreen(){
//create new element store data
    let ul=document.getElementById("users");
    let innerHTML="";
    const response=await axios.get("https://crudcrud.com/api/49311c9df0914813966244ac22080cfe/appInfo")
    let appointments=response.data;
    for(let i=0; i<appointments.length;i++){
        const appointment=appointments[i];
        let li=document.createElement("li");
        
        

//create delete btn
    let deletebtn=document.createElement("input");
    deletebtn.type="button";
    deletebtn.value="Delete";
    li.appendChild(deletebtn); 
    ul.appendChild(li);
    deletebtn.onclick=async()=>{
        await axios.delete(`https://crudcrud.com/api/49311c9df0914813966244ac22080cfe/appInfo/${appointment._id}`)
        ul.removeChild(li);
    }
//create editbtn
    let editbtn=document.createElement("input");
    editbtn.type="button";
    editbtn.value="Edit";
    
    

    editbtn.onclick=async()=>{
        await axios.delete(`https://crudcrud.com/api/49311c9df0914813966244ac22080cfe/appInfo/${appointment._id}`)
        //populating the userdetails
        document.getElementById("item1").value=appointment.name;
        document.getElementById("item2").value=appointment.email;
        document.getElementById("item3").value=appointment.phoneNumber;
        
        ul.removeChild(li);
    }
    li.textContent=appointment.name + "-" + appointment.email + "-" + appointment.phoneNumber;
    li.appendChild(editbtn); 
    li.appendChild(deletebtn); 
    ul.appendChild(li);
    

}

}
document.addEventListener("DOMContentLoaded",()=>{
    showOnUserScreen();
})
