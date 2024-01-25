import React, { useEffect, useState } from "react";
import "./styles/ResetPassword.css";

import TextField from "./components/TextField";
import Button from "./components/Button";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    !!id && setIsLoggedIn(true);
  }, [id]);

  const routeTo = useNavigate();
  return (
    <div className="resetPasswordWrapper">
      <div className="resetPasswordBody">
        <h2>Reset Password</h2>
        {!isLoggedIn && (
          <TextField
            fullwidth
            label="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        )}
        <TextField
          fullwidth
          label="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullwidth
          label="Confirm New Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />

        <Button
          style={{ width: "100%", marginTop: "25px", fontSize: "large" }}
          onClick={() => {}}
        >
          Reset Password
        </Button>

        <Button
          color="secondary"
          style={{
            width: "50%",
            marginTop: "15px",
            fontSize: "medium",
          }}
          onClick={() => routeTo("/sign-up")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
