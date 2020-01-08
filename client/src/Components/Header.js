import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';

class Header  extends PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return(
            
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav>
                        {authUser ? (
                            <React.Fragment>
                                <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
                                <Link to="/signout" className="signout">Sign Out</Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link to="/signup">Sign Up</Link>
                                <Link to="/signin">Sign In</Link>
                            </React.Fragment>
                        )}
                    </nav>
                </div>
            </div>

        )

    }
    
    
};

export default Header;