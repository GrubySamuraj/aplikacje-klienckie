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
        this.pionki_obj = [];
        this.szachownica_obj = [];
        this.positions = [1000, -1000];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 1000, 1000);
        this.axes = new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.camera.lookAt(this.scene.position);
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        this.poprzedni_pion;
        this.poprzednie;
        this.clicked_pion;
        this.boardrender();
        this.render();
        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
    }
    pionkirender() {
        let posx = -350;
        let posz = 450;
        for (let y = 0; y < this.pionki.length; y++) {
            posx = -350;
            posz -= 100;
            this.pionki_obj.push([]);
            for (let x = 0; x < this.pionki[y].length; x++) {
                if (this.pionki[y][x] == 1) {
                    this.pion = new Pionek(0xffffff, this.pionki[y][x], y, x, 1);
                    this.pionki_obj[y].push(this.pion);
                    this.pion.position.set(posx, 35, posz);
                    this.scene.add(this.pion);
                }
                else if (this.pionki[y][x] == 2) {
                    this.pion = new Pionek(0x444444, this.pionki[y][x], y, x, 2);
                    this.pionki_obj[y].push(this.pion);
                    this.pion.position.set(posx, 35, posz);
                    this.scene.add(this.pion);
                }
                else {
                    this.pionki_obj[y].push(0);
                }
                posx += 100;
            }
        }
    }
    boardrender() {
        let posx = -350;
        let posz = 450;
        for (let y = 0; y < this.szachownica.length; y++) {
            this.szachownica_obj.push([]);
            posx = -350;
            posz -= 100;
            for (let x = 0; x < this.szachownica[y].length; x++) {
                if (this.szachownica[y][x] == 0) {
                    this.cube = new Item(0x555555, y, x, 0);
                    this.szachownica_obj[y].push(this.cube);
                }
                else {
                    this.cube = new Item(0xffffff, y, x, 1);
                    this.szachownica_obj[y].push(this.cube);
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
        TWEEN.update();
    }
    camera_position = (position0) => {
        this.camera.position.set(0, 1000, position0[0]);
        this.camera.lookAt(this.scene.position);
    }
    myRaycast = (event) => {
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        this.mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        if (this.intersects.length > 0) {
            let obj = this.intersects[0].object
            console.log(obj);
            if (obj.name == "pion") {
                if (this.poprzedni_pion && this.poprzedni_pion.name == "pion" && obj.typ == ui.logged_user) {
                    if (obj.typ == 1) {
                        this.poprzedni_pion.material.color = new THREE.Color(0xffffff);
                    }
                    else {
                        this.poprzedni_pion.material.color = new THREE.Color(0x444444);
                    }
                    this.odkoloruj(this.poprzedni_pion);
                }
                if (obj.name == "pion" && obj.typ == ui.logged_user) {
                    this.possibilities(obj);
                }
                if (obj.typ == ui.logged_user) {
                    this.poprzedni_pion = obj;
                }
            }
            else if (obj.name == "plansza") {
                net.move(obj);
            }
        }
    }
    move = (obj) => {
        this.lock_raycast();
        this.odkoloruj(this.clicked_pion);
        this.ruch1(this.clicked_pion, obj);
        this.clicked_pion.posx = obj.posx;
        this.clicked_pion.posy = obj.posy;
        if (this.clicked_pion.typ == 1)
            this.poprzedni_pion.material.color = new THREE.Color(0xffffff);
        else
            this.poprzedni_pion.material.color = new THREE.Color(0x444444);
        this.clicked_pion = "";
    }
    move_array = (obj, posx, posy) => {
        if (obj.color_id == 0 && this.clicked_pion && this.clicked_pion.name == "pion") {
            this.pionki[this.clicked_pion.posy][this.clicked_pion.posx] = 0;
            this.pionki[obj.posy][obj.posx] = ui.logged_user;
            this.pionki_obj[this.clicked_pion.posy][this.clicked_pion.posy] = 0;
            this.pionki_obj[obj.posy][obj.posx] = this.clicked_pion;
        }
        let data = JSON.stringify({
            clicked_pion_posx: this.clicked_pion.posx,
            clicked_pion_posy: this.clicked_pion.posy,
            dest_x: obj.position.x,
            dest_z: obj.position.z,
            dest_posx: obj.posx,
            dest_posy: obj.posy,
            gracz: ui.logged_user,
            plansza: this.pionki,
            zbityX: posx,
            zbityY: posy
        });
        return data;
    }
    possibilities = (obj) => {
        this.clicked_pion = obj;
        obj.material.color = new THREE.Color(0x96003A);
        if (ui.logged_user == 1) {
            if (this.szachownica_obj[obj.posy - 1]?.[obj.posx + 1]) {
                if (this.pionki_obj[obj.posy - 1]?.[obj.posx + 1] == 0)
                    this.szachownica_obj[obj.posy - 1][obj.posx + 1].material.color = new THREE.Color(0x8A0034);
                else if (this.pionki_obj[obj.posy - 1]?.[obj.posx + 1].typ == 2) {
                    if (this.szachownica_obj[obj.posy - 2]?.[obj.posx + 2] && this.pionki_obj[obj.posy - 2][obj.posx + 2] == 0)
                        this.szachownica_obj[obj.posy - 2][obj.posx + 2].material.color = new THREE.Color(0x8A0034);
                }
            }
            if (this.szachownica_obj[obj.posy - 1]?.[obj.posx - 1])
                if (this.pionki_obj[obj.posy - 1]?.[obj.posx - 1] == 0)
                    this.szachownica_obj[obj.posy - 1][obj.posx - 1].material.color = new THREE.Color(0x8A0034);
                else if (this.pionki_obj[obj.posy - 1]?.[obj.posx - 1].typ == 2) {
                    if (this.szachownica_obj[obj.posy - 2]?.[obj.posx - 2] && this.pionki_obj[obj.posy - 2][obj.posx - 2] == 0)
                        this.szachownica_obj[obj.posy - 2][obj.posx - 2].material.color = new THREE.Color(0x8A0034);
                }
        }
        else {
            if (this.szachownica_obj[obj.posy + 1]?.[obj.posx + 1])
                if (this.pionki_obj[obj.posy + 1]?.[obj.posx + 1] == 0)
                    this.szachownica_obj[obj.posy + 1][obj.posx + 1].material.color = new THREE.Color(0x8A0034);
                else if (this.pionki_obj[obj.posy + 1]?.[obj.posx + 1].typ == 1) {
                    if (this.szachownica_obj[obj.posy + 2]?.[obj.posx + 2] && this.pionki_obj[obj.posy + 2][obj.posx + 2] == 0)
                        this.szachownica_obj[obj.posy + 2][obj.posx + 2].material.color = new THREE.Color(0x8A0034);
                }
            if (this.szachownica_obj[obj.posy + 1]?.[obj.posx - 1])
                if (this.pionki_obj[obj.posy + 1]?.[obj.posx - 1] == 0)
                    this.szachownica_obj[obj.posy + 1][obj.posx - 1].material.color = new THREE.Color(0x8A0034);
                else if (this.pionki_obj[obj.posy + 1]?.[obj.posx - 1].typ == 1) {
                    if (this.szachownica_obj[obj.posy + 2]?.[obj.posx - 2] && this.pionki_obj[obj.posy + 2][obj.posx - 2] == 0)
                        this.szachownica_obj[obj.posy + 2][obj.posx - 2].material.color = new THREE.Color(0x8A0034);
                }
        }
    }
    odkoloruj = (obj) => {
        if (ui.logged_user == 1) {
            if (this.szachownica_obj[obj.posy - 1]?.[obj.posx + 1])
                this.szachownica_obj[obj.posy - 1][obj.posx + 1].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy - 1]?.[obj.posx - 1])
                this.szachownica_obj[obj.posy - 1][obj.posx - 1].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy - 2]?.[obj.posx + 2])
                this.szachownica_obj[obj.posy - 2][obj.posx + 2].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy - 2]?.[obj.posx - 2])
                this.szachownica_obj[obj.posy - 2][obj.posx - 2].material.color = new THREE.Color(0x555555);
        }
        else {
            if (this.szachownica_obj[obj.posy + 1]?.[obj.posx + 1])
                this.szachownica_obj[obj.posy + 1][obj.posx + 1].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy + 1]?.[obj.posx - 1])
                this.szachownica_obj[obj.posy + 1][obj.posx - 1].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy + 2]?.[obj.posx - 2])
                this.szachownica_obj[obj.posy + 2][obj.posx - 2].material.color = new THREE.Color(0x555555);
            if (this.szachownica_obj[obj.posy + 2]?.[obj.posx + 2])
                this.szachownica_obj[obj.posy + 2][obj.posx + 2].material.color = new THREE.Color(0x555555);
        }
    }
    lock_raycast = () => {
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0 });
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.rotateX(Math.PI / 2);
        if (ui.logged_user == 2) {
            this.plane.position.y = 900;
            this.plane.position.z = 900;
        }
        else {
            this.plane.position.y = 900;
            this.plane.position.z = -900;
        }
        this.scene.add(this.plane);
    }
    unlock_raycast = () => {
        this.scene.remove(this.plane);
    }
    moveChange = (data) => {
        this.unlock_raycast();
        let obj = this.pionki_obj[data.clicked_pion_posy][data.clicked_pion_posx];
        this.pionki_obj[data.clicked_pion_posy][data.clicked_pion_posx] = 0;
        this.pionki_obj[data.dest_posy][data.dest_posx] = obj;
        this.ruch(obj, data);
        this.pionki = data.plansza;
        this.updatePionkiObj();
        clearInterval(ui.interwal2);
        document.getElementById("wait_info").remove();
    }
    updatePionkiObj = () => {
        for (let y = 0; y < this.pionki.length; y++) {
            for (let x = 0; x < this.pionki[y].length; x++) {
                if (this.pionki_obj[y][x].typ != this.pionki[y][x]) {
                    if (this.pionki[y][x] == 0) {
                        this.pionki_obj[y][x] = 0;
                    }
                }
            }
        }
    }
    zbicie = (obj1) => {
        this.pionki_obj[obj1.posy][obj1.posx] = 0;
        this.pionki[obj1.posy][obj1.posx] = 0;
        this.scene.remove(obj1);
    }
    ruch = (obj, data) => {
        console.log(obj.position);
        console.log(TWEEN.Tween);
        new TWEEN.Tween(obj.position)
            .to({ x: data.dest_x, z: data.dest_z }, 2000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
    }
    ruch1 = (obj, data) => {
        console.log(obj.position);
        console.log(TWEEN.Tween);
        new TWEEN.Tween(obj.position)
            .to({ x: data.position.x, z: data.position.z }, 2000)
            .easing(TWEEN.Easing.Cubic.Out)
            .start()
    }
}