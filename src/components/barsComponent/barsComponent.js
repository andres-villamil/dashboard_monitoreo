import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import * as locale from '../localeEsCo'


import '../barsComponent/barsComponent.scss'

//import newId from '../newid'
import $ from "jquery"



export default function BarsComponent(props) {

    const [idBars] = useState(props.dataBars[0].idGraph);
    

    useEffect(() => {
        renderBarsChart(idBars);
    })

    function renderBarsChart(idBars) {

        
        console.log("id graph", idBars)

           d3.select("#Bars" + idBars).selectAll("svg").remove();
        var formatValue = locale.locale_esCo.format(',');
        var margin = { top: 80, right: 180, bottom: 80, left: 180 },
            width = $("#Bars" + idBars).width() - margin.right,
            height = width / 2;
          

        console.log("altura", height, "Ancho", width, "id de barras", idBars);

        var arrayColor = props.dataBars.map(function (d) { return d.color })
        var totalColor = arrayColor.length - 1
        arrayColor.splice(totalColor, 1, props.color)

        var color = d3.scaleOrdinal().range(arrayColor)

        var x = d3.scaleBand()
            .range([0, width + 100])
            .paddingInner(.1)
            .paddingOuter(.3)

        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])

        var xAxis = d3.axisBottom(x)
            .tickFormat(d => {
                var arrayDate = []
                    arrayDate = d.split('-')
                var paramDate = arrayDate[0]
                if(paramDate.length <= 3 ){
                   return d.substring(0, 8)
                }else{
                  return  d.substring(0, 3) 
                }
                })
            

        var yAxis = d3.axisLeft(y)
            .ticks(12)
            .tickFormat(function(d){ return formatValue(d) })

        var tooltip = d3.select("#Bars" + idBars).append("div")
            .attr("class", "tooltip")


        var svg = d3.select("#Bars" + idBars).append("svg")
            .attr("width", width + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.top}, ${margin.top})`)




        x.domain(props.dataBars.map(function (d) { return d.name }))



        if (d3.max(props.dataBars, function (d) { return d.value > 50 })) {
            y.domain([97, d3.max(props.dataBars, function (d) { return d.value })])
        } else {
            y.domain([0, d3.max(props.dataBars, function (d) { return d.value })])
        }


        svg.selectAll("bar")
            .data(props.dataBars)
            .enter().append("rect")
            .attr("class", "barra")
            .style("fill", function (d) { return color(d.name); })
            .attr("x", function (d) { return x(d.name) })
            .attr("y", height)
            .attr("height", 0)
            .attr("width", x.bandwidth())
            .on("mousemove", function (d) {
                if(d.sufijo === null){
                    d3.select(this).attr("fill", "#588C73");
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html(formatValue(d.value))
                }else{
                    d3.select(this).attr("fill", "#588C73");
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html(formatValue(d.value) + " " + d.sufijo)

                }
            })
            .on("mouseout", function (d, i) { tooltip.style("display", "none"); })
            .transition()
            .duration(1500)
            .ease(d3.easePolyOut)
            .attr("y", function (d) { return y(d.value) })
            .attr("height", function (d) { return height - y(d.value) })
         


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .selectAll(".tick text")


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

    }


    return (
        <div>
            <div id={"Bars" + idBars}></div>
        </div>
    )

}    