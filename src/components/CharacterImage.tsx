import React from "react";

type Props = {
    char: string
};


const CharacterImage = ({ char }: Props) => {

    return (<figure className="image">
        <img src={process.env.PUBLIC_URL + `/images/characters/${char}.png`} alt="" />
        <div className="title is-4 has-text-centered">
            <figcaption>{char}</figcaption>
        </div>
    </figure>)
}

export default CharacterImage;