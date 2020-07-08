const getField = (id) => document.getElementById(id);

const valve_pos = getField('valve_pos');

const status = getField('status');
const position = getField('position');
const battery = getField('battery');

const btn_send_pos = getField('btn_send_pos');
const btn_get_pos = getField('btn_get_pos');
const btn_battery = getField('btn_battery');

const toggleButtons = (state) => {
    btn_send_pos.disabled = state;
    btn_get_pos.disabled = state;
    btn_battery.disabled = state;
}

const sendPosition = (context) => {
    const valveVal = valve_pos.value;
    if (valveVal === '' || valveVal < 0 || valveVal > 100 || isNaN(Number(valveVal))) return;

    toggleButtons(true);
    status.value = 'Command Sent...';
    position.value = '';
    fetch('/send', {
        method: "POST",
        body: JSON.stringify({valve_pos: valveVal})
    })
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
            else {
                throw Error("Internal server error")
            }
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
        .finally(() => toggleButtons(false));
}

const getPosition = (context) => {
    toggleButtons(true);
    position.value = '';
    status.value = 'Command Sent...';

    fetch('/position')
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(data => {
            console.log(data);
            status.value = 'Position Updated...';
            position.value = data;
        })
        .catch(err => console.log(err))
        .finally(() => toggleButtons(false));
}

const getBatteryVoltage = (context) => {
    toggleButtons(true);
    battery.value = '';
    status.value = 'Command Sent...';

    fetch('/battery')
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(data => {
            console.log(data);
            status.value = 'Battery Updated...';
            battery.value = data;
        })
        .catch(err => console.log(err))
        .finally(() => toggleButtons(false));
}
