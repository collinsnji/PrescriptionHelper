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
        drugListContainer.innerHTML += `<article class="style1">
        <span class="image">
        <img src="images/pic01.jpg" alt="" />
        </span>
        <a href="generic.html">
        <h2>${drug.commonName}</h2>
        <div class="content">
            <p>Prescription: ${drug.prescription}, Interactions: ${drug.interactions}</p>
        </div>
        </a>
    </article>`
    })
}

getAllDrugs();