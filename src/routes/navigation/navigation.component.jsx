import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react";

import { ReactComponent as CrwnLogo }  from '../../assests/crown.svg';
import './navigation.styles.scss';


/*
Fragment is  a top level parent component,
it is not an HTML element.
It returns nothing

*/
const Navigation =()=>{
return(
        <Fragment>
                <div className="navigation">
                    
                            <Link className="logo-container" to='/'>
                                <div><CrwnLogo className='Logo' /></div>
                            </Link>
                            

                            <div className="nav-links-container">
                                <Link className="nav-link" to = '/shop'>
                                    SHOP
                                </Link>
                                <Link className="nav-link" to = '/auth'>
                                    SIGN IN
                                </Link>
                            </div>

                </div>
                <Outlet/>
        </Fragment>
    
      // Outlet represents the thing which always need to be
      // present
    
      )
    

}

export default Navigation;