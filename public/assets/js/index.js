async function getAllDrugs() {
    const allDrugs = await fetch('http://medherence.uk.r.appspot.com/drugs/all');
    allDrugs.json().then(data => {
        PopulateDrugs(data)
    });
}

function PopulateDrugs(data) {
    let drugListContainer = document.getElementById("drug_list");
    data.forEach(drug => {
        let styleId = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        drugListContainer.innerHTML += `<article class="style${styleId}">
        <span class="image">
        <img src="images/pic01.jpg" alt="" />
        </span>
        <a href="/drug/${drug.brandName}">
        <h2>${drug.genericName}</h2>
        <div class="content">
            <div class="medication_count">${drug.numberOfPills}</div>
            <p style="margin: 0 0 0.5em 0;">Commonly called ${drug.brandName}</p>
            <p>This drug interacts with ${drug.interactions}</p>
        </div>
        </a>
    </article>`
    })
}

if (window.location.href.includes('all')) {
    getAllDrugs();
}


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