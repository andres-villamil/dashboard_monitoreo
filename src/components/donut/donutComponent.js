import React,  { useEffect, useState  }  from 'react'
import * as d3 from 'd3'

import $ from "jquery"
import '../donut/donut.scss'

import * as locale from '../localeEsCo'



export default function DonutComponent(props) {

    const [idDonuts] = useState(props.data[0].idGraph);
    
    useEffect(()=> {
        renderDonutsChart(idDonuts);
    })
   
    function renderDonutsChart(idDonuts){
 
     
        d3.select('#Donut'+idDonuts).selectAll("svg").remove(); 
        var formatValue = locale.locale_esCo.format(',');
        var margin = {top: 80, right: 180, bottom: 80, left: 180},
            width =  $('#Donut'+idDonuts).width() - margin.top/2,
            height =  width/2;
       
       
         // a circle chart needs a radius
         var radius = Math.min(width, height) / 2;
         var donutWidth = 70; 

         // legend dimensions
         var legendRectSize = 10;
         var legendSpacing = 5; 

         // define color scale
        console.log("data donut", props.data)
        var arrayColor = props.data.map(function(d){ return d.color})
        var totalColor = arrayColor.length -1
            arrayColor.splice(totalColor, 1, props.color)

        console.log("color donut", arrayColor, "total de colores dona", totalColor)    
       
        var color = d3.scaleOrdinal().range(arrayColor)   
      
         var svg = d3.select("#Donut"+idDonuts).html("")
                        .append('svg')
                        .attr('width', width + margin.left)
                        .attr('height', height + margin.top ) 
                        .append('g') 
                        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 1.6) + ')'); 

         var arc = d3.arc()
                      .innerRadius(radius - donutWidth) 
                      .outerRadius(radius); 

         var pie = d3.pie() 
                      .startAngle(1.1*Math.PI)
                      .endAngle(3.1*Math.PI) 
                      .value(function(d) { return d.value; }) 
                      .sort(null);

        var dataset = props.data

         // calculate new total
         console.log("datos de donut ",dataset)
         var total = d3.sum(dataset, d => d.value);

         // define new total section
         var newTotal = d3.select('.new-total-holder')
                           .append('span')
                           .attr('class', 'newTotal')
                           .text(total);
               
        var tooltip = d3.select("#Donut"+idDonuts)  
                        .append('div')                          
                        .attr('class', 'tooltip'); 

            tooltip.append('div') 
                    .attr('class', 'label'); 
            tooltip.append('div') 
                    .attr('class', 'value');                 
            tooltip.append('div') 
                    .attr('class', 'percent'); 

               

            dataset.forEach(function(d) {
                d.value = +d.value; 
                d.enabled = true;
            });

                // creating the chart
            var path = svg.selectAll('path') 
                          .data(pie(dataset)) 
                          .enter() 
                          .append('path') 
                          .attr('d', arc) 
                          .attr('fill', function(d) { return color(d.data.name); }) 
                          .attr("stroke-width", 1)
                          .attr("stroke", "grey");
                          
                // transition initial                                 
                path.transition()
                .delay(function(d, i){ return i * 50; }).duration(500) 
                .attrTween('d', function(d) { 
                              var i = d3.interpolate(d.startAngle+0.1, d.endAngle); 
                          return function(t) {
                                    d.endAngle = i(t);
                                    return arc(d)
                          };
                });
               
                path.on('mouseover', function(d) {    
                    total = d3.sum(dataset.map(function(d) {        
                        return (d.enabled) ? d.value : 0;                                       
                    }));   
                    
                    if(d.data.sufijo === null){
                        tooltip.select('.name').html(d.data.name);                   
                        tooltip.select('.percent').html(d.data.name + "<br>" + formatValue(d.data.value))          
                        tooltip.style('display', 'block');
                    }else{
                        tooltip.select('.name').html(d.data.name);                   
                        tooltip.select('.percent').html(d.data.name + "<br>" + formatValue(d.data.value) + ' ' + d.data.sufijo)          
                        tooltip.style('display', 'block');
                    }
              
                                         
                });                                                           

                path.on('mouseout', function() {                      
                    tooltip.style('display', 'none'); 
                });

                path.on('mousemove', function(d) {                   
                    tooltip.style('top', (d3.event.layerY + 10) + 'px') 
                           .style('left', (d3.event.layerX + 10) + 'px'); 
                })

                

                // define legend
                var legend = svg.selectAll('.legend') 
                                    .data(color.domain())
                                    .enter()
                                    .append('g') 
                                    .attr('class', 'legend') 
                                    .attr('transform', function(d, i) {                   
                                        var height = legendRectSize + legendSpacing; 
                                        var offset =  height * color.domain().length / 2; 
                                        var horz = 20 * legendRectSize; 
                                        var vert = i * height - offset; 
                                        return 'translate(' + horz + ',' + vert + ')';       
                                    });

                // adding colored squares to legend
                legend.append('rect')                               
                      .attr('width', legendRectSize)                        
                      .attr('height', legendRectSize)                     
                      .style('fill', color) 
                      .style('stroke', color)
                      .on('click', function(label) {
                        var rect = d3.select(this); 
                        var enabled = true;
                        var totalEnabled = d3.sum(dataset.map(function(d) { 
                            return (d.enabled) ? 1 : 0; 
                        }));
                            if (rect.attr('class') === 'disabled') { 
                                rect.attr('class', ''); 
                            } else { 
                                if (totalEnabled < 2) return; 
                                    rect.attr('class', 'disabled'); 
                                    enabled = false; 
                            }

                pie.value(function(d) { 
                    if (d.name === label) d.enabled = enabled; 
                        return (d.enabled) ? d.value : 0;
                    });

                path = path.data(pie(dataset));

                    path.transition()
                        .duration(750) 
                        .attrTween('d', function(d) { 
                            var interpolate = d3.interpolate(this._current, d); 
                            this._current = interpolate(0); 
                        return function(t) {
                        return arc(interpolate(t));
                        };
                    });
                    
                    // calculate new total
                    var newTotalCalc = d3.sum(dataset.filter(function(d) { return d.enabled;}), d => d.value)
            
                
                    // append newTotalCalc to newTotal which is defined above
                    newTotal.text(newTotalCalc);
                });

                // adding text to legend
                legend.append('text')                                    
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing + 3)
                .text(function(d) { return d; }); 

              
            
    }

     return (
		 <div  id={"Donut"+idDonuts}  ></div>
                            
	    )
    }












