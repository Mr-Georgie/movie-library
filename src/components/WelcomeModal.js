import React from 'react';


export default function WelcomeModal(props) {

    const [modalState, setModalState] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            console.log('This will run after 45 second!')
            setModalState(true)
        }, 45000);
        return () => clearTimeout(timer);
      }, []);

    const hideModal = () => {
        setModalState(false)
    }

    const messageStyle = {
        fontSize: "15px",
        color: "#8E95A9",
    }

    return (
        // <!-- Modal -->
        <div className={"modal fade bg-black" + (modalState ? " show d-block" : " d-none")}
        data-bs-backdrop="static" data-bs-keyboard="false" 
        tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="modal-top">
                            <h5 className="modal-title" style={{marginBottom: "45px"}} id="staticBackdropLabel">Quick one!</h5>
                            <button type="button" className="btn-close btn-close-white" onClick={() => hideModal()}
                            aria-label="Close"></button>
                        </div>
                        <p style={messageStyle}>Hi there, An update was made on 
                        the <span style={{color: "#9C92F8", fontWeight: "600"}}>User Interface.</span> </p>
                        <p style={messageStyle}>See if you can spot the changes 😁</p>
                    </div>
                    <div className="modal-footer">
                        <p style={messageStyle}>Let me know what you think on 
                        twitter 👉 <a href="https://twitter.com/GeorgeIsiguzo" className='my-link'> Georgie</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
