import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
    mapa: GoogleMap;
    dataJson: {};
    stations: Array<{color; items; puntos;}>;
 
    constructor(public navCtrl: NavController, public platform: Platform, public http: Http) {
        platform.ready().then(() => {
            this.loadMap();
        });
        this.getData();
    }
    
    //obtiene los datos en json del api
    getData(){
      let self = this;
      return this.http.get('http://www.encicla.gov.co/status')
      //return this.http.get('/api')
        .map(res => res.json())
        .subscribe(data => {
          self.procesarPuntos(data);
        },
        err => {
          console.log("Fallo llamado del api... Oops!");
        });
    }

    loadMap(){
 
        let location = new LatLng(6.242021, -75.596746);
 
        this.mapa = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.mapa.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    }

    crearPunto(info, punto, color) {

      this.mapa.addMarker({
        position: new LatLng(punto.lat, punto.lng),
        draggable: false,
        //icon: pinImage,
        title: info.name,
        snippet: "#"+info.order+' Dirección: '+info.address+'. '+
          'Descripción: '+info.description+'. '+
          'Tipo: '+info.type+'. '+
          'Capacidad: '+info.capacity+ '. '+
          'Bicicletas: '+info.bikes+', Estado: '+info.bikes_state+'. '+
          'Lugares Disponibles: '+info.places+', Estado: '+info.places_state+'. '+
          'Cerrado: '+info.closed+', CDO?: '+info.cdo+'. '
          //'<img src="'+info.picture+'" alt="image de estacion"/>'+
      });

    };

    crearLinea(info, puntos, color) {
      info.polilyne = this.mapa.addPolyline({
        points: puntos,
        geodesic: true,
        //strokeOpacity: 0,
        color: "#"+color,
        width: 4,
      });
    };

    procesarPuntos(data) {
      this.stations = data.stations || [];
      let puntos; 

      for (var i = 0; i < this.stations.length; i++) {
        let station = this.stations[i];
        //console.log(station.name)
        puntos = [];
        station.color = this.getRandomColor();

        for (var j = 0; j < station.items.length; j++) {
          var punto = {lat: Number(station.items[j].lat), lng: Number(station.items[j].lon)};
          puntos.push(punto);
          this.crearPunto(station.items[j], punto, station.color);
        }
        station.puntos = puntos;
        this.crearLinea(station, puntos, station.color);
      }
    }

    getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
}