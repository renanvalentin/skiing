let renderer
  , angularSpeed = 0.2
  , lastTime = 0
  , geometry
  , plane
  , points = new Map();


let Terrain = {
  setup(matrix) {
    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xbfd1e5);
    document.body.appendChild(renderer.domElement);

// camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = -450;
    camera.position.z = 400;
    camera.rotation.x = 45 * (Math.PI / 180);

// scene
    var scene = new THREE.Scene();

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);

// plane geometry

    geometry = new THREE.PlaneGeometry(400, 400, 3, 3);

    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
      //  console.log(matrix[Math.floor(i / 4)][i%4]);
      geometry.vertices[i].z = 2 * matrix[Math.floor(i / 4)][i % 4];

      //  material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
      //geometry.faces[ faceIndex ].vertexColors[ vertexIndex ].setHSL( Math.random(), 0.5, 0.5 );

    }

    var faceIndices = ['a', 'b', 'c', 'd'];
    var radius = 200;


//    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
//    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    var map = new Map();

//    for (var i = 0; i < geometry.faces.length; i++) {
//      var face = geometry.faces[i];
//
//      var n = ( face instanceof THREE.Face3 ) ? 3 : 4;
//
//      for (var j = 0; j < n; j++) {
//        var vertexIndex = face[faceIndices[j]];
//
//        var p = geometry.vertices[vertexIndex];
//        // console.log(vertexIndex);
//        var color = new THREE.Color(0xffffff);
////            color.setHSL(0.125 * vertexIndex / geometry.vertices.length, 1.0, 0.5);
//
//        var value = 0;
//        var found = selected.some(function (list) {
//          if (list[0] == Math.floor(vertexIndex / 4) && list[1] == vertexIndex % 4) {
//            value = matrix[list[0]][list[1]];
//
//            return true;
//          }
//
//          return false;
//        });
//
//        if (found) {
//          //var value = selected[Math.floor(vertexIndex / 4)][vertexIndex % 4];
////                color = new THREE.Color( 0xffffff );
//          //color = new THREE.Color( 0xffffff );
//          color.setHSL(0.125 * vertexIndex / geometry.vertices.length, 1.0, 0.5);
//
//
//          map.set(p.z, p);
//
//
//        } else {
//          //              color = new THREE.Color(0xffffff);
//          var value = matrix[Math.floor(vertexIndex / 4)][vertexIndex % 4];
//          //   color.setHSL(0.125 * vertexIndex / geometry.vertices.length, value / 9, 0);
//
//          color.setHSL(0.0, ( p.y / radius + 1 ) / 2, 0.2);
//
//        }
//
//
//        face.vertexColors[j] = color;
//
//
//      }
//    }


    var materials = [
      new THREE.MeshLambertMaterial({color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors}),
      new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true})
    ];


// plane
//    plane = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
//
//
//    var points = {};
//
//    map.forEach(function (data, key) {
//      points[key] = data;
//    });
//
//    var points = Object.keys(points).sort(function (a, b) {
//      return a - b;
//    }).map(function (a) {
//      return points[a];
//    });
//
//
//    console.log(points);
//
//    var lineGeometry = new THREE.Geometry();
//
//    Object.keys(points).forEach(function (a) {
//      lineGeometry.vertices.push(new THREE.Vector3(points[a].x, points[a].y, points[a].z + 10));
//    });
//
//
//    var line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
//      color: 0x0000ff,
//      linewidth: 5
//    }));
//
//
//    plane.add(line);


// plane.overdraw = true;
    scene.add(plane);

  },

  drawLines() {

  },

  animate() {
    var time = (new Date()).getTime();
    var timeDiff = time - lastTime;
    var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 10000;
    plane.rotation.z += angleChange;
    lastTime = time;

    renderer.render(scene, camera);

    requestAnimationFrame(function () {
      Terrain.animate();
    });
  }
};


//  scene.add(line);


// plane.rotation.z = -150;
// start animation

