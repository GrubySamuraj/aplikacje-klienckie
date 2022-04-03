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
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.positions = [-1000,1000];
        this.camera.position.set(0, 1000, -1000);
        this.camera.lookAt(this.scene.position);
        this.boardrender();
        this.pionek();
        this.render();
    }
    tile(color,texture) {
        const geometry = new THREE.BoxGeometry(100, 20, 100);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(texture),
            color:color,
            side: THREE.DoubleSide,
            wireframe: false
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
    pionek(color,texture) {
        const geometry = new THREE.CylinderGeometry(50, 50, 50, 32);
        const material = new THREE.MeshBasicMaterial({ 
            color: color,
            map: new THREE.TextureLoader().load(texture)
        });
        const cylinder = new THREE.Mesh(geometry, material);
        return cylinder;
    }
    pionkirender() {
        let posx = -350;
        let posz = 450;
        for (let y = 0; y < this.pionki.length; y++) {
            posx = -350;
            posz -= 100;
            for (let x = 0; x < this.pionki[y].length; x++) {
                if (this.pionki[y][x] == 1) {
                    this.pion = this.pionek(0x444444,"https://i.imgur.com/WraSNQb.png");
                    this.pion.position.set(posx, 35, posz);
                    this.scene.add(this.pion);
                }
                else if (this.pionki[y][x] == 2) {
                    this.pion = this.pionek(0xdddddd,"https://i.imgur.com/WraSNQb.png");
                    this.pion.position.set(posx, 35, posz);
                    this.scene.add(this.pion);
                }
                posx += 100;
            }
        }
    }
    boardrender() {
        let posx = -350;
        let posz = 450;
        for (let y = 0; y < this.szachownica.length; y++) {
            posx = -350;
            posz -= 100;
            for (let x = 0; x < this.szachownica[y].length; x++) {
                if (this.szachownica[y][x] == 0) {
                    this.cube = this.tile(0x555555,"https://i.imgur.com/9LA7K4y.png");
                }
                else {
                    this.cube = this.tile(0xffffff,"https://i.imgur.com/9LA7K4y.png");
                }
                this.cube.position.set(posx, 0, posz);
                posx += 100;
                this.scene.add(this.cube);
            }
        }
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
    positionset = (position0) =>{
        this.camera.position.set(0, 1000, position0);
        this.camera.lookAt(this.scene.position);
        console.log("kamera: " + JSON.stringify(this.camera.position));
    }
}