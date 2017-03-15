/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var complexUnit = 'Unidad de complejo';
var capacityInfo = 'Hasta 0 personas';
var ubicacionText = 'Ubicación';
var capacidadText = 'Capacidad';
function getContent(title, description, venue, url, image, capacidad, unidad) {//title, image) {
    url = url +"?dialog=1";
    var content = '<div>';
    content += '<div class="left" style="width:120px;">'
    if (image != null) {
        content += '<a href="javascript:;" onclick="window.open(\'' + url + '\',\'mywindow\',\'menubar=1,resizable=1,scrollbars=yes,width=720,height=550\');" title="Abrir en nueva ventana">';
        content += '<img src="' + image + '" class="thumb" width="100px" height="75px" style="padding: 5px;border: 1px solid #DADADA;"></img>';
        content +='</a>'
    }
    content += '</div><!--alojThumb -->';
    content += '<div class="left" style="width:200px;"> <b>' + description + '</b>';
    content += '<div class="alojNombre nombre-mapa"><a href="' + url + '">' + title + '</a>';
    content += '<a href="javascript:;" class="fa fa-external-link toolTipEastDelay" onclick="window.open(\'' + url + '\',\'mywindow\',\'menubar=1,resizable=1,scrollbars=yes,width=720,height=550\');" title="Abrir en nueva ventana"></a>';
    content += '</div><!--alojNombre -->';
    content += '<div class="alojOtros"><span class="alojIcon ubicacionIconGrey toolTipWestDelay" title="' + ubicacionText + '"></span><span class="bold">' + venue + '</span><br />';
    if (capacidad != null)
        content += '<span class="alojIcon personasIconGrey toolTipWestDelay" title="' + capacidadText + '"></span><span class="bold">' + capacityInfo.replace('0', capacidad) + '</span>';
    if (unidad != null)
        content += '<br /><span class="alojIcon complejoIconGrey toolTipWestDelay" title="' + complexUnit + '"></span><span class="bold">' + complexUnit + '</span>';
    content += '</div><!--alojOtros-->';
    content += '</div><div class="clear"></div></div>';
    return content;
}

function createMarkersFromData(data) { 
    console.log('createMarkersFromData');
    markers = new Array();
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < data.length; i++) {
        if (data[i].icon != 'marker.png')
            iconPath = 'http://www.portalesdeluruguay.com.uy/img/icons_map/';
        else
            iconPath = 'http://www.google.com/mapfiles/'

        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(data[i].latitud, data[i].longitud),
            title: data[i].titulo,
            icon: new google.maps.MarkerImage(iconPath + data[i].icon, new google.maps.Size(32, 37), new google.maps.Point(0, 0), new google.maps.Point(16, 16.5))
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(getContent(data[i].titulo, data[i].descripcion, data[i].localidad, data[i].url, data[i].thumb, data[i].capacidad, data[i].unidad));//data[i].content);//getContent(data[i].titulo,data[i].thumb));
                infowindow.open(map, marker);
            }
        })(marker, i));
        markers[i] = marker;
        if(data[i].type && markerGroups){
            markerGroups[data[i].type].push(marker);
        }
        
    }
    //new MarkerClusterer(map, markers, {maxZoom: 7, gridSize: 25} );
}

function centerAndZoomOnMarkers() {
    console.log('centerAndZoomOnMarkers');
    if (markers && markers.length > 0) {
        var bounds = new google.maps.LatLngBounds();
        //  Go through each...
        for (var i = 0; i < markers.length; i++) {
            //  And increase the bounds to take this point
            bounds.extend(markers[i].getPosition());
        }
        //  Fit these bounds to the map
        map.fitBounds(bounds);
    }
}

function removeMarkers() {
    console.log('removeMarkers');
    if (markers)
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    markers = null;
}

function hideMarkers() {
    console.log('hideMarkers');
    if (markers)
        for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(false);
        }
}