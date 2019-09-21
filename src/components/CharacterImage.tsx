import React, { useState, useEffect } from "react";

type Props = {
    char: string
};

const CharacterImage = ({ char }: Props) => {

    const [image, setImage] = useState("");
    useEffect(() => {
        import(`../images/characters/${char}.png`).then(image => {
            setImage(image.default);
        });
    }, [char]);

    return (<figure className="image">
        <img src={image} alt="" />
        <div className="title is-4 has-text-centered">
            <figcaption>{char}</figcaption>
        </div>
    </figure>)
}

export default CharacterImage;