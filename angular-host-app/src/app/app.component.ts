import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-host-app';

  // to render the react web component
  @ViewChild('reactElementRef', { read: ElementRef, static: true })
  reactElementRef!: ElementRef;

  // use a view container to instantiate the remote angular component
  @ViewChild('angularViewContainerRef', { read: ViewContainerRef })
  angularViewContainerRef!: ViewContainerRef;

  // to render the vue web component
  @ViewChild("vueElementRef", { static: true })
  vueElementRef!: ElementRef;

  constructor(private renderer: Renderer2) {

  }

  async loadAngular(): Promise<void> {
    const m = await import('angularRemoteApp/TestComponent');
    const ref = this.angularViewContainerRef.createComponent(m.TestComponent);
  }

  async loadReact(): Promise<void> {
    // 3 ways to load remote react module
    // 1. using loadRemoteModule
    const remoteReact = await loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'reactRemoteApp',
      exposedModule: './TestComponent'
    });
    const e = document.createElement('react-remote-test-component-element');
    this.reactElementRef.nativeElement.appendChild(e);

    // Using import function and ....
    // const module = await import('reactRemoteApp/TestComponent');
    // console.log('module',new module.default());
    // 2. passing `document.createElement('react-remote-test-component-element')` as second argument to the appendChild function
    // this.renderer.appendChild(
    //   this.reactElementRef.nativeElement,
    //   document.createElement('react-remote-test-component-element')
    // );

    // 3. passing `new module.TestComponentElement()` as second argument to the appendChild function
    // console.log('module',new module.TestComponentElement());
    // this.renderer.appendChild(
    //   this.reactElementRef.nativeElement,
    //   new module.TestComponentElement()
    // );
  }

  async loadVue(): Promise<void> {
    // 2 ways to import remote vue module
    // 1. using loadRemoteModule
    // const remoteReact = await loadRemoteModule({
    //   remoteEntry: 'http://localhost:3003/remoteEntry.js',
    //   remoteName: 'vueRemoteApp',
    //   exposedModule: './VueRemoteWebComponent'
    // });

    // const e = document.createElement('vue-remote-web-component');
    // this.vueElementRef.nativeElement.appendChild(e);

    // 2. using import function
    const module = await import('vueRemoteApp/VueRemoteWebComponent');
    this.renderer.appendChild(
      this.vueElementRef.nativeElement,
      new module.default()
    );
  }
}
