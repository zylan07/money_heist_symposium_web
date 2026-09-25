import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { MISSIONS_DATA, TICKET9_URL } from '../../data/events';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gfgLogo from '../../assets/geeksforgeeks.png';

export default function MissionIntelVault({ missionId, onClose }) {
  const canvasRef = useRef(null);
  const [hudText, setHudText] = useState('[STANDBY] INITIALIZING VAULT PROTOCOL...');
  const [boardVisible, setBoardVisible] = useState(false);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const mission = missionId ? MISSIONS_DATA[missionId] : null;
  const prefersReducedMotion = useReducedMotion();

  const [vaultState, setVaultState] = useState('OPENING_VAULT');
  const [backdropActive, setBackdropActive] = useState(false);
  const vaultStateRef = useRef('OPENING_VAULT');
  const closingAnimRef = useRef({ active: false, startTime: 0, duration: 3400 });
  const handleCloseRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setBackdropActive(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    if (vaultStateRef.current !== 'BRIEFING_ROOM') return;
    vaultStateRef.current = 'EXITING_ROOM';
    setVaultState('EXITING_ROOM');
    setBoardVisible(false);
    closingAnimRef.current = {
      active: true,
      startTime: performance.now(),
      duration: prefersReducedMotion ? 600 : 3400
    };
  };

  handleCloseRef.current = handleClose;

  useEffect(() => {
    if (!missionId) return;

    // Lock background webpage scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Key listener for ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && handleCloseRef.current) {
        handleCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Graceful WebGL context loss handling
    const handleContextLost = (event) => {
      event.preventDefault();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    // Reset state for new opening sequence
    vaultStateRef.current = 'OPENING_VAULT';
    setVaultState('OPENING_VAULT');
    closingAnimRef.current = { active: false, startTime: 0, duration: prefersReducedMotion ? 600 : 3400 };

    // ----------------------------------------------------
    // THREE.JS SCENE SETUP
    // ----------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.035);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear color
    renderer.setClearColor(0x060608, 1);

    // ----------------------------------------------------
    // REALISTIC INDUSTRIAL LIGHTING
    // ----------------------------------------------------
    const ambLight = new THREE.AmbientLight(0x181920, 1.8);
    scene.add(ambLight);

    // Overhead Cool Directional Key Light (industrial floodlight)
    const frontKeyLight = new THREE.DirectionalLight(0xe8eef5, 2.6);
    frontKeyLight.position.set(2, 5, 13);
    scene.add(frontKeyLight);

    // Subtle Fill Light from opposite angle to reveal dark steel bevels
    const fillLight = new THREE.DirectionalLight(0x222630, 1.4);
    fillLight.position.set(-4, -2, 10);
    scene.add(fillLight);

    // Restrained Tactical Red Beacon Light — mounted above doorway to cast glancing specular highlights
    const redAccentLight = new THREE.PointLight(0xff222a, 2.2, 14);
    redAccentLight.position.set(0, 4.2, 3.5);
    scene.add(redAccentLight);

    // Subterranean Bunker Warm Tungsten Interior Light
    const bunkerLamp = new THREE.PointLight(0xffa055, 3.0, 32);
    bunkerLamp.position.set(0, 4.0, -7);
    scene.add(bunkerLamp);

    // Spotlight focusing on the Corkboard at the back of the bunker
    const boardSpotlight = new THREE.SpotLight(0xff4433, 4.5, 28, Math.PI / 3.4, 0.35);
    boardSpotlight.position.set(0, 5, -12);
    scene.add(boardSpotlight);

    // ----------------------------------------------------
    // 1. HEAVY INDUSTRIAL BLAST VAULT DOOR ASSEMBLY
    // ----------------------------------------------------
    const vaultGroup = new THREE.Group();
    scene.add(vaultGroup);

    // Physically Authentic Industrial Steel Materials (Dark Gunmetal & Hardened Steel)
    const structuralFrameMat = new THREE.MeshStandardMaterial({
      color: 0x18191d,
      roughness: 0.52,
      metalness: 0.86
    });

    const blastDoorFaceMat = new THREE.MeshStandardMaterial({
      color: 0x22242b,
      roughness: 0.38,
      metalness: 0.90
    });

    const machinedBevelMat = new THREE.MeshStandardMaterial({
      color: 0x383b45,
      roughness: 0.24,
      metalness: 0.95
    });

    const hardenedBoltMat = new THREE.MeshStandardMaterial({
      color: 0x545864,
      roughness: 0.18,
      metalness: 0.96
    });

    const castSteelWheelMat = new THREE.MeshStandardMaterial({
      color: 0x262830,
      roughness: 0.34,
      metalness: 0.92
    });

    const knurledGripMat = new THREE.MeshStandardMaterial({
      color: 0x16171c,
      roughness: 0.50,
      metalness: 0.88
    });

    const hexNutMat = new THREE.MeshStandardMaterial({
      color: 0x2e3038,
      roughness: 0.30,
      metalness: 0.92
    });

    // Massive Outer Structural Steel Casing
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.52, 28, 64), structuralFrameMat);
    vaultGroup.add(outerRing);

    // 24 Heavy Industrial Hex Flange Bolts around Outer Rim
    for (let r = 0; r < 24; r++) {
      const hexBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.22, 6), hexNutMat);
      const ang = (r * Math.PI) / 12;
      hexBolt.position.set(Math.cos(ang) * 3.95, Math.sin(ang) * 3.95, 0.28);
      hexBolt.rotation.x = Math.PI / 2;
      vaultGroup.add(hexBolt);
    }

    // Cylindrical Blast Door Frame & Stepped Jamb Housing
    const doorFrame = new THREE.Mesh(
      new THREE.CylinderGeometry(4.3, 4.3, 2.0, 48, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x131418, roughness: 0.65, metalness: 0.75, side: THREE.DoubleSide })
    );
    doorFrame.rotation.x = Math.PI / 2;
    vaultGroup.add(doorFrame);

    // Dual Forged Steel Hinge Mounting Blocks on the Wall
    for (let h of [-2.4, 2.4]) {
      const hingeWallBlock = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 1.1), structuralFrameMat);
      hingeWallBlock.position.set(-3.7, h, 0.2);
      vaultGroup.add(hingeWallBlock);

      const hingePin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.5, 20), hardenedBoltMat);
      hingePin.position.set(-3.65, h, 0.2);
      vaultGroup.add(hingePin);
    }

    // Vault Door Pivot (Left Hinge Axis at x = -3.65)
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-3.65, 0, 0);
    vaultGroup.add(doorPivot);

    // Vault Door Body Group
    const doorGroup = new THREE.Group();
    doorGroup.position.set(3.65, 0, 0);
    doorPivot.add(doorGroup);

    // Multi-Tier Heavy Stepped Circular Blast Door
    // Layer 1: Rear stepped jamb seal tongue
    const doorRearSeal = new THREE.Mesh(new THREE.CylinderGeometry(3.52, 3.52, 0.35, 64), structuralFrameMat);
    doorRearSeal.rotation.x = Math.PI / 2;
    doorRearSeal.position.z = -0.15;
    doorGroup.add(doorRearSeal);

    // Layer 2: Main Heavy Blast Armor Plate Body
    const doorMainPlate = new THREE.Mesh(new THREE.CylinderGeometry(3.68, 3.68, 0.45, 64), blastDoorFaceMat);
    doorMainPlate.rotation.x = Math.PI / 2;
    doorMainPlate.position.z = 0.12;
    doorGroup.add(doorMainPlate);

    // Layer 3: Front Beveled Armored Face Ring
    const frontBevelRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 16, 64),
      machinedBevelMat
    );
    frontBevelRing.position.z = 0.36;
    doorGroup.add(frontBevelRing);

    // Layer 4: Concentric Secondary Machined Ring
    const midConcentricRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.06, 16, 64),
      machinedBevelMat
    );
    midConcentricRing.position.z = 0.36;
    doorGroup.add(midConcentricRing);

    // Layer 5: Central Circular Lock Mechanism Housing
    const lockHousing = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.26, 48), structuralFrameMat);
    lockHousing.rotation.x = Math.PI / 2;
    lockHousing.position.z = 0.38;
    doorGroup.add(lockHousing);

    // Raised Machined Bevel Ring on Lock Housing
    const lockBevelRing = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.06, 16, 48), machinedBevelMat);
    lockBevelRing.position.z = 0.50;
    doorGroup.add(lockBevelRing);

    // 12 Perimeter Bolts on Central Lock Housing
    for (let b = 0; b < 12; b++) {
      const lockBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.14, 6), hexNutMat);
      const ang = (b * Math.PI) / 6;
      lockBolt.position.set(Math.cos(ang) * 1.45, Math.sin(ang) * 1.45, 0.52);
      lockBolt.rotation.x = Math.PI / 2;
      doorGroup.add(lockBolt);
    }

    // ----------------------------------------------------
    // REALISTIC HEAVY INDUSTRIAL STEEL WHEEL HANDLE
    // ----------------------------------------------------
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(0, 0, 0.55);
    doorGroup.add(wheelGroup);

    // Central Steel Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.38, 36), castSteelWheelMat);
    hub.rotation.x = Math.PI / 2;
    wheelGroup.add(hub);

    // Machined Center Cap on Hub
    const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 32), machinedBevelMat);
    hubCap.rotation.x = Math.PI / 2;
    hubCap.position.z = 0.22;
    wheelGroup.add(hubCap);

    // 6 Hex Bolts on Central Hub Face
    for (let hb = 0; hb < 6; hb++) {
      const hBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.10, 6), hexNutMat);
      const ang = (hb * Math.PI) / 3;
      hBolt.position.set(Math.cos(ang) * 0.32, Math.sin(ang) * 0.32, 0.28);
      hBolt.rotation.x = Math.PI / 2;
      wheelGroup.add(hBolt);
    }

    // 4 Solid Machined Steel Spokes with Counter-Weighted Knurled Grips
    for (let i = 0; i < 4; i++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.10, 3.3, 20), castSteelWheelMat);
      spoke.rotation.z = (i * Math.PI) / 4;
      wheelGroup.add(spoke);

      // Knurled Steel Cylindrical Grips on Outer Ends
      const grip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 20), knurledGripMat);
      grip1.position.set(Math.cos((i * Math.PI) / 4) * 1.55, Math.sin((i * Math.PI) / 4) * 1.55, 0);
      grip1.rotation.z = (i * Math.PI) / 4;
      wheelGroup.add(grip1);

      const gripEnd1 = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 16), machinedBevelMat);
      gripEnd1.position.set(Math.cos((i * Math.PI) / 4) * 1.82, Math.sin((i * Math.PI) / 4) * 1.82, 0);
      wheelGroup.add(gripEnd1);

      const grip2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 20), knurledGripMat);
      grip2.position.set(-Math.cos((i * Math.PI) / 4) * 1.55, -Math.sin((i * Math.PI) / 4) * 1.55, 0);
      grip2.rotation.z = (i * Math.PI) / 4;
      wheelGroup.add(grip2);

      const gripEnd2 = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 16), machinedBevelMat);
      gripEnd2.position.set(-Math.cos((i * Math.PI) / 4) * 1.82, -Math.sin((i * Math.PI) / 4) * 1.82, 0);
      wheelGroup.add(gripEnd2);
    }

    // ----------------------------------------------------
    // 8 HEAVY POLISHED STEEL LOCKING RODS (BOLTS) & GUIDE SLEEVES
    // ----------------------------------------------------
    const bolts = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;

      // Heavy Reinforcement Guide Sleeve on the Door Perimeter
      const guideSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.6), structuralFrameMat);
      guideSleeve.position.set(Math.cos(angle) * 2.85, Math.sin(angle) * 2.85, 0.18);
      guideSleeve.rotation.z = angle;
      doorGroup.add(guideSleeve);

      // Solid Tool Steel Cylindrical Locking Rod
      const boltMesh = new THREE.Group();
      const boltRod = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 1.25, 24), hardenedBoltMat);
      boltRod.rotation.z = Math.PI / 2;
      boltMesh.add(boltRod);

      // Hardened Rounded Tip on Bolt
      const boltTip = new THREE.Mesh(new THREE.SphereGeometry(0.168, 18, 18), machinedBevelMat);
      boltTip.position.x = 0.62;
      boltMesh.add(boltTip);

      boltMesh.position.set(Math.cos(angle) * 3.15, Math.sin(angle) * 3.15, 0.18);
      boltMesh.rotation.z = angle;
      doorGroup.add(boltMesh);

      bolts.push({ mesh: boltMesh, angle, baseDist: 3.15 });
    }

    // ----------------------------------------------------
    // 2. SUBTERRANEAN BUNKER & BRIEFING ROOM (at z = -12)
    // ----------------------------------------------------
    const briefingRoom = new THREE.Group();
    briefingRoom.position.set(0, 0, -12);
    scene.add(briefingRoom);

    // Bunker Enclosure Walls
    const roomGeo = new THREE.BoxGeometry(26, 13, 30);
    const roomMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0f,
      roughness: 0.85,
      metalness: 0.2,
      side: THREE.BackSide
    });
    const roomMesh = new THREE.Mesh(roomGeo, roomMat);
    briefingRoom.add(roomMesh);

    // Heavy Concrete Overhead Ceiling Beams
    for (let b = -12; b <= 12; b += 5) {
      const beamGeo = new THREE.BoxGeometry(25.8, 0.75, 0.6);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x18171f, metalness: 0.6, roughness: 0.5 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 6.1, b);
      briefingRoom.add(beam);
    }

    // Tactical Command Table in center
    const tableGeo = new THREE.BoxGeometry(8.5, 0.45, 4.5);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x141318, roughness: 0.55, metalness: 0.7 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -3.4, 0);
    briefingRoom.add(table);

    // Supply Crates
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x221f1c, roughness: 0.8 });
    const crate1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.9, 2.3), crateMat);
    crate1.position.set(-7.5, -3.3, -3);
    briefingRoom.add(crate1);

    const crate2 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.6, 2.0), crateMat);
    crate2.position.set(7.5, -3.4, -4);
    briefingRoom.add(crate2);

    // Physical Corkboard Mesh mounted on the back bunker wall (z = -13.8)
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, 0.8, -13.8);
    briefingRoom.add(boardGroup);

    const boardFrameGeo = new THREE.BoxGeometry(17, 9.8, 0.3);
    const boardFrameMat = new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 0.7, metalness: 0.3 });
    const boardBack = new THREE.Mesh(boardFrameGeo, boardFrameMat);
    boardGroup.add(boardBack);

    const corkGeo = new THREE.PlaneGeometry(16.3, 9.1);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0x221c17, roughness: 0.95 });
    const corkMesh = new THREE.Mesh(corkGeo, corkMat);
    corkMesh.position.z = 0.16;
    boardGroup.add(corkMesh);

    boardSpotlight.target = boardGroup;

    // ----------------------------------------------------
    // ATMOSPHERIC DUST FIELD IN BUNKER & VAULT THRESHOLD
    // ----------------------------------------------------
    const DUST_COUNT = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustVelocities = [];

    for (let d = 0; d < DUST_COUNT; d++) {
      dustPositions[d * 3] = (Math.random() - 0.5) * 18;
      dustPositions[d * 3 + 1] = (Math.random() - 0.5) * 9 + 0.5;
      dustPositions[d * 3 + 2] = (Math.random() - 0.5) * 26 - 4;

      dustVelocities.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.005 - 0.002,
        vz: (Math.random() - 0.5) * 0.006,
        baseY: dustPositions[d * 3 + 1]
      });
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xead9c8,
      size: 0.11,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ----------------------------------------------------
    // 3. STATE MACHINE TRANSITION ENGINE (OPEN & CLOSE)
    // ----------------------------------------------------
    const OPEN_DURATION = prefersReducedMotion ? 600 : 3600;
    let animStart = performance.now();
    let animId = null;
    let isMounted = true;

    function runLoop(timestamp) {
      if (!isMounted) return;

      // Animate atmospheric dust motes with physical drift & door turbulence
      const posAttr = dustGeo.attributes.position;
      const isDoorMoving = Math.abs(doorPivot.rotation.y) > 0.05;
      for (let d = 0; d < DUST_COUNT; d++) {
        const v = dustVelocities[d];
        let px = posAttr.getX(d) + v.vx;
        let py = posAttr.getY(d) + v.vy;
        let pz = posAttr.getZ(d) + v.vz;

        // If door is moving, add localized swirl turbulence near threshold (z ~ 0)
        if (isDoorMoving && Math.abs(pz) < 4) {
          px += Math.sin(timestamp * 0.003 + d) * 0.015;
          py += Math.cos(timestamp * 0.003 + d) * 0.012;
        }

        // Boundary wrap
        if (px < -10) px = 10;
        if (px > 10) px = -10;
        if (py < -4) py = 5;
        if (py > 5) py = -4;
        if (pz < -17) pz = 8;
        if (pz > 8) pz = -17;

        posAttr.setXYZ(d, px, py, pz);
      }
      posAttr.needsUpdate = true;

      // ==========================================
      // BRANCH A: CLOSING / EXIT SEQUENCE
      // ==========================================
      if (closingAnimRef.current.active) {
        const closeDuration = closingAnimRef.current.duration;
        const cp = Math.min((timestamp - closingAnimRef.current.startTime) / closeDuration, 1);
        setPhaseProgress(1 - cp);

        // 1. Camera pulls backward away from briefing board through bunker and exits doorway (0.00 to 0.52)
        const exitT = Math.min(1, cp / 0.50);
        const easeExit = exitT < 0.5 ? 2 * exitT * exitT : 1 - Math.pow(-2 * exitT + 2, 2) / 2;

        const startZ = -14.2;
        const endZ = 11;
        camera.position.z = startZ + easeExit * (endZ - startZ);

        // Reverse footstep bob & sway that gently settles outside
        const bobFrequency = (1 - exitT) * Math.PI * 8;
        const bobIntensity = Math.sin(exitT * Math.PI) * 0.12;
        camera.position.y = Math.sin(bobFrequency) * bobIntensity + (1 - easeExit) * -0.2;
        camera.position.x = Math.cos(bobFrequency * 0.5) * (bobIntensity * 0.5);

        if (cp < 0.50) {
          if (vaultStateRef.current !== 'EXITING_ROOM') {
            vaultStateRef.current = 'EXITING_ROOM';
            setVaultState('EXITING_ROOM');
          }
          if (exitT < 0.5) {
            setHudText('[EXIT PROTOCOL 1/3] PULLING BACK THROUGH SUBTERRANEAN BUNKER...');
          } else {
            setHudText('[EXIT PROTOCOL 2/3] PASSING OUTWARD THROUGH VAULT DOORWAY...');
          }
          // Door remains open while camera is exiting
          doorPivot.rotation.y = -Math.PI * 0.72;
          // Bolts remain retracted
          bolts.forEach((b) => {
            const curDist = b.baseDist - 0.62;
            b.mesh.position.x = Math.cos(b.angle) * curDist;
            b.mesh.position.y = Math.sin(b.angle) * curDist;
          });
          // Wheel remains rotated
          wheelGroup.rotation.z = Math.PI * 4.0;
        } else {
          // ==========================================
          // 2. Vault Door swings CLOSED (0.50 to 0.76)
          // ==========================================
          if (vaultStateRef.current !== 'CLOSING_VAULT') {
            vaultStateRef.current = 'CLOSING_VAULT';
            setVaultState('CLOSING_VAULT');
          }

          const doorCloseT = Math.min(1, Math.max(0, (cp - 0.50) / 0.26));
          const easeDoor = 1 - Math.pow(1 - doorCloseT, 3);
          doorPivot.rotation.y = -(1 - easeDoor) * (Math.PI * 0.72);

          // ==========================================
          // 3. 8 Locking Bolts return into position (0.70 to 0.88)
          // ==========================================
          if (cp >= 0.70) {
            const boltExtendT = Math.min(1, Math.max(0, (cp - 0.70) / 0.18));
            const boltRetractAmount = (1 - boltExtendT) * 0.62;
            bolts.forEach((b) => {
              const curDist = b.baseDist - boltRetractAmount;
              b.mesh.position.x = Math.cos(b.angle) * curDist;
              b.mesh.position.y = Math.sin(b.angle) * curDist;
            });
          } else {
            bolts.forEach((b) => {
              const curDist = b.baseDist - 0.62;
              b.mesh.position.x = Math.cos(b.angle) * curDist;
              b.mesh.position.y = Math.sin(b.angle) * curDist;
            });
          }

          // ==========================================
          // 4. Crimson 4-Spoke Wheel rotates back to lock (0.82 to 1.00)
          // ==========================================
          if (cp >= 0.82) {
            const wheelLockT = Math.min(1, Math.max(0, (cp - 0.82) / 0.18));
            wheelGroup.rotation.z = (1 - wheelLockT) * Math.PI * 4.0;
            setHudText('[VAULT RESEALED] 8 BOLTS LOCKED // WHEEL ENGAGED // LOCKDOWN COMPLETE.');
          } else {
            wheelGroup.rotation.z = Math.PI * 4.0;
            if (cp < 0.70) {
              setHudText('[EXIT PROTOCOL 3/3] VAULT DOOR SWINGING CLOSED...');
            } else {
              setHudText('[EXIT PROTOCOL 3/3] EXTENDING 8 RADIAL LOCKING BOLTS...');
            }
          }
        }

        // ==========================================
        // 5. Completion -> IDLE & Unmount
        // ==========================================
        if (cp >= 1) {
          closingAnimRef.current.active = false;
          vaultStateRef.current = 'IDLE';
          setVaultState('IDLE');
          document.body.style.overflow = prevOverflow;
          onClose();
          return;
        }
      } else {
        // ==========================================
        // BRANCH B: OPENING / ENTERING SEQUENCE
        // ==========================================
        const rawProgress = Math.min((timestamp - animStart) / OPEN_DURATION, 1);
        setPhaseProgress(rawProgress);

        // Phase 1: Wheel Rotates (0.00 to 0.28)
        const wheelT = Math.min(1, Math.max(0, (rawProgress - 0.05) / 0.25));
        wheelGroup.rotation.z = wheelT * Math.PI * 4.0; // 2 full turns

        // Phase 2: Bolts Retract Radially (0.15 to 0.32)
        const boltT = Math.min(1, Math.max(0, (rawProgress - 0.15) / 0.18));
        bolts.forEach((b) => {
          const curDist = b.baseDist - boltT * 0.62;
          b.mesh.position.x = Math.cos(b.angle) * curDist;
          b.mesh.position.y = Math.sin(b.angle) * curDist;
        });

        // Phase 3: Vault Door Swings Open on Hinge (0.28 to 0.54)
        const swingT = Math.min(1, Math.max(0, (rawProgress - 0.28) / 0.26));
        const easeSwing = 1 - Math.pow(1 - swingT, 3);
        doorPivot.rotation.y = -easeSwing * (Math.PI * 0.72); // ~130 degrees open

        // Phase 4: Camera Walks Forward Through Doorway into Bunker (0.44 to 1.0)
        const walkT = Math.min(1, Math.max(0, (rawProgress - 0.44) / 0.56));
        const easeWalk = walkT < 0.5 ? 2 * walkT * walkT : 1 - Math.pow(-2 * walkT + 2, 2) / 2;

        // Footsteps Bob & Sway
        const bobFrequency = walkT * Math.PI * 8;
        const bobIntensity = Math.sin(walkT * Math.PI) * 0.14;
        const cameraBobY = Math.sin(bobFrequency) * bobIntensity;
        const cameraSwayX = Math.cos(bobFrequency * 0.5) * (bobIntensity * 0.5);

        const startZ = 11;
        const endZ = -14.2; // camera arrives right in front of the corkboard
        camera.position.z = startZ - easeWalk * (startZ - endZ);
        camera.position.y = cameraBobY + easeWalk * -0.2;
        camera.position.x = cameraSwayX;

        // Dynamic State Machine & Status Telemetry
        if (rawProgress < 0.44) {
          if (vaultStateRef.current !== 'OPENING_VAULT') {
            vaultStateRef.current = 'OPENING_VAULT';
            setVaultState('OPENING_VAULT');
          }
          if (rawProgress < 0.25) {
            setHudText('[PHASE 1/4] AUTHORIZING // 4-SPOKE WHEEL ROTATING & 8 BOLTS RETRACTING...');
          } else {
            setHudText('[PHASE 2/4] VAULT THRESHOLD UNLOCKED // DOOR SWINGING OPEN...');
          }
        } else if (rawProgress < 1.0) {
          if (vaultStateRef.current !== 'ENTERING_ROOM') {
            vaultStateRef.current = 'ENTERING_ROOM';
            setVaultState('ENTERING_ROOM');
          }
          if (rawProgress < 0.72) {
            setHudText('[PHASE 3/4] ENTERING BUNKER // PASSING THROUGH VAULT DOORWAY...');
          } else {
            setHudText('[PHASE 4/4] APPROACHING BRIEFING BOARD // CALIBRATING DOSSIER...');
          }
        } else {
          if (vaultStateRef.current !== 'BRIEFING_ROOM') {
            vaultStateRef.current = 'BRIEFING_ROOM';
            setVaultState('BRIEFING_ROOM');
            setBoardVisible(true);
            setHudText('[BRIEFING READY] MISSION INTEL UNLOCKED // DOSSIER ACTIVE.');
          }
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(runLoop);
    }

    animId = requestAnimationFrame(runLoop);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      canvas.removeEventListener('webglcontextlost', handleContextLost, false);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;

      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [missionId, prefersReducedMotion]);

  if (!missionId || !mission) return null;

  return (
    <div
      id="intel-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-[opacity,backdrop-filter] duration-[600ms]"
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: prefersReducedMotion ? 'none' : (backdropActive ? 'blur(8px)' : 'blur(0px)'),
        WebkitBackdropFilter: prefersReducedMotion ? 'none' : (backdropActive ? 'blur(8px)' : 'blur(0px)'),
      }}
    >
      {/* Volumetric Red Ambient Flare behind Vault */}
      <div
        id="vault-ambient-glow"
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,rgba(255,30,39,0.32)_0%,rgba(14,14,18,0.95)_70%)]"
      />

      {/* Three.js 3D Vault & Subterranean Briefing Room Canvas */}
      <div id="vault-stage-container" className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <canvas ref={canvasRef} id="vault-canvas" className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Tactical HUD Status Strip (Desktop & Tablet) */}
      <div
        id="vault-hud-status"
        className="hidden sm:flex absolute top-6 left-6 z-30 pointer-events-none font-code-md text-xs uppercase tracking-[0.25em] text-[#ff544b] items-center gap-3 transition-all duration-300 bg-black/60 px-3.5 py-1.5 border border-[#ff1e27]/30 rounded backdrop-blur-sm"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff1e27] animate-ping" />
        <span id="vault-hud-text">{hudText}</span>
      </div>

      {/* Top Right Exit Button */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-30 flex items-center gap-3">
        <button
          onClick={handleClose}
          id="modal-close-btn"
          disabled={vaultState !== 'BRIEFING_ROOM'}
          className={`group flex items-center gap-2 px-4 py-2 bg-[#121217]/90 border border-[#44383c] hover:border-[#ff1e27] hover:bg-[#ff1e27]/20 text-[#c8c5ca] hover:text-white rounded transition-all font-code-md text-xs uppercase tracking-[0.18em] shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer ${
            vaultState !== 'BRIEFING_ROOM' ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
          }`}
        >
          {vaultState === 'EXITING_ROOM' || vaultState === 'CLOSING_VAULT' ? (
            <>
              <span className="material-symbols-outlined text-sm text-[#ff544b] animate-spin">sync</span>
              <span>SEALING VAULT...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm text-[#ff544b]">logout</span>
              <span>EXIT VAULT</span>
            </>
          )}
        </button>
      </div>

      {/* PHYSICAL BRIEFING BOARD (Walk-in Destination inside the bunker) */}
      <div
        id="board-viewport"
        className={`absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 md:p-8 lg:p-10 transition-opacity duration-700 ${
          boardVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          id="physical-board-frame"
          className="relative w-full max-w-6xl h-[88vh] bg-[#1a1714]/92 border-4 border-[#3d3229] rounded shadow-[0_30px_90px_rgba(0,0,0,0.98)] flex flex-col overflow-hidden pointer-events-auto transition-transform duration-500"
          style={{
            backgroundImage:
              'radial-gradient(#261e17 1px, transparent 1px), radial-gradient(#2e241c 1px, #161311 1px)',
            backgroundSize: '28px 28px'
          }}
        >
          {/* Corkboard Brass Trim Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8b6f4e] pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8b6f4e] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8b6f4e] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8b6f4e] pointer-events-none" />

          {/* Red String Connectors SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
            <line x1="16%" y1="12%" x2="48%" y2="28%" stroke="#ff2a2a" strokeWidth="1.8" strokeDasharray="4 2" />
            <line x1="48%" y1="28%" x2="82%" y2="18%" stroke="#ff2a2a" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="48%" y1="28%" x2="35%" y2="64%" stroke="#ff2a2a" strokeWidth="1.2" />
          </svg>

          {/* Board Header */}
          <div className="p-4 sm:p-5 border-b-2 border-[#332820] bg-[#120f0e]/95 flex items-center justify-between z-20 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#ff1e27] animate-pulse" />
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-code-md text-xs tracking-[0.22em] text-[#ff544b] uppercase font-bold">
                    {mission.dayTrack}
                  </span>
                  <span className="text-[#605d68]">•</span>
                  <span className="font-code-md text-xs tracking-[0.16em] text-[#ffdad6] bg-[#ff1e27]/20 border border-[#ff1e27]/40 px-2 py-0.5 rounded font-semibold">
                    TIME: {mission.time}
                  </span>
                </div>
                <h2 className="font-headline-sm text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-[0.08em] leading-tight">
                  {mission.fullTitle}
                </h2>
                {mission.poweredBy && (
                  <div className="inline-flex items-center gap-2 bg-[#0e1c12] border border-[#2f8d46]/70 px-2.5 py-1 rounded mt-1.5 shadow-sm">
                    <img src={gfgLogo} alt="GeeksforGeeks" className="h-4 w-auto object-contain" />
                    <span className="font-code-md text-[11px] text-[#48bb78] uppercase font-bold tracking-wider">
                      POWERED BY GEEKSFORGEEKS
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="stamp-classified font-code-md text-xs sm:text-sm font-bold px-3 py-1 hidden sm:block">
                SYNDICATE TOP SECRET
              </div>
              <div className="flex items-center gap-1 bg-[#221c16] px-3 py-1.5 border border-[#4a3b2f] rounded">
                <span className="material-symbols-outlined text-[#ff544b] text-base">lock</span>
                <span className="font-code-md text-[10px] tracking-widest text-[#d8cfc4]">SECTOR 7 INTEL</span>
              </div>
            </div>
          </div>

          {/* Scrollable Intelligence Dossier Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 custom-modal-scrollbar z-20 relative bg-black/30 backdrop-blur-[2px]">
            {/* Manila Folder Briefing Note */}
            <div className="relative bg-[#ece5d8] text-[#1b1918] p-5 sm:p-6 rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.6)] border-t-8 border-[#c25e5e] transform -rotate-[0.3deg]">
              <div className="red-pushpin -top-2 left-6" />
              <div className="red-pushpin -top-2 right-6" />
              <div className="flex items-center justify-between border-b border-[#a89d89] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-code-md text-xs tracking-[0.25em] text-[#931f1d] font-bold uppercase">
                    // EVENT SUMMARY
                  </span>
                  <span className="tape-strip text-[9px] font-code-md px-2 py-0.5 text-black">
                    TECHBYTE '26
                  </span>
                </div>
                <span className="font-label-sm text-[11px] text-[#554b42] uppercase tracking-widest font-mono">
                  OFFICIAL INFO
                </span>
              </div>
              <p className="font-body-lg text-sm sm:text-base text-[#282420] leading-relaxed font-serif italic">
                "{mission.heistBrief || mission.briefing}"
              </p>
            </div>

            {/* DAY 1 EVENTS REWARD BLOCK: Generalized PRIZE POOL */}
            {mission.prizePool && (
              <div className="relative bg-[#1d1214] border-2 border-[#ff1e27] p-5 sm:p-6 rounded shadow-[0_8px_30px_rgba(255,30,39,0.3)] transform rotate-[0.2deg]">
                <div className="red-pushpin -top-2.5 left-8" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3d191d] pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff1e27]/20 border border-[#ff1e27] flex items-center justify-center text-[#ff544b] shrink-0">
                      <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-code-md text-xs sm:text-sm uppercase tracking-[0.22em] text-[#ffdad6] font-bold">
                          MISSION REWARDS // PRIZE POOL
                        </span>
                        <span className="bg-[#ff1e27]/30 text-[#ff544b] text-[10px] font-code-md px-2 py-0.5 rounded uppercase font-semibold">
                          OFFICIAL
                        </span>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#a09ca8] uppercase tracking-wider block mt-0.5">
                        COMMENDATION PRIZE AWARDS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generalized Prize Pool Display */}
                <div className="p-4 sm:p-5 bg-[#12080a] border border-[#ff1e27]/50 rounded text-center flex flex-col items-center justify-center shadow-inner">
                  <span className="font-code-md text-xs sm:text-sm text-[#ff9995] uppercase tracking-widest font-bold mb-1">
                    PRIZE POOL
                  </span>
                  <span className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#ff544b] font-bold tracking-tight uppercase">
                    {mission.prizePool}
                  </span>
                </div>

                {/* Certificate Policy */}
                <div className="mt-4 pt-3 border-t border-[#3d191d] flex items-center gap-2.5 p-3 bg-[#160c0e] border border-[#3d191d] rounded text-left">
                  <span className="material-symbols-outlined text-[#ff544b] text-base shrink-0">verified</span>
                  <span className="font-code-md text-xs sm:text-sm text-[#ffdad6] font-medium leading-tight">
                    {mission.certificate || "Certificates will be provided to all participants."}
                  </span>
                </div>
              </div>
            )}

            {/* CODING CONTEST REWARD BLOCK: Powered by GeeksforGeeks */}
            {mission.id === 'mission-06' && (
              <div className="relative bg-[#0d1612] border-2 border-[#2f8d46] p-5 sm:p-6 rounded shadow-[0_8px_30px_rgba(47,141,70,0.3)] transform rotate-[0.2deg]">
                <div className="red-pushpin -top-2.5 left-8" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c3822] pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#132819] border border-[#2f8d46] p-1.5 flex items-center justify-center shrink-0">
                      <img src={gfgLogo} alt="GeeksforGeeks" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-code-md text-xs sm:text-sm uppercase tracking-[0.22em] text-[#9ae6b4] font-bold">
                          CODING CONTEST // POWERED BY GEEKSFORGEEKS
                        </span>
                        <span className="bg-[#2f8d46]/30 text-[#48bb78] text-[10px] font-code-md px-2 py-0.5 rounded uppercase font-semibold">
                          OFFICIAL
                        </span>
                      </div>
                      <span className="font-label-sm text-[11px] text-[#68d391] uppercase tracking-wider block mt-0.5">
                        ALGORITHMIC PROGRAMMING ARENA
                      </span>
                    </div>
                  </div>
                </div>

                {/* GeeksforGeeks Coupons Display */}
                <div className="p-4 sm:p-5 bg-[#08100b] border border-[#2f8d46]/50 rounded text-center flex flex-col items-center justify-center shadow-inner">
                  <span className="font-code-md text-xs sm:text-sm text-[#9ae6b4] uppercase tracking-widest font-bold mb-1">
                    MISSION REWARDS
                  </span>
                  <span className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#48bb78] font-bold tracking-tight">
                    GEEKSFORGEEKS COUPONS
                  </span>
                  <span className="font-code-md text-[11px] sm:text-xs text-[#a0aec0] mt-1">
                    Official platform coupons for contest rank holders
                  </span>
                </div>

                {/* Certificate Policy */}
                <div className="mt-4 pt-3 border-t border-[#1c3822] flex items-center gap-2.5 p-3 bg-[#0e1c12] border border-[#23452b] rounded text-left">
                  <span className="material-symbols-outlined text-[#48bb78] text-base shrink-0">verified</span>
                  <span className="font-code-md text-xs sm:text-sm text-[#dcfce7] font-medium leading-tight">
                    Certificates will be provided to all participants.
                  </span>
                </div>
              </div>
            )}

            {/* DAY 2 WORKSHOP / CONCLAVE CERTIFICATE POLICY */}
            {(mission.id === 'mission-04' || mission.id === 'mission-05') && (
              <div className="relative bg-[#16151c] border border-[#3c3a4a] p-4 sm:p-5 rounded">
                <div className="flex items-center gap-2 text-[#ffdad6] mb-2">
                  <span className="material-symbols-outlined text-[#ff544b] text-base">card_membership</span>
                  <span className="font-code-md text-xs uppercase tracking-wider font-bold">
                    CERTIFICATES
                  </span>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-[#c8c5ca]">
                  {mission.certificate || "Certificates will be provided to all participants."}
                </p>
              </div>
            )}

            {/* Pinned Objective & Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Objective */}
              <div className="relative bg-[#16171c] border-2 border-[#363742] p-5 rounded shadow-[0_8px_24px_rgba(0,0,0,0.7)] transform rotate-[0.4deg]">
                <div className="red-pushpin -top-2.5 left-8" />
                <div className="flex items-center gap-2 text-[#ff544b] border-b border-[#282936] pb-2 mb-3">
                  <span className="material-symbols-outlined text-[18px]">target</span>
                  <span className="font-code-md text-xs uppercase tracking-[0.2em] font-bold">
                    ABOUT THE EVENT
                  </span>
                </div>
                <p className="font-body-md text-sm text-[#d4d1da] leading-relaxed font-light">
                  {mission.about}
                </p>
                {mission.projectType && (
                  <div className="mt-3 pt-2 border-t border-[#252530] text-xs font-code-md text-[#ffdad6]">
                    <span className="text-[#ff544b] uppercase font-bold">PROJECT TYPE: </span>
                    <span>{mission.projectType}</span>
                  </div>
                )}
                {mission.laptopRequirement && (
                  <div className="mt-3 pt-2 border-t border-[#252530] text-xs font-code-md text-[#ffdad6] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#ff544b]">laptop_mac</span>
                    <span className="text-[#ff544b] uppercase font-bold">LAPTOP: </span>
                    <span>{mission.laptopRequirement}</span>
                  </div>
                )}
                <div className="mt-2.5 pt-2 border-t border-[#252530] text-xs font-code-md text-[#48bb78] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px]">wifi</span>
                  <span className="uppercase font-bold tracking-wider">WI-FI FACILITIES PROVIDED</span>
                </div>
              </div>

              {/* Theme & Scope */}
              <div className="relative bg-[#0d1624] border-2 border-[#1e324d] p-5 rounded shadow-[0_8px_24px_rgba(0,0,0,0.7)] transform -rotate-[0.5deg]">
                <div className="red-pushpin -top-2.5 right-8" />
                <div className="flex items-center gap-2 text-[#64b5f6] border-b border-[#1b3457] pb-2 mb-3">
                  <span className="material-symbols-outlined text-[18px]">schema</span>
                  <span className="font-code-md text-xs uppercase tracking-[0.2em] font-bold text-[#90caf9]">
                    THEME & TOPIC
                  </span>
                </div>
                <p className="font-body-md text-sm text-[#b9d5f7] leading-relaxed font-light">
                  {mission.theme || mission.topic || 'Engineering Related Open Theme'}
                </p>
                {mission.creationTime && (
                  <div className="mt-3 pt-2 border-t border-[#1b3457] text-xs font-code-md text-[#90caf9] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#64b5f6]">timer</span>
                    <span className="uppercase font-bold">CREATION TIME: </span>
                    <span>{mission.creationTime}</span>
                  </div>
                )}
                {mission.additionalDetails && (
                  <div className="mt-3 pt-2 border-t border-[#1b3457] text-xs font-code-md text-[#90caf9]">
                    <span>{mission.additionalDetails}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Presentation Requirements: What Participants Must Explain */}
            {mission.presentationExplanation && (
              <div className="relative bg-[#16171c] border-2 border-[#ff1e27]/40 p-5 rounded shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-2 text-[#ff544b] border-b border-[#282936] pb-2 mb-3">
                  <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                  <span className="font-code-md text-xs uppercase tracking-[0.2em] font-bold">
                    PRESENTATION TO JURY — WHAT PARTICIPANTS MUST EXPLAIN
                  </span>
                </div>
                <p className="font-body-sm text-xs text-[#a09ca8] mb-3">
                  After the 1-hour creation period, participants must present their completed poster to the jury and explain:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-body-sm text-xs sm:text-sm text-[#e5e1e4]">
                  {mission.presentationExplanation.map((item, idx) => (
                    <li key={idx} className="p-2.5 bg-[#201f28] border border-[#3c3a4a] rounded flex items-start gap-2">
                      <span className="font-code-md text-[11px] text-[#ff544b] font-bold shrink-0 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pinned Specifications: Participation, Duration, Presentation / QA */}
            <div className="relative bg-[#17161b] border border-[#353340] p-5 rounded shadow-[0_10px_28px_rgba(0,0,0,0.65)]">
              <div className="red-pushpin -top-2.5 left-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-2 text-[#ff544b] mb-4">
                <span className="material-symbols-outlined text-[18px]">groups</span>
                <span className="font-code-md text-xs uppercase tracking-[0.2em] font-bold">
                  EVENT DETAILS
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 bg-[#201f28] border-2 border-[#ff1e27]/60 rounded shadow-[0_0_15px_rgba(255,30,39,0.15)]">
                  <span className="block font-label-sm text-[10px] text-[#ff544b] uppercase tracking-widest font-bold">
                    TIME
                  </span>
                  <span className="font-headline-sm text-base sm:text-lg text-white mt-1 block tracking-wider">
                    {mission.time}
                  </span>
                </div>
                <div className="p-3.5 bg-[#201f28] border border-[#3c3a4a] rounded">
                  <span className="block font-label-sm text-[10px] text-[#a09ca8] uppercase tracking-widest">
                    PARTICIPATION
                  </span>
                  <span className="font-headline-sm text-base sm:text-lg text-white mt-1 block">
                    {mission.participation}
                  </span>
                </div>
                <div className="p-3.5 bg-[#201f28] border border-[#3c3a4a] rounded">
                  <span className="block font-label-sm text-[10px] text-[#a09ca8] uppercase tracking-widest">
                    DURATION
                  </span>
                  <span className="font-headline-sm text-base sm:text-lg text-white mt-1 block">
                    {mission.duration || mission.format || 'Time Based'}
                  </span>
                </div>
                <div className="p-3.5 bg-[#201f28] border border-[#3c3a4a] rounded">
                  <span className="block font-label-sm text-[10px] text-[#a09ca8] uppercase tracking-widest">
                    {mission.presentationTime ? 'PRESENTATION & Q&A' : 'CERTIFICATES'}
                  </span>
                  <span className="font-headline-sm text-xs sm:text-sm text-white mt-1 block leading-snug">
                    {mission.presentationTime ? `${mission.presentationTime} | ${mission.qaTime}` : (mission.certificate || 'Certificates will be provided to all participants.')}
                  </span>
                </div>
              </div>

              {/* Wi-Fi Facilities Information Line */}
              <div className="mt-3.5 pt-3 border-t border-[#2a2935] flex items-center justify-between flex-wrap gap-2 text-xs font-code-md">
                <div className="flex items-center gap-2 text-[#48bb78]">
                  <span className="material-symbols-outlined text-[16px]">wifi</span>
                  <span className="font-bold tracking-wider uppercase">WI-FI FACILITIES PROVIDED</span>
                </div>
                <span className="text-[#a09ca8] text-[11px]">High-speed network access provided across all events</span>
              </div>
            </div>

            {/* Rules of Engagement */}
            <div className="relative bg-[#19191d] border border-[#383742] p-5 rounded shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 text-[#ff544b] mb-3">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-code-md text-xs uppercase tracking-[0.2em] font-bold">
                  RULES & GUIDELINES
                </span>
              </div>
              <ul className="space-y-2.5 font-body-sm text-sm text-[#cac6d0] list-disc list-inside font-light">
                {mission.rules.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">{rule}</li>
                ))}
              </ul>
            </div>

            {/* Event-Wise Mission Coordinators Block */}
            {mission.coordinators && mission.coordinators.length > 0 && (
              <div className="relative bg-[#171415] border-2 border-[#ff1e27]/50 p-5 rounded shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
                <div className="red-pushpin -top-2.5 left-8" />
                <div className="flex items-center justify-between border-b border-[#3d1e21] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ff544b]">contact_phone</span>
                    <span className="font-code-md text-xs sm:text-sm tracking-[0.2em] uppercase text-[#ffdad6] font-bold">
                      {mission.id === 'special-hackathon'
                        ? 'HACKATHON COORDINATORS'
                        : (mission.num === '04' ? 'WORKSHOP COORDINATORS' : 'MISSION COORDINATORS')}
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] sm:text-[11px] text-[#ff544b] uppercase tracking-widest font-mono">
                    EVENT SECURE CHANNEL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mission.coordinators.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-[#201d1c] border border-[#ff1e27]/40 p-4 rounded flex items-center justify-between hover:border-[#ff1e27] transition-all"
                    >
                      <div>
                        <span className="font-headline-sm text-lg sm:text-xl text-white uppercase tracking-wider block">
                          {c.name}
                        </span>
                        {c.role && (
                          <span className="font-code-md text-[10px] text-[#ff544b] uppercase tracking-wider block mt-0.5">
                            {c.role}
                          </span>
                        )}
                      </div>
                      <a
                        href={`tel:${c.phone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ff1e27]/20 border border-[#ff1e27] text-white hover:bg-[#ff1e27] transition-colors rounded font-code-md text-xs tracking-wider font-semibold"
                      >
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        <span>{c.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Board Footer Command Bar */}
          <div className="p-4 sm:p-5 border-t-2 border-[#332820] bg-[#120f0e]/95 flex flex-col sm:flex-row items-center justify-between gap-3 z-20 flex-shrink-0">
            <div className="flex items-center gap-2 text-neutral-400 font-code-md text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="tracking-widest uppercase">
                REGISTRATION ACTIVE // LIMITED PASSES AVAILABLE
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleClose}
                disabled={vaultState !== 'BRIEFING_ROOM'}
                className={`px-5 py-2.5 text-xs font-code-md text-neutral-400 hover:text-white uppercase tracking-widest transition-colors w-1/2 sm:w-auto cursor-pointer ${
                  vaultState !== 'BRIEFING_ROOM' ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                EXIT VAULT
              </button>
              <a
                href={TICKET9_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative inline-flex items-center justify-center gap-2 px-8 py-2.5 bg-[#ff1e27] text-white hover:brightness-110 font-headline-sm text-lg uppercase tracking-[0.16em] transition-all shadow-[0_0_20px_rgba(255,30,39,0.4)] w-1/2 sm:w-auto text-center font-semibold cursor-pointer ${
                  vaultState !== 'BRIEFING_ROOM' ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                GET ACCESS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
