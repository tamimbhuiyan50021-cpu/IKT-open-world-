export function createCityNPCs(scene, count = 22) {
  const npcs = [];
  const shirtColors = [0x38bdf8, 0xf97316, 0xa855f7, 0x22c55e, 0xeab308];

  for (let i = 0; i < count; i++) {
    const npc = new THREE.Group();
    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.35),
      new THREE.MeshStandardMaterial({ color: shirtColors[i % shirtColors.length], roughness: 0.6 })
    );
    torso.position.y = 1.25;
    torso.castShadow = true;
    npc.add(torso);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.34, 0.34),
      new THREE.MeshStandardMaterial({ color: 0xfdba74 })
    );
    head.position.y = 1.85;
    npc.add(head);

    const x = (Math.floor(Math.random() * 8) - 4) * 50;
    const z = (Math.floor(Math.random() * 8) - 4) * 50 + 12;
    npc.position.set(x, 0, z);
    npc.userData = {
      alive: true,
      speed: 0.04 + Math.random() * 0.04,
      dir: Math.random() * Math.PI * 2,
      timer: 60 + Math.floor(Math.random() * 120)
    };

    scene.add(npc);
    npcs.push(npc);
  }
  return npcs;
}
