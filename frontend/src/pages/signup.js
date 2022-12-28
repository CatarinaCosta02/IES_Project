import illustration from '../images/illustration.png';
import styles from '../styles/signModel.module.scss';
import {NavLink} from "react-router-dom";


function Signup() {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <form>
                    <h1>Sign up</h1>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" name="fname" />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" name="lname" />
                        </div>

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
                        <small>Already have an account?<br /><NavLink to="/signin">Sign in instead</NavLink></small>
                        <input className={styles.submit} type="submit" value="Sign up" />
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

export default Signup;