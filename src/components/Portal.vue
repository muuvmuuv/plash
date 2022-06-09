<script setup>
import { onMounted, ref } from "vue"
import * as THREE from "three"

const portal = ref()

const property = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
})

var camera, scene, renderer

var cubes_count = 64
var cubes_repeat = 4
var cubes_size = 50
var cubes_noise = 100
var cubes = []

function init() {
  camera = new THREE.PerspectiveCamera(75, property.width / property.height, 1, 10000)
  camera.position.set(-700, 0, 500)
  camera.rotation.set(0, -0.78, 0)

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xffffff, 500, 1300)
  scene.fog.color.setHSL(0.6, 0, 1)

  var light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0, 0, 1)
  scene.add(light)

  initScene()

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setClearColor(0xffffff, 0)
  renderer.setSize(property.width * 0.9, property.height * 0.9)

  portal.value.appendChild(renderer.domElement)

  window.addEventListener("resize", onWindowResize, false)
}

function onWindowResize() {
  camera.aspect = property.width / property.height
  camera.updateProjectionMatrix()
  renderer.setSize(property.width * 0.9, property.height * 0.9)
}

function initScene() {
  for (var r = 0; r < cubes_repeat; r++)
    for (var i = 0; i < cubes_count; i++) {
      var geometry = new THREE.BoxGeometry(cubes_size, cubes_size, cubes_size)
      var material = new THREE.MeshLambertMaterial({ color: 0x385d8c })
      var mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.random() * 360
      mesh.rotation.y = Math.random() * 360
      scene.add(mesh)

      var angle = (360 / cubes_count) * i
      var radius = 500 + Math.random() * cubes_noise - cubes_noise / 2

      cubes.push({
        mesh: mesh,
        angle: angle,
        radius: radius,
        speed: Math.random() * 1 + 0.5,
      })
    }
}

function animate() {
  requestAnimationFrame(animate)

  var size = cubes.length
  for (var i = 0; i < size; i++) {
    cubes[i].angle += cubes[i].speed

    cubes[i].mesh.position.x =
      cubes[i].radius * Math.cos((cubes[i].angle * Math.PI) / 180)
    cubes[i].mesh.position.y =
      cubes[i].radius * Math.sin((cubes[i].angle * Math.PI) / 180)
    cubes[i].mesh.rotation.x += 0.01
    cubes[i].mesh.rotation.y += 0.01
  }

  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})
</script>

<template>
  <div ref="portal"></div>
</template>
