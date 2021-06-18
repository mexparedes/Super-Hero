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

                $("#heroinf").html(`
                    
                <div class="text-center">
                    <h3>${nombre}</h3>
                    <img src="${imagen}">
                    <h6>Conexiones: ${conexiones}</h6>
                    <h6>Publicado por: ${publicado}</h6>
                    <h6>Ocupacion: ${ocupacion}</h6>
                    <h6>Primera Aparicion: ${primeraAparicion}</h6>
                    <h6>Altura: ${altura}</h6>
                    <h6>Peso: ${peso}</h6>
                </div>`);

            
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
                    let chart = new CanvasJS.Chart("herostats",config);
                    chart.render();
                    
            },
                

        });
    

    });
});