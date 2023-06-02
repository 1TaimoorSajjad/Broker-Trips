import { Component, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BrokerlistComponent } from '../Components/brokerlist/brokerlist.component';

@Directive({
  selector: '[appBrokers]'
})
export class BrokersDirective implements OnInit {
  @Output() formemit = new EventEmitter<any>()
  @Input() forform: any
  isActive = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  
  ngOnInit(): void {}
  @HostListener('click')
  onClick() {
    if(this.isActive){
      this.viewContainerRef.remove();
      this.isActive = false;
      return;
    }
    this.isActive = true;
    this.renderer.addClass(this.el.nativeElement, 'active');
    const brokerListComponentFactory = this.componentFactoryResolver.resolveComponentFactory(BrokerlistComponent);
    const brokerListComponentRef = this.viewContainerRef.createComponent(brokerListComponentFactory);
    brokerListComponentRef.instance.blist = this.forform;
    brokerListComponentRef.instance.selectbrokerData.subscribe((sbroker: any)=>{
      this.formemit.emit(sbroker)
      this.viewContainerRef.remove()
      this.isActive = false;
    });

    const brokerListComponent = brokerListComponentRef.location.nativeElement;
    this.renderer.addClass(brokerListComponent, 'brokerlist');

    const inputRect = this.el.nativeElement.getBoundingClientRect();
    const brokerformElement = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.appendChild(brokerformElement, brokerListComponent);

    this.renderer.setStyle(brokerListComponent, 'position', 'absolute');
    this.renderer.setStyle(brokerListComponent, 'top', inputRect.bottom + 'px');
    this.renderer.setStyle(brokerListComponent, 'left', inputRect.left + 'px');
  }
}
