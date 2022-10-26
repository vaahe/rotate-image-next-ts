import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { modifyTypes } from "../types/modifyTypes";

export default function ImageModify({ data, imageSizes }: modifyTypes) {
  const [load, setLoad] = useState<boolean>(true); // Image load state
  const [imageWH, setImgWH] = useState<[number, number]>([0, 0]); // Image Width and Height
  const [imageName, setImageName] = useState<string | null>(
    localStorage.getItem("fileName")
  );
  const loader = useRef<HTMLDivElement>(null);
  const loaderImage = useRef<any>(null);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const img = new window.Image();

  if (imageName !== null) {
    img.src = `/images/${imageName.substring(1, imageName.length - 1)}`;
  }

  img.onload = () => {
    if (load) {
      imageSizes({
        ...data,
        count: 0,
        imageWidth: img.width,
        imageHeight: img.height,
      });
      imageResize(img, setImgWH); //Image resize function
      if (loader.current !== null && loaderImage.current !== null) {
        loader.current.style.display = "block";
        loaderImage.current.style.display = "none";
      }

      setLoad(false);
    } else {
      if (loader.current !== null && loaderImage.current !== null) {
        loader.current.style.display = "none";
        loaderImage.current.style.display = "block";
      }
    }
  };

  useEffect(() => {
    img.onerror = () => {
      // If the image doesn't exist redirect to home
      router.push("/");
    };
  }, [img, router]);

  return (
    <div>
      <div id="uploaded-image">
        <div className="spinner-container" ref={loader}>
          <div className="loading-spinner"></div>
        </div>
        <div ref={loaderImage}>
          <Image
            src={
              "/images/" +
              (imageName ? imageName.substring(1, imageName.length - 1) : "")
            }
            id="newimg"
            width={imageWH[0]}
            height={imageWH[1]}
            alt="Modified"
            style={{ rotate: data.rotate + "deg" }}
          />
        </div>
      </div>
    </div>
  );
}

// Image Reasize logic
function imageResize(img: any, setImgWH: Function) {
  let ratio, imgWidth, imgHeight;
  if (img.width > 1000 && img.height > 600) {
    //If the width and height of the image are large in the canvas dimensions
    let divisionWidth = img.width / 1000;
    let divisionHeight = img.height / 600;

    if (divisionWidth > divisionHeight) {
      ratio = (img.width - 1000) / img.width;
      imgHeight = img.height - img.height * ratio;
      setImgWH([1000, imgHeight]);
    } else {
      ratio = (img.height - 600) / img.height;
      imgWidth = img.width - img.width * ratio;
      setImgWH([imgWidth, 600]);
    }
  } else if (img.width > 1000 || img.height > 600) {
    //If the width or height of the image in the canvas dimensions is large
    if (img.width > img.height) {
      ratio =
        ((img.width === 1000 ? img.width + img.height : img.width) - 1000) /
        img.width;
      imgHeight = img.height - img.height * ratio;
      setImgWH([1000, img.width === 1000 ? 600 : imgHeight]);
    } else {
      ratio = (img.height - 600) / img.height;
      imgWidth = img.width - img.width * ratio;
      setImgWH([imgWidth, 600]);
    }
  } else {
    setImgWH([img.width, img.height]);
  }
}
