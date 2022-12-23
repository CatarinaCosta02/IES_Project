import styles from "../styles/signModel.module.scss";
import illustration from "../images/illustration.png";
import {NavLink} from "react-router-dom";

function Signin() {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <form>
                    <h1>Sign In</h1>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                    </div>
                    <div className={styles.links}>
                        <small>Not a member?<br /><NavLink to="/signup">Sign up instead</NavLink></small>
                        <input className={styles.submit} type="submit" value="Sign in" />
                    </div>
                </form>
            </div>

            <div className={styles.rightSide}>
                <h1>What's New?</h1>
                <h2>Always one step ahead</h2>

                <div className={styles.illustration}>
                    <div className={styles.text}>
                        <h3>What are you waiting for?</h3>
                        <p>Join us now and start your journey</p>
                    </div>
                    <img src={illustration} alt="Illustration" />
                </div>
            </div>
        </div>
    );
}

export default Signin;