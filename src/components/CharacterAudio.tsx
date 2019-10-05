import React, { useState, useEffect } from "react";

type Props = {
    char: string
};


const CharacterAudio = ({ char }: Props) => {

    const [audio, setAudio] = useState("");
    useEffect(() => {
        import(`../audio/${char}.mp3`).then(audio => {
            setAudio(audio.default);
        });
    }, [char]);


    return (
        <a className="button is-rounded" onClick={e => { e.preventDefault(); (new Audio(audio)).play() }}>
            <span className="icon is-small">
                <i className="fas fa-play"></i>
            </span>
        </a>
    )
}

export default CharacterAudio;