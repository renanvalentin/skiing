/*eslint-disable */

var Terrain = function (matrix, path, rowStart, colStart, normalize) {

  var width = window.innerWidth,
    height = window.innerHeight;

  var scene = new THREE.Scene();

  //var axes = new THREE.AxisHelper(200);
  //scene.add(axes);

  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, -50, 50);

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xebebeb);
  renderer.setSize(width, height);

  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);


  var geometry = new THREE.PlaneGeometry(300, 300, matrix.length - 1, matrix.length - 1);

  for (var i = 0, l = geometry.vertices.length; i < l; i++) {
    var row = Math.floor(i / matrix.length);
    geometry.vertices[i].z = normalizeHeight(matrix[row][Math.floor(i % matrix[row].length)], normalize);
  }

  var map = new Map();
  var faceIndices = ['a', 'b', 'c', 'd'];
  var radius = 200;

  for (var i = 0; i < geometry.faces.length; i++) {
    var face = geometry.faces[i];

    var n = ( face instanceof THREE.Face3 ) ? 3 : 4;

    for (var j = 0; j < n; j++) {
      var vertexIndex = face[faceIndices[j]];

      var p = geometry.vertices[vertexIndex];
      var color = new THREE.Color(0xffffff);

      var value = 0;
      var found = path.some(function (item) {
        if (normalizeHeight(matrix[item[0] - rowStart][item[1] - colStart], normalize) == p.z) {
          return true;
        }

        return false;
      });

      if (found) {
        color.setHSL(0.200 * vertexIndex / geometry.vertices.length, 1.0, 0.5);

        map.set(p.z, p);
      } else {
        color.setHSL(0.0, ( p.y / radius + 1 ) / 2, 0.2);
      }

      face.vertexColors[j] = color;
    }
  }

  //    var material = new THREE.MeshPhongMaterial({
  //        color: 0xdddddd,
  //        wireframe: true
  //    });

  var materials = [

    new THREE.MeshLambertMaterial({color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors}),
    new THREE.MeshBasicMaterial({color: 0x000000, shading: THREE.FlatShading, wireframe: true, transparent: true})

  ];

  // var plane = new THREE.Mesh(geometry, material);
  var plane = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);


  var points = {};

  map.forEach(function (data, key) {
    points[key] = data;
  });

  var points = Object.keys(points).sort(function (a, b) {
    return a - b;
  }).map(function (a) {
    return points[a];
  });


  console.log(points);

  var lineGeometry = new THREE.Geometry();

  Object.keys(points).forEach(function (a) {
    lineGeometry.vertices.push(new THREE.Vector3(points[a].x, points[a].y, points[a].z + 20));
  });


  var line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
    color: 0x00ff00,
    linewidth: 5
  }));


  plane.add(line);


  scene.add(plane);


  var controls = new THREE.TrackballControls(camera);

  document.getElementById('webgl').appendChild(renderer.domElement);

  render();

  function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function normalizeHeight(value, normalize) {
    if(!normalize) {
      return value * 15;
    }

    var result = Math.round(value / 65535 * 2470);

    return result > 0 ? result : value;
  }
};

module.exports = Terrain;

/*eslint-enable */
