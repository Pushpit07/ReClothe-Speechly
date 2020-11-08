import React, { Component, Fragment } from 'react';
import './styles.scss';

export class Appreciation extends Component {

	handleSubmit = async (e) => {
	  e.preventDefault();
	  window.location = "https://reclothe.webflow.io/";
	}

	render() {
		return (
			<Fragment>
				<div className="main_div">
                    <div className="signup_box p-3 shadow mb-5">

                        <div>
                            <div className="row">
                                <div className="success_content1">We appreciate you for your contribution in making the world a better place.</div>
                            </div>
                        </div>

                         <div className="row">
                            <button className="btn btn-primary shadow-sm submit-btn" style={{marginTop: "40px", textAlign: "center"}} type="submit" onClick={this.handleSubmit}>
                                <span>Go to ReClothe</span>
                            </button>
                        </div>
                      
                    </div>	
    		</div>
			</Fragment>
		)
	}
}

export default Appreciation;