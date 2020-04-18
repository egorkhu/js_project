'use strict'

let slider = {

    activeIndex: 0,
    offset: 0,

    init() {
        let controls = this.getControls();
        let slides = this.getSlides();

        if (slides.length === 2) {
            let firstSlideClone = slides[0].cloneNode(true);
            document.querySelector('.b-slider__container').append(firstSlideClone);
            let lastSlideClone = slides[1].cloneNode(true);
            document.querySelector('.b-slider__container').append(lastSlideClone);
        }

        slides = this.getSlides();
        let lastSlide = slides[slides.length - 1];

        lastSlide.style.visibility = "hidden";
        lastSlide.style.transition = 'none';
        lastSlide.style.transform = `translateX(${slides.length * -100}%)`;


        controls[0].addEventListener('click', () => {
            this.switchLeft();
        });
        controls[1].addEventListener('click', () => {
            this.switchRight();
        });
    },

    getSlides() {
        return document.querySelectorAll('.b-slider__slide');
    },

    getControls() {
        let leftControl = document.querySelector('.fa-chevron-left');
        let rightControl = document.querySelector('.fa-chevron-right');
        return [leftControl, rightControl];
    },

    switchLeft() {
        let slides = this.getSlides();
        this.offset = -100;
        ++this.activeIndex;
        for (let slide of slides) {
            slide.style.transition = 'all .3s ease-in-out';
            slide.style.visibility = "visible";
            let x = slide.style.cssText;
            let y = parseInt(x.match(/\-\d+|\d+/));
            if (y === -slides.length * 100) {
                slide.style.transform = `translateX(-100%)`;
                slide.style.visibility = "hidden";
                slide.style.transition = 'none';
            } else {
                slide.style.transform = `translateX(${this.offset + y}%)`;
            }
        }
        if (this.activeIndex < 1) {
            slides[slides.length - 1].style.visibility = "hidden";
            slides[slides.length - 1].style.transition = 'none';
            slides[slides.length - 1].style.transform = `translateX(0%)`;
        } else if (this.activeIndex >= 2) {
            slides[this.activeIndex - 2].style.visibility = "hidden";
            slides[this.activeIndex - 2].style.transition = 'none';
            slides[this.activeIndex - 2].style.transform = `translateX(${(slides.length - this.activeIndex) * 100}%)`;
        }
        if (this.activeIndex > slides.length) {
            this.activeIndex = 1;
        }
    },

    switchRight() {
        let slides = this.getSlides();
        this.offset = 100;
        --this.activeIndex;
        if (this.activeIndex === -1) {
            this.activeIndex = slides.length - 1;
        }
        for (let slide of slides) {
            slide.style.transition = 'all .3s ease-in-out';
            slide.style.visibility = "visible";
            let x = slide.style.cssText;
            let y = parseInt(x.match(/\-\d+|\d+/));
            slide.style.transform = `translateX(${this.offset + y}%)`;
        }
        if (this.activeIndex === 0) {
            slides[slides.length - 1].style.visibility = "hidden";
            slides[slides.length - 1].style.transition = 'none';
            slides[slides.length - 1].style.transform = `translateX(${-slides.length * 100}%)`;
        } else if (this.activeIndex >= 1) {
            slides[this.activeIndex - 1].style.visibility = "hidden";
            slides[this.activeIndex - 1].style.transition = 'none';
            slides[this.activeIndex - 1].style.transform = `translateX(${(0 - this.activeIndex) * 100}%)`;
        }
    },
};

slider.init();