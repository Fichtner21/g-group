import index from "../index.html";
// import new pages here
import page from "../page.html";

import * as MyFn from "../js/home";

import AOS from 'aos';
import 'aos/dist/aos.css';

import "../css/style.css";
import "../css/style.scss";

import { Loader } from "@googlemaps/js-api-loader";

AOS.init({
  once: true
});

const links = document.querySelectorAll(".link");

for (const link of links) {
  link.onclick = function clickHandler(e) {
    e.preventDefault()
    const href = this.getAttribute('href')
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
  }
}

// MyFn.showHome();

// mobile menu
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");  
});

// sticky menu desktop

const header = document.getElementById('header-menu');

function addClassHeader() {
  header.classList.add("fixed-menu");
  header.classList.remove("relative");    
  header.parentNode.style.marginTop = `${header.offsetHeight}px`;
}

function removeClassHeader(){
  header.classList.remove("fixed-menu");
  header.classList.add("relative");   
  header.parentNode.style.marginTop = 0;
}

window.addEventListener('scroll', function(){
  let getScrollposition = window.scrollY;
  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  if(mediaQuery.matches){
    if(getScrollposition > 50){
      addClassHeader(); 
    } else {
      removeClassHeader();          
    }
  }   
});

$(document).ready(function () {
  $(window).scroll(function (e) {
    // Our logic here
    // Detect how far are we from the top of the page
    let windowTop = $(this).scrollTop();
    // Loop through every navigation menu item
    $('#header-menu > div > div > div >  ul > li > a').each(function (event) {

        // Check for the current navigation item associated section
        // Check how far the associated section is from the top
        // If the associated section is as far as the user have scrolled, add 'active' class to the item.
        if (windowTop >= $($(this).attr('href')).offset().top - 500) {
            // Remove 'active' from previously highlighted menu items
            $('#header-menu > div > div > div >  ul > li > .active').removeClass('active');

            // Highlight the current menu item by adding 'active' class
            $(this).addClass('active');
        }
    });
  });
});

const dateDiv = document.getElementById("date");
dateDiv.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric'}) + ' GMT+2';
const dayDiv = document.getElementById("day");
var myDate = new Date();
var hrs = myDate.getHours();
if(hrs < 6 || hrs > 17){
  dayDiv.innerHTML = '<i class="fas fa-moon"></i>';
} else {
  dayDiv.innerHTML = '<i class="fas fa-sun"></i>';
}

// API google => AIzaSyD0gEk5ngA09DhJ1nPMEvW9rQHQ5MlSrhM

var map;

// google.maps.event.addDomListener(window, "load", function () {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 52.40688, lng: 16.92086},
//     zoom: 16
//   });

 
// });

const loader = new Loader({
  apiKey: "AIzaSyD0gEk5ngA09DhJ1nPMEvW9rQHQ5MlSrhM",
  version: "weekly",
});



loader.load().then(() => {
  // map = new google.maps.Map(document.getElementById("map"), {
  //   center: { lat: 52.40688, lng: 16.92086 },
  //   zoom: 16,
    
  // });

  // console.log('MAP', map)

  const center = new google.maps.LatLng(52.40750, 16.92086);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: center,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });
  const svgMarker = {
    path:"M0,0 L40,0 L40,40 L20,40 L0,60 L0,0 Z M19.392,21.848039 L25.656,21.848039 C25.56,23.120039 23.88,24.944039 19.704,24.944039 C14.112,24.944039 13.32,21.776039 13.32,19.735999 C13.32,17.719999 14.088,14.623999 19.704,14.623999 C24.264,14.623999 25.416,16.519999 25.656,17.791999 L30.048,17.791999 C29.784,13.615999 26.424,11 19.704,11 C12.792,11 9,14.071999 9,19.639999 C9,25.208039 12.792,28.280039 18.984,28.280039 C22.56,28.280039 25.08,27.128039 26.664,25.400039 L26.856,28.040039 L30.048,28.040039 L30.048,19.039999 L19.392,19.039999 L19.392,21.848039 Z",
    fillColor: "#448FDE",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: new google.maps.Point(20, 20),
  };

  new google.maps.Marker({
    position: map.getCenter(),
    icon: svgMarker,
    map: map,   
  });

  // const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  // const iconBase = location.href + "src/images/";

  // const icons = {
  //   info: {
  //     // icon: iconBase + "info-i_maps.png",
  //     icon: iconBase + "skoda.png",
  //   },
  // }

  // console.log('icons link =>', icons);

  // const features = [
  //   {
  //     position: new google.maps.LatLng(52.40688, 16.92086),
  //     type: "info",
  //   },
  // ];

  // for (let i = 0; i < features.length; i++) {
  //   const marker = new google.maps.Marker({
  //     position: features[i].position,
  //     icon: icons[features[i].type].icon,
  //     map: map,
  //   });
  // }
});
