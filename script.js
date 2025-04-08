document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        slotMinTime: '17:00:00',
        slotMaxTime: '20:00:00',
        slotDuration: '01:00:00',
        selectable: true,
        events: function(fetchInfo, successCallback, failureCallback) {
            fetch('https://laportefc-cors-bagei2.herokuapp.com/https://script.google.com/macros/s/AKfycbyhGbzISHQKpbrwGwZsyx_SLFcqkLUiEt58DgGxAZ5-qrb9DuHstHU0-XfNY5NbY-zNag/exec')
                .then(response => response.json())
                .then(data => successCallback(data))
                .catch(error => failureCallback(error));
        },
        select: function(info) {
            const date = info.startStr.split('T')[0];
            const time = info.start.toLocaleTimeString([], { hour: 'numeric', hour12: true });
            const endTime = info.end.toLocaleTimeString([], { hour: 'numeric', hour12: true });
            document.getElementById('date').value = date;
            document.getElementById('timeSlot').value = `${time}-${endTime}`;
        }
    });
    calendar.render();

    document.getElementById('requestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const teamName = document.getElementById('teamName').value;
        const field = document.getElementById('field').value;
        const date = document.getElementById('date').value;
        const timeSlot = document.getElementById('timeSlot').value;
        const email = document.getElementById('email').value;
        
        if (!date || !timeSlot) {
            document.getElementById('message').textContent = 'Please select a time slot from the calendar.';
            document.getElementById('message').style.color = 'red';
            return;
        }
        
        const data = { teamName, field, date, timeSlot, email };
        
        fetch('https://laportefc-cors-bagei2.herokuapp.com/https://script.google.com/macros/s/AKfycbyhGbzISHQKpbrwGwZsyx_SLFcqkLUiEt58DgGxAZ5-qrb9DuHstHU0-XfNY5NbY-zNag/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.text())
        .then(result => {
            document.getElementById('message').textContent = result;
            if (result.startsWith('Booking confirmed')) {
                document.getElementById('message').style.color = 'green';
                document.getElementById('requestForm').reset();
                calendar.refetchEvents();
            } else {
                document.getElementById('message').style.color = 'red';
            }
        })
        .catch(error => {
            document.getElementById('message').textContent = 'Error: ' + error;
            document.getElementById('message').style.color = 'red';
        });
    });
});