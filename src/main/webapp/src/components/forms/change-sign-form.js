import {bindable, BindingMode} from "aurelia";

export class ChangeSignForm {
  @bindable({mode: BindingMode.twoWay})
  activeModal

  @bindable
  cartApi

  signPatterns = [
    'beer',
    'camel',
    'karavan',
  ]

  signOptions = {
    on: true,
    brightness: 127,
    pattern: 'beer'
  }

  sendChange() {
    this.cartApi.changeCartSign(this.signOptions)
      .then(result => console.log(`changeCartSign() --> ${result}`))
      .catch(reason => console.log(`changeCartSign() error --> ${reason}`))
    this.activeModal = null
  }

}
