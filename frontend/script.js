
const $ = s => document.querySelector(s);

fetch ('http://localhost:3000/users').then( res=>res.json()).then((data)=>{
    $('#usersList').innerHTML = data.map((res)=>
        `
                        <div class="d-flex flex-column user" data-id="${res.id}">
                            <div class="fw-bold">${res.name}</div>
                            <div class="small-muted">${res.email}</div>
                        </div>
                        
                   `).join('')
})

$('#usersList').onclick=function (event) {
    let el=event.target.closest('.user');
    if (!el) {
        return;
    }
    let id=+el.getAttribute('data-id')
    fetch('http://localhost:3000/user/'+id).then( res=>res.json()).then(([data])=>{
        $('#detailName').innerHTML=data.name
        $('#detailEmail').innerHTML=data.email
        $('#user_id').value=data.id;


    })


    fetch('http://localhost:3000/debts/'+id).then(res=>res.json()).then((data)=>{
        $('#emptyState').classList.add('d-none');
        $('#userDetails').classList.remove('d-none');
        $('#ordersTbody').innerHTML = data.map((res)=>`<tr><td>
                                    <div class="fw-semibold">${res.name}</div>
                                    <div class="small-muted">#32c3b5 • 2/21/2026, 11:55:59 AM</div>
                                </td>
                                <td class="fw-bold">${res.price} ֏</td>
                                <td class="text-end">
                                    <button class="btn btn-ghost btn-sm me-1" data-action="edit">Edit</button>
                                    <button class="btn btn-danger-soft btn-sm" data-action="delete">Delete</button>
                                </td></tr>`).join('')
    })
}


$('#orderForm').onsubmit=function (e) {
    e.preventDefault()
    let{name,price,user_id}=e.target.elements;

    fetch('http://localhost:3000/debt',{
        method:'POST',
        headers:{
            contentType:'application/json',
        },
        body:JSON.stringify({name:name.value,price:price.value,user_id:user_id.value})
    }).then(res=>{


        $('#ordersTbody').innerHTML +=` 
                <tr><td>
                                    <div class="fw-semibold">${res.name}</div>
                                    <div class="small-muted">#32c3b5 • 2/21/2026, 11:55:59 AM</div>
                                </td>
                                <td class="fw-bold">${res.price} ֏</td>
                                <td class="text-end">
                                    <button class="btn btn-ghost btn-sm me-1" data-action="edit">Edit</button>
                                    <button class="btn btn-danger-soft btn-sm" data-action="delete">Delete</button>
                                </td></tr>
`
    })

}



















