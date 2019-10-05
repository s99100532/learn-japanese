import React from "react";
import { Tabs } from "../util/constants";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";
import { RouteChildrenProps } from "react-router";


const Navbar = (props: RouteChildrenProps) => {

    const { location } = props;
    return (
        <div className="tabs">
            <ul>
                {
                    Object.values(Tabs).map(tab => <li key={tab} className={classNames({
                        "is-active": `/${tab}` === location.pathname
                    })}>
                        <Link to={`/${tab}`}>{tab}</Link>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default withRouter(Navbar);