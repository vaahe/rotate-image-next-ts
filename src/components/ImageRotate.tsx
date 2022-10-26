import React, { useState } from "react";
import axios from "axios";
import { log } from "util";
import { mirrorTypes } from "../types/rotateTypes";
import { FaUndo, FaRedo } from "react-icons/fa";

export default function ImageRotate({
  data,
  onChange,
  setModifyFlag,
  imageName,
}: mirrorTypes) {
  const [rotateR, setRotateR] = useState<number>(0);
  const [rotateL, setRotateL] = useState<number>(0);

  const rotateLeft = () => {
    console.log(imageName, "asdasdasd");

    axios.put(`api/mirror/rotate`, {
      rotate: rotateL - 90,
      left: true,
      imageName: imageName,
    });
    setRotateL(rotateL - 90);
    setModifyFlag(false);
    onChange({
      ...data,
      count: data.count + 1,
      rotate: rotateL - 90,
      left: true,
      right: false,
    });
  };

  const rotateRight = () => {
    axios.put(`api/mirror/rotate`, {
      rotate: rotateR + 90,
      right: true,
      imageName: imageName,
    });
    setRotateR(rotateR + 90);
    setModifyFlag(false);
    onChange({
      ...data,
      count: data.count + 1,
      rotate: rotateR + 90,
      right: true,
      left: false,
    });
  };

  return (
    <>
      <button className="rotate" onClick={rotateLeft}>
        <FaUndo /> Rotate Left
      </button>
      <button className="rotate" onClick={rotateRight}>
        <FaRedo /> Rotate right
      </button>
    </>
  );
}
