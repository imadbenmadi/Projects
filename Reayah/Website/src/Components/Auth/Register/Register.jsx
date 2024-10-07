import React, { useEffect } from "react";
import { useState } from "react";
import Choose from "./1_Choose";
import EmailVerification from "./2_EmailVerification";
import Register_Form from "./3_Form";
import Done from "./4_Done";
function Register() {
    // const [step, setStep] = useState(1);

    const [user, setUser] = useState({
        Type: "Patient",
        FitstName: "",
        LastName: "",
        Email: "",
        Password: "",
    });
    const change_user = (key, value) => {
        setUser({
            ...user,
            [key]: value,
        });
    };
    const [userType_Done, setUserType_Done] = useState(false);
    const Toogle_userType_Done = () => {
        setUserType_Done(true);
    };
    const [EmailVerification_Done, setEmailVerification_Done] = useState(false);
    const Toogle_EmailVerification_Done = () => {
        setEmailVerification_Done(true);
    };
    const [Form_Done, setForm_Done] = useState(false);
    const Toogle_Form_Done = () => {
        setForm_Done(true);
    };
    // useEffect(() => {
    //     console.log("user", user);
    //     console.log("userType_Done", userType_Done);
    //     console.log("EmailVerification_Done", EmailVerification_Done);
    //     console.log("Form_Done", Form_Done);
    // }, [user, userType_Done, EmailVerification_Done, Form_Done]);
    return (
        <div>
            {!userType_Done ? (
                <Choose
                    user={user}
                    change_user={change_user}
                    Toogle_userType_Done={Toogle_userType_Done}
                />
            ) : !EmailVerification_Done ? (
                <EmailVerification
                    user={user}
                    change_user={change_user}
                    Toogle_EmailVerification_Done={
                        Toogle_EmailVerification_Done
                    }
                />
            ) : !Form_Done ? (
                <Register_Form
                    Toogle_Form_Done={Toogle_Form_Done}
                    user={user}
                    change_user={change_user}
                />
            ) : (
                <Done />
            )}
        </div>
    );
}

export default Register;
