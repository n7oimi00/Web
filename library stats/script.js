const alert = document.querySelector('.alert')
const buttons = document.querySelectorAll('.list-group-item-action')
buttons.forEach((el) => el.addEventListener("click", () => displayStats(el.id)))

async function displayStats(library) {
    buttons.forEach((el) => el.classList.remove('active'))

    let url = 'https://api.ouka.fi/v1/library_monthly_stats?library=eq.' + library + '&order=year.desc,month.desc'
    let stats = await getStats(url)

    if (stats == 'Tietoliikennevirhe') {
        handleError()
    } else {
        document.getElementById(library).classList.add('active')
        alert.hidden = true

        document.getElementById('bookLoans').textContent = stats[0]['book_loans'] ? stats[0]['book_loans'] : 'Ei tietoja'
        document.getElementById('audiovisualLoans').textContent = stats[0]['av_loans'] ? stats[0]['av_loans'] : 'Ei tietoja'
        document.getElementById('otherLoans').textContent = stats[0]['other_loans'] ? stats[0]['other_loans'] : 'Ei tietoja'
        document.getElementById('childrensLoans').textContent = stats[0]['children_loans'] ? stats[0]['children_loans'] : 'Ei tietoja'
        document.getElementById('visits').textContent = stats[0]['visits'] ? stats[0]['visits'] : 'Ei tietoja'
        document.getElementById('open').textContent = stats[0]['hours_open'] ? stats[0]['hours_open'] : 'Ei tietoja'
    }
}

function getStats(url) {
    return fetch(url)
    .then(data => data.json())
    .then(data => {
        let libraryStats = data.slice(0, 2)
        return libraryStats
    }).catch(er => 'Tietoliikennevirhe')
}

function handleError() {
    alert.hidden = false
}