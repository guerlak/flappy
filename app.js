function newElement(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function Bar(inverse = false){

    this.el = newElement('div', 'bar');
    const borderBar = newElement('div', 'borderBar');
    const bodyBar = newElement('div', 'bodyBar');

    this.el.appendChild(inverse ? bodyBar : borderBar);
    this.el.appendChild(inverse ? borderBar : bodyBar);

    this.setHeight = function(barHeight){
        bodyBar.style.height = `${barHeight}px`;
    }
}

function BarsPair(height, spaceBetween, x){

    this.element = newElement("div", "barreira-par");
    this.upperBar = new Bar(true);
    this.lowerBar = new Bar();
    this.element.appendChild(this.upperBar.el)
    this.element.appendChild(this.lowerBar.el)

    this.randomSpaceBetween = () => {

        const heightUpperBar = Math.random() * (height - spaceBetween);
        const heightLowerBar = height + spaceBetween - heightUpperBar;

        this.upperBar.setHeight(heightUpperBar);
        this.lowerBar.setHeight(heightLowerBar);
    }

    this.getX = () => {
        return parseInt(this.element.style.left.split('px')[0]);
    }

    this.setX = (x) => {
        this.element.style.left = `${x}px`
    }

    this.getBarWidth = () => this.element.clientWidth;
    this.randomSpaceBetween();
    this.setX(x)
}


const animate = function(){

    let frameSpeed = 2;

    const bars1 = new BarsPair(170, 20, 700);
    // const bars2 = new BarsPair(370, 10, 1200);

    let barsArr = [
        bars1
    ]

    document.querySelector('[flappy]').appendChild(barsArr[0].element)

    setInterval(function(){
         barsArr.forEach(function(bar) {
             bar.setX(bar.getX() - frameSpeed)
             if(bar.getX() < -100){
                 bar.setX(900);
             }
         });
     }, 10);
}

animate();



