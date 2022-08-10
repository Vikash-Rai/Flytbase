import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(50);
  const pixelDistance = 5;

  const move = useCallback((direction) => {
    switch (direction) {
      // adding logic here to prevent div from leaving the area.
      // reddit comment
      case "up":
        setTop((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));
        // for (let i = 0; i < 50; i += 1) {
        //   setTop(top - 1);
        // }
        break;
      case "down":
        setTop((top) =>
          top + pixelDistance <= 280 ? top + pixelDistance : 280
        );
        break;
      case "left":
        setLeft((left) =>
          left - pixelDistance >= 0 ? left - pixelDistance : 0
        );
        break;
      case "rightDiagonalUp":
        setLeft((left) =>
          left + pixelDistance <= 280 ? left + pixelDistance : 280
        );
        setTop((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));

        break;
      case "leftDiagonalUp":
        setLeft((left) =>
          left - pixelDistance >= 0 ? left - pixelDistance : 0
        );
        setTop((top) => (top - pixelDistance >= 0 ? top - pixelDistance : 0));

        break;

      case "leftDiagonalDown":
        setLeft((left) =>
          left + pixelDistance <= 280 ? left + pixelDistance : 280
        );
        setTop((top) =>
          top + pixelDistance <= 280 ? top + pixelDistance : 280
        );
        break;

      case "rightDiagonalDown":
        setLeft((left) =>
          left - pixelDistance >= 0 ? left - pixelDistance : 0
        );
        setTop((top) =>
          top + pixelDistance <= 280 ? top + pixelDistance : 280
        );
        break;

      default:
        setLeft((left) =>
          left + pixelDistance <= 280 ? left + pixelDistance : 280
        );
        break;
    }
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      // This should now use e.key because e.keyCode is depreciated
      // it was originall e key code (reddit comment)
      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;

        case "o":
          move("rightDiagonalUp");
          break;

        case "u":
          move("leftDiagonalUp");
          break;

        case "m":
          move("leftDiagonalDown");
          break;

        case "b":
          move("rightDiagonalDown");
          break;

        default:
          console.log("Do nothing", e.code);
      }
    },
    [move]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="App">
      <h1>Movable BOX </h1>
      <div className="container">
      <div
        style={{ top: `${top}px`, left: `${left}px` }}
        className="div"
      ></div>
    </div>
    <div className="controller">
        <button >ADD BOX</button>
      </div>
    </div>
  );
}