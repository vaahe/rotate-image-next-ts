import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useRef } from "react";
import uploadLogo from "../../public/images/upload-logo.png";
import { errMsgType } from "../types/errMsgTypes";

function DragDropInput({ setErrorMsg }: errMsgType) {
  const router = useRouter();
  const dragRef = useRef<HTMLDivElement>(null);
  const onDragEnter = () => {
    if (dragRef.current !== null) {
      dragRef.current.classList.add("dragover");
    }
  };
  const onDragLeave = () => {
    if (dragRef.current !== null) {
      dragRef.current.classList.remove("dragover");
    }
  };

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
        setErrorMsg("Please select valid image.");
        return false;
      }
      // Converting file into form data
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      axios.post("/api/upload", formData, config).then((res) => {
        if (res.data.status === "Denied") {
          return;
        }

        // Save share link to local storage
        localStorage.setItem("fileName", JSON.stringify(res.data.fileName));
        localStorage.setItem("url", JSON.stringify(res.data.url));

        // If file is selected redirect to specified path
        router.push("/modify");
      });
    }
  };

  const disableClick = (e: any) => {
    e.preventDefault();
    e.target.disable = true;
  };
  return (
    <div className="drag-drop">
      <div
        ref={dragRef}
        className="drag-and-drop"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <div className="drag-input">
          <p>Drag and Drop Image Here</p>
          <Image alt="Upload Logo" src={uploadLogo} className="upload-logo" />
        </div>
        <input
          type="file"
          value="image"
          name="image"
          accept="image/*"
          onChange={upload}
          onClick={disableClick}
        />
      </div>
      <label htmlFor="image">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={upload}
        />
        Choose Image
      </label>
    </div>
  );
}
export default DragDropInput;
