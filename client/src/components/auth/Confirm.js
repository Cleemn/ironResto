import React from 'react';
import { confirm } from './auth-service';


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
        <div className="confirm-container">
            <img src="/check-icon.svg" alt="check-icon" className="check-icon"/>
            <h1>👏</h1>
            <h3>Vous êtes prêt pour passer la commande !</h3>
            <p>Votre email est confirmé. Veuillez vous connecter.</p>
        </div>
    )}
}

export default Confirm;