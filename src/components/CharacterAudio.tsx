import React, { useState, useEffect } from "react";

type Props = {
    char: string
};


const CharacterAudio = ({ char }: Props) => {

    const [audio, setAudio] = useState("");
    useEffect(() => {
        import(`../audio/${char.replace(/_/g, "")}.mp3`).then(audio => {
            setAudio(audio.default);
        });
    }, [char]);


    return (
        <button className="button is-rounded" onClick={e => { e.preventDefault(); (new Audio(audio)).play() }}>
            <span className="icon is-small">
                <i className="fas fa-play"></i>
            </span>
        </button>
    )
}

export default CharacterAudio;