function getOutput()    {
    let data = {
        params: document.getElementById('input').value
    };
    $.post('/run', JSON.stringify(data))
    .then(

        data => {
            let out = JSON.parse(data);
            document.getElementById('output').value = out.params;
        }
    );
}