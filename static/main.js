const getField = (id) => document.getElementById(id);

const valve_pos = getField('valve_pos');

const status = getField('status');
const position = getField('position');
const battery = getField('battery');

// const status = getField('status');
// const position = getField('position');
// const battery = getField('battery');

const sendPosition = (context) => {
    const valveVal = valve_pos.value;
    if (valveVal === '' || valveVal < 0 || valveVal > 100 || isNaN(Number(valveVal))) return;

    context.disabled = true;
    status.value = 'Command Sent...';
    fetch('/send', {
        method: "POST",
        body: JSON.stringify({valve_pos: valveVal})
    })
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
