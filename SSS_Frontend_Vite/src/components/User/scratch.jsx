<!--
    Copyright 2023 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  -->
<!DOCTYPE html>
<html>
  <head>
    <title>Address Selection</title>
    <style>
      body {
        margin: 0;
      }

      .sb-title {
        position: relative;
        top: -12px;
        font-family: Roboto, sans-serif;
        font-weight: 500;
      }

      .sb-title-icon {
        position: relative;
        top: -5px;
      }

      .card-container {
        display: flex;
        height: 500px;
        width: 600px;
      }

      .panel {
        background: white;
        width: 300px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .half-input-container {
        display: flex;
        justify-content: space-between;
      }

      .half-input {
        max-width: 120px;
      }

      .map {
        width: 300px;
      }

      h2 {
        margin: 0;
        font-family: Roboto, sans-serif;
      }

      input {
        height: 30px;
      }

      input {
        border: 0;
        border-bottom: 1px solid black;
        font-size: 14px;
        font-family: Roboto, sans-serif;
        font-style: normal;
        font-weight: normal;
      }

      input:focus::placeholder {
        color: white;
      }

      .button-cta {
        align-self: start;
        background-color: rgb(30, 136, 229);
        border: 0;
        border-radius: 24px;
        color: white;
        cursor: pointer;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        font-weight: 500;
        padding-bottom: 11px;
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 9px;
      }
    </style>
    <script>
      "use strict";

      const CONFIGURATION = {
        "ctaTitle": "Checkout",
        "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22,"mapId":""},
        "mapsApiKey": "AIzaSyDYP4h_0e8JtjKwWLy29VACq5oWSriL8vY",
        "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
      };

      const SHORT_NAME_ADDRESS_COMPONENT_TYPES =
          new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

      const ADDRESS_COMPONENT_TYPES_IN_FORM = [
        'location',
        'locality',
        'administrative_area_level_1',
        'postal_code',
        'country',
      ];

      function getFormInputElement(componentType) {
        return document.getElementById(`${componentType}-input`);
      }

      function fillInAddress(place) {
        function getComponentName(componentType) {
          for (const component of place.address_components || []) {
            if (component.types[0] === componentType) {
              return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
                  component.short_name :
                  component.long_name;
            }
          }
          return '';
        }

        function getComponentText(componentType) {
          return (componentType === 'location') ?
              `${getComponentName('street_number')} ${getComponentName('route')}` :
              getComponentName(componentType);
        }

        for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
          getFormInputElement(componentType).value = getComponentText(componentType);
        }
      }

      function renderAddress(place, map, marker) {
        if (place.geometry && place.geometry.location) {
          map.setCenter(place.geometry.location);
          marker.position = place.geometry.location;
        } else {
          marker.position = null;
        }
      }

      async function initMap() {
        const {Map} = google.maps;
        const {AdvancedMarkerElement} = google.maps.marker;
        const {Autocomplete} = google.maps.places;

        const mapOptions = CONFIGURATION.mapOptions;
        mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
        mapOptions.center = mapOptions.center || {lat: 37.4221, lng: -122.0841};

        const map = new Map(document.getElementById('gmp-map'), mapOptions);
        const marker = new AdvancedMarkerElement({map});
        const autocomplete = new Autocomplete(getFormInputElement('location'), {
          fields: ['address_components', 'geometry', 'name'],
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }
          renderAddress(place, map, marker);
          fillInAddress(place);
        });
      }
    </script>
  </head>
  <body>
    <div class="card-container">
      <div class="panel">
        <div>
          <img class="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="">
          <span class="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location-input"/>
        <input type="text" placeholder="Apt, Suite, etc (optional)"/>
        <input type="text" placeholder="City" id="locality-input"/>
        <div class="half-input-container">
          <input type="text" class="half-input" placeholder="State/Province" id="administrative_area_level_1-input"/>
          <input type="text" class="half-input" placeholder="Zip/Postal code" id="postal_code-input"/>
        </div>
        <input type="text" placeholder="Country" id="country-input"/>
        <button class="button-cta">Checkout</button>
      </div>
      <div class="map" id="gmp-map"></div>
    </div>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDYP4h_0e8JtjKwWLy29VACq5oWSriL8vY&libraries=places,marker&callback=initMap&solution_channel=GMP_QB_addressselection_v2_cABC" async defer></script>
  </body>
</html>