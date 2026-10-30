document.querySelectorAll('.suggestions button').forEach(b=>b.onclick=()=>{document.querySelector('#chatInput').value=b.textContent;document.querySelector('#chatInput').focus()});
