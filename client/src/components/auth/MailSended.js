import React from "react";
import { resend } from "./auth-service";

class MailSended extends React.Component {
  state = {
    confirmMessage: "",
    errorMessage: "",
  };

  onResend = (event) => {
    event.preventDefault();
    const { email } = this.props.match.params;
    resend(email)
      .then((validationMsg) => this.setState({ confirmMessage: validationMsg }))
      .catch((error) =>
        this.setState({ errorMessage: error.response.data.message })
      );
  };

  render() {
    return (
      <div className="mailsended-container container d-flex flex-column align-items-center">
        <img src="/email.svg" alt="email-icon" className="email-icon mb-5 mt-5" />

        <p>Nous avons envoyé un email pour confirmer la validité de votre adresse mail.
        Après avoir reçu le courrier électronique, suivez le lien fourni pour terminer votre inscription.</p>

        {this.state.confirmMessage && <p>{this.state.confirmMessage}</p>}

        <button onClick={(event) => this.onResend(event)} className="btn btn-orange mt-5">
          Renvoyer le lien de vérification
        </button>

        {this.state.errorMessage && (
          <div className="error-message mt-5">
            <p>{this.state.errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export default MailSended;
