import React, { useState, useCallback, useRef } from "react";
import CharacterAudio from "../components/CharacterAudio";
import { sample } from "lodash";
import { Characters } from "../util/constants";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";

const canvasProps = {
    loadTimeOffset: 5,
    lazyRadius: 0,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 300,
    canvasHeight: 300,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false
};

const initChar = sample(Characters) || "";

const Test = () => {

    const [history, setHistory] = useState<string[]>([initChar]);
    const [cursor, setCursor] = useState(1);
    const [char, setChar] = useState(initChar);
    const [visible, setVisiable] = useState(false);
    const canvas = useRef<any>();

    const previous = useCallback(() => {
        if (cursor <= 1) {
            return;
        }
        const char = history[cursor - 2] || Characters[0];
        setChar(char);
        setCursor(cursor - 1);
        canvas.current.clear();
    }, [history, cursor]);

    const save = useCallback(() => {
        const image = canvas.current.getSaveData();
        axios.post(`${process.env.REACT_APP_IMG_ENDPOINT}/${char}`, {
            image: JSON.parse(image)
        })
            .then(function (response) {
                if(response.data.status === "ok") {
                    alert("success");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [canvas, char]);

    const undo = useCallback(() => {
        canvas.current.undo();
    }, [canvas]);


    const next = useCallback(() => {
        if (cursor >= history.length) {
            const newChar = sample(Characters) || "";
            setChar(newChar);
            setHistory([
                ...history,
                newChar
            ]);
        } else {
            setChar(history[cursor])
        }
        setCursor(cursor + 1);
        canvas.current.clear();

    }, [history, cursor]);

    return (
        <div>
            <div className="has-text-centered">
                <div className="title is-4">{cursor}</div>
                <div className="title is-4">{char}</div>
            </div>
            <div className="columns is-mobile">
                <div className="column is-narrow">
                    <div className="button is-rounded" onClick={previous}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-left"></i>
                        </span>
                    </div>
                </div>
                <div className="column">
                    <div className="buttons is-centered">
                        <CharacterAudio char={char} />
                        <div className="button is-rounded" onClick={save}>
                            <span className="icon is-small">
                                <i className="fas fa-save"></i>
                            </span>
                        </div>
                        <div className="button is-rounded" onClick={undo}>
                            <span className="icon is-small">
                                <i className="fas fa-undo"></i>
                            </span>
                        </div>
                        <div className="button is-rounded" onClick={() => setVisiable(!visible)}>
                            <span className="icon is-small">
                                {
                                    visible ?
                                        <i className="fas fa-eye-slash"></i> :
                                        <i className="fas fa-eye"></i>
                                }
                            </span>
                        </div>

                    </div>
                </div>
                <div className="column is-narrow">
                    <div className="button is-rounded" onClick={next}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div className="has-text-centered" >
                <div className="is-inline-block" style={{ boxShadow: "rgba(138, 134, 134, 0.26) 1px 1px 7px 5px" }}>
                    <CanvasDraw ref={canvas} {...canvasProps} />
                </div>
                <div>
                    <img style={{ opacity: visible ? 1 : 0 }} src={process.env.PUBLIC_URL + `/images/characters/${char}.png`} alt="" />
                </div>
            </div>

        </div>
    )
};

export default Test;