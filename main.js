
let item=document.getElementById("item");

 
item.addEventListener('submit',onsubmit);
// making function
function onsubmit(e){
        e.preventDefault();
        let name=e.target.username.value;  
        let email=e.target.emailId.value;
        let phoneNumber=e.target.phoneNumber.value;
//add in local storage
        // localStorage.setItem("name",name);
        // localStorage.setItem("email",email);
    

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
        axios.post("https://crudcrud.com/api/1a59ba4e4df040148d6703be66892e97/appData",myObj)
        .then((response)=>{
            
            showOnUserScreen(response.data)
            console.log(response)
        })
        .catch((error)=>{
            document.body.innerHTML=document.body.innerHTML+"<h1>Something<h2>"
            console.log(error)
        })
}
// data read from crud
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/1a59ba4e4df040148d6703be66892e97/appData")
    .then((response)=>{
        console.log(response);
        
        for(var i=0;i<response.data.length;i++){
            showOnUserScreen(response.data[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
})

function showOnUserScreen(myObj){

//create new element store data
        let ul=document.getElementById("users");
        let li=document.createElement("li");
        li.textContent=myObj.name + "-" + myObj.email + "-" + myObj.phoneNumber;
        ul.appendChild(li);
        
//create fields
        // myObj.name="";
        // myObj.email="";
        // myObj.phoneNumber="";

//create delete btn
    let deletebtn=document.createElement("input");
    deletebtn.type="button";
    deletebtn.value="Delete";
    
//append in li
    li.appendChild(deletebtn); 
//append li inside userList
    ul.appendChild(li);

    deletebtn.onclick=(e)=>{
        localStorage.removeItem(myObj.name);
        ul.removeChild(li);
        
    }
    
    let editbtn=document.createElement("input");
    editbtn.type="button";
    editbtn.value="Edit";
    // console.log(editbtn);
    //append in li
    li.appendChild(editbtn); 
    //append li inside userList
    ul.appendChild(li);

    editbtn.onclick=(e)=>{
       //populating the userdetails
        document.getElementById("item1").value=myObj.name;
        document.getElementById("item2").value=myObj.email;
        document.getElementById("item3").value=myObj.phoneNumber;
        localStorage.removeItem(myObj.name);
        ul.removeChild(li);
    }
    

}
