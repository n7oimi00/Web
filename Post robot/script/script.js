const locations = {
    "Post Office": ["North Central", "Central"],
    "North Central": ["Post Office", "North Western", "East"],
    "East": ["North Central", "South Eastern"],
    "South Eastern": ["East", "South Central"],
    "South Central": ["Central", "South Eastern"],
    "Central": ["Post Office", "South Central", "South Western"],
    "South Western": ["Central", "West"],
    "West": ["South Western", "North Western"],
    "North Western": ["West", "North Central"]
}

let status = {
    parcels: [],
    postVan: {
        location: "Post Office",
        destination: ""
    },
    delivered: []
}

function startDelivery() {
    while (status.parcels.length > 0) {
        let routes = status.parcels.map(p => {
            if (p.location == status.postVan.location) {
                return {route: findRoute(status.postVan.location, p.destination), pickUp: false}
            } else {
                return {route: findRoute(status.postVan.location, p.location), pickUp: true}
            }
        })
        let route = routes.reduce((a, b) => {
           return scoring(a) > scoring(b) ? a : b
        })        
        console.log(`Heading to ${route.route[route.route.length - 1]} for a ${route.pickUp ? "pick up" : "delivery"}`)

        for (let i = 0; i < route.route.length; ++i) {
            drive(route.route[i])                                  
        }
    }
}

function addParcel() {
    let parcel = {
        location: document.getElementById("locationSelect").value,
        destination: document.getElementById("destinationSelect").value,
        pickedUp: false
    }

    status.parcels.push(parcel)
}

function drive(destination) {
    status.postVan.location = destination
    console.log(`Moving to ${destination}`)
    status.parcels.forEach(p => {
        if (p.location == status.postVan.location && !p.pickedUp) {
            p.pickedUp = true
            console.log(`Picked up a parcel at ${destination}`)     
        }
        if (p.location != status.postVan.location && p.pickedUp) {
            p.location = status.postVan.location
        }
        if (p.location == p.destination) {
            status.delivered.push(p)
            console.log(`Delivered a parcel at ${destination}`)        
        }
        
        status.parcels = status.parcels.filter(p => {
            return p.location != p.destination
        })
    });     
}

function findRoute(location, destination) {
    let workList = [{from: location, route: []}]
    for (let i = 0; i < workList.length; ++i) {
        let {from, route} = workList[i]
        for (let location of locations[from]) {
            if (location == destination) {
                return route.concat(location)
            }
            if (!workList.some(listItem => {listItem.from == location})) {
                workList.push({from: location, route: route.concat(location)})
            }
        }
    }
}

function scoring ({route, pickUp}) {
    return (pickUp ? 0.5 : 0) - route.length   
}