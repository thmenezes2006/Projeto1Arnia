let idEdit = ""

function openModalSave(){
    formA.style.display="block";
    saveNew.style.display="block";
    save.style.display="none";
    document.getElementById("titleModal").innerHTML = "Adicionar nova tarefa"
}
function openModalEdit(){
    formA.style.display="block";
    save.style.display="block";
    saveNew.style.display="none";
    document.getElementById("titleModal").innerHTML = "Editar tarefa existente"
}
function closeModal(){
    formA.style.display="none";
    fadeAlert("Cadastrado CANCELADO!", "alert-warning", 1500, 2000) 
    clearModal()
}

function clearModal(){
    document.getElementById("num").value = ""
    document.getElementById("description").value = ""
    document.getElementById("date").value = ""
    document.getElementById("status").value = ""
}

async function erase(id){
    await fetch(`http://localhost:3000/lineTask/${id}`, {
        method: "DELETE",
        })
       showTable()
}
async function edit(id){
    idEdit = id
    const editD = await fetch(`http://localhost:3000/lineTask/${id}`)
    let editDados = await editD.json()
    document.getElementById("num").value = editDados.lineNum
    document.getElementById("description").value = editDados.lineDp
    document.getElementById("date").value = editDados.lineDt
    document.getElementById("status").value = editDados.lineSt
    openModalEdit()
}

async function addLineTable(){
    let n = document.getElementById("num").value
    let dp = document.getElementById("description").value
    let dt = document.getElementById("date").value
    let st = document.getElementById("status").value
    if(verification(n, dp, dt, st) == true){

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

        formA.style.display="none";
        clearModal()
        fadeAlert("Cadastrado com sucesso!", "alert-primary",1500 ,2000)
        await showTable()
    } 
}
   

async function editLineTable(id){
    let n = document.getElementById("num").value
    let dp = document.getElementById("description").value
    let dt = document.getElementById("date").value
    let st = document.getElementById("status").value
    if(verification(n, dp, dt, st) == true){
  
        lineTask = {
            lineNum: n,
            lineDp: dp,
            lineDt: dt,
            lineSt: st,
        }
        await fetch(`http://localhost:3000/lineTask/${id}`,{
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(lineTask), 
        })
        formA.style.display="none";
        fadeAlert("Atualizado com sucesso!", "alert-primary",1500 ,2000)
        clearModal()
        await showTable()
    }
}
   

async function showTable(){
    const dados = await fetch('http://localhost:3000/lineTask')
    let tasks = await dados.json()
    let linha = ""
    let cor = ""
    tasks.forEach((tasks) => {

        if(tasks.lineSt === "Concluído"){
            cor= "green";
        }else  if (tasks.lineSt === "Em Andamento"){
            cor= "orange";
        }else if (tasks.lineSt === "Parado"){
            cor= "red";
        }

        linha = linha + `<tr id="lineTable${tasks.id}">
        <td id="number${tasks.id}">${tasks.lineNum}</td>
        <td id="descr${tasks.id}">${tasks.lineDp}</td>
        <td id="dat${tasks.id}">${tasks.lineDt.split('-').reverse().join('/')} </td>
        <td id="stat${tasks.id}" class="${cor}">${tasks.lineSt}</td>
        <td><img id="editLine${tasks.id}" onclick="edit(${tasks.id})" src="assets/imgs/editIcone.png"><img id="eraseLine{tasks.id}" onclick="erase(${tasks.id})" src="assets/imgs/excluirIcone.png"></td>
        </tr>`

        });
    
            document.getElementById('bodyTask').innerHTML = linha
        }


showTable()

function fadeAlert(style, status, t1, t2){
    let saveOrCancel
    saveOrCancel = document.getElementById("alerta")
    saveOrCancel.innerHTML = style
    saveOrCancel.classList.add(status, "animate__fadeInDown")
    saveOrCancel.classList.remove("d-none")
window.setTimeout(() =>{
    saveOrCancel.classList.remove("animate__fadeInDown")
    saveOrCancel.classList.add("animate__fadeOutUp")
}, t1)
window.setTimeout(() =>{
    saveOrCancel.classList.remove(status, "animate__fadeOutUp")
    saveOrCancel.classList.add("d-none")
}, t2)
}

function verification(n, dp, dt, st){
    if (n != "" && dp != "" && dt != "" && st != ""){
        return true
    }else {
        fadeAlert("Todos os campos devem ser preenchidos!", "alert-danger",2000 ,2500)
    }

}