import { useState } from "react";

function Login(props) {
  const { login, error, user } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if (!user) {
    console.log("User is not logged in!");
  } else {
    console.log(user.password);
  }

  return (
    <>
      {user.username ? (
        <div>
          <h3>Profile for user {user.username}</h3>
          <p>{user.username}</p>
          <p>{user.password}</p>
        </div>
      ) : (
        <div>
          <h3>Login</h3>
          <p>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value.trim());
              }}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value.trim());
              }}
            />
          </p>
          <button
            type="button"
            onClick={() => {
              login(username, password);
            }}
          >
            Login!
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
