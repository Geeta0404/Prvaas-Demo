// import React, { useEffect } from 'react';
// import 'aframe';
// import '../App.css'; // Optional: for custom styles

// const ARViewer = () => {
//   useEffect(() => {
//     // No special JS needed because A-Frame + MindAR runs declaratively
//   }, []);

//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <a-scene
//         mindar-image="imageTargetSrc: targets.mind"
//         color-space="sRGB"
//         embedded
//         vr-mode-ui="enabled: false"
//         device-orientation-permission-ui="enabled: true"
//       >
//         <a-assets>
//           <img id="my-overlay" src="my-overlay-image.png" alt="AR Overlay" />
//         </a-assets>

//         <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//         <a-entity mindar-image-target="targetIndex: 0">
//           <a-image
//             src="#my-overlay"
//             position="0 0 0"
//             width="1"
//             height="0.75"
//           ></a-image>
//         </a-entity>
//       </a-scene>
//     </div>
//   );
// };

// export default ARViewer;
