class Game {
    constructor() {
        this.szachownica = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ];
        this.pionki = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 3, 0, 3, 0, 3],
            [3, 0, 3, 0, 3, 0, 3, 0]
        ];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, 1000);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0,200,700);
        // this.axes = new THREE.AxesHelper(1000);
        // this.scene.add(this.axes);
        this.pionkirender();
        this.boardrender();
        this.pionek();
        this.render();
    }
    tile(texture) {
        const geometry = new THREE.BoxGeometry(100, 20, 100);
        const material = new THREE.MeshBasicMaterial({
            color: texture,
            side: THREE.DoubleSide,
            wireframe: false
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
    pionek(color){
        const geometry = new THREE.CylinderGeometry( 50, 50, 50, 32 );
        const material = new THREE.MeshBasicMaterial( {color: color} );
        const cylinder = new THREE.Mesh( geometry, material );
        return cylinder;
    }
    pionkirender(){
        let posx = -300;
        let posz = 0;
        for(let y = 0; y < this.pionki.length; y++){
            posx = -300;
            posz -= 100;
            for(let x = 0; x < this.pionki[y].length; x++){
                if(this.pionki[y][x] == 2){
                    this.pion = this.pionek(0x226622);
                    this.pion.position.set(posx,35,posz);
                    this.scene.add(this.pion);
                }
                else if(this.pionki[y][x] == 3){
                    this.pion = this.pionek(0x662266);
                    this.pion.position.set(posx,35,posz);
                    this.scene.add(this.pion);
                }
                posx+=100;
            }
        }
    }
    boardrender(){
        let posx = -300;
        let posz = 0;
        for(let y = 0; y < this.szachownica.length; y++){
            posx = -300;
            posz -= 100;
            for(let x = 0; x <this.szachownica[y].length; x++){
                if(this.szachownica[y][x] == 0){
                    this.cube = this.tile(0xffffff);
                }
                else{
                    this.cube = this.tile(0x555555);
                }
                this.cube.position.set(posx,0,posz);
                posx+=100;
                this.scene.add(this.cube);
            }
        }
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}