import React from 'react';
import { confirm } from './auth-service';
import { Link } from "react-router-dom";

class Confirm extends React.Component{
    state = {
        confirmed:false,
        errorMessage:""
    }

    componentDidMount = () => {
        const { params } = this.props.match;
        confirm(params.email, params.token)
          .then(()=>this.setState({confirmed:true}))
          .catch(err=>this.setState({errorMessage:err.response.data.message}))
    }

    render () {
        return ( 
        <div className="confirm-container container d-flex flex-column align-items-center">
            <img src="/check-icon.svg" alt="check-icon" className="check-icon mt-5 mb-5"/>
            <h1>👏</h1>
            <h4 className="text-center">Vous êtes prêt à passer votre première commande !</h4>
            <p className="mt-5 text-center">Votre email est confirmé.</p>
            <Link to="/login">
                <button className="btn btn-orange mt-1">
                    <p className="mb-0">Je me connecte</p>
                </button>
            </Link>
        </div>
    )}
}

export default Confirm;