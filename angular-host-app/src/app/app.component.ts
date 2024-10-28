import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ElementRef, Injector, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

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

  // use a view container to instantiate the remote angular app
  @ViewChild('angularRemoteAppViewContainerRef', { read: ViewContainerRef })
  angularRemoteAppViewContainerRef!: ViewContainerRef;

  // to render the angular app web component
  @ViewChild('angularRemoteAppElementRef', { static: true })
  angularRemoteAppElementRef!: ElementRef;

  // use a view container to instantiate the remote angular app
  @ViewChild('angularRemoteComponentViewContainerRef', { read: ViewContainerRef })
  angularRemoteComponentViewContainerRef!: ViewContainerRef;

  // to render the angular app web component
  @ViewChild('angularRemoteComponentElementRef', { static: true })
  angularRemoteComponentElementRef!: ElementRef;

  // to render the vue web component
  @ViewChild("vueElementRef", { static: true })
  vueElementRef!: ElementRef;

  constructor(private renderer: Renderer2, private injector: Injector) {

  }

  async loadAngular(): Promise<void> {
    // 3 ways to load remote angular module
    // 1. using import function and web component
     const appModule = await import('angularRemoteApp/AppModule');
     console.log('appModule',new appModule.AppModule(this.injector));
      const appWebComponentElement = document.createElement('angular-app-component');
      this.angularRemoteAppElementRef.nativeElement.appendChild(appWebComponentElement);

    // 2. using import function and the component factory
    // const appModule = await import('angularRemoteApp/AppComponent');
    // const ref = this.angularRemoteAppViewContainerRef.createComponent(appModule.AppComponent);

    // 3. using loadRemoteModule
    // const remoteAngular = await loadRemoteModule({
    //   remoteEntry: 'http://localhost:3001/remoteEntry.js',
    //   remoteName: 'angularRemoteApp',
    //   exposedModule: './AppModule',
    // });
    // console.log('remoteAngular', new remoteAngular.AppModule(this.injector));
    // const appWebComponentElement = document.createElement('angular-app-component');
    // this.angularRemoteAppElementRef.nativeElement.appendChild(appWebComponentElement);


// The following code is for loading the TestModule from the remote angular app in the above mentioned 3 ways
    // 1. using import function and web component
  //  const componentModule = await import('angularRemoteApp/TestModule');
  //  console.log('componentModule',new componentModule.TestModule(this.injector));
  //   const webComponentElement = document.createElement('angular-test-component');
  //   this.angularRemoteComponentElementRef.nativeElement.appendChild(webComponentElement);

  // 2. using import function and the component factory
    const componentModule = await import('angularRemoteApp/TestComponent');
    const ref = this.angularRemoteComponentViewContainerRef.createComponent(componentModule.TestComponent);

// 3. using loadRemoteModule
    // const remoteAngular = await loadRemoteModule({
    //   remoteEntry: 'http://localhost:3001/remoteEntry.js',
    //   remoteName: 'angularRemoteApp',
    //   exposedModule: './TestModule',
    // });
    // console.log('remoteAngular', new remoteAngular.TestModule(this.injector));
    // const webComponentElement = document.createElement('angular-test-component');
    // this.angularRemoteComponentElementRef.nativeElement.appendChild(webComponentElement);

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
