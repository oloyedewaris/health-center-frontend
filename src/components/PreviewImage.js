import { useState } from "react";
import { Image } from '@chakra-ui/react'

export default function PreviewImage({ file }) {

    const [preview, setPreview] = useState({})
    if (file) {
        if(typeof file === 'string') {
            setPreview(file)
        } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreview(reader.result)
        }
    }
    }

    return (
      <div>
        <Image objectFit="cover" src={preview} alt="Image" />
      </div>
    );
}