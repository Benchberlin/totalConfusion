class Frog {
    constructor (y,x,img) {
        this.y = y ;
        this.x = x;
        this.img = img;
        this.hasBeenTouched = false
        
       
        
    }
    
preLoad() {
    



}


setup() {
}

    draw (){
        image(this.img, this.y, this.x, 40,30);
        
        
        




    }

    move() {
        this.y -= 3

    }

}

let obj = {banana:true}
obj.banana = false 