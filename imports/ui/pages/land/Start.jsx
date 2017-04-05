import React from 'react';

export  const About = () => {
    const style ={'fontSize': '48px !important'};
    return (
        <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col m6">
                        <h3>Code Studio</h3>
                        <p>We are a studio that aims to give our clients a platform that exemplifies a good user experience...</p>
                    </div>
                    <div className="col m6">
                        <div className="stats">
                            <div className="stat blue darken-2">
                                <h2 className="counter white-text">1</h2>
                                <p className="grey-text darken-1"><i style={style} className="material-icons">code</i> coder maimed <i style={style} className="material-icons">accessible</i></p>
                            </div>
                            <div className="stat blue darken-2">
                                <h2 className="counter white-text">123</h2>
                                <p className="grey-text darken-1">fresh pots of <i style={style} className="material-icons">local_drink</i>coffee </p>
                            </div>
                            <div className="stat blue darken-2">
                                <h2 className="counter white-text">123</h2>
                                <p className="grey-text lighten-1">pounds gnar shredded <i style={style}  className="material-icons">motorcycle</i></p>
                            </div>
                            <div className="stat blue darken-2">
                                <h2 className="counter white-text">0</h2>
                                <p className="grey-text darken-1">honeybadgers harmed<i style={style}  className="material-icons">nature_people</i></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p>Along with a conservative dose of personality.</p>
                </div>
            </div>
        </section>
    );
};
