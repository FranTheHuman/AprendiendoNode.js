// TODO EL CODIGO DEL FRONTEND ( COMO VOY A PROCESAR LOS FORMULARIOS PARA ENVIAR LOS DATOS )
$(function () {
    var $h1 = $('h1') // obtenemos el h1 
    var $latitude = $('input[name="latitude"]') // obtenemos la latitud
    var $longitude = $('input[name="longitude"]') // obtenemos la longitud
    var $btnlocation = $('input[name="btnLocations"') 

    $btnlocation.on('click', obtainPosition)

        function obtainPosition() {
            const geoConfig = {
                enableHighAccuracy: true, // aca le digo que va a obtener la posicion mas certera posible
                timeout: '5000', //¿por cuento tiempo vasa intentar obtener la posicion?
                maximunAge: 60000
            }
            navigator.geolocation.getCurrentPosition(
                mostrar, errores, geoConfig
            )
        }
        function mostrar(position) {
            $latitude.val(position.coords.latitude)
            $longitude.val(position.coords.longitude)
        }
        function errores(error) {
            alert(`Error: ${error.code} ${error.message}`)
        }

        $('form').on('submit',function(event){
            event.preventDefault() // vamos a cancelar lo que hace por defencto el submit

            var latitude = $.trim($latitude.val()) // primero vamos a limpiar los datos a traves de un metodo llamado trim de jquery
            var longitude = $.trim($longitude.val())

            // una vez que tengo los datos ya limpios
            $('h1').text('Loading...'); // vamos a cambiar el texto del h1 a uno que diga cargando

            var req = $.ajax({
                url:`/latitude/${latitude}/longitude/${longitude}`,
                dataType:'json'
            });

            req.done(function (data) {
                var temperature= data.temperature
                $h1.html(`The temperature in ${data.timezone} is ${temperature}&#176 Fahrenheit; in latitude ${latitude} and longitude ${longitude}`) //&#176 para mostrar el circuloito de la tempoeratura 
            })

            req.fail(function(){
                $h1.text('Error!');
            });
        })

})