function openModal(){
    formA.style.display="block";
}
function closeModal(){
    formA.style.display="none";
    fadeAlert("Cadastrado CANCELADO!", "alert-warning")
    clearModal()
}
function saveForm(){
    addLineTable()
    formA.style.display="none";
    fadeAlert("Cadastrado com sucesso!", "alert-primary")
    clearModal()
}
function clearModal(){
    document.getElementById("num").value = ""
    document.getElementById("description").value = ""
    document.getElementById("date").value = ""
    document.getElementById("status").value = ""
}

async function erase(i){
    await fetch(`http://localhost:3000/lineTask/${i}`, {
        method: "DELETE",
        })
       showTable()
}
async function edit(i){
    await fetch(`http://localhost:3000/lineTask/${i}`, {
        method: "PUT",
        })
       showTable()
}

async function addLineTable(){
    let n = document.getElementById("num").value
    let dp = document.getElementById("description").value
    let dt = document.getElementById("date").value
    let st = document.getElementById("status").value
    dt = dt.split('-').reverse().join('/')
   
    lineTask = {
        lineNum: n,
        lineDp: dp,
        lineDt: dt,
        lineSt: st,
    }
    await fetch('http://localhost:3000/lineTask',{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(lineTask),
    })
    await showTable()
}

async function showTable(){
    // if (tasks.lineSt === "Concluído"){
    //     tasks.lineST.style.color="green"
    // }else if (tasks.lineSt === "Em Andamento"){
    //     tasks.lineST.style.color="orange"
    // }else if (tasks.lineSt === "Parado"){
    //     tasks.lineST.style.color="red"}
    const dados = await fetch('http://localhost:3000/lineTask')
    let tasks = await dados.json()
    let linha = ""
    console.log(tasks)
    tasks.forEach((tasks) => {
        linha = linha + `<tr id="lineTable${tasks.id}">
        <td id="number${tasks.id}">${tasks.lineNum}</td>
        <td id="descr${tasks.id}">${tasks.lineDp}</td>
        <td id="dat${tasks.id}">${tasks.lineDt}</td>
        <td id="stat${tasks.id}">${tasks.lineSt}</td>
        <td><img id="editLine${tasks.id}" onclick="edit(${tasks.id})" src="assets/imgs/editIcone.png"><img id="eraseLine{tasks.id}" onclick="erase(${tasks.id})" src="assets/imgs/excluirIcone.png"></td>
        </tr>`
        });
       
            document.getElementById('bodyTask').innerHTML = linha
}




showTable()


// function addTable(){
//     let n = document.getElementById("num").value
//     let dp = document.getElementById("description").value
//     let dt = document.getElementById("date").value
//     let st = document.getElementById("status").value
//     dt = dt.split('-').reverse().join('/')
//     i++
//     document.getElementById("bodyTask").innerHTML = document.getElementById("bodyTask").innerHTML + 
//     `<tr id="lineTable${i}">
//         <td id="number${i}">${n}</td>
//         <td id="descr${i}">${dp}</td>
//         <td id="dat${i}">${dt}</td>
//         <td id="stat${i}">${st}</td>
//         <td><img id="editLine${i}" onclick="edit()" src="assets/imgs/editIcone.png"><img id="eraseLine{i}" onclick="erase()" src="assets/imgs/excluirIcone.png"></td>
//         </tr>`
// }

function fadeAlert(style, status){
    let saveOrCancel
    saveOrCancel = document.getElementById("alerta")
    saveOrCancel.innerHTML = style
    saveOrCancel.classList.add(status, "animate__fadeInDown")
    saveOrCancel.classList.remove("d-none")
    //sumir após um segundo com efeito de fade up.   
window.setTimeout(() =>{
    saveOrCancel.classList.remove("animate__fadeInDown")
    saveOrCancel.classList.add("animate__fadeOutUp")
}, 1500)
window.setTimeout(() =>{
    saveOrCancel.classList.remove(status, "animate__fadeOutUp")
    saveOrCancel.classList.add("d-none")
}, 2000)
}
