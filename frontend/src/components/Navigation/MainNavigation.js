import React from 'react'
import { NavLink } from 'react-router-dom'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './MainNavigation.css'

const mainNavigation = props => (
    <header className='main-navigation'>
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler}/>
        </div>
        <div className="main-navigation__logo">
            <h1>Eventer</h1>
        </div>
        <div className="spacer" />
        <div className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to='/auth'>
                        Authenticate
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/events'>
                        Events
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/bookings'>
                        Bookings
                    </NavLink>
                </li>
            </ul>
        </div>
    </header>
)

export default mainNavigation