window.onload = function() {
    let visitorCount = getVisitorCount();
    visitorCount++;
    setVisitorCount(visitorCount);
    document.getElementById('visitorCount').textContent = visitorCount;
    var dateElement = document.getElementById("date");
    var timeElement = document.getElementById("time");
    var locationElement = document.getElementById("location");

    // Function to update date and time
    function updateDateTime() {
        var now = new Date();
        var date = now.toDateString();
        var time = now.toLocaleTimeString();
        dateElement.textContent = "Date: " + date;
        timeElement.textContent = "Time: " + time;
    }

    function updateLocation(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var apiUrl = "https://nominatim.openstreetmap.org/reverse?lat=" + latitude + "&lon=" + longitude + "&format=json";
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                var location = data.display_name;
                locationElement.textContent = "Location: " + location;
            })
            .catch(error => {
                console.error('Error fetching location:', error);
                locationElement.textContent = "Location: Unknown";
            });
    }

    // Function to handle errors in geolocation
    function handleGeolocationError(error) {
        console.error('Geolocation error:', error);
        locationElement.textContent = "Location: Unknown";
    }

    // Update date and time initially
    updateDateTime();

    // Update date and time every second
    setInterval(updateDateTime, 1000);

    // Try to get geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation, handleGeolocationError);
    } else {
        console.error('Geolocation is not supported by this browser.');
        locationElement.textContent = "Location: Unsupported";
    }
    
}

function getVisitorCount() {
    let count = parseInt(getCookie('visitorCount'));
    return isNaN(count) ? 0 : count;
}

function setVisitorCount(count) {
    document.cookie = `visitorCount=${count}`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
} 

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => 
{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            })
            sec.classList.add('show-animate');
        }
    })

    let header = document.querySelector('header');

    header.classList.toggle('sticky',window.scrollY > 10);
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

changeText();
setInterval(changeText,3000);



