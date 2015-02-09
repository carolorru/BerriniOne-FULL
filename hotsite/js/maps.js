$(document).ready(function () {
   // MAPS

   var map;
   var directionsDisplay; // Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
   var directionsService = new google.maps.DirectionsService();
   var markerA = new google.maps.MarkerImage('img/general/pin.png');
   var markerB = new google.maps.MarkerImage('img/general/pin.png');
   var markersArray = [];


   function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var myLatlng = new google.maps.LatLng(-23.5986925,-46.6900781);
      var mapOptions = {
         zoom: 16,
         center: myLatlng,
         scrollwheel: false
      }

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var image = 'img/general/pin.png';
      var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title: 'Berrini One',
         icon: image
      });
      markersArray.push(marker);
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions( { suppressMarkers : true } );
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    
   $(".form-02").submit(function(event) {
      event.preventDefault();
      clearOverlays();
    
      var enderecoPartida = $("#txtEnderecoPartida").val();
      var enderecoChegada = 'AV. ENGENHEIRO LUÍS CARLOS BERRINI,105, SÃO PAULO';
    
      var request = { // Novo objeto google.maps.DirectionsRequest, contendo:
         origin: enderecoPartida, // origem
         destination: enderecoChegada, // destino
         provideRouteAlternatives: false, 
         travelMode: google.maps.TravelMode.DRIVING // meio de transporte, nesse caso, de carro
      };
    
      directionsService.route(request, function(response, status) {
         if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var _route = response.routes[0].legs[0]; 
            
            pinA = new google.maps.Marker({
               position: _route.start_location,
               map: map
            }),

            pinB = new google.maps.Marker({
               position: _route.end_location,
               map: map,
               icon: markerB
            });
         }
         markersArray.push(pinA);
         markersArray.push(pinB);
      });
   });

   function clearOverlays() {
      for (var i = 0; i < markersArray.length; i++ ) {
         markersArray[i].setMap(null);
      }
      markersArray.length = 0;
   }
});