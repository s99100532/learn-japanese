import React, { useState } from "react";
import CharacterAudio from "../components/CharacterAudio";
import { sample } from "lodash";
import { Characters } from "../util/constants";
import CanvasDraw from "react-canvas-draw";

const canvasProps = {
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false
};

const Test = () => {

    const [char, setChar] = useState(sample(Characters) || "");
    return (
        <div>
            <div className="has-text-centered">
                {char}
            </div>
            <div className="buttons is-centered">
                <CharacterAudio char={char} />
                <div className="button is-rounded">
                    <span className="icon is-small">
                        <i className="fas fa-save"></i>
                    </span>
                </div>
            </div>
            <div className="has-text-centered" >
                <div className="is-inline-block" style={{ boxShadow: "rgba(138, 134, 134, 0.26) 1px 1px 7px 5px" }}>
                    <CanvasDraw {...canvasProps} />
                </div>
            </div>
        </div>
    )
};

export default Test;