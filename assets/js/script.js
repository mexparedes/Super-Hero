$(document).ready(function(){

    $("form").submit(function(event){
        event.preventDefault();
        
        let valueInput = $("#SuperHeroInput").val();
        let booleano = true;

        //Acá se realiza la validacion, en caso de que no sea un numero, hacer break y debe ingresar nuevamente

        //FINALMENTE LO VALIDO EN HTML EN INPUT, PERO  ESTO IGUAL FUNCIONA

      //  while(!/^[0-9]+$/.test(valueInput)){
        //    alert("ingrese un numero positivo");
      //      break;
        //}

        //En esta parte se reciben mediante ajax los valores para introducirlos posteriormente
        //en el grafico
        $.ajax({
            url: "https://superheroapi.com/api.php/10159552511154136/" + valueInput,
            success: function(data){
                console.log(data);
                let nombre = data.name;
                let imagen = data.image.url;
                let conexiones = data.connections["group-affiliation"];   //group-affiliation
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let primeraAparicion = data.biography["first-appearance"];  //first-appearance
                let altura = data.appearance.height[1];
                let peso = data.appearance.weight[1];
                let alianzas = data.connections.relatives;
                

                //Aca se define la estructura de Card en donde iran los datos del super hero
                $("#heroinfo").html(`
                    
            <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-sm-4">
                    <img src="${imagen}" class="card-img" alt="...">
                  </div>
                  <div class="col-12 col-sm-8">
                    <div class="card-body">
                      <h5 class="card-title">${nombre}</h5>
                      <p class="card-text">Conexiones: ${conexiones}</p>
                      <p class="card-text">Publicado por: ${publicado}</p>
                      <hr>
                      <p class="card-text">Ocupacion: ${ocupacion}</p>
                      <hr>
                      <p class="card-text">Primera aparición: ${primeraAparicion}</p>
                      <hr>
                      <p class="card-text">Altura: ${altura}</p>
                      <hr>
                      <p class="card-text">Peso: ${peso}</p>
                      <hr>
                      <p class="card-text">Alianzas: ${alianzas}</p>
                    </div>
                  </div>
                </div>
            </div>`);

              //Aca se reciben los datos y se ingresan en el arreglo estadisticas, para luego
              //meterlos en el grafico
                console.log(data.powerstats.combat);
                let estadisticas = [];
                estadisticas.push(
                    {y: data.powerstats.intelligence, label: "Intelligence" },
                    {y: data.powerstats.strength, label: "Strenght" },
                    {y: data.powerstats.speed, label: "Speed" },
                    {y: data.powerstats.durability, label: "Durability" },
                    {y: data.powerstats.power, label: "Power" },
                    {y: data.powerstats.combat, label: "Combat" }
                );
                    console.log(estadisticas);
                //aca se define la varible config con los valores necesarios 
                //para  definir el grafico
                    let config = {
                        animationEnabled: true,
                        theme: "light1",
                        title: {
                            text: "Estadísticas"
                        },
                        data: [{
                            type:"pie",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - ({y})",
                            dataPoints: estadisticas,
                        },],
                    };
                    //Finalmente se crea el grafico
                    let chart = new CanvasJS.Chart("herostats",config);
                    chart.render();
                    
            },
                

        });
    

    });
});