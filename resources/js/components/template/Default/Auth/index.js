import React from "react";
// import "@fontsource/montserrat";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss';
import './index.css';
import './index.scss';
import routes from "../../../../router/routes";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
export default class Default extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let fuild_src = "/storage/assets/images/login.svg";
        if(this.props.mode == 'register'){
            fuild_src = "/storage/assets/images/register.svg"
        }
        return(
            <>      
            <div id="root">
            <div className="blank-page" style={{}}>
                <div className="app-content content">
                    <div className="content-wrapper">
                    <div className="content-body">
                        <div className="auth-wrapper auth-cover">
                        <div className="auth-inner m-0 row">
                            <a className="brand-logo" href="/">
                            <img className="logo-img" src="/storage/assets/images/logo.svg"/>
                            <h2 className="brand-text text-primary ms-1">Vuexy</h2>
                            </a>
                            <div className="d-none d-lg-flex align-items-center p-5 col-sm-12 col-lg-8">
                            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5"><img className="img-fluid" src={fuild_src} alt="Login Cover" /></div>
                            </div>
                            <div className="d-flex align-items-center auth-bg px-2 p-lg-5 col-sm-12 col-lg-4">
                            <div className="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
                                {this.props.mode == 'login' && (<h2 className="fw-bold mb-1 card-title">Welcome to Vuexy! 👋</h2>)}
                                {this.props.mode == 'register' && (<h2 className="fw-bold mb-1 card-title">Adventure starts here 🚀</h2>)}
                                {this.props.mode == 'forgot' && (<h2 className="fw-bold mb-1 card-title">Forgot Password? 🔒</h2>)}

                                {this.props.mode == 'login' && (<p className="mb-2 card-text">Please sign-in to your account and start the adventure</p>)}
                                {this.props.mode == 'register' && (<p className="mb-2 card-text">Make your app management easy and fun!</p>)}
                                {this.props.mode == 'forgot' && (<p className="mb-2 card-text">Enter your email and we'll send you instructions to reset your password</p>)}
                                

                                <form className="auth-form mt-2">
                                    {this.props.children}
                                </form>
                                {this.props.mode == 'register' && (<>
                                    <p className="text-center mt-2"><span className="me-25">Already have an account?</span><NavLink to={routes.login}><span>Sign in instead</span></NavLink></p>
                                </>)}
                                {this.props.mode == 'login' && (<>
                                    <p className="text-center mt-2"><span className="me-25">New on our platform?</span><NavLink to={routes.register}><span>Create an account</span></NavLink></p>
                                </>)}
                                {this.props.mode == 'forgot' && (<>
                                    <p className="text-center mt-2"><NavLink to={routes.login} className="forgot-back">
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                        <span>Back to login</span></NavLink></p>
                                </>)}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div style={{position: 'fixed', zIndex: 9999, inset: '16px', pointerEvents: 'none'}} />
            </div>
            </>
        )
    }
}
