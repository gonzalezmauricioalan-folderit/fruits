import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

const Auth = () => {
    return (
        <div>
            <h1>Please sig-in</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    )
}

export default Auth