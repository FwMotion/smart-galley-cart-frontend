import {observable, PLATFORM} from 'aurelia'
import {CartApi, Configuration} from 'smart_galley_cart'

export class SmartGalleyCartFrontend {
  activeModal = null
  doorState = 'open'

  cartApi = new CartApi(new Configuration({
    basePath: process.env.CART_API_BASEPATH ?? 'http://localhost:8080'
  }))

  @observable
  failedDoorStatusAttempts = 0

  failedDoorStatusAttemptsChanged() {
    if (this.failedDoorStatusAttempts >= parseInt(process.env.FAILURES_BEFORE_PENDING ?? '8')) {
      this.doorState = 'pending'
    }

    if (this.failedDoorStatusAttempts >= parseInt(process.env.FAILURES_BEFORE_MODAL ?? '40')) {
      this.activeModal = 'network-failure'
    } else if (this.activeModal === 'network-failure') {
      this.activeModal = null
    }
  }

  binding() {
    PLATFORM.taskQueue.queueTask(() => {
      this.cartApi.getDoorState()
        .then(response => {
          this.failedDoorStatusAttempts = 0
          this.doorState = response.doorState
        })
        .catch(() => {
          this.failedDoorStatusAttempts++
        })
      this.failedDoorStatusAttempts++;
    }, { delay: parseInt(process.env.DOOR_STATE_UPDATE_INTERVAL_MS ?? '250'), persistent: true })
  }
}
