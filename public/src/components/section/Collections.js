import React from "react";

export default class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: [
                {
                    key: 'all',
                    name: 'Всі колеції'
                },
                {
                    key: 'Kimberli New',
                    name: 'Колеція Kimberli New'
                },
                {
                    key: 'Kimberli Classic',
                    name: 'Колекція Kimberli Classic'
                },
                {
                    key: 'Kimberli Exclusive',
                    name: 'Колекція Kimberli Exclusive'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <div className='presentation'></div>
                <div className={'collections'}>
                    {this.state.collections.map(el => (
                        <div key={el.key} onClick={() => this.props.chooseCollection(el.key)}>
                            {el.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}