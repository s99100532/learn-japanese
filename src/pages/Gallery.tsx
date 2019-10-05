import React, { useState, useCallback, useEffect, useRef } from "react";
import Select from 'react-select';
import { Characters } from "../util/constants";
import Axios from "axios";
import CanvasDraw from "react-canvas-draw";

const options = Characters.map(char => ({ label: char, value: char }));

const Gallery = () => {

    const [selectedOption, setSelectedOption] = useState();
    const [images, setImages] = useState([]);
    const [cursor, setCursor] = useState(0);
    const canvas = useRef<any>();

    const handleChange = useCallback((value) => {
        setSelectedOption(value)
    }, []);

    useEffect(() => {
        if (typeof selectedOption !== "undefined") {
            Axios.get(`${process.env.REACT_APP_IMG_ENDPOINT}/${selectedOption.value}`)
                .then(response => {
                    const images = response.data.data
                    if (images) {
                        setImages(images);

                        if (images.length) {
                            setCursor(1);
                        }
                    }
                })
        }
    }, [selectedOption])

    useEffect(() => {
        if (cursor > 0 && images[cursor - 1]) {
            canvas.current.loadSaveData(JSON.stringify(images[cursor - 1]))
        }
    }, [cursor, images])

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                styles={{
                    container: (provided) => ({
                        ...provided,
                        zIndex: 999
                    })
                }}
                
            />
            <div className="columns is-mobile">
                <div className="column is-narrow">
                    <div className="button is-rounded" onClick={() => cursor > 1 && setCursor(cursor - 1)}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-left"></i>
                        </span>
                    </div>
                </div>
                <div className="column"> {cursor} / {images.length}</div>
                <div className="column is-narrow">
                    <div className="button is-rounded" onClick={() => cursor < images.length && setCursor(cursor + 1)}>
                        <span className="icon is-small">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="has-text-centered">
                <div className="is-inline-block">
                    <CanvasDraw ref={canvas} disabled={true} canvasWidth={300} canvasHeight={300} />
                </div>
            </div>
        </div>
    )
}

export default Gallery;