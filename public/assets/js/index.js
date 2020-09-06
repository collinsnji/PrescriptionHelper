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

getAllDrugs();
