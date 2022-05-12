class Item extends THREE.Mesh {
    constructor(color,y,x,id) {
        super();
        this.color = color;
        const texture = "https://i.imgur.com/9LA7K4y.png";
        const geometry = new THREE.BoxGeometry(100, 20, 100);
        const material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(texture),
            color: new THREE.Color(this.color),
            side: THREE.DoubleSide,
            wireframe: false
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.name = "plansza";
        cube.posx = x;
        cube.posy = y;
        cube.color_id = id;
        return cube;
    }
}