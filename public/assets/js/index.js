async function getAllDrugs() {
    let htmlElements = `<article class="style1">
        <span class="image">
        <img src="images/pic01.jpg" alt="" />
        </span>
        <a href="generic.html">
        <h2>Magna</h2>
        <div class="content">
            <p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p>
        </div>
        </a>
    </article>`;
    const allDrugs = await fetch('http://localhost:5000/drugs/all');
    console.log(allDrugs.json().then(data => {
        PopulateDrugs(data)
    }))
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