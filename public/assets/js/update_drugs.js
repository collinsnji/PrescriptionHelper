
async function updateDrugInfo(drug_id, pills) {
    try {
        const response = await fetch(`https://medherence.uk.r.appspot.com/drugs/update/`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({ id: drug_id, newVal: pills }) // body data type must match "Content-Type" header
        });
    } catch (error) {
        console.error(error)
    }
}

document.getElementById('yes-btn').addEventListener('click', (e) => {
    let pills = e.target.getAttribute('data-pills');
    let id = e.target.getAttribute('data-name');
    updateDrugInfo(id, pills - 1);
    window.location.reload();
})