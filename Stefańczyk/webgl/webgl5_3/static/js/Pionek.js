class Pionek extends THREE.Mesh {
    constructor(color, typ, y, x) {
        super();
        this.x = x;
        this.y = y;
        this.color = color;
        this._typ = typ;
        this.pionekKolor;
        const texture = "https://i.imgur.com/WraSNQb.png";
        const geometry = new THREE.CylinderGeometry(50, 50, 25, 32);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.color),
            map: new THREE.TextureLoader().load(texture)
        });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.name = "pion";
        cylinder.posx = this.x;
        cylinder.posy = this.y;
        cylinder.typ = this._typ;
        return cylinder;
    }

}