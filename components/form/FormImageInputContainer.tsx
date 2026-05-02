'use client';

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react"
import FormImageInput from "./FormImageInput";

const FormImageInputContainer = ({ initImagePath, label, name }: { initImagePath: string; label: string; name: string; }) => {
  const [newImg, setNewImg] = useState<string>('');

  useEffect(() => {
    return () => {
      if (newImg) URL.revokeObjectURL(newImg);
    };
  }, [newImg]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file instanceof File && file.size > 0) {
      const newImgSrc = URL.createObjectURL(file);

      setNewImg(newImgSrc)
    }
  }

  return (
    <div>
      <div className="relative h-48 w-48 overflow-hidden">
        <Image
          src={newImg || initImagePath}
          alt="product"
          fill
          className="object-cover"
        />
      </div>

      <input type="hidden" name='currentImage' value={initImagePath} />
      <FormImageInput label={label} name={name} required={!initImagePath && !newImg} handleFileChange={handleFileChange} />
    </div>
  )
}
export default FormImageInputContainer