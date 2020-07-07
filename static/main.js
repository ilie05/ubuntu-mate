const sendData = () => {
    fetch('/send')
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(json => {
            console.log(json);
            return fetch('/move')
        })
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json();
        })
        .then(json => {
            console.log(json);
        })
        .catch(err => console.log(err));
}