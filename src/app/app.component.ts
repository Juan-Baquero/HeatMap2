import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from './data.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'HeatMap';
  //-----Declarar variables utilizadas.
  hostElement; // Native element hosting the SVG container
  svg; // Top level SVG element
  g; // SVG Group element
  data;
  viewBoxHeight;
  viewBoxWidth;
  margin;
  width;
  height;
  public contenido;

  @ViewChild('popover', { static: false }) public popover: NgbPopover;
  gridSize: number;
  legendElementWidth: number;
  buckets: number;
  colors: string[];
  days: string[];
  times: string[];
  colorScale: any;
  cards: any;
  times2: any;


  constructor(public service: DataService, private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() {
    //Obtener datos
   this.data = this.service.getData();
  
    this.createChart()
  }

  createChart() {
    this.removeExistingChartFromParent()
    this.setChartDimension()
    this.initProperties()
    /*
        //Crear Rectangulo prueba
        this.svg.append("rect")
          .attr("class", "prueba")
          .attr("transform", `translate(0,0)`)
          .attr("fill", "black")
          .attr("pointer-events", "all")
          .attr("width", 30)
          .attr("height", 30)
          .attr("cursor", "pointer")
          .on("click", () => { this.showPopOver(this.data) });
        //Creación de gráfico
    */
    // DAY Labels
    console.log(this.days)
    this.svg.selectAll(".dayLabel")
      .data(this.days)
      .enter().append("text")
      .attr("class","text-muted")
      .text((d) => { return d; })
      .attr("x", this.margin.left)
      .attr("y", (d, i) => { return this.margin.top + (i * this.gridSize)+ this.gridSize/2-8; })
      .style("text-anchor", "end")
      
     
      .attr("transform", "translate(-6," + this.gridSize / 1.5 + ")")
      //.attr("class", (d, i) => { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });
    //Time labels
    this.svg.selectAll(".timeLabel")
      .data(this.times)
      .enter().append("text")
      .attr("class","text-muted")
      .text((d) => { return d; })
      .attr("x", (d, i) => { return this.margin.left + (i * this.gridSize); })
      .attr("y", this.margin.top)
      .style("text-anchor", "end")
      
     
      .attr("transform", "translate(" + this.gridSize / 2 + ", -6)");

    this.svg.selectAll(".times2")
      .data(this.times2)
      .enter().append("text")
      .attr("class","text-muted")
      .text((d) => { return d; })
      .attr("x", (d, i) => { return this.margin.left + (i * this.gridSize); })
      .attr("y", this.height-this.margin.top-35)
      .style("text-anchor", "end")
      
     
      .attr("transform", "translate(" + this.gridSize / 2 + ", -6)");

      this.svg.append("line")
      .attr("x1",10)
      .attr("x2",this.width+this.gridSize+this.margin.right+30)
      .attr("y1", this.margin.top + (2 * this.gridSize)-3)
      .attr("y2", this.margin.top + (2 * this.gridSize)-3)
      .attr("stroke","black")
      .style("stroke-dasharray", ("10, 5"))
      .attr("stroke-width",0.5)


    this.heatmapChart();



  }//FinCreateChart

  heatmapChart() {


    this.colorScale = d3.scaleQuantize()
      .domain([0, 2])
      .range(["#34DB43", "#cccccc","#969696","#636363","#252525"]);

    this.cards = this.svg.selectAll(".hour")
      .data(this.data)
      .enter().append("rect")      
      .attr("x", (d,i) => { if (d.column %2==0) return this.margin.left + (d.column - 2) * this.gridSize/2; else return this.margin.left + (d.column - 1) * this.gridSize/2; })
      .attr("y", (d) => { return this.margin.top + (d.row - 1) * this.gridSize; })
      .attr("class", d=> "port" + d.row + d.column)
      .attr("width", this.gridSize - 6)
      .attr("height", this.gridSize - 6)
      .attr("stroke",(d)=>{ if (d.time==0) return "gray"; else return "black"})
      .attr("stroke-width",0.5)
      .style("fill", (d) => { if (d.time==0) return "white"; else return this.colorScale(d.value) })
      .attr("cursor", "pointer")
      .on("click", (d) => { this.showPopOver(d) })
      
      this.svg.selectAll(".scaleRetc")
      .data([0,0.45,0.85,1.25,1.65])
      .enter().append("rect")  
      .attr("x",(d,i)=>{return this.margin.left + (i) * (this.gridSize-8)})
      .attr("y",this.height-this.margin.top-20)
      .attr("width", this.gridSize-8 )
      .attr("height", (this.gridSize - 4)/3)
      .style("fill", (d) => { return this.colorScale(d) })
      .attr("stroke","black")
      .attr("stroke-width",0.5)

      this.svg.selectAll(".scaleLabel")
      .data([0,0.4,0.8,1.2,1.6,"2 (paquetes)"])
      .enter().append("text")
      .attr("class","text-less")
      .text((d) => { return d; })
      .attr("x", (d,i)=>{return this.margin.left + (i) * (this.gridSize-8)-5
      })
      .attr("y", this.height-this.margin.top)
      .style("text-anchor", "start")
    /*  .style('font', '14px Overpass')
     */
         
    this.svg.append("rect")  
    .attr("x", this.margin.left + (11) * this.gridSize)
    .attr("y",this.height-this.margin.top-20)
    .attr("width", this.gridSize-8 )
    .attr("height", (this.gridSize - 4)/3)
    .style("fill", "white")
    .attr("stroke","gray")
    .attr("stroke-width",0.5)

    this.svg.append("text")
    .attr("class","text-less")
      .text("Puerto Libre:")
      .attr("x",  this.margin.left + (11) * this.gridSize-10)
      .attr("y", this.height-this.margin.top-12)
      .style("text-anchor", "end")
      
     



  }


  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.hostElement).select('svg').remove();
  }//Fin removeexistingChart

  private setChartDimension() {
    // Se hace responsive el svg  setChartDimension()
    this.viewBoxHeight = 330;
    this.viewBoxWidth = 430;
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', this.viewBoxWidth)
      .attr('height', this.viewBoxHeight)
    //Responsive
    .attr('width', '100%')
    .style('max-width', '430px')
    .attr('height', '100%')
    .attr('viewBox', '0 0 ' + this.viewBoxWidth + ' ' + this.viewBoxHeight);
    //-----------------------------------------------------------------------
    // Agregar elemento grafico   
    this.g = this.svg.append("g")
      .attr("transform", "translate(0,0)");
  }//Fin setChart

  private initProperties() {

    //---Inicializar propiedades
    this.margin = { top: 20, right: 0, bottom: 100, left: 70 };
    this.width = this.viewBoxWidth;
    this.height = this.viewBoxHeight;

    this.width = this.viewBoxWidth - this.margin.left - this.margin.right;
    this.height = this.viewBoxHeight - this.margin.top - this.margin.bottom;
    this.gridSize = Math.floor(this.width / 12);
    this.legendElementWidth = this.gridSize * 2;
    this.buckets = 58;
    this.colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]; // alternatively colorbrewer.YlGnBu[9]
    this.days = ["SW3001", " ", "SW3002", " "];
    this.times = ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23"];
    this.times2 = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];
  }//Fin init
  private showPopOver(data) {

    // console.log(new ElementRef (d3.selectAll(".prueba")))

    this.contenido = data;   
    this.popover._elementRef = new ElementRef(d3.select(".port"+data.row+data.column).node());//"." + this.filterName(data.name)).node());
    if (this.popover.isOpen()) this.popover.close;
    else this.popover.open();
    //setTimeout(() => {this.popover.open();},1000)

    //console.log(this.popover)
  }//Fin showPopOver

}
