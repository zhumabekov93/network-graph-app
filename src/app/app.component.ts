import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('container', {static: true}) container!: ElementRef;

  nodes: any[]=[
    {id: "Alice", size: 15, color: "red"},
    {id: "Bob", size: 25, color: "blue"},
    {id: "Carol", size: 10, color: "green"},
    {id: "Dave", size: 20, color: "purple"},
    {id: "Eve", size: 30, color: "orange"},
    {id: "Frank", size: 18, color: "yellow"},
    {id: "Grace", size: 22, color: "cyan"},
    {id: "Heidi", size: 12, color: "pink"},
    {id: "Ivan", size: 28, color: "brown"},
    {id: "Judy", size: 16, color: "gray"}
  ];

  links: any[]=[
    {source: 0, target: 1},  // Alice <-> Bob
    {source: 0, target: 2},  // Alice <-> Carol
    {source: 1, target: 3},  // Bob <-> Dave
    {source: 1, target: 4},  // Bob <-> Eve
    {source: 2, target: 5},  // Carol <-> Frank
    {source: 3, target: 6},  // Dave <-> Grace
    {source: 4, target: 7},  // Eve <-> Heidi
    {source: 5, target: 8},  // Frank <-> Ivan
    {source: 6, target: 9},  // Grace <-> Judy
    {source: 7, target: 8},  // Heidi <-> Ivan
    {source: 8, target: 9}   // Ivan <-> Judy
  ];

  svgHeight = 500;
  svgWidth = 900;

  constructor() {
  }

  ngOnInit(): void {
    this.createGraph();
  }

  createGraph(): void {
    const svg = d3.select(this.container.nativeElement);

    const simulation = d3.forceSimulation(this.nodes)
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('link', d3.forceLink(this.links).id((d: any) => d.index))
      .force('center', d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2));

    const lines = svg.selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .attr('stroke', 'black');

    const circles = svg.selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', node => node.size)
      .attr('fill', node => node.color);

    const text = svg.selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .text(node => node.id)
      .attr('stoke', 'black')
      .attr('font-weight','bold')
      .attr('text-anchor', 'middle');

    simulation.on('tick', () => {
      circles
        .attr('cx', (node: any) => node.x)
        .attr('cy', (node: any) => node.y);
      text.attr('x', (node: any) => node.x)
        .attr('y', (node: any) => node.y);
      lines
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
    });
  }
}
