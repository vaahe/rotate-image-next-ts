import { useReducer } from "react";
import Reducer from "../src/components/AppReducer";
import Header from "../src/components/Header";
import ImageModify from "../src/components/ImageModify";
import ToolsMenu from "../src/components/ToolsMenu";

export default function Modify() {
  const [data, dispatch] = useReducer(Reducer, []);

  const imageSizes = (sizes: object) => {
    dispatch({
      type: "sizes",
      payload: {
        sizes: sizes,
      },
    });
  };

  const onRotateFunc = (rotate: boolean) => {
    dispatch({
      type: "rotate",
      payload: {
        updated: rotate,
      },
    });
  };

  return (
    <div className="App">
      <Header />
      <div id="modify-image">
        <ToolsMenu
          data={data}
          onRotate={onRotateFunc}
          onChange={onRotateFunc}
        />
        <ImageModify data={data} imageSizes={imageSizes} />
      </div>
    </div>
  );
}
