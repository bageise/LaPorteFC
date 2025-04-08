document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const field = document.getElementById('field').value;
    const date = document.getElementById('date').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const email = document.getElementById('email').value;
    
    const data = { teamName, field, date, timeSlot, email };
    
    javascript

    Collapse
    
    Wrap
    
    Copy
    document.getElementById('requestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const teamName = document.getElementById('teamName').value;
        const field = document.getElementById('field').value;
        const date = document.getElementById('date').value;
        const timeSlot = document.getElementById('timeSlot').value;
        const email = document.getElementById('email').value;
        
        const data = { teamName, field, date, timeSlot, email };
        
        fetch('https://script.google.com/macros/s/AKfycbyhGbzISHQKpbrwGwZsyx_SLFcqkLUiEt58DgGxAZ5-qrb9DuHstHU0-XfNY5NbY-zNag/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow' // Avoid CORS preflight issues
        })
        .then(response => response.text())
        .then(result => {
            document.getElementById('message').textContent = result;
            if (result === 'Booking confirmed successfully!') {
                document.getElementById('message').style.color = 'green';
                document.getElementById('requestForm').reset();
            } else {
                document.getElementById('message').style.color = 'red';
            }
        })
        .catch(error => {
            document.getElementById('message').textContent = 'Error: ' + error;
            document.getElementById('message').style.color = 'red';
        });
    });