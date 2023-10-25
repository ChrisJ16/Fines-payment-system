import React from "react";

class User extends React.Component{
    constructor(){
        super()
        this.state = {
            Users: [],
        }
    }

    render(){
        return(
            <div>
                <p> Return to Login Page </p>
            </div>
        )
    }
}

export default User;