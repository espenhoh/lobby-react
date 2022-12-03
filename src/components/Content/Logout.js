import React, {useContext} from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const Logout = props => {
    const ctx = useContext(AuthContext);
    const hideModal = (event) => {
        ctx.setLogoutVisible(false);
    };

    return <Modal>
        <h1>Du er nå logget ut!</h1>
        <Button disabled={false} onClick={hideModal}>OK</Button>
    </Modal>
};

export default Logout;