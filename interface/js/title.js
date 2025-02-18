const seasonSelect = document.getElementById("season-select");
const seasonBox = document.getElementById("season-box");
const titleName = document.getElementById("title-name");

function cleanTitle()
{
    seasonSelect.innerHTML = "";
    seasonBox.innerHTML = "";
    titleName.innerText = "";
}

async function loadTitle()
{
    startLoading();

    const json = await fetch(`/api/get_title?site=${site}&url=${url}`)
    .then(r => r.json());
    title = json.title;
    
    if(title.seasons)
    {
        titleName.innerText = title.name;
    
        for(let i = 0; i < title.seasons.length; i++)
        {        
            const option = document.createElement("option");
            option.value = `Stagione ${i + 1}`;
            option.innerText = `Stagione ${i + 1}`;
            seasonSelect.appendChild(option);
        }
    
        populateSeason();
    }
    else
    {
        url = title.url;
        setController('media');
    }

    stopLoading();
}

function populateSeason()
{
    seasonBox.innerHTML = "";
    const seasonIndex = seasonSelect.selectedIndex;
    const season = title.seasons[seasonIndex];
    for(let i = 0; i < season.length; i++)
    {
        const episode = season[i];
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => {
            url = episode.url;
            setController('media');
        };
        card.innerHTML = `
            <div class="card-content">
                <img src="${episode.cover}"></img>
                <h5 class="card-title">${i + 1} - ${episode.name}</h5>
            </div>
        `;
        seasonBox.appendChild(card);
    }
}
