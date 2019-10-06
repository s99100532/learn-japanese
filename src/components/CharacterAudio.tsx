import React, { useState, useEffect, useCallback } from "react";

type Props = {
    char: string
};


const CharacterAudio = ({ char }: Props) => {

    const [audio, setAudio] = useState<HTMLAudioElement>();
    useEffect(() => {
        import(`../audio/${char.replace(/_/g, "")}.mp3`).then(audio => {
            setAudio(new Audio(audio.default));
        });
    }, [char]);

    const playAudio = useCallback(e => {
        e.preventDefault();
        if(audio) {
            audio.play();
        } else {
            alert('audio is not avaliable');
        }
    }, [audio]);


    return (
        <button className="button is-rounded" onClick={playAudio}>
            <span className="icon is-small">
                <i className="fas fa-play"></i>
            </span>
        </button>
    )
}

export default CharacterAudio;