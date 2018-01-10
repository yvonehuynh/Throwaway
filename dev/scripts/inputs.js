import React from 'react';

export default class Inputs extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="input-container">
                <form action="" onSubmit={this.props.search}>
                    <label htmlFor="booze-search">Search Your Alcohol</label>
                    <input type="text" name="booze-search" placeholder="search your alcohol" id="booze-input"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}