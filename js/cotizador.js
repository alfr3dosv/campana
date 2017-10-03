var cotizador = (function () {
	var subtotal = 0;
	var metrosTotal = 0;
	var material=0, valorTarja=0, valorCubierta=0, estufas=0, jaladeras= 0, instalacion = 0;
	var calcularSubtotal = function ()
		{
			subtotal = material + valorTarja + valorCubierta + estufas + jaladeras + instalacion;
			$('#subtotal').html(subtotal);
			console.log(subtotal);
		}; 
    var actualizarCostoMaterial= function(elem){
    		var suma = 0;
			console.log('dfds');
			console.log($(elem).data().alacena);
				if($(elem).data().alacena == true)
					$('#alacena-'+$(elem).data().id).html($(elem).data().precio * $(elem).val());
				else
					$('#gabinete-'+$(elem).data().id).html($(elem).data().precio * $(elem).val());
			$('#material .suma ').each(function(index){
					suma += Number($(this).html());
				});
			$('#material #sumatoria').html(suma > 0 ? '$'+suma : '');
			material = suma;
			calcularSubtotal();		
		};
		var actualizarCostoJaladeras = function (){
			//Precio * 2.5m 
			var alacena = $('#jaladeras #opciones-j input:radio:checked').data().precio * 2.5 * $('#jaladeras .alacena').val();
			var gabinete = $('#jaladeras #opciones-j input:radio:checked').data().precio * 2.5 * Number($('#jaladeras .gabinete').val());
			jaladeras = (alacena != NaN ? alacena : 0) + (gabinete != NaN ? gabinete : 0);
			$('#jaladeras #sumatoria').html(jaladeras != NaN ? '$'+jaladeras : '');
			calcularSubtotal();
		};
		var actualizarCostoInstalacion = function (that){
				instalacion = $(that).data().precio; 
				$('#instalacion #sumatoria').html('$ '+instalacion);
				calcularSubtotal(); //subtotal

		};
	return {
		init: function(){
			var tabla = document.getElementById('tabla-material');
			var th = [];

			for(index=0; index< data.material.length; index++)
			{
				th = []; value="0"
				n = 0;
				th [n++]='<tr><th><span>'+data.material[index].material+'<span></th>'
				th [n++]='<td><span>'+data.material[index].precioAlacena+'x</span><input type="number" class="form-control xmtr" value="0"  data-alacena="true" data-precio="'+data.material[index].precioAlacena+'" data-id="'+data.material[index]['id']+'"></input></td>'
				th [n++]='<td><span id="alacena-'+data.material[index]['id']+'" class="suma">0</span></td>'
				th [n++]='<td><span>'+data.material[index].precioGabinete+'x</span><input type="number" class="form-control xmtr" value="0"  data-alacena="false" data-precio="'+data.material[index].precioGabinete+'" data-id="'+data.material[index]['id']+'"></td>'
				th [n++]='<td><span id="gabinete-'+data.material[index]['id']+'" class="suma">0</span></td>'
				th [n++]='<td><span>0</span><input type="number" class="form-control xmtr" value="0"></input></td>'
				th [n++]='<td><span>0</span></td></tr>'
				tabla.innerHTML+=(th.join(""));
			}
			tabla = document.getElementById('tabla-cubierta');
			for(index=0; index< data.cubierta.length; index++)
			{
				th = [];
				n=0;
				th[n++]='<tr>'
				th[n++]='<td>'+data.cubierta[index].cubierta+'</td>'
				th[n++]='<td><label>'+(data.cubierta[index][1.22] == null ? '': (data.cubierta[index][1.22] + 'x') + '</label><input type="number" class="form-control xmtr" value="0" data-tamano="1.22" data-id="'+data.cubierta[index]['id']+'"></input></td>')
				th[n++]='<td><label>'+(data.cubierta[index][1.83] == null ? '': (data.cubierta[index][1.83] + 'x') + '</label><input type="number" class="form-control xmtr" value="0" data-tamano="1.83" data-id="'+data.cubierta[index]['id']+'"></input></td>')
				th[n++]='<td><label>'+data.cubierta[index][2.44]+'x</label><input type="number" class="form-control xmtr" value="0" data-tamano="2.44" data-id="'+data.cubierta[index]['id']+'"></input></td>'
				th[n++]='<td><label>'+data.cubierta[index][3.05]+'x</label><input type="number" class="form-control xmtr" value="0" data-tamano="3.05" data-id="'+data.cubierta[index]['id']+'"></input></td>'
				th[n++]='<td><label>'+data.cubierta[index][3.66]+'x</label><input type="number" class="form-control xmtr" value="0" data-tamano="3.66" data-id="'+data.cubierta[index]['id']+'"></input></td>'
				th[n++]='<td><span id="'+data.cubierta[index]['id']+'" class="suma"></span></td>'
				th[n++]='</tr>'
				tabla.innerHTML+=(th.join(""));
			}
			$('#tabla-material input').change( function () {
				actualizarCostoMaterial(this);
				});
			//Tarja
			$('#tarja input:radio').change( function () {
				valorTarja = $(this).data().precio;
				$('#tarja #sumatoria').html(valorTarja);
				calcularSubtotal(); //subtotal
				});
			//Instalacion
			$('#tipo-instalacion > label > input:radio').change(function (){
				$('#insta-' + $(this).data().insta).show();
				console.log('#insta-' + $(this).data().insta);
				if($(this).data().insta == 'recta')
					$('#insta-escuadra').hide();
				else
					$('#insta-recta').hide();
			});
			$('#opciones-instalacion input:radio').change(function (){
				actualizarCostoInstalacion(this);
			});	
			//Jaladera
			$('#jaladeras').change( function() {
				actualizarCostoJaladeras();
			});	
		},
		actualizarCostoCubiertas: function (){
			entradas = document.getElementById('tabla-cubierta').getElementsByTagName('input');
			var valor = 0;
			var lastID;
			for(i = 0; i< entradas.length; i++)
			{
				console.log('entrada ' + i);
				if(entradas[i].value !== null)
				{
					for(cubierta = 0; cubierta < data.cubierta.length; cubierta++)
					{
						console.log('\t cubierta ' + cubierta);
						if(data.cubierta[cubierta]['id'] == entradas[i].dataset.id)
						{
							if(entradas[i].dataset.id != lastID)
							{
							lastID = entradas[i].dataset.id
							valor = 0;
							}
							valor += data.cubierta[cubierta][Number(entradas[i].dataset.tamano)]*entradas[i].value ;
							
							document.getElementById(entradas[i].dataset.id).innerHTML=valor;
						}
					}
				}
			}
			valorCubierta = 0;
			$('#tabla-cubierta .suma').each( function(){
				console.log(cubierta);
				valorCubierta += Number($(this).html());
			})
			$('#cubiertas #sumatoria').html( valorCubierta != NaN ? '$'+valorCubierta : '');
			calcularSubtotal();
		},
		actualizarDimensiones: function (){
			var metros = document.getElementsByClassName('metrosMas');
			console.log('1');
			metrosTotal = 0;
			for (i = 0; i < metros.length; i++)
			{
				metrosTotal+= Number(metros[i].value);
				console.log(metros[i].value);
			}
			metros = document.getElementsByClassName('metrosMenos');
			for (i = 0; i < metros.length; i++)
				metrosTotal-= Number(metros[i].value);
			$("#Dimensiones #sumatoria").html(metrosTotal + 'm');
			calcularSubtotal();
		}
	};
})();
