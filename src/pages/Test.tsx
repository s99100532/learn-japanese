import React, { useState, useCallback, useRef } from "react";
import CharacterAudio from "../components/CharacterAudio";
import { shuffle } from "lodash";
import { Characters } from "../util/constants";
import CanvasDraw from "react-canvas-draw";
import classNames from "classnames";
import Axios from "axios";

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

const charactersShuffled = shuffle(Characters) || "";

const Test = () => {

    const [cursor, setCursor] = useState(1);
    const [history, setHistory] = useState<string[]>([charactersShuffled[cursor]]);
    const [char, setChar] = useState(charactersShuffled[cursor]);
    const [visible, setVisiable] = useState(false);
    const [loading, setLoading] = useState(false);
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
        const imageJSON = canvas.current.getSaveData();
        try {
            const image = JSON.parse(imageJSON);
            if (!image.lines.length) {
                alert("Cannot save empty chart")
                return;
            }
            setLoading(true);
            Axios.post(`${process.env.REACT_APP_IMG_ENDPOINT}/${char}`, {
                image
            })
                .then(function (response) {
                    if (response.data.status === "ok") {
                        alert("success");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false)
                });
        } catch (e) {
            alert(e);
        }

    }, [canvas, char]);

    const undo = useCallback(() => {
        canvas.current.undo();
    }, [canvas]);


    const next = useCallback(() => {
        if (cursor >= history.length) {
            const newChar = charactersShuffled[cursor + 1] || "";
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
                    <button className="button is-rounded" onClick={previous}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-left"></i>
                        </span>
                    </button>
                </div>
                <div className="column">
                    <div className="buttons is-centered">
                        <CharacterAudio char={char} />
                        <button className={classNames("button is-rounded", {"is-loading": loading})} disabled={loading} onClick={save}>
                            <span className="icon is-small">
                                <i className="fas fa-save"></i>
                            </span>
                        </button>
                        <button className="button is-rounded" onClick={undo}>
                            <span className="icon is-small">
                                <i className="fas fa-undo"></i>
                            </span>
                        </button>
                        <button className="button is-rounded" onClick={() => setVisiable(!visible)}>
                            <span className="icon is-small">
                                {
                                    visible ?
                                        <i className="fas fa-eye-slash"></i> :
                                        <i className="fas fa-eye"></i>
                                }
                            </span>
                        </button>

                    </div>
                </div>
                <div className="column is-narrow">
                    <button className="button is-rounded" onClick={next}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </button>
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