export default class Preloader {
    constructor() {
        this.findPreloaderElement()
    }

    destroy = () => {
        if (!this.isDestroyed) {
            this.preloader.addEventListener('transitionend', () => {
                this.preloader.remove()
                this.isDestroyed = true
            })

            this.preloader.classList.add('preloader-overlay-hidden')
        }
    }

    private isDestroyed = false
    private preloader!: HTMLDivElement;

    private findPreloaderElement = () => {
        const preloader = document.getElementById('preloader')

        if (preloader) {
            this.preloader = preloader as HTMLDivElement
        } else {
            console.error('Could not find preloader node')
        }
    }
}