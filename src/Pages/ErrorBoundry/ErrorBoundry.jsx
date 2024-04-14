import React from "react";
import ErrorImage from "../../Assets/Error boundry Image.jpg";
import "./ErrorBoundary.css";
class ErrorBoundry extends React.Component {
  state = {
    error: "",
  };

  static getDerivedStateFromError(error) {
    return {
      error: error,
    };
  }

  componentDidCatch(_error, _info) {
    // console.log("error is" , error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <img src={ErrorImage} alt="Error" className="error-image" />
          <h1 className="error-heading">OOPS!</h1>
          <h3 className="error-message">Something went wrong.</h3>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
