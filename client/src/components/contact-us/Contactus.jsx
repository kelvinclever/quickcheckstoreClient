import './contactus.css'

const Contactus = () => {
    return (
        <>
            <div className="contact-us">
                <div className='ctus'>
                    <div>
                        <h1 className='logo'>
                            QUICK CHECK STORE
                        </h1>
                    </div>
                    <div className="contact-us-flex">
                        <div>
                            <h1>CONTACT US</h1>
                            <div className='contactus-img'>
                                <img src="https://uploads-ssl.webflow.com/5ef0df6b9272f7410180a013/5ef204bb10b93fdbe5e601bb_contact-2860030_1920-1024x683.jpg" alt="" />
                            </div>
                        </div>
                        <div className="contact-form-container">
                            <form action="" className='contact-form'>
                                <div>
                                    <label htmlFor="name">NAME*</label>
                                    <div>
                                        <input type="text" placeholder="First Name" />
                                        <input type="text" placeholder="Last Name" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Email">EMAIL *</label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label htmlFor="phone">PHONE</label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">COMMENT OR MESSAGE</label>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                                <div>
                                    <button className='contactus-btn'>SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </>

    )
}

export default Contactus