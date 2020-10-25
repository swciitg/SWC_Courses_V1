import React from "react";
import styles from "./Content.module.css";
import classNames from "classnames";

const Content = ({ details }) => {
  return (
    <div className={classNames(styles.Content)}>
      <div className={styles.Content_box}>
        <div className={classNames(styles.Header)}>
          <span>CONTENTS</span>
          <span>30 Lessons</span>
          <span>20 hrs</span>
        </div>
        <div className={styles.lessons}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum molestias earum architecto ipsa harum dolor nostrum velit
          totam facilis voluptates delectus dolorem laboriosam quos, libero fuga
          fugit! Neque blanditiis atque quia facilis iste! Modi corrupti maxime,
          soluta accusantium ut corporis magnam mollitia excepturi esse harum!
          Similique porro, accusantium sunt officiis impedit laboriosam?
          Eligendi sapiente quos et sunt. Eum unde quas laudantium error vitae,
          alias dolore perferendis fugiat impedit totam eveniet quia, dolores
          numquam. Nostrum aut molestias placeat exercitationem nemo officiis
          consequuntur fugit harum corporis reiciendis voluptatibus labore
          praesentium veritatis eligendi eveniet perferendis consectetur, soluta
          libero repellendus maxime totam inventore? Explicabo inventore labore
          nostrum aliquam a voluptatibus unde ex nesciunt minus iste? Sunt
          quidem dicta nam, rem doloremque ipsa repellendus nobis atque quas,
          dolorem consectetur unde necessitatibus adipisci eum ducimus minima
          numquam exercitationem. Voluptate unde laboriosam qui ab atque? Cum
          dolor cupiditate perferendis aliquid expedita ipsam laudantium
          repellat accusantium inventore.
        </div>
      </div>
      <div className={classNames(styles.Description)}>
        <div>About</div>
        <p>{details.description}</p>
      </div>
    </div>
  );
};

export default Content;

// "row d-flex px-4 px-sm-5", "col col-4 d-md-block pr-5", "col col-4 d-md-block pr-5","d-flex pl-2 pl-lg-0",
