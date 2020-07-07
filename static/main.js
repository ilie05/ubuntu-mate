const getField = (id) => document.getElementById(id);

const status = getField('status');
const position = getField('position');
const battery = getField('battery');

const sendPosition = (context) => {
    context.disabled = true;
    status.value = 'Command Sent...';
    fetch('/send')
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(data => {
            console.log(data);
            status.value = 'Moving...';
            position.value = '';
            return fetch('/move')
        })
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(data => {
            status.value = 'Position Updated...';
            position.value = data;
            console.log(data);

        })
        .catch(err => console.log(err))
        .finally(() => {
            context.disabled = false;
        })
}

const getPosition = (context) => {

}

const getBatteryVoltage = (context) => {

}
