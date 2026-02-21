fetch ('http://localhost:3000/users').then( res=>res.json()).then((data)=>{
    console.log(data);
})
fetch('http://localhost:3000/debts/1').then(res=>res.json()).then((data)=>{
    console.log(data);
})

fetch('http://localhost:3000/users/10',{
    method:'DELETE',
    headers:{"content-type":"application/json"},
}).then(res=>res.json()).then((data)=>{
    console.log(data);
})

fetch ('http://localhost:3000/user',{
    method:'POST',
    headers:{"content-type":"application/json"},
    body:JSON.stringify({})
}).then(res=>{
    return res.json()

})



const $ = s => document.querySelector(s);

let users = [];

$('#addSave').onclick = () => {
    let name = $('#userName').value.trim();
    let email = $('#userEmail').value.trim();

    if (!name || !email) return;

    let user = {
        id: Date.now(),
        name,
        email
    };

    users.push(user);
    renderUsers();

    $('#userName').value = '';
    $('#userEmail').value = '';
};

function renderUsers() {
    $('#usersList').innerHTML = '';

    users.forEach(user => {
        $('#usersList').innerHTML += `
            <div class="user-item" onclick="selectUser(${user.id})">
                ${user.name} ${user.email}
            </div>
        `;
    });
}

function selectUser(id) {
    let user = users.find(res => res.id === id);
    if (!user) return;

    $('#emptyState').classList.add('d-none');
    $('#userDetails').classList.remove('d-none');
    $('#detailName').textContent = user.name;
    $('#detailEmail').textContent = user.email;
}


$('#orderSubmit').onclick = () => {
   let nameEl= $('#orderName').value.trim();
   let priceEl= $('#orderPrice').value.trim();

   if (!nameEl || !priceEl) return;

$('.table').innerHTML += `
 <tr>
                                <th style="width:55%">${nameEl}</th>
                                <th style="width:20%">${priceEl}դրամ</th>
                                <th style="width:25%" class="text-end">Actions}</th>
                            </tr>`;

}







