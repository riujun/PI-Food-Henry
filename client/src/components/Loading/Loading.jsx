import style from "./Loading.module.css";

import React, { useState } from "react";

const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.spinner}>
        <div className={style.rect1} />
        <div className={style.rect2} />
        <div className={style.rect3} />
        <div className={style.rect4} />
        <div className={style.rect5} />
      </div>
    </div>
  );
};

// <div className={style.loading_container}>
//   <div
//     className={style.loader}
//     style={{ transform: `rotate(${rotation}deg)` }}
//   >
//     <div className={style.face1}>
//       <div className={style.circle}></div>
//     </div>
//     <div className={style.face2}>
//       <div className={style.circle}></div>
//     </div>
//   </div>
// </div>
//   );
// };

export default Loading;
