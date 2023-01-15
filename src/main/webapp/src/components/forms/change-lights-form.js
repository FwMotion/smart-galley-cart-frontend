import {bindable, BindingMode} from "aurelia";

export class ChangeLightsForm {
  @bindable({mode: BindingMode.twoWay})
  activeModal

  @bindable
  cartApi

  lightColors = [
    'blue',
    'green',
    'red',
    'white'
  ]

  lightsOptions = {
    on: true,
    brightness: 127,
    colorOne: 'white',
    colorTwo: 'red'
  }

  sendChange() {
    this.cartApi.changeCartLights(this.lightsOptions)
      .then(result => console.log(`changeCartLights() --> ${JSON.stringify(result)}`))
      .catch(reason => console.log(`changeCartLights() error --> ${JSON.stringify(reason)}`))
    this.activeModal = null
  }

}
